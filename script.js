document.addEventListener('DOMContentLoaded', () => {
    const counterDisplay = document.getElementById('counter');
    let counter = 0;

    const intervalId = setInterval(() => {
        counter++;
        counterDisplay.textContent = counter;
        if (counter >= 100) { // Stop at 100 (or any number you want)
            clearInterval(intervalId);
        }
    }, 20); // Update every 20ms (adjust for speed)
});
 
        // Initialize AOS Animations
        AOS.init();

        // Counting Animation for numbers (Donations, Lives Impacted, Volunteers)
        document.querySelectorAll('.counter-number').forEach((counter) => {
            let start = 1;
            let end = parseInt(counter.getAttribute('data-count'));
            let duration = 300;
            let stepTime = Math.abs(Math.floor(duration / end));
            let timer = setInterval(() => {
                start += 1;
                counter.textContent = start;
                if (start === end) {
                    clearInterval(timer);
                }
            }, stepTime);
        });
    

        let selectedOption = null;

        // Hide the custom amount box initially when the page loads
        document.addEventListener('DOMContentLoaded', function() {
          const customAmountBox = document.getElementById('customAmountBox');
          customAmountBox.style.display = 'none';  // Ensure it's hidden on page load
        });
        
        function selectOption(element) {
          if (selectedOption) {
            selectedOption.classList.remove('selected');
          }
          element.classList.add('selected');
          selectedOption = element;
        
          const customAmountBox = document.getElementById('customAmountBox');
        
          // Show the custom amount box only if the "Custom" option is selected
          if (element.dataset.type === "custom") {
            customAmountBox.style.display = "block";
          } else {
            customAmountBox.style.display = "none";
          }
        }
        
        const container = document.querySelector('.milestone-card-container');
        const cardCount = 7; // Total number of cards
        const visibleCards = 4; // Number of visible cards at a time
        
        function addCards() {
          const newCards = [];
          for (let i = 0; i < cardCount; i++) {
            const newCard = document.createElement('div');
            newCard.classList.add('milestone-card');
            newCard.innerText = `Milestone ${i + 1}`;
            newCards.push(newCard);
          }
        
          // Add new cards to container
          newCards.forEach(card => container.appendChild(card));
        }
        
        addCards();
        
    
        function proceedToNextPage() {
            const customAmountInput = document.getElementById('customAmountInput');
            if (selectedOption) {
                if (selectedOption.dataset.type === "custom" && !customAmountInput.value) {
                    alert("Please enter a custom amount.");
                    return;
                }
                window.location.href = "scanner.html"; // Replace with your actual scanner page URL
            } else {
                alert("Please select a donation option first.");
            }
        }
        const customAmountBox = document.getElementById('customAmountBox');
