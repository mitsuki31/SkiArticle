/**
 * A string representing the directory path.
 * @global
 * @typedef {string} StringPath
 * @author  Ryuu Mitsuki
 * @since   0.1.0
 */
declare type StringPath = string;

declare interface ClientPaths {
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

declare interface ServerPaths {
    root: StringPath,
    server: StringPath,
    scss: StringPath,
    utils: StringPath,
    config: StringPath,
    build: StringPath
}

declare type LsFilesCallback = (
    error?: Error | null,
    entries?: Array<string> | null
) => void;

declare interface LsFilesOptions {
    match?: RegExp,
    exclude?: RegExp,
    baseName?: boolean
}
