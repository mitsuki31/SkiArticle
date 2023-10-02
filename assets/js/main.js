/**
 * This file is the main driver or main JavaScript file to
 * optimize and enhance functionality of the web page.
 * Additionally, it makes the web page more robust,
 * well structured, and user-friendly.
 * 
 * Copyright (c) 2023 CV. DR2E
 *
 * Version: 0.18-prototype, 2 October 2023
 * Authors: Ryuu Mitsuki, Nuryadani
 */

'use strict';

{
// Print user's connection status
console.log(`INFO - Connection status: ${navigator.onLine ? 'ONLINE' : 'OFFLINE'}`);

// Declare an object that references to navigation bar,
// including the button and its menu contents.
const navbar = {
    // -> Navigation menu
    menu: document.getElementById("navbar-menu"),
    // -> Navigation button
    button: document.getElementById("navbar-button"),
    // -> Is navigation bar active?
    isActive: document.getElementById("navbar-menu")
        .classList.contains('active')
};

// Overlay element
const overlay = document.querySelector('.overlay');

/**
 * This function is responsible for toggling the visibility
 * of the navigation bar and overlay on a web page.
 * It achieves this by toggling the "active" class on
 * specific elements, allowing the navigation bar and overlay
 * to appear or disappear dynamically.
 */
const toggleNavBar = () => {
    // Toggle the 'active' class in 'navbar-menu' and 'navbar-button'
    navbar.menu.classList.toggle("active");
    navbar.button.classList.toggle("active");

    // Toggle the 'active' class in 'overlay'
    overlay.classList.toggle("active");
};

// Toggle navigation menu on click event of navigation button
navbar.button.addEventListener("click", toggleNavBar);

// Listen for click event on entire elements
window.addEventListener("click", (event) => {
    /* These code below will close the navigation bar when users
     * click or touch the overlay layer with navigation menu
     * on its active mode (opened).
     */
    if (navbar.isActive && event.target.isEqualNode(overlay)) {
        toggleNavBar();
    }
});

// Listen to 'Escape' key pressed by users
document.addEventListener("keydown", (event) => {
    // Close the navigation bar (if active) when users
    // press Escape key
    if (navbar.isActive && event.key.startsWith("Esc")) { toggleNavBar();
    }
});

}  // End of code block
