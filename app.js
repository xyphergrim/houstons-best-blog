var express             = require("express"),
    bodyParser          = require("body-parser"),
    mongoose            = require("mongoose"),
    methodOverride      = require("method-override"),
    expressSanitizer    = require("express-sanitizer"),
    app                 = express();
    
// APP CONFIG
mongoose.connect("mongodb://localhost/houstons_best_blog");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public")); // for our custom app.css
app.set("view engine", "ejs");
app.use(methodOverride("_method")); // for the PUT request in the EDIT ROUTE
app.use(expressSanitizer());

// MONGOOSE/MODEL SCHEMA
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

//================
// RESTFUL ROUTES
//================
// app.get("/", function(req, res){
//     res.render("home", {page: "home"});
// });

// BLOG INDEX ROUTE - show list of all blogs sorted by date
// app.get("/", function(req, res){
//     Blog.find({}, null, {sort: {created: -1}}, function(err, blogs){
//         if(err){
//             console.log(err);
//         } else {
//             res.render("blog", {blogs: blogs});
//         }
//     });
// });

// // NEW ROUTE - take us to the blog form
// app.get("/new", function(req, res){
//     res.render("new");
// })

// // CREATE ROUTE
// app.post("/", function(req, res){
//     req.body.blog.body = req.sanitize(req.body.blog.body);
//     Blog.create(req.body.blog, function(err, newBlog){
//         if(err){
//             res.render("new");
//         } else {
//             // redirect to the blog index
//             res.redirect("/");
//         }
//     });
// });

// // SHOW ROUTE
// app.get("/blog/:id", function(req, res){
//     Blog.findById(req.params.id, function(err, foundBlog){
//         if(err){
//             res.redirect("/blog");
//         } else {
//             res.render("show", {blog: foundBlog, page: "show"});
//         }
//     });
// });

app.get("/", function(req, res){
    res.redirect("/blogs");
});

// INDEX ROUTE
app.get("/blogs", function(req, res){
    Blog.find({}, null, {sort: {created: -1}}, function(err, blogs){
        if(err){
            console.log(err);
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});

// NEW ROUTE
app.get("/blogs/new", function(req, res){
    res.render("new");
});

// CREATE ROUTE
app.post("/blogs", function(req, res){
   // create blog
   req.body.blog.body = req.sanitize(req.body.blog.body);
   Blog.create(req.body.blog, function(err, newBlog){
       if(err){
           res.render("new");
       } else {
           // redirect to the index
           res.redirect("/blogs");
       }
   });
});

// // SHOW ROUTE
app.get("/blogs/:id", function(req, res){
  Blog.findById(req.params.id, function(err, foundBlog){
      if(err){
          res.redirect("/blogs");
      } else {
          res.render("show", {blog: foundBlog});
      }
  });
});

// // EDIT ROUTE
// app.get("/blogs/:id/edit", function(req, res){
//     Blog.findById(req.params.id, function(err, foundBlog){
//         if(err){
//             res.redirect("/blogs");
//         } else {
//             res.render("edit", {blog: foundBlog});
//         }
//     })
// });

// // UPDATE ROUTE
// app.put("/blogs/:id", function(req, res){
//     req.body.blog.body = req.sanitize(req.body.blog.body);
//     Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
//         if(err){
//             res.redirect("/blogs");
//         } else {
//             res.redirect("/blogs/" + req.params.id);
//         }
//     });
// });

// // DELETE ROUTE
// app.delete("/blogs/:id", function(req, res){
//     // destroy blog
//     Blog.findByIdAndRemove(req.params.id, function(err){
//         if(err){
//             res.redirect("/blogs");
//         } else {
//             res.redirect("/blogs");
//         }
//     })
//     // redirect somewhere
// });


//======================================================
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Houston's Best Blog Server Started");
});