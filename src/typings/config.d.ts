import { StringPath } from './coreutils';

export interface SassDefaultConfig {
    charset: boolean,
    sourceMap: boolean,
    sourceMapIncludeSources: boolean,
    style: string,
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
    charset?: boolean,
    sourceMap?: {
        generateFile?: boolean,
        includeSources?: boolean
    },
    style?: string,
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
export interface ResolvedSassConfig extends Omit<SassDefaultConfig, 'dest'> {}
