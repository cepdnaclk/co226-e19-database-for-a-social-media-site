const { Server } = require("socket.io");

// Store namespaces and socket instances
const namespaces = {};

// Initialize Socket.IO server
const initSocketIO = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "Authorization",
      ],
      allowedMethods: ["GET", "POST", "PUT", "DELETE"],
    },
  });

  // Define namespaces and configure events
  namespaces.post = io.of("/post");
  // Add more namespaces if needed

  // Set up event handling for each namespace
  namespaces.post.on("connection", (socket) => {
    console.log(`A user connected to /post namespace`);

    // Handle Socket.IO events specific to the /post namespace
    // socket.on('event', (data) => { ... });

    socket.on("disconnect", () => {
      console.log(`A user disconnected from /post namespace`);
    });
  });

  // Set up event handling for other namespaces if needed

  return io;
};

// Get a specific namespace's socket instance
const getSocketNamespace = (namespace) => {
  if (namespaces[namespace]) {
    return namespaces[namespace];
  }
  return null;
};

module.exports = {
  initSocketIO,
  getSocketNamespace,
};
