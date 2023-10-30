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
    sassdoc: {}  // Currently just an empty object
}

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

export interface ResolvedSassConfig extends SassDefaultConfig {}
