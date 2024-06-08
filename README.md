# Learn Node.js Chat Application

This application began as a follow along from the LinkedIn Learning course *Learning Node.js*. It implements a simple web chat application that can support multiple clients
leveraging Node.js, Express, Socket.io, and more to provide a fairly robust backend complete with Web Sockets for a seamless user experience.

## Getting Started
1. Clone the repository
2. Open a terminal or command line to the root directory `chat-app/`
3. Run `npm install` to load in all dependencies
4. Run `npm run start-watch` to run with nodemon picking up changes on save OR run `npm run start` to simply start the server

## Code Organization

Due to the application being fairly lightweight, the frontend lives in 
 - [`index.html`](https://github.com/nuneytoon/chat-app/blob/342f235eafb86e0af73465962797a503af42f54a/index.html): inline script tags using JQuery and Bootstrap keep the code minimal

The backend lives in a single file as well
- [`server.js`](https://github.com/nuneytoon/chat-app/blob/342f235eafb86e0af73465962797a503af42f54a/server.js): uses the majority of the dependencies within the application to set up a couple of endpoints as well as managing web socket connections through Socket.io

Other files include:
- `.gitignore`
- `package.json`
- `package-lock.json`
