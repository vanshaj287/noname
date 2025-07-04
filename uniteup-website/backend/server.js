const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'uniteup_secret_key_2024';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));

// Database setup
const db = new sqlite3.Database('./database/uniteup.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

// Create uploads directory if it doesn't exist
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Initialize database tables
function initializeDatabase() {
  const tables = [
    // Users table
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT DEFAULT 'user',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    
    // Donations table
    `CREATE TABLE IF NOT EXISTS donations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      donor_name TEXT NOT NULL,
      donor_email TEXT NOT NULL,
      donor_phone TEXT,
      amount DECIMAL(10,2) NOT NULL,
      donation_type TEXT NOT NULL,
      message TEXT,
      payment_status TEXT DEFAULT 'pending',
      payment_id TEXT,
      receipt_generated BOOLEAN DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    
    // Products table
    `CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      price DECIMAL(10,2) NOT NULL,
      category TEXT NOT NULL,
      image_url TEXT,
      stock_quantity INTEGER DEFAULT 0,
      status TEXT DEFAULT 'active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    
    // Orders table
    `CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_name TEXT NOT NULL,
      customer_email TEXT NOT NULL,
      customer_phone TEXT,
      customer_address TEXT,
      total_amount DECIMAL(10,2) NOT NULL,
      payment_status TEXT DEFAULT 'pending',
      order_status TEXT DEFAULT 'pending',
      payment_id TEXT,
      receipt_generated BOOLEAN DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    
    // Order items table
    `CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders (id),
      FOREIGN KEY (product_id) REFERENCES products (id)
    )`,
    
    // Events table
    `CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      event_date DATETIME NOT NULL,
      location TEXT NOT NULL,
      ticket_price DECIMAL(10,2) DEFAULT 0,
      max_capacity INTEGER,
      current_bookings INTEGER DEFAULT 0,
      image_url TEXT,
      status TEXT DEFAULT 'active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    
    // Event tickets table
    `CREATE TABLE IF NOT EXISTS event_tickets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_id INTEGER NOT NULL,
      attendee_name TEXT NOT NULL,
      attendee_email TEXT NOT NULL,
      attendee_phone TEXT,
      ticket_quantity INTEGER NOT NULL,
      total_amount DECIMAL(10,2) NOT NULL,
      payment_status TEXT DEFAULT 'pending',
      payment_id TEXT,
      ticket_code TEXT UNIQUE,
      qr_code_url TEXT,
      receipt_generated BOOLEAN DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (event_id) REFERENCES events (id)
    )`
  ];

  tables.forEach((table, index) => {
    db.run(table, (err) => {
      if (err) {
        console.error(`Error creating table ${index + 1}:`, err.message);
      }
    });
  });

  // Insert sample data
  insertSampleData();
}

// Sample data insertion
function insertSampleData() {
  // Sample products
  const products = [
    ['Handmade Pottery', 'Beautiful handcrafted pottery made by local artisans', 299.99, 'Handicrafts', null, 50],
    ['Organic Candles', 'Eco-friendly candles made from natural wax', 149.99, 'Home Decor', null, 100],
    ['Artisan Jewelry', 'Handcrafted jewelry supporting local communities', 599.99, 'Accessories', null, 25],
    ['Traditional Textiles', 'Handwoven textiles with traditional patterns', 799.99, 'Clothing', null, 30],
    ['Wooden Crafts', 'Beautiful wooden handicrafts by skilled artisans', 399.99, 'Handicrafts', null, 40]
  ];

  const insertProduct = `INSERT OR IGNORE INTO products (name, description, price, category, image_url, stock_quantity) VALUES (?, ?, ?, ?, ?, ?)`;
  
  db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
    if (!err && row.count === 0) {
      products.forEach(product => {
        db.run(insertProduct, product);
      });
    }
  });

  // Sample events
  const events = [
    ['Annual Charity Gala', 'Join us for our annual charity gala featuring dinner, entertainment, and fundraising.', '2024-06-15 18:00:00', 'Grand Ballroom, City Center', 2500.00, 200],
    ['Community Workshop', 'Learn new skills while supporting our cause at this hands-on workshop.', '2024-05-20 14:00:00', 'Community Center, Main Street', 500.00, 50],
    ['Art Exhibition', 'Showcase of local artists supporting our NGO mission.', '2024-07-10 10:00:00', 'Art Gallery, Cultural District', 200.00, 100],
    ['Fundraising Marathon', 'Run for a cause in our annual fundraising marathon.', '2024-08-25 06:00:00', 'City Park', 1000.00, 500]
  ];

  const insertEvent = `INSERT OR IGNORE INTO events (title, description, event_date, location, ticket_price, max_capacity) VALUES (?, ?, ?, ?, ?, ?)`;
  
  db.get("SELECT COUNT(*) as count FROM events", (err, row) => {
    if (!err && row.count === 0) {
      events.forEach(event => {
        db.run(insertEvent, event);
      });
    }
  });
}

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// ===== AUTHENTICATION ROUTES =====

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const insertUser = `INSERT INTO users (email, password, name) VALUES (?, ?, ?)`;
    
    db.run(insertUser, [email, hashedPassword, name], function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ error: 'Email already exists' });
        }
        return res.status(500).json({ error: 'Registration failed' });
      }
      
      const token = jwt.sign({ id: this.lastID, email, name }, JWT_SECRET);
      res.json({ token, user: { id: this.lastID, email, name } });
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const getUser = `SELECT * FROM users WHERE email = ?`;
    
    db.get(getUser, [email], async (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Login failed' });
      }
      
      if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
      
      const isValidPassword = await bcrypt.compare(password, user.password);
      
      if (!isValidPassword) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
      
      const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET);
      res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ===== DONATION ROUTES =====

// Process donation
app.post('/api/donations', (req, res) => {
  const { donor_name, donor_email, donor_phone, amount, donation_type, message } = req.body;
  
  if (!donor_name || !donor_email || !amount || !donation_type) {
    return res.status(400).json({ error: 'Required fields missing' });
  }
  
  // Simulate payment processing
  const payment_id = 'PAY_' + Date.now() + Math.random().toString(36).substr(2, 9);
  
  const insertDonation = `INSERT INTO donations 
    (donor_name, donor_email, donor_phone, amount, donation_type, message, payment_status, payment_id) 
    VALUES (?, ?, ?, ?, ?, ?, 'completed', ?)`;
  
  db.run(insertDonation, [donor_name, donor_email, donor_phone, amount, donation_type, message, payment_id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Donation processing failed' });
    }
    
    res.json({
      success: true,
      donation_id: this.lastID,
      payment_id,
      message: 'Donation processed successfully'
    });
  });
});

// Get donation by ID
app.get('/api/donations/:id', (req, res) => {
  const getDonation = `SELECT * FROM donations WHERE id = ?`;
  
  db.get(getDonation, [req.params.id], (err, donation) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch donation' });
    }
    
    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }
    
    res.json(donation);
  });
});

// ===== PRODUCTS ROUTES =====

// Get all products
app.get('/api/products', (req, res) => {
  const getProducts = `SELECT * FROM products WHERE status = 'active' ORDER BY created_at DESC`;
  
  db.all(getProducts, [], (err, products) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch products' });
    }
    res.json(products);
  });
});

// Get product by ID
app.get('/api/products/:id', (req, res) => {
  const getProduct = `SELECT * FROM products WHERE id = ? AND status = 'active'`;
  
  db.get(getProduct, [req.params.id], (err, product) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch product' });
    }
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
  });
});

// ===== ORDER ROUTES =====

// Create order
app.post('/api/orders', (req, res) => {
  const { customer_name, customer_email, customer_phone, customer_address, items } = req.body;
  
  if (!customer_name || !customer_email || !items || items.length === 0) {
    return res.status(400).json({ error: 'Required fields missing' });
  }
  
  // Calculate total amount
  let total_amount = 0;
  let productQueries = items.map(item => 
    new Promise((resolve, reject) => {
      db.get('SELECT price, stock_quantity FROM products WHERE id = ?', [item.product_id], (err, product) => {
        if (err) reject(err);
        else {
          if (!product || product.stock_quantity < item.quantity) {
            reject(new Error(`Insufficient stock for product ${item.product_id}`));
          }
          total_amount += product.price * item.quantity;
          resolve({ ...item, price: product.price });
        }
      });
    })
  );
  
  Promise.all(productQueries)
    .then(validatedItems => {
      const payment_id = 'ORD_' + Date.now() + Math.random().toString(36).substr(2, 9);
      
      const insertOrder = `INSERT INTO orders 
        (customer_name, customer_email, customer_phone, customer_address, total_amount, payment_status, payment_id) 
        VALUES (?, ?, ?, ?, ?, 'completed', ?)`;
      
      db.run(insertOrder, [customer_name, customer_email, customer_phone, customer_address, total_amount, payment_id], function(err) {
        if (err) {
          return res.status(500).json({ error: 'Order creation failed' });
        }
        
        const order_id = this.lastID;
        
        // Insert order items
        const insertOrderItem = `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)`;
        
        validatedItems.forEach(item => {
          db.run(insertOrderItem, [order_id, item.product_id, item.quantity, item.price]);
          
          // Update stock
          db.run('UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?', [item.quantity, item.product_id]);
        });
        
        res.json({
          success: true,
          order_id,
          payment_id,
          total_amount,
          message: 'Order placed successfully'
        });
      });
    })
    .catch(error => {
      res.status(400).json({ error: error.message });
    });
});

// Get order by ID
app.get('/api/orders/:id', (req, res) => {
  const getOrder = `
    SELECT o.*, 
           oi.product_id, oi.quantity, oi.price,
           p.name as product_name
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    LEFT JOIN products p ON oi.product_id = p.id
    WHERE o.id = ?
  `;
  
  db.all(getOrder, [req.params.id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch order' });
    }
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    const order = {
      id: rows[0].id,
      customer_name: rows[0].customer_name,
      customer_email: rows[0].customer_email,
      customer_phone: rows[0].customer_phone,
      customer_address: rows[0].customer_address,
      total_amount: rows[0].total_amount,
      payment_status: rows[0].payment_status,
      order_status: rows[0].order_status,
      payment_id: rows[0].payment_id,
      created_at: rows[0].created_at,
      items: rows.filter(row => row.product_id).map(row => ({
        product_id: row.product_id,
        product_name: row.product_name,
        quantity: row.quantity,
        price: row.price
      }))
    };
    
    res.json(order);
  });
});

// ===== EVENTS ROUTES =====

// Get all events
app.get('/api/events', (req, res) => {
  const getEvents = `SELECT * FROM events WHERE status = 'active' ORDER BY event_date ASC`;
  
  db.all(getEvents, [], (err, events) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch events' });
    }
    res.json(events);
  });
});

// Get event by ID
app.get('/api/events/:id', (req, res) => {
  const getEvent = `SELECT * FROM events WHERE id = ? AND status = 'active'`;
  
  db.get(getEvent, [req.params.id], (err, event) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch event' });
    }
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.json(event);
  });
});

// Book event tickets
app.post('/api/events/:id/book', (req, res) => {
  const { attendee_name, attendee_email, attendee_phone, ticket_quantity } = req.body;
  const event_id = req.params.id;
  
  if (!attendee_name || !attendee_email || !ticket_quantity) {
    return res.status(400).json({ error: 'Required fields missing' });
  }
  
  // Check event capacity
  const getEvent = `SELECT * FROM events WHERE id = ? AND status = 'active'`;
  
  db.get(getEvent, [event_id], (err, event) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch event' });
    }
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    if (event.current_bookings + ticket_quantity > event.max_capacity) {
      return res.status(400).json({ error: 'Not enough tickets available' });
    }
    
    const total_amount = event.ticket_price * ticket_quantity;
    const payment_id = 'TKT_' + Date.now() + Math.random().toString(36).substr(2, 9);
    const ticket_code = 'TKT_' + event_id + '_' + Date.now();
    
    const insertTicket = `INSERT INTO event_tickets 
      (event_id, attendee_name, attendee_email, attendee_phone, ticket_quantity, total_amount, payment_status, payment_id, ticket_code) 
      VALUES (?, ?, ?, ?, ?, ?, 'completed', ?, ?)`;
    
    db.run(insertTicket, [event_id, attendee_name, attendee_email, attendee_phone, ticket_quantity, total_amount, payment_id, ticket_code], function(err) {
      if (err) {
        return res.status(500).json({ error: 'Ticket booking failed' });
      }
      
      // Update event bookings
      db.run('UPDATE events SET current_bookings = current_bookings + ? WHERE id = ?', [ticket_quantity, event_id]);
      
      res.json({
        success: true,
        ticket_id: this.lastID,
        payment_id,
        ticket_code,
        total_amount,
        message: 'Tickets booked successfully'
      });
    });
  });
});

// Get ticket by ID
app.get('/api/tickets/:id', (req, res) => {
  const getTicket = `
    SELECT et.*, e.title as event_title, e.event_date, e.location
    FROM event_tickets et
    JOIN events e ON et.event_id = e.id
    WHERE et.id = ?
  `;
  
  db.get(getTicket, [req.params.id], (err, ticket) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch ticket' });
    }
    
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    
    res.json(ticket);
  });
});

// ===== PDF GENERATION ROUTES =====

const generatePDF = require('./utils/pdfGenerator');

// Generate donation receipt
app.get('/api/donations/:id/receipt', async (req, res) => {
  try {
    const getDonation = `SELECT * FROM donations WHERE id = ?`;
    
    db.get(getDonation, [req.params.id], async (err, donation) => {
      if (err || !donation) {
        return res.status(404).json({ error: 'Donation not found' });
      }
      
      const pdfBuffer = await generatePDF.donationReceipt(donation);
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=donation-receipt-${donation.id}.pdf`);
      res.send(pdfBuffer);
      
      // Mark receipt as generated
      db.run('UPDATE donations SET receipt_generated = 1 WHERE id = ?', [donation.id]);
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate receipt' });
  }
});

// Generate order receipt
app.get('/api/orders/:id/receipt', async (req, res) => {
  try {
    const getOrder = `
      SELECT o.*, 
             oi.product_id, oi.quantity, oi.price,
             p.name as product_name
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id
      WHERE o.id = ?
    `;
    
    db.all(getOrder, [req.params.id], async (err, rows) => {
      if (err || rows.length === 0) {
        return res.status(404).json({ error: 'Order not found' });
      }
      
      const order = {
        id: rows[0].id,
        customer_name: rows[0].customer_name,
        customer_email: rows[0].customer_email,
        total_amount: rows[0].total_amount,
        payment_id: rows[0].payment_id,
        created_at: rows[0].created_at,
        items: rows.filter(row => row.product_id).map(row => ({
          product_name: row.product_name,
          quantity: row.quantity,
          price: row.price
        }))
      };
      
      const pdfBuffer = await generatePDF.orderReceipt(order);
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=order-receipt-${order.id}.pdf`);
      res.send(pdfBuffer);
      
      // Mark receipt as generated
      db.run('UPDATE orders SET receipt_generated = 1 WHERE id = ?', [order.id]);
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate receipt' });
  }
});

// Generate event ticket
app.get('/api/tickets/:id/pdf', async (req, res) => {
  try {
    const getTicket = `
      SELECT et.*, e.title as event_title, e.event_date, e.location
      FROM event_tickets et
      JOIN events e ON et.event_id = e.id
      WHERE et.id = ?
    `;
    
    db.get(getTicket, [req.params.id], async (err, ticket) => {
      if (err || !ticket) {
        return res.status(404).json({ error: 'Ticket not found' });
      }
      
      const pdfBuffer = await generatePDF.eventTicket(ticket);
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=event-ticket-${ticket.id}.pdf`);
      res.send(pdfBuffer);
      
      // Mark receipt as generated
      db.run('UPDATE event_tickets SET receipt_generated = 1 WHERE id = ?', [ticket.id]);
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate ticket' });
  }
});

// ===== ADMIN ROUTES =====

// Get dashboard stats (protected route)
app.get('/api/admin/stats', authenticateToken, (req, res) => {
  const stats = {};
  
  // Get donation stats
  db.get('SELECT COUNT(*) as count, SUM(amount) as total FROM donations WHERE payment_status = "completed"', (err, donationStats) => {
    stats.donations = donationStats;
    
    // Get order stats
    db.get('SELECT COUNT(*) as count, SUM(total_amount) as total FROM orders WHERE payment_status = "completed"', (err, orderStats) => {
      stats.orders = orderStats;
      
      // Get event stats
      db.get('SELECT COUNT(*) as count FROM events WHERE status = "active"', (err, eventStats) => {
        stats.events = eventStats;
        
        // Get ticket stats
        db.get('SELECT COUNT(*) as count, SUM(total_amount) as total FROM event_tickets WHERE payment_status = "completed"', (err, ticketStats) => {
          stats.tickets = ticketStats;
          
          res.json(stats);
        });
      });
    });
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`UniteUp Backend Server running on port ${PORT}`);
});

module.exports = app;