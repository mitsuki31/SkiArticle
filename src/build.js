const path = require('path'),              // Path module
      os = require('os'),                  // OS module
      fs = require('fs'),                  // File System module
      sass = require('sass'),              // Sass module
      config = require('./utils/config');  // Config module (local)

// An object containing necessary paths
const dirpaths = {
    root: path.resolve(__dirname, '..'),             // Project root directory path
    scss: path.resolve(__dirname, 'scss'),           // Sass sources path
    config: path.resolve(__dirname, '..', 'config')  // Configurations path
}

// Build and compile specific Sass file and save it to specific file
// Please note, this function runs synchronously and will lead to blocking some processes
const buildSass = (infile, outfile, sassConfig, callback) => {
    // Resolve and fix the configuration, the configuration will be passed
    // to `sass.compile` arguments
    const resolvedSassConfig = config.resolve(
        "sass", sassConfig, (sassConfig === undefined)
    );
    
    // Compile the input Sass file
    const build = sass.compile(
        (path.isAbsolute(infile) ? infile : path.resolve(infile)),
        resolvedSassConfig  // Configuration settings
    );
    
    // I/O operations
    try {
        // Check for existence of parent directories
        // Let users create the directory manually using `fs.mkdir`
        const parentDir = path.dirname(outfile);
        if (!fs.existsSync(parentDir)) {
            throw new Error(`The parent directory is not exist: ${parentDir}`);
        }
        
        // Write the compiled CSS to the given output file synchronously
        fs.writeFileSync(path.resolve(outfile), build.css.concat(os.EOL));
    } catch (error) {
        callback(error);
    }
}


const _run_as_main = () => {
    const args = process.argv.slice(2);  // Get the command line arguments
    
    if (args.length > 0 && args[0].toLowerCase() === 'sass') {
        const sassFile = path.join(dirpaths.scss, 'main.scss'),
              outfile = path.join(dirpaths.root, 'public', 'assets', 'css', 'main.css'),
              parentDir = path.dirname(outfile);
        
        // Retrieve and parse the build configuration from 'build.json'
        const buildConfig = require(path.join(dirpaths.config, 'build.json'));
        
        // Check existence of the parent directory, create new directory if not exist
        if (!fs.existsSync(parentDir)) fs.mkdir(parentDir);
        
        buildSass(sassFile, outfile, buildConfig.sass, (err) => {
            if (err) console.error(err);
        });
    }
}


// Main driver
// Only run when the module is executed directly, not being imported as module
if (require.main === module) {
    _run_as_main();
}
