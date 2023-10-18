/**
 * This module handles server configuration and startup.
 *
 * <p>This module automatic configures and runs the server for the web
 * application. Users can customize the server configurations,
 * see the example.
 *
 * @example <caption>Example usage to run the server</caption>
 * # HOST and PORT arguments are optional
 * $ npm start [HOST] [PORT]
 *
 * # If `HOST` and `PORT` are not specified, the server will run with
 * # the default address: `http://localhost:4312`. Users can also customize
 * # the server settings by defining environment variables. For example:
 *
 * $ HOST="<your-ip-address>" PORT="<port>" npm start
 *
 * @module      server/server
 * @requires    module:utils/coreutils.clientPaths
 * @requires    module:path
 * @requires    module:express
 * @author      Ryuu Mitsuki
 * @copyright   2023 CV. DR2E
 * @since       0.1.0
 * @version     0.1
 */

const path = require("path"),
    express = require("express"),
    app = express();

const { clientPaths } = require("./../utils/coreutils");

/**
 * Default host and port address for the web application to run.
 *
 * @public
 * @namespace
 * @memberof module:server/server
 * @property {!string} host - A string representing the default host address.
 *                            Default is <code>'localhost'</code>.
 * @property {!number} port - A number representing the default port.
 *                            Default is <code>4312</code>.
 *
 * @author  Ryuu Mitsuki
 * @since   0.1.0
 * @version 0.1
 */
const defaultAddress = {
    /**
     * Default host address.
     * @inner
     * @default
     * @type {!string}
     */
    host: "localhost",
    /**
     * Default port.
     * @inner
     * @default
     * @type {!number}
     */
    port: 4312
};

/**
 * An object containing working directory paths used by both server-side
 * and client-side.
 *
 * @namespace
 * @property {!string} _root - Path that refers to project's root directory.
 * @property {!string} _public - Path that refers to public directory,
 *                               used by client-side.
 * @property {!string} _assets - Path that refers to assets directory,
 *                               used by client-side to search necessary
 *                               local resources.
 * @property {!string} _static - Path that refers to static directory,
 *                               used by client-side to search static
 *                               resources.
 *
 * @author  Ryuu Mitsuki
 * @since   0.1.0
 * @version 0.1
 * @deprecated Replaced by {@link module:utils/coreutils.clientPaths}.
 */
const workpath = {
    _root: path.resolve(__dirname, ".."),
    _public: path.resolve(__dirname, "..", "..", "public"),
    _assets: path.resolve(__dirname, "..", "..", "public", "assets"),
    _static: path.resolve(__dirname, "..", "..", "public", "static")
};

/**
 * Runs the server for the web application on specific address.
 *
 * <p>Users can customize the address by specifying host and
 * port either from command line arguments or environment
 * variables.
 *
 * @function
 * @name    run
 * @author  Ryuu Mitsuki
 * @since   0.1.0
 * @version 0.1
 */
(() => {
    // Use host or IP address and port from input arguments.
    // If not specified, search for HOST and PORT in environment variables.
    // And if none all of above specified, use the default address instead.
    const address = {
        // Host address
        host: process.argv[2] || process.env.HOST || defaultAddress.host,
        // Port
        port: process.argv[3] || process.env.PORT || defaultAddress.port
    };
    
    // Logging some requested stuff like URL, HTTP method, etc
    app.use((req, res, next) => {
        // Log the HTTP method, requested URL, and status code
        console.log(`[${req.method}] ${res.statusCode} --
            ${req.url === "/" ? "/{index}" : req.url}`);
        next();  // Continue to next middleware
    });
    
    // In this case, when users on root URL address, it will immediately
    // send neccessary stuff
    app.use("/", express.static(clientPaths.root, { index: "index.html" }));
    
    // Run the server
    app.listen(address.port, address.host, () => {
        console.log(`${process.platform.replace(
            process.platform.at(0), process.platform.at(0).toUpperCase()
        )} (${process.arch}) | NodeJS ${process.version}`);
        console.log(`Server is running at 'http://${address.host}:
            ${address.port}'\n`);
    });
})();
