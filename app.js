let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let mongoose = require("mongoose");

//APP CONFIG
mongoose.connect(
  "mongodb://localhost/restful_blog_app",
  { useNewUrlParser: true }
);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//MONGOOSE MODEL CONFIG
let blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now }
});

var Blog = mongoose.model("Blog", blogSchema);

//RESTFUL ROUTES
app.get("/", function(req, res) {
  res.redirect("/blogs");
});

//INDEX ROUTE
app.get("/blogs", function(req, res) {
  Blog.find({}, function(err, blogs) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { blogs: blogs });
    }
  });
});

//NEW ROUTE
app.get("/blogs/new", function(req, res) {
  res.render("new");
});

//CREATE ROUTE

app.listen(3000, function() {
  console.log("Server's up");
});
