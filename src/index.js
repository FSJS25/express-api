require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./middleware/connectDB");
const axios = require("axios");
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

async function fetchISSData() {
  try {
    const response = await axios.get("http://api.open-notify.org/iss-now.json");
    console.log("ISS Data:", response.data);
  } catch (error) {
    console.error("Error fetching ISS data:", error);
  }
}

setInterval(fetchISSData, 1 * 60 * 1000);
