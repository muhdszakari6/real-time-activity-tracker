# real-time-activity-tracker

# Steps to run

## Installation

After cloning, change directory to client and run npm install.

```bash
cd client
npm i
```

From the root of the project, change directory to server and run npm install.

```bash
cd server
npm i
```

Run both the client and server app concurrently to see the app in action

To start the client app, run this command in the client directory:

```bash
npm run dev
```

To start the server app, run this command in the client directory:

```bash
node index.js
```

To run test on the client, move to the client directory and run

```bash
npm run test
```

## Assumptions

- A feature to allow users create new activities will be a nice to have
- New Activities should be at the top of the list
- Showing a message to let users know when there are no activities

## Improvements

- Add an ErrorBoundary component
- Implement a better user experience
- Use Vitest to test instead of jest
- Write more test cases
- Let users know when they are connected/disconnected to the socket
