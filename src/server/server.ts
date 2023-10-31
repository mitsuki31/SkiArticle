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
 * @requires    module:utils/coreutils.serverPaths
 * @requires    module:path
 * @requires    module:express
 * @author      Ryuu Mitsuki
 * @since       0.1.0
 * @version     0.2
 * @copyright   2023 CV. DR2E
 * @license     MIT
 */

import * as path from 'path';
import * as express from 'express';

import {
    serverPaths,
    clientPaths
} from '../utils/coreutils';

import { StringPath, ServerAddress } from '../core/types';

const app: express.Express = express();

/**
 * Default host and port address for the web application to run.
 *
 * @property {!string} host - A string representing the default host address.
 *                            Default is `'localhost'`.
 * @property {!number} port - A number representing the default port.
 *                            Default is `4312`.
 *
 * @public
 * @namespace
 * @memberof module:server/server
 * @author   Ryuu Mitsuki
 * @since    0.1.0
 * @version  0.2
 */
const defaultAddress: ServerAddress = {
    /**
     * Default host address.
     * @inner
     * @default
     * @type {!string}
     */
    host: 'localhost',
    /**
     * Default port.
     * @inner
     * @default
     * @type {!number}
     */
    port: 4312
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
 * @version 0.2
 */
(function (
    opts: {
        host?: string | null,
        port?: number | null
    }
): void {
    // Use host or IP address and port from input arguments.
    // If not specified, use the default address instead.
    let address: ServerAddress;
    if (Object.keys(opts).length > 0) {
        address = {
            // Host address
            host: opts.host || defaultAddress.host,
            // Port
            port: opts.port || defaultAddress.port
        };
    } else {
        address = defaultAddress;  // Copy
    }
    
    // Path reference to the compiled main CSS file
    // ==> .../build/css/main.css
    const mainCss: StringPath =
        path.join(serverPaths.build, 'css', 'main.css');
    
    // Logging some requested stuff like URL, HTTP method, etc
    app.use(function (req: any, res: any, next: Function): void {
        // Log the HTTP method, requested URL, and status code
        console.log(`[${req.method}] ${res.statusCode} -- ` +
            `${req.url === '/' ? '/{index}' : req.url}`);
        console.log('----------------------------------------');
        next();  // Continue to next middleware
    });
    
    // In this case, when users on root URL address, it will immediately
    // send neccessary stuff
    app.use('/', express.static(clientPaths.root, { index: 'index.html' }));
    
    // Listen the request to get the main CSS from client-side
    app.get('/assets/css/main.css', function (req: any, res: any): void {
        // Send the requested file
        res.sendFile(mainCss);
    });
    
    // Run the server
    app.listen(address.port, address.host, function (): void {
        console.log(`${process.platform.replace(
            process.platform.at(0), process.platform.at(0).toUpperCase()
        )} (${process.arch}) | NodeJS ${process.version}`);
        console.log(
            `Server is running at 'http://${address.host}:${address.port}'\n`
        );
    });
})((function (): {
    host?: string | null,
    port?: number | null
} {
    const args: Array<string> = process.argv.slice(2);
    let host: string,
        port: number;
    
    host = args.length > 0 ? args[0] : process.env.HOST;
    port = Number.parseInt(args.length > 1 ? args[1] : process.env.PORT);
    
    return {
        host: host || null,
        port: port || null
    };
})());
