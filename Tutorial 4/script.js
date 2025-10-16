// ============================================
// TUTORIAL 4: SIMPLE JAVASCRIPT INTERACTIONS
// Three basic steps to understand JavaScript
// ============================================

// Wait for the page to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Tutorial 4: Page loaded, ready to learn JavaScript!');
    
    // ============================================
    // STEP 1: BOOLEAN - Click to Change Color
    // ============================================
    
    // Goal: When user clicks button, box turns blue or gray
    
    // Step 1: Find the button
    // Hint: Use document.querySelector('#color-button')
    
    // Step 2: Find the box
    // Hint: Use document.querySelector('#color-box')
    
    // Step 3: Add a click event listener to the button
    // Hint: Use addEventListener('click', function() { })
    
    // Step 4: Inside the click function, toggle the 'blue' class on the box
    // Hint: Use classList.toggle('blue')
    
    // YOUR CODE HERE:

    const ColorButton = document.querySelector('#color-button');
    const ColorBox = document.querySelector('#color-box');
    ColorButton.addEventListener('click', function(){
        ColorBox.classList.toggle('blue');
    })

    
    
    
    // ============================================
    // STEP 2: STRING - Click to Change Text
    // ============================================
    
    // Goal: When user clicks button, text changes between "Hello there!" and "Goodbye!"
    
    // Step 1: Find the text button
    // Hint: Use document.querySelector('#text-button')
    
    // Step 2: Find the greeting text
    // Hint: Use document.querySelector('#greeting-text')
    
    // Step 3: Add a click event listener to the button
    // Hint: Use addEventListener('click', function() { })
    
    // Step 4: Inside the click function, check current text and change it
    // Hint: Use textContent to read and change text
    // If text is "Hello there!", change to "Goodbye!"
    // If text is "Goodbye!", change to "Hello there!"
    
    // YOUR CODE HERE:
    const TextButton = document.querySelector('#text-button');
    const GreetingText = document.querySelector('#greeting-text');
    TextButton.addEventListener('click', function() { 
        const CurrentText = GreetingText.textContent;
        if (CurrentText == 'Hello there!')
            GreetingText.textContent = 'Goodbye!';
        else
            GreetingText.textContent = "Hello there!";
    });
    

    
    
    
    // ============================================
    // STEP 3: NUMBER/INPUT - Type to Display
    // ============================================
    
    // Goal: When user types in the input box, show that number below
    
    // Step 1: Find the number input
    // Hint: Use document.querySelector('#number-input')
    
    // Step 2: Find the display area
    // Hint: Use document.querySelector('#number-display')
    
    // Step 3: Add an input event listener (fires as user types)
    // Hint: Use addEventListener('input', function() { })
    
    // Step 4: Inside the input function, get the value and display it
    // Hint: Use input.value to get what user typed
    // Hint: Use textContent to show it in the display area
    
    // YOUR CODE HERE:

    const NumberInput = document.querySelector('#number-input');
    const NumberDisplay = document.querySelector('#number-display');
    NumberInput.addEventListener('input', function() { 
        const UserValue = NumberInput.value;
        NumberDisplay.textContent = UserValue;

    });
    
    
    
    
});

// ============================================
// HELPFUL FUNCTIONS FOR TESTING
// ============================================

// Check what's currently happening
function checkStatus() {
    const box = document.querySelector('#color-box');
    const greeting = document.querySelector('#greeting-text');
    const input = document.querySelector('#number-input');
    const display = document.querySelector('#number-display');
    
    console.log('=== Current Status ===');
    console.log('Box is blue:', box.classList.contains('blue'));
    console.log('Greeting text:', greeting.textContent);
    console.log('Input value:', input.value);
    console.log('Display text:', display.textContent);
    console.log('=====================');
}

// Reset everything
function resetAll() {
    const box = document.querySelector('#color-box');
    const greeting = document.querySelector('#greeting-text');
    const input = document.querySelector('#number-input');
    const display = document.querySelector('#number-display');
    
    box.classList.remove('blue');
    greeting.textContent = 'Hello there!';
    input.value = '';
    display.textContent = 'Your number will appear here';
    
    console.log('Everything reset!');
}

// Call these in the browser console:
// checkStatus() - see what's happening
// resetAll() - reset everything