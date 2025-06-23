// src/server.js
import app from "./src/app.js";
import appConfig from "./src/config/app.config.js";
import connectToDB from "./src/config/database.config.js";

const PORT = appConfig.app.port;
const ENV = appConfig.app.environment;

const startServer = async () => {
  try {
    // Sync database
    await connectToDB();
    console.log(`📦 Database synchronized in ${ENV} mode`);

    // Start server
    app.listen(PORT, () => {
      console.log(`
    => Server running in ${ENV} mode
    => API listening on port ${PORT}
    => API prefix: ${appConfig.api.prefix}
    => API BASE_URL: http://localhost:8181${appConfig.api.prefix}
      `);
    });
  } catch (error) {
    console.error("❌ Error starting server:", error);
    process.exit(1);
  }
};

// Handle unhandled rejections
process.on("unhandledRejection", (err) => {
  console.error("❌ UNHANDLED REJECTION! Shutting down...");
  console.error(err);
  process.exit(1);
});

startServer();
