module.exports = function(app, siteData){
    //handle routes here

    app.get("/", function(req, res){
        res.render("login.ejs", siteData);
    });

    app.get("/home", function(req,res){
        res.render("index.ejs", siteData);
    });

    app.get("/topics", function(req,res){
        res.render("topics.ejs", siteData);
    });

    app.get("/register", function(req, res){
        let newData = Object.assign({}, siteData, {errMessage:""});
        res.render("register.ejs", newData); 
    });

    app.post("/register", function(req, res){
        let sqlquery = "SELECT * FROM users WHERE username= ?"

        // execute sql query
        db.query(sqlquery, [req.body.username], (err, result) => {
            //err check
            if(err){
                res.redirect("./");
            }
            if(result.length > 0){
                let newData = Object.assign({}, siteData, {errMessage:"Username is taken"});
                res.render("register.ejs", newData);
            } else {
                res.redirect("/registered");
            }
        });
    });



    app.get("/registered", function(req, res){
        res.send("successful");
    });

    app.get("/post", function(req, res){
        res.render("post.ejs", siteData);
    });

};