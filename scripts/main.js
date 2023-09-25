/**
 * Copyright (c) 2023 CV. DR2E
 *
 * Version: 1.0, 25 September 2023
 * Authors: Ryuu Mitsuki, Nuryadani
 */


// Execute immediately when the document has been loaded
window.onload = (() => {
    /* Get and parse the JSON file that contains the URLs
     * required for the web page.
     */
    fetch("assets/json/global-urls.json")
        .then((response) => {
            // Throw an error if there is a response issue.
            console.info(`INFO - Response OK: ${response.ok}`);
            if (!response.ok) {
                throw new Error("ERROR - Network response was not OK!");
            }

            console.info("SUCCESS - 200 - Retrieved data from the JSON file.");
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

            console.info("SUCCESS - 200 - All URLs has been replaced.");
        })
        .catch((error) => {
            console.error(`ERROR - ${error}`);
        })
})

