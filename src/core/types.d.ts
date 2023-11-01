/**
 * A string representing the directory path.
 * @global
 * @typedef {string} StringPath
 * @author  Ryuu Mitsuki
 * @since   0.1.0
 */
export type StringPath = string;

export interface ClientPaths {
    root: StringPath,
    assets: {
        _this: StringPath,
        css: StringPath,
        js: StringPath,
        images: StringPath
    },
    _static: {
        _this: StringPath,
        css: StringPath
    }
}

export interface ServerPaths {
    root: StringPath,
    server: StringPath,
    scss: StringPath,
    utils: StringPath,
    config: StringPath,
    build: StringPath
}

export interface LsFilesOptions {
    match: RegExp,
    exclude: RegExp,
    baseName: boolean
}

export interface SassDefaultConfig {
    charset: boolean,
    sourceMap: boolean,
    sourceMapIncludeSources: boolean,
    style: "expanded" | "compressed",
    verbose: boolean
}

export interface DefaultConfig {
    sass: SassDefaultConfig,
    sassdoc: NonNullable<unknown>  // Currently just an empty object
}

/**
 * An object representing configuration data for Sass or SassDoc.
 * @global
 * @typedef {Object} SassConfig
 * @author  Ryuu Mitsuki
 * @since   0.1.0
 */
export interface SassConfig {
    dest?: StringPath,
    destination?: StringPath,
    charset?: boolean,
    sourceMap?: {
        generateFile?: boolean,
        includeSources?: boolean
    },
    style?: "expanded" | "compressed",
    verbose?: boolean
}

/**
 * An object representing resolved configuration data for Sass or SassDoc.
 * @global
 * @extends SassDefaultConfig
 * @typedef {Object} ResolvedSassConfig
 * @author  Ryuu Mitsuki
 * @since   0.1.0
 */
export interface ResolvedSassConfig extends SassDefaultConfig {}


export interface ServerAddress {
    host: string,
    port: number
}
