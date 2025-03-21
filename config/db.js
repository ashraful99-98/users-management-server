// const mongoose = require("mongoose");

// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             useCreateIndex: true,
//         });
//         console.log("MongoDB Connected");
//     } catch (error) {
//         console.error("MongoDB Connection Failed:", error);
//         process.exit(1);
//     }
// };

// module.exports = connectDB;


// require("dotenv").config();
// const mongoose = require("mongoose");

// mongoose.set("debug", true);

// const dbUrl = process.env.DB_URL || "";

// const connectDB = async () => {
//     try {
//         await mongoose.connect(dbUrl).then((data) => {
//             console.log(`Database connected successfully with ${data.connection.host}`);
//         });
//     } catch (error) {
//         console.log(error.message);
//         // setTimeout(connectDB, 5000);
//         // Retry connection after 5 seconds
//     }
// };

// module.exports = connectDB;

