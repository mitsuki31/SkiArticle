declare interface ServerAddress {
    host: string,
    port: number
}

/**
 * Configuration options for the Express server.
 *
 * @typedef  {Object} ServerOptions
 * @property {string|null} [host]
 *           The host address to bind the server to.
 * @property {number} [port]
 *           The port number to listen for incoming requests.
 *
 * @author   Ryuu Mitsuki
 * @since    0.1.0
 */
declare interface ServerOptions {
    /**
     * The host address to bind the server to. If not provided, defaults to `null`.
     */
    host?: string | null,
    /**
     * The port number to listen for incoming requests. If not provided, defaults to `undefined`.
     */
    port?: number
}
