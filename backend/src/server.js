import app from "./app.js";
import connectDB from "./config/db.js";
import { env } from "./config/env.js";

const startServer = async () => {
  try {
    // Connect Database
    await connectDB();

    // Start Express Server
    app.listen(env.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${env.PORT}`);
    });

  } catch (error) {
    console.error("❌ Failed to start server");
    console.error(error.message);
    process.exit(1);
  }
};

startServer();