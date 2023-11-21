/**
 * This file is the main driver or main JavaScript file to optimize and
 * enhance functionality of the web page. Additionally, it makes the web page
 * more robust, well structured, and interactive.
 *
 * @module    main
 * @author    Ryuu Mitsuki
 * @author    Nuryadani
 * @since     0.1.0
 * @version   0.18.5-prototype
 * @copyright CV. DR2E 2023
 * @license   MIT
 */

"use strict";

/**
 * An object that references to each elements inside the navigation bar,
 * including the button and the menu contents.
 *
 * @namespace
 * @type     {Object}
 * @property {Element} menu - The navigation bar menu element.
 * @property {Element} button - The navigation bar button element.
 * @property {function} isActive - A function that checks whether the navigation bar is active.
 *
 * @author   Ryuu Mitsuki
 * @author   Nuryadani
 * @since    0.1.0
 * @version  0.1.3-prototype
 */
const navbar = {
    /**
     * An object representing the element of navigation bar menu.
     * @inner
     * @type  {Element}
     */
    menu: document.getElementById("navbar-menu"),
    /**
     * An object representing the element of navigation bar button.
     * @inner
     * @type  {Element}
     */
    button: document.getElementById("navbar-button"),
    /**
     * Checks whether the navigation bar is active (opened).
     *
     * <p>The function will checks the class list of navigation bar menu,
     * if the class list contains 'active' class, it will returns <code>true</code>,
     * <code>false</code> otherwise.
     *
     * @inner
     * @function
     * @return {boolean} <code>true</code> if the navigation bar is active, <code>false</code> otherwise.
     *
     * @author  Ryuu Mitsuki
     * @since   0.1.0
     * @version 1.2
     */
    isActive: () => {
        return navbar.menu.classList.contains("active");
    }
};

/**
 * Activates or deactivates the navigation bar by toggling a class on specific elements.
 *
 * <p>This function is responsible for toggling the visibility of the navigation bar and
 * overlay on a web page. It achieves this by toggling the "active" class on specific elements,
 * allowing the navigation bar and overlay to appear or disappear dynamically.
 *
 * @function
 * @author  Ryuu Mitsuki
 * @author  Nuryadani
 * @since   0.1.0
 * @version 0.1.4
 */
const toggleNavBar = () => {
    // Toggle the 'active' class on several elements
    navbar.menu.classList.toggle("active");
    navbar.button.classList.toggle("active");
    document.querySelector(".overlay").classList.toggle("active");
};

// Print user's connection status
console.log(`INFO - Connection status: ${navigator.onLine ? "ONLINE" : "OFFLINE"}`);

// Toggle navigation menu on click event of navigation button
navbar.button.addEventListener("click", toggleNavBar);

// Listen for click event on every elements
window.addEventListener("click", (event) => {
    const overlay = document.querySelector(".overlay");
    
    /* These code below will close the navigation bar when users
     * click or touch the overlay layer with navigation menu
     * on its active mode (opened).
     */
    if (navbar.isActive() && event.target.isEqualNode(overlay)) {
        toggleNavBar();
    }
});

// Listen for keys press event (keyboard)
document.addEventListener("keydown", (event) => {
    // Close the navigation bar (if active) when users
    // press Escape key
    if (navbar.isActive() && event.key.startsWith("Esc")) {
        toggleNavBar();
    }
});


// Listen for click event on socials sub menu
document.querySelector('.nav-menu .menu-contents .menu__socials')
        .addEventListener('click', () => {
    const submenuSocials = document.querySelector('.nav-menu .menu-contents .submenu__socials');
    
    submenuSocials.classList.toggle('active');  // Toggle the 'active' class
});
