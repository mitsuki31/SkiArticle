# Ski Article

> **Warning**  
> This project is still under development.

This project is part of our school group project, which is composed by a group of 5 people from the same class (11th grade Computer and Network Engineering) called **CV. DR2E**.

A web-based article about [Sukamandi Vocational High School][ski-instagram].  
The project is owned by **CV. DR2E** and under the terms of an open source license ([**"MIT License"**][mit-license]), developed by two people from the organization, [**Ryuu Mitsuki**][mitsuki31] and **Nuryadani**.
It was authored by [**Ryuu Mitsuki**][mitsuki31] and assisted by **Nuryadani** for the design part.

The organization is comprised of:

- **Dhefa Gusni A.** (_also known as_, [**Ryuu Mitsuki**][mitsuki31])
- **Nuryadani**
- **Elga Dera D.**
- **Ryan Prasetyo**
- **Rio Anadang J.**

The making of this project was also assisted by Indra Baskara ([@indrabaskara10][baskara-instragram]), as our teacher, and our friends who supported us in making this project.

## Usage

> **Important**  
> Before using and setting up this project, it is recommended to install [NodeJS][nodejs-homepage] (min. version 20.2.0) first.

- Install necessary dependencies
  ```bash
  npm install
  ```

- Build and compile the SCSS files
  ```bash
  npm run build
  ```

- Run the server
  ```bash
  npm start
  
  # Or you can do it manually
  node server/server.js
  ```

After performing the above steps correctly, the server will run at the specified URL address (this URL address will appear on the terminal screen after running the server). Open a browser and go to the given address to view the web page.

You can also change the host address and port as needed.

- Using arguments
  ```bash
  # The host address in the third argument,
  # while the port after it
  npm start <ip-address> <port>
  ```

- Using environment variables
  ```bash
  HOST="<ip-address>" PORT="<port>" npm start
  ```
  > **Note**  
  > The names of the variables should be the same as the example above,
  > i.e. `HOST` to indicate the host address and `PORT` to indicate the port.

## License

Licensed under the [MIT License][mit-license]. For more details about the license, see the [LICENSE](./LICENSE) file.


<!-- Links -->
[mitsuki31]: https://github.com/mitsuki31
[mit-license]: https://opensource.org/license/mit
[ski-instagram]: https://instagram.com/smksukamandi.72
[baskara-instragram]: https://instagram.com/indrabaskara10
[nodejs-homepage]: https://nodejs.org
