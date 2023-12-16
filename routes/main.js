module.exports = function(app, siteData){
    //handle routes here

    //login
    app.get("/", function(req, res){
        let newData = Object.assign({}, siteData, {errMessage:""});
        res.render("login.ejs", newData);
    });

    app.post("/", function(req, res){
        let sqlquery = "SELECT * FROM users WHERE username= ? AND password= ?"
        db.query(sqlquery, [req.body.username, req.body.password], (err, result) =>{            
            //err check
            if(err){
                res.redirect("./");
            }
            //if there is a result then take them to the home page
            if(result != 0){
                req.session.user = req.body.username;
                res.redirect("/home");
            } else {
                let newData = Object.assign({}, siteData, {errMessage:"Username not found or password incorrect"});
                res.render("login.ejs", newData);
            }
        })
    })

    //home page
    app.get("/home", function(req,res){
        // check if user is in session
        if(req.session.user == undefined){
            res.redirect("/");
        }
        res.render("index.ejs", {siteData, user: req.session.user});
    });

    //register
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
        res.render("registered.ejs", siteData);
    });

    app.get("/logout", function (req, res){
        req.session.destroy(function(err){
            if(err){
                res.redirect("./");
            }
            res.render("logout");
        });
    });

    //topics list
    app.get("/topics", function (req, res){
        // check if user is in session
        if(req.session.user == undefined){
            res.redirect("/");
        }
        let sqlquery = "SELECT * FROM topics";
        db.query(sqlquery, (err, result) => {
            //if err
            if(err){
                res.redirect("./");
            }

            let newData = Object.assign({}, siteData, {topics: result});
            console.log(newData);
            res.render("topics.ejs", newData);
        
        });
    });

    //post
    app.get("/post", function(req, res){
        // check if user is in session
        if(req.session.user == undefined){
            res.redirect("/");
        }
        res.render("post.ejs", siteData);
    });

    //about
    app.get("/about", function(req, res){
        // check if user is in session
        if(req.session.user == undefined){
            res.redirect("/");
        }
        res.render("about.ejs", siteData);
    })

};