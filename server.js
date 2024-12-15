require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const auth = require("./middleware/auth");
const cors = require("cors");
const path=require("path");
const app = express();
const port = process.env.PORT;

connectDB();
const _dirname=path.resolve();
// Middleware
app.use(express.json());
const corsOptions={
  origin:"https://taskmanager2-vkzk.onrender.com",
  credentials:true
}
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// API
app.use("/api/users", require("./routes/users/usersRoutes"));
app.use("/api/tasks", auth, require("./routes/tasks/tasksRoutes"));

app.use(express.static(path.join(_dirname,"/client/build")));
app.get("*",(req,res)=>{
  res.sendFile(path.resolve(_dirname,"client","build","index.html"))
})
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
