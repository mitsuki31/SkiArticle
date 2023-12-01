/**
 * This module will settings up everything to make the web page ready to use
 * and users can interact with.
 *
 * <p>Everything here runs automatically by relying on several conditions
 * in some objects related to the web page (e.g. DOM tree).
 *
 * @module    setup
 * @author    Ryuu Mitsuki
 * @author    Nuryadani
 * @since     0.1.0
 * @version   0.1.0
 * @copyright 2023 CV. DR2E
 * @license   MIT
 */

"use strict";

/**
 * This method replaces all specific URLs immediately after the DOM tree has
 * been fully loaded.
 *
 * <p>Automatically execute and perform actions when the DOM tree is already
 * loaded (external assets still in loading state). We avoid using <code>window.onload</code>
 * to prevent potential issues. Additionally, we replace required URLs in the document
 * while it is in the loading state. This is done to ensure that users with slower connections
 * do not inadvertently trigger URL requests before all resources (e.g., images) have loaded.
 *
 * <p><b>Note:</b>
 * If there is some errors occurred and the method has failed to runs the actions,
 * the errors trace will be printed to console logs.
 *
 * @function
 * @async
 * @name     urlReplacer
 * @author   Ryuu Mitsuki
 * @author   Nuryadani
 * @since    0.1.0
 * @version  0.1.3-prototype
 */
document.addEventListener("DOMContentLoaded", async () => {
    /**
     * Path to the JSON file that contains all URLs required by the web page.
     *
     * @global
     * @default
     * @readonly
     * @type     {String}
     * @since    0.1.0
     */
    const jsonFile = "./assets/json/global-urls.json";
    
    /* Get and parse the JSON file that contains the URLs
     * required for the web page.
     */
    await fetch(jsonFile)
        .then((response) => {
            // Throw an error if there is a response issue.
            if (!response.ok) {
                // Reject the process if the response is not OK
                return Promise.reject(
                    new Error(`HTTP fetch bad response: ${response.status}`));
            }
            
            return Promise.resolve(response.json());
        })
        .then((jsonData) => {
            // Extract keys from JSON data
            const jsonKeys = Object.keys(jsonData);
            const prefix = "dr2e--";  // Prefix for classes' name
            let totalElements = 0;
            
            // Using 'for' loop to replace all URLs
            for (const key of jsonKeys) {
                // This variable will be a list, not a single HTML object
                const elements =
                    document.getElementsByClassName(prefix.concat(key));
                totalElements += elements.length;
                
                for (const element of elements) {
                    if (element && element.nodeName === "A") {
                        element.href = jsonData[key] || "#";
                    }
                }
                
                // Remove the class after patched the URL
                for (const element of elements) {
                    // This if statement protect misbehave during removal
                    if (element.classList.contains(prefix.concat(key))) {
                        element.classList.remove(prefix.concat(key));
                    }
                }
            }
            
            console.info(
                `SUCCESS - ${totalElements} ${
                    totalElements <= 1 ? "URL" : "URLs"} has been replaced.`);
        })
        .catch((error) => {
            console.error(`ERROR - Failed to fetch URLs: ${error.message}`);
            console.error(error);  // Trace the occured error for debugging
        });
}, {
    // Remove the event listener after executed once
    once: true
});
