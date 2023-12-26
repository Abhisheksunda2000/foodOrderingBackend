const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const connectDB = require(__dirname + "/db.js");

app.use(express.json());
connectDB();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/", (req,res) => {
    res.send("Hello World!");
});

app.use("/api", require("../Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));

app.listen(port, () => {
    console.log(`server is started on port ${port}`);
})
