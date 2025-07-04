const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

// Simple PDF generation using HTML template approach
// For production, consider using more robust libraries like PDFKit or Puppeteer

const generatePDFContent = {
  donationReceipt: (donation) => {
    const date = new Date(donation.created_at).toLocaleDateString();
    
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
        .header { text-align: center; border-bottom: 2px solid #e74c3c; padding-bottom: 20px; margin-bottom: 30px; }
        .logo { font-size: 28px; font-weight: bold; color: #e74c3c; margin-bottom: 10px; }
        .title { font-size: 24px; color: #2c3e50; margin-bottom: 5px; }
        .subtitle { font-size: 16px; color: #7f8c8d; }
        .content { margin: 30px 0; }
        .receipt-details { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .row { display: flex; justify-content: space-between; margin: 10px 0; }
        .label { font-weight: bold; color: #2c3e50; }
        .value { color: #34495e; }
        .amount { font-size: 24px; font-weight: bold; color: #27ae60; text-align: center; margin: 20px 0; }
        .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ecf0f1; }
        .thank-you { font-size: 18px; color: #e74c3c; margin-bottom: 10px; }
        .contact { font-size: 12px; color: #7f8c8d; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">UNITEUP</div>
        <div class="title">DONATION RECEIPT</div>
        <div class="subtitle">Tax-Deductible Donation Receipt</div>
      </div>
      
      <div class="content">
        <div class="receipt-details">
          <div class="row">
            <span class="label">Receipt ID:</span>
            <span class="value">#${donation.id}</span>
          </div>
          <div class="row">
            <span class="label">Payment ID:</span>
            <span class="value">${donation.payment_id}</span>
          </div>
          <div class="row">
            <span class="label">Date:</span>
            <span class="value">${date}</span>
          </div>
          <div class="row">
            <span class="label">Donor Name:</span>
            <span class="value">${donation.donor_name}</span>
          </div>
          <div class="row">
            <span class="label">Email:</span>
            <span class="value">${donation.donor_email}</span>
          </div>
          <div class="row">
            <span class="label">Donation Type:</span>
            <span class="value">${donation.donation_type}</span>
          </div>
          ${donation.message ? `
          <div class="row">
            <span class="label">Message:</span>
            <span class="value">${donation.message}</span>
          </div>
          ` : ''}
        </div>
        
        <div class="amount">
          Total Donation: ₹${parseFloat(donation.amount).toFixed(2)}
        </div>
        
        <div class="footer">
          <div class="thank-you">Thank you for your generous donation!</div>
          <div class="contact">
            UniteUp NGO | Email: info@uniteup.org | Phone: +91 9711883411<br>
            This receipt serves as proof of your tax-deductible donation.
          </div>
        </div>
      </div>
    </body>
    </html>
    `;
  },

  orderReceipt: (order) => {
    const date = new Date(order.created_at).toLocaleDateString();
    
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
        .header { text-align: center; border-bottom: 2px solid #3498db; padding-bottom: 20px; margin-bottom: 30px; }
        .logo { font-size: 28px; font-weight: bold; color: #3498db; margin-bottom: 10px; }
        .title { font-size: 24px; color: #2c3e50; margin-bottom: 5px; }
        .subtitle { font-size: 16px; color: #7f8c8d; }
        .content { margin: 30px 0; }
        .order-details { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .row { display: flex; justify-content: space-between; margin: 10px 0; }
        .label { font-weight: bold; color: #2c3e50; }
        .value { color: #34495e; }
        .items-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .items-table th, .items-table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        .items-table th { background: #3498db; color: white; }
        .total { font-size: 24px; font-weight: bold; color: #27ae60; text-align: center; margin: 20px 0; }
        .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ecf0f1; }
        .thank-you { font-size: 18px; color: #3498db; margin-bottom: 10px; }
        .contact { font-size: 12px; color: #7f8c8d; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">UNITEUP</div>
        <div class="title">ORDER RECEIPT</div>
        <div class="subtitle">Purchase Confirmation</div>
      </div>
      
      <div class="content">
        <div class="order-details">
          <div class="row">
            <span class="label">Order ID:</span>
            <span class="value">#${order.id}</span>
          </div>
          <div class="row">
            <span class="label">Payment ID:</span>
            <span class="value">${order.payment_id}</span>
          </div>
          <div class="row">
            <span class="label">Date:</span>
            <span class="value">${date}</span>
          </div>
          <div class="row">
            <span class="label">Customer:</span>
            <span class="value">${order.customer_name}</span>
          </div>
          <div class="row">
            <span class="label">Email:</span>
            <span class="value">${order.customer_email}</span>
          </div>
        </div>
        
        <table class="items-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${order.items.map(item => `
              <tr>
                <td>${item.product_name}</td>
                <td>${item.quantity}</td>
                <td>₹${parseFloat(item.price).toFixed(2)}</td>
                <td>₹${(parseFloat(item.price) * item.quantity).toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <div class="total">
          Total Amount: ₹${parseFloat(order.total_amount).toFixed(2)}
        </div>
        
        <div class="footer">
          <div class="thank-you">Thank you for supporting our cause!</div>
          <div class="contact">
            UniteUp NGO | Email: info@uniteup.org | Phone: +91 9711883411<br>
            Your purchase helps us continue our mission of positive change.
          </div>
        </div>
      </div>
    </body>
    </html>
    `;
  },

  eventTicket: (ticket) => {
    const eventDate = new Date(ticket.event_date).toLocaleDateString();
    const eventTime = new Date(ticket.event_date).toLocaleTimeString();
    
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
        .header { text-align: center; border-bottom: 2px solid #9b59b6; padding-bottom: 20px; margin-bottom: 30px; }
        .logo { font-size: 28px; font-weight: bold; color: #9b59b6; margin-bottom: 10px; }
        .title { font-size: 24px; color: #2c3e50; margin-bottom: 5px; }
        .subtitle { font-size: 16px; color: #7f8c8d; }
        .ticket-container { background: linear-gradient(135deg, #9b59b6, #8e44ad); color: white; padding: 30px; border-radius: 15px; margin: 20px 0; }
        .event-title { font-size: 28px; font-weight: bold; margin-bottom: 15px; text-align: center; }
        .ticket-details { background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; margin: 20px 0; }
        .row { display: flex; justify-content: space-between; margin: 10px 0; }
        .label { font-weight: bold; }
        .value { }
        .qr-section { text-align: center; margin: 30px 0; }
        .ticket-code { font-size: 20px; font-weight: bold; background: rgba(255,255,255,0.2); padding: 10px; border-radius: 5px; margin: 10px 0; }
        .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ecf0f1; }
        .instructions { font-size: 14px; color: #7f8c8d; margin: 10px 0; }
        .contact { font-size: 12px; color: #7f8c8d; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">UNITEUP</div>
        <div class="title">EVENT TICKET</div>
        <div class="subtitle">Admit One</div>
      </div>
      
      <div class="ticket-container">
        <div class="event-title">${ticket.event_title}</div>
        
        <div class="ticket-details">
          <div class="row">
            <span class="label">Date & Time:</span>
            <span class="value">${eventDate} at ${eventTime}</span>
          </div>
          <div class="row">
            <span class="label">Location:</span>
            <span class="value">${ticket.location}</span>
          </div>
          <div class="row">
            <span class="label">Attendee:</span>
            <span class="value">${ticket.attendee_name}</span>
          </div>
          <div class="row">
            <span class="label">Tickets:</span>
            <span class="value">${ticket.ticket_quantity}</span>
          </div>
          <div class="row">
            <span class="label">Total Amount:</span>
            <span class="value">₹${parseFloat(ticket.total_amount).toFixed(2)}</span>
          </div>
        </div>
        
        <div class="qr-section">
          <div class="ticket-code">Ticket Code: ${ticket.ticket_code}</div>
          <!-- QR Code would be inserted here in a real implementation -->
          <div style="background: white; width: 120px; height: 120px; margin: 20px auto; display: flex; align-items: center; justify-content: center; border-radius: 10px; color: black; font-weight: bold;">
            QR CODE<br>PLACEHOLDER
          </div>
        </div>
      </div>
      
      <div class="footer">
        <div class="instructions">
          Please bring this ticket (printed or digital) to the event.<br>
          Present the QR code or ticket code for entry.
        </div>
        <div class="contact">
          UniteUp NGO | Email: info@uniteup.org | Phone: +91 9711883411<br>
          For any queries regarding your ticket, please contact us.
        </div>
      </div>
    </body>
    </html>
    `;
  }
};

// Simple HTML to PDF conversion (for demo purposes)
// In production, use libraries like Puppeteer, html-pdf, or PDFKit
const htmlToPdf = (html) => {
  return new Promise((resolve, reject) => {
    // This is a simplified implementation
    // In a real application, you would use a proper HTML to PDF converter
    const buffer = Buffer.from(html, 'utf8');
    resolve(buffer);
  });
};

module.exports = {
  donationReceipt: async (donation) => {
    const html = generatePDFContent.donationReceipt(donation);
    return await htmlToPdf(html);
  },
  
  orderReceipt: async (order) => {
    const html = generatePDFContent.orderReceipt(order);
    return await htmlToPdf(html);
  },
  
  eventTicket: async (ticket) => {
    const html = generatePDFContent.eventTicket(ticket);
    return await htmlToPdf(html);
  }
};