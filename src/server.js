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
    const path = require('path');
    const httpServer = require('http-server');
    
    // Default setting for server address
    const defaultAddress = {
        host: 'localhost',
        port: 4312
    };
    
    // Use host or IP address and port from input arguments.
    // If not specified, search for environment named HOST and PORT,
    // and if none all of above specified, use the default address instead.
    const address = {
        // Host address
        host: process.argv[2] || process.env.HOST || defaultAddress.host,
        // Port
        port: process.argv[3] || process.env.PORT || defaultAddress.port
    };
    
    // Run the server
    httpServer.createServer({
        // Refer to project's root directory
        root: path.resolve(__dirname, '..')
    }).listen(address.port, address.host, () => {
        console.log(`${process.platform.replace(
            process.platform.at(0), process.platform.at(0).toUpperCase()
        )} (${process.arch})`);
        console.info(`Server is running at 'http://${address.host}:${address.port}'`);
    });
})();
