/**
 * This file configures and runs the server for the web page.
 * To start the server using `npm`, you can use the following command:
 *
 *   $ npm start [HOST] [PORT]
 *
 * If HOST and PORT are not specified, the server will run with the
 * default address: 'http://localhost:4312'. You can also customize
 * the server settings by defining environment variables. For example:
 *
 *   $ HOST="<your-ip-address>" PORT="<port>" npm start
 *
 * @module      server
 * @description This module handles server configuration and startup.
 * @author      Ryuu Mitsuki
 */

(() => {
    const path = require('path'),
          express = require('express'),
          app = express();
    
    // Default setting for server address
    const defaultAddress = {
        host: 'localhost',
        port: 4312
    };
    
    // An object references to all working directories path
    const workpath = {
        _root: path.resolve(__dirname, '..'),
        _assets: path.resolve(__dirname, '..', 'assets'),
        _public: path.resolve(__dirname, '..', 'public'),
        _static: path.resolve(__dirname, '..', 'static')
    };
    
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
    // In this case, when users on root URL address, it will directly serves neccessary stuff
    app.use('/', express.static(workpath._public, { index: 'index.html' }));
    
    // Run the server
    app.listen(address.port, address.host, () => {
        console.log(`${process.platform.replace(
            process.platform.at(0), process.platform.at(0).toUpperCase()
        )} (${process.arch}) | NodeJS ${process.version}`);
        console.log(`Server is running at 'http://${address.host}:${address.port}'\n`);
    });
})();
