/**
 * Copyright (c) 2023 CV. DR2E
 *
 * Version: 1.15, 25 September 2023
 * Authors: Ryuu Mitsuki, Nuryadani
 */
 

/* Execute when the document is in the loading state.
 * We avoid using `window.onload` to prevent potential issues.
 *
 * Additionally, we replace required URLs in the document
 * while it is in the loading state. This is done to ensure
 * that users with slower connections do not inadvertently
 * trigger URL requests before all resources (e.g., images) have loaded.
 */
if (document.readyState === "loading") {
    console.info(`INFO - Document status: ${document.readyState}`);

    // Define the JSON file containing global URLs
    const jsonFile = "assets/json/global-urls.json";

    // Listen for the "DOMContentLoaded" event to safely replace URLs
    document.addEventListener("DOMContentLoaded", () => {
        console.info(`INFO - Document status: ${document.readyState}`);

        /* Get and parse the JSON file that contains the URLs
         * required for the web page.
         */
        fetch(jsonFile)
            .then((response) => {
                // Throw an error if there is a response issue.
                console.info(`INFO - Response OK: ${response.ok}`);
                if (!response.ok) {
                    throw new Error("ERROR - Network response was not OK!");
                }

                console.info("SUCCESS - Retrieved data from the JSON file.");
                return response.json();
            })
            .then((jsonData) => {
                // Extract keys from JSON data
                const jsonKeys = Object.keys(jsonData);
                const prefix = "url-";  // Prefix for ID name

                // Using loop to replace URLs within ID with prefix "url-"
                for (const key of jsonKeys) {
                    const element = document.getElementById(prefix.concat(key));

                    // Check if the element with the constructed ID exists
                    if (element && element.nodeName.toLowerCase() === "a") {
                        // Replace the URL
                        element.href = jsonData[key];
                    }
                }

                console.info("SUCCESS - All URLs has been replaced.");
            })
            .catch((error) => {
                console.error(`ERROR - ${error}`);
            })
    }, false);
}

