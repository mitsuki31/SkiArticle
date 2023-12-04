# <a name="top"/> Ski Article

<!-- Badges -->
[![Node.js Version](https://img.shields.io/badge/Node.js-16.20.2-brightgreen?logo=node.js)](https://nodejs.org/blog/release/v16.20.2)
[![ESLint](https://github.com/mitsuki31/SkiArticle/actions/workflows/eslint.yml/badge.svg)](https://github.com/mitsuki31/SkiArticle/actions/workflows/eslint.yml)
[![Test](https://github.com/mitsuki31/SkiArticle/actions/workflows/test.yml/badge.svg)](https://github.com/mitsuki31/SkiArticle/actions/workflows/test.yml)

[![Indonesian README](https://img.shields.io/badge/indonesian_readme-white?style=for-the-badge&logo=readme&logoColor=white&labelColor=ff2222)](./README_ID.md)

<br/>

> [!WARNING]
> 
> We have deployed and published the website; however, it remains in development. We are currently attempting to make this web-based article more responsive and suitable
> for mobile devices as well as desktop computers. Please [let us know](https:/github.com/mitsuki31/SkiArticle/issues/new) if you have any interesting ideas for the article page
> or if you have any issues with the site. If you are a student at Sukamandi Vocational High School, you might be able to meet us there.

This project is part of our school group project, which is composed by a group of 5 people from the same class (11th grade **Computer and Network Engineering**) called **CV. DR2E**.

A web-based article about [Sukamandi Vocational High School][ski-instagram].  
The project is owned by **CV. DR2E** and under the terms of an open source license ([**&ldquo;MIT License&rdquo;**][mit-license]), developed by two people from the group, [**Ryuu Mitsuki**][mitsuki31] and **Nuryadani**.
It was authored by [**Ryuu Mitsuki**][mitsuki31] and assisted by **Nuryadani** for the design part and articles writing.

The organization is comprised of:

- **Dhefa Gusni A.** (_a.k.a._ [**Ryuu Mitsuki**][mitsuki31])
- **Nuryadani**
- **Elga Dera D.**
- **Ryan Prasetyo**
- [**Rio Anandang J.**](https://instagram.com/yhoanandang)

The making of this project was also directed by Indra Baskara ([@indrabaskara10][baskara-instragram]), as our teacher, and our friends who supported us in making this project.

### List of Contents

- [🚧 Development Usage](#development-usage)
  - [🔑 `npm` Commands](#npm-commands)
  - [🧩 Install Necessary Dependencies](#install-necessary-dependencies)
  - [🪄 Build the Project](#build-the-project)
  - [⚡ Run the Server](#run-the-server)
    - [🪛 Setting Up the Server](#setting-up-the-server)
  - [🧪 Test](#test)
- [License](#license)

## <a name="development-usage"/> 🚧 Development Usage

> [!IMPORTANT]
> 
> **FOR DEVELOPMENT USE ONLY!** Please look at prerequisites below before proceed to developing and setting up the project.
> 
> **Prerequisites:**  
> - Windows 8 (Recommended: Windows 10)
>   > If you're using Unix-like system, consider to update the operating system to the latest one.
> - [Git Windows](https://git-scm.com/download/win) (Windows only)
> - [Node.js](nodejs-homepage) (Min. version 16.20.2)

### <a name="npm-commands"/> 🔑 `npm` Commands

| Name | Description | Requires Command |
| ---- | ----------- | -------- |
| `start` | Starts the server. Before starting the server, it will search the main CSS file in 'build' directory and then copy to the client-side. If no arguments provided, the server will run at `localhost`. See '[Setting Up the Server](#setting-up-the-server)'. | _None_ |
| `start:dry` | Only searches and copies the main CSS file, and does not runs the server. Useful for debugging. | _None_ |
| `build` | Transpiles all TypeScript files, and then compiles all SCSS files. All output files are stored in 'build' directory. | `build:js`, `build:css` |
| `build:js` | Transpiles all TypeScript files and stores all outputs in 'build' directory. | _None_ |
| `build:css` | Compiles all SCSS file and stores all outputs in 'build' directory. | _None_ |
| `build:docs` | Builds and generates [JSDoc](https://jsdoc.app) documentation. All outputs stored in 'docs' directory. | _None_ |
| `lint` | Invokes the [ESLint][eslint] linter. | _None_ |
| `lint:fix` | Invokes the [ESLint][eslint] linter and then fix all errors and warnings if fixable. | _None_ |
| `lint:ci` | Invokes the [ESLint][eslint] linter but use cache to speed up linting. | _None_ |
| `test` | Runs the test by invoking [Jest][jest]. All tests are written in Jest and TypeScript. | _None_ |

### <a name="install-necessary-dependencies"/> 🧩 Install Necessary Dependencies
  ```bash
  # Make sure your NODE_ENV environment are set to 'development'
  NODE_ENV="development" npm install
  ```

### <a name="build-the-project"/> 🪄 Build the Project

  ```bash
  npm run build
  ```
  > [!NOTE]
  > 
  > This command will transpiles all TypeScript files in 'src' directory and then
  > compiles SCSS files. All of them will be saved in 'build' directory.

### <a name="run-the-server"/> ⚡ Run the Server

  ```bash
  # Not specifying any arguments would run the server
  # on localhost with default port.
  npm start
  ```

After performing the above steps correctly, the server will run at the specified URL address (this URL address will appear on the terminal screen after running the server). Open a browser and go to the given address to view the web page.

#### <a name="setting-up-the-server"/> 🪛 Setting Up the Server

You can also change the host address and port as needed.

- Using command-line arguments

  ```bash
  # The host address in the third argument,
  # while the port after it
  npm start <host> <port>
  ```

- Using environment variables

  ```bash
  HOST="<host>" PORT="<port>" npm start
  ```
  > The names of the variables should be the same as the example above,
  > i.e. `HOST` to indicate the host address and `PORT` to indicate the port.

For example, let's say we want to run the server with IP with address of `172.15.2.120`, and `7800` as port.

```bash
npm start 172.15.2.120 7800
# ...
# Server is running at 'http://172.15.2.120:7800'
```

> It's equivalent with this command:
> ```bash
> HOST=172.15.2.120 PORT=7800 npm start
> ```

### <a name="test"/> 🧪 Test

Tests are written in [Jest][jest].

```bash
npm test
```

## <a name="license"/> License

Licensed under the [MIT License][mit-license]. For more details about the license, see the [LICENSE](./LICENSE) file.

[↑ Go to the top](#top)

<!-- Links -->
[mitsuki31]: https://github.com/mitsuki31
[mit-license]: https://opensource.org/license/mit
[ski-instagram]: https://instagram.com/smksukamandi.72
[baskara-instragram]: https://instagram.com/indrabaskara10
[nodejs-homepage]: https://nodejs.org
[jest]: https://jestjs.io
[eslint]: https://eslint.org
