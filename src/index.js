require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./middleware/connectDB");
const PORT = process.env.PORT || 3050;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/users", require("./routes/userRoutes"));

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

startServer();
