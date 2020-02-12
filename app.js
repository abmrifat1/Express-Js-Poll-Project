const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const pollCrontroller = require("./pollController");

const app = express();

app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/create", pollCrontroller.ceratePollGetController);
app.post("/create", pollCrontroller.ceratePollPostController);
app.get("/polls/:id", pollCrontroller.viewPollGetController);
app.post("/polls/:id", pollCrontroller.viewPollPostController);
app.get("/polls", pollCrontroller.getAllPolls);

app.get("/", (req, res) => {
  res.render("home");
});

mongoose
  .connect("mongodb://localhost:27017/poll", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(8001, () => {
      console.log("app running on 8001 ");
    });
  })
  .catch(e => {
    console.log(e);
  });
