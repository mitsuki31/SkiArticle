/**
 * This module handles server configuration and startup.
 *
 * <p>This module can configures and runs the server for the web application.
 * To start the server using <code>npm</code>, users can use the following command:
 *
 * <pre>
 *     # HOST and PORT arguments are optional
 *     $ npm start [HOST] [PORT]
 * </pre>
 *
 * <p>If <code>HOST</code> and <code>PORT</code> are not specified, the server
 * will run with the default address: 'http://localhost:4312'. Users can also customize
 * the server settings by defining environment variables. For example:
 *
 * <pre>
 *     $ HOST="<your-ip-address>" PORT="<port>" npm start
 * </pre>
 *
 * <p>Start the server using <code>node</code>:
 * <pre>
 *     # HOST and PORT arguments are optional
 *     $ node server/server.js [HOST] [PORT]
 * </pre>
 *
 * @module      server/server
 * @author      Ryuu Mitsuki
 * @copyright   CV. DR2E 2023
 * @since       0.1.0
 * @version     1.2
 */

/**
 * Default host and port address for the web application to run.
 *
 * @type     {Object}
 * @property {String} host - A string representing the host address. Default is <code>'localhost'</code>.
 * @property {Number} port - A number representing the port address. Default is <code>4312</code>.
 *
 * @author  Ryuu Mitsuki
 * @since   0.1.0
 */
const defaultAddress = {
    host: 'localhost',
    port: 4312
};

/**
 * An object containing working directory paths used by both server-side and client-side.
 *
 * @type     {Object}
 * @property {String} _root - Path that refers to project root directory.
 * @property {String} _public - Path that refers to public directory, used by client-side.
 * @property {String} _assets - Path that refers to assets directory, used by client-side to search necessary local resources.
 * @property {String} _static - Path that refers to static directory, used by client-side to search static resources.
 *
 * @author  Ryuu Mitsuki
 * @since   0.1.0
 */
const workpath = {
    _root: path.resolve(__dirname, '..'),
    _public: path.resolve(__dirname, '..', 'public'),
    _assets: path.resolve(__dirname, '..', 'public', 'assets'),
    _static: path.resolve(__dirname, '..', 'public', 'static')
};

/**
 * Runs the server for the web application on specific address.
 *
 * <p>Users can customize the address by specifying host and port address
 * either from command line arguments or environment variables. Here is the syntaces:
 * <pre>
 *     # Using arguments
 *     $ npm start [HOST] [PORT]
 *
 *     # Using environment variables
 *     $ HOST="<host>" PORT="<port>" npm start
 * </pre>
 *
 * @function
 * @name    run
 * @author  Ryuu Mitsuki
 * @since   0.1.0
 * @version 1.1
 */
(() => {
    const path = require('path'),
          express = require('express'),
          app = express();
    
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
        console.log(`[${req.method}] ${res.statusCode} -- ${req.url === '/' ? '/index' : req.url}`);
        next();  // Continue to next middleware
    });
    
    // Serve static files from the 'public' directory
    // In this case, when users on root URL address, it will immediately send neccessary stuff
    app.use('/', express.static(workpath._public, { index: 'index.html' }));
    
    // Run the server
    app.listen(address.port, address.host, () => {
        console.log(`${process.platform.replace(
            process.platform.at(0), process.platform.at(0).toUpperCase()
        )} (${process.arch}) | NodeJS ${process.version}`);
        console.log(`Server is running at 'http://${address.host}:${address.port}'\n`);
    });
})();
