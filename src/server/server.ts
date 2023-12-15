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
 * $ HOST="<host>" PORT="<port>" npm start
 *
 * @module      server/server
 * @requires    module:utils/coreutils.clientPaths
 * @requires    module:utils/coreutils.isObject
 * @requires    module:setup.setup
 * @requires    module:express
 * @author      Ryuu Mitsuki
 * @since       0.1.0
 * @version     0.3
 * @copyright   2023 CV. DR2E
 * @license     MIT
 */

import * as express from 'express';
import * as util from 'util';

import { clientPaths, isObject } from '../utils/coreutils';
import setup from '../setup';

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
 * Configures and runs the Express server with the provided options.
 * If no options are provided, it uses default host and port values.
 *
 * <p>Users can customize the address by specifying host and
 * port either from command line arguments or environment
 * variables.
 *
 * @public
 * @function
 * @author   Ryuu Mitsuki
 * @since    0.1.0
 * @version  0.3
 */
function run(opts?: ServerOptions): void {
    let address: ServerAddress;
    if (isObject(opts) && Object.keys(opts).length) {
        // Use host or IP address and port from given options.
        // If not specified, use the default address instead.
        address = {
            // Host address
            host: opts.host! || defaultAddress.host,
            // Port
            port: opts.port! || defaultAddress.port
        };
    } else {
        address = defaultAddress;  // Copy
    }
    
    // Logging some requested stuff like URL, HTTP method, etc
    app.use(function (req: express.Request,
                      res: express.Response,
                      next: express.NextFunction): void {
        // Log the HTTP method, requested URL, and status code
        console.log(`[${req.method}] ${res.statusCode} -- ` +
            `${req.url === '/' ? '/{index}' : req.url}`);
        console.log('----------------------------------------');
        next();  // Continue to next middleware
    });
    
    // Serve the clients with all files within `public` directory
    app.use(express.static(
        clientPaths.root, { index: 'index.html' }
    ));
    
    // Run the server
    app.listen(address.port, address.host, function (): void {
        console.log(`${process.platform.replace(
            process.platform.at(0)!,
            process.platform.at(0)!.toUpperCase()
        )} (${process.arch}) | NodeJS ${process.version}`);
        console.log(`Server is running at 'http://${
                address.host}:${address.port}'\n`);
    });
}

/**
 * Prints the help message to the console output then exit the program.
 *
 * @public
 * @function
 * @author   Ryuu Mitsuki
 * @since    0.2.0
 * @version  1.0
 */
function printHelp(exit: boolean = true): void {
    console.log(`
Usage:
   $ npm start [-- [options]]
   $ node path/to/server.js [options]

Options:
   -n, --dry-run\t\tRun the setup, but not the server.
   --no-setup, --skip-setup\tSkip the setup then run the server.
   ?, --?\t\t\tPrint this help message.
`
    );
    
    if (exit) process.exit();
}


// Run as main module
if (require.main === module) {
    let args: Array<string> = process.argv.slice(2),
        dryRun: boolean = false,     // Dry run; execute setup but does not run the server
        skipSetup: boolean = false,  // Run the server but skip the setup
        needHelp: boolean = false;
    
    const dryRunArgs: Array<string> = ['-n', '--dry-run'],
          skipSetupArgs: Array<string> = ['--no-setup', '--skip-setup'],
          helpArgs: Array<string> = ['?', '--?'];
    
    // Filter the dry run option from arguments list
    args = args.filter(function (arg: string): boolean {
        if (helpArgs.includes(arg)) {
            needHelp = true;
            return false;
        }
        
        if (dryRunArgs.includes(arg)) {
            dryRun = true;  // Enable the dry run option
            return false;   // Exclude this argument from arguments list
        }
        
        if (skipSetupArgs.includes(arg)) {
            skipSetup = true;
            return false;
        }
        
        return true;  // Include other arguments
    });
    
    // Prioritize the help option
    if (needHelp) printHelp(true);
    /* no else-if here */
    if (dryRun) util.log('Dry run enabled.');
    
    const serverOpt: ServerOptions = {
        host: (args.length > 0) ? args[0] : process.env.HOST!,
        port: parseInt((args.length > 1) ? args[1] : process.env.PORT!)
    };
    
    if (skipSetup && !dryRun) {
        util.log('Skipping the server setup...\n');
        run(serverOpt);
    } else if (skipSetup && dryRun) {
        // Throw an error if both the skip setup and dry run specified
        throw new Error('Do not use both the skip setup and dry run option');
    } else {
        setup()
            .then(function (): void {
                // Run the server if the dry run option unspecified
                if (dryRun) return;
                run(serverOpt);
            })
            .catch(function (err: Error): void {
                console.error(err);
            });
    }
}
