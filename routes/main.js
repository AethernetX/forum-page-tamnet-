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
        //check if username is taken
        db.query(sqlquery, [req.body.username], (err, result) => {
            //err check
            if(err){
                res.redirect("./");
            }

            let newData = Object.assign({}, siteData, {errMessage:""});

            //if username is taken, send error
            if(result.length > 0){
                newData.errMessage = "Username is taken";
                res.render("register.ejs", newData);
            } else if(req.body.username.length < 3 || req.body.username.length > 15){
                newData.errMessage = "Username must have 3 - 15 characters";
                res.render("register.ejs", newData);               
            }
            //if nothing fails insert a new user
            else {
                let insertQuery = "INSERT INTO users (username, password) VALUES (?,?)";
                db.query(insertQuery, [req.body.username, req.body.password], (err) => {
                    //err check
                    if(err){
                        res.redirect("./");
                    } else {       
                        res.redirect("/registered");
                    }
                });
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