/**
 * Copyright (c) 2023 CV. DR2E
 *
 * Version: 0.16-prototype, 30 September 2023
 * Authors: Ryuu Mitsuki, Nuryadani
 */

const navbarMenu = document.getElementById("navbar-menu");
const navbarButton = document.getElementById("navbar-button");
const overlay = document.querySelector('.overlay');

// For checking the user's connection status
const isOnline = navigator.onLine;

console.log(`INFO - Connection status: ${isOnline ? 'ONLINE' : 'OFFLINE'}`);

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
    // Toggle the 'active' class in 'navbar-menu'
    navbarMenu.classList.toggle("active");
    navbarButton.classList.toggle("active");

    // Toggle the 'active' class in 'overlay'
    overlay.classList.toggle("active");
});


/* Execute when the document is in the loading state.
 * We avoid using `window.onload` to prevent potential issues.
 *
 * Additionally, we replace required URLs in the document
 * while it is in the loading state. This is done to ensure
 * that users with slower connections do not inadvertently
 * trigger URL requests before all resources (e.g., images) have loaded.
 */
if (document.readyState === "loading") {
    // Define the JSON file containing global URLs
    const jsonFile = "./assets/json/global-urls.json";

    // Listen for the "DOMContentLoaded" event to safely replace URLs
    document.addEventListener("DOMContentLoaded", () => {
        /* Get and parse the JSON file that contains the URLs
         * required for the web page.
         */
        fetch(jsonFile)
            .then((response) => {
                // Throw an error if there is a response issue.
                if (!response.ok) {
                    throw new Error("Network response was not OK!");
                }

                return response.json();
            })
            .then((jsonData) => {
                // Extract keys from JSON data
                const jsonKeys = Object.keys(jsonData);
                const prefix = "dr2e--";  // Prefix for classes' name
                let totalElements = 0;

                // Using 'for' loop to replace all URLs
                for (const key of jsonKeys) {
                    // This variable will be a list, not a single HTML object
                    const elements = document.getElementsByClassName(prefix.concat(key));
                    totalElements += elements.length;

                    for (const element of elements) {
                        if (element &&
                                element.nodeName.toLowerCase() === 'a') {
                            element.href = jsonData[key] || "#";
                        }
                    }
                }

                console.info(`SUCCESS - ${totalElements} ${totalElements === 1 ? 'URL' : 'URLs'} has been replaced.`);
            })
            .catch((error) => {
                console.error(`ERROR - ${error}`);
            })
    }, false);
}
