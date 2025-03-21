// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const connectDB = require("./config/db");

// dotenv.config();
// connectDB();

// const app = express();
// app.use(express.json());
// app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
// app.use(cookieParser());

// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/users", require("./routes/userRoutes"));

// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// require("dotenv").config(); // Load .env variables
// const express = require("express");
// const connectDB = require("./config/db");

// const app = express();

// // Connect to MongoDB
// connectDB();

// app.listen(3000, () => console.log("Server running on port 3000"));

