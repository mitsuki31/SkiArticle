/**
 * Copyright (c) 2023 CV. DR2E
 *
 * Version: 0.17-prototype, 1 October 2023
 * Authors: Ryuu Mitsuki, Nuryadani
 */

const navbarMenu = document.getElementById("navbar-menu");
const navbarButton = document.getElementById("navbar-button");
const overlay = document.querySelector('.overlay');

console.log(`INFO - Connection status: ${navigator.onLine ? 'ONLINE' : 'OFFLINE'}`);

// Wait for click event on entire elements
window.addEventListener("click", (event) => {
    /* These code below will close the navigation bar when users
     * click or touch the overlay layer
     */
    if (navbarMenu.classList.contains("active") && event.target.isEqualNode(overlay)) {
        // Toggle the 'active' class in 'navbar-menu'
        navbarMenu.classList.toggle("active");
        navbarButton.classList.toggle("active");

        // Toggle the 'active' class in 'overlay'
        overlay.classList.toggle("active");
    }
});

// Toggle navigation menu on click event of navigation button
navbarButton.addEventListener("click", () => {
    // Toggle the 'active' class in 'navbar-menu' and 'navbar-button'
    navbarMenu.classList.toggle("active");
    navbarButton.classList.toggle("active");

    // Toggle the 'active' class in 'overlay'
    overlay.classList.toggle("active");
});
