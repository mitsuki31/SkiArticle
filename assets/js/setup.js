/**
 * This JavaScript file will setting up all things to make
 * web page ready to use and users can interact with.
 * 
 * Copyright (c) 2023 CV. DR2E
 *
 * Version: 0.1.2-prototype, 2 October 2023
 * Authors: Ryuu Mitsuki, Nuryadani
 */

'use strict';

/* Execute when the DOM tree is already loaded (external assets still in loading state).
 * We avoid using `window.onload` to prevent potential issues.
 *
 * Additionally, we replace required URLs in the document
 * while it is in the loading state. This is done to ensure
 * that users with slower connections do not inadvertently
 * trigger URL requests before all resources (e.g., images) have loaded.
 */
document.addEventListener("DOMContentLoaded", async () => {
    // Path to the JSON file that contains all URLs required by webpage
    // The path relative from 'index.html' (project's root directory)
    const jsonFile = "./assets/json/global-urls.json";

    /* Get and parse the JSON file that contains the URLs
     * required for the web page.
     */
    await fetch(jsonFile)
        .then((response) => {
            // Throw an error if there is a response issue.
            if (!response.ok) {
                throw new Error(`HTTP fetch bad response: ${response.status}`);
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
                    if (element && element.nodeName === 'A') {
                        element.href = jsonData[key] || "#";
                    }
                }
            }

            console.info(`SUCCESS - ${totalElements} ${totalElements <= 1 ? 'URL' : 'URLs'} has been replaced.`);
        })
        .catch((error) => {
            console.error(`ERROR - Failed to fetch URLs: ${error.message}`);
        });
});
