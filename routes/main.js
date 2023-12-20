module.exports = function(app, siteData){
    //handle routes here

    //login
    app.get("/", function(req, res){

        //if a user is already signed in, take them to homepage
        if(req.session.user == undefined){
            let newData = Object.assign({}, siteData, {errMessage:""});
            res.render("login.ejs", newData);
        } else {
            res.redirect("/home");
        }


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
                req.session.user = {username: req.body.username, id: result[0].user_id};
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

        let sqlquery = "SELECT posts.*, topics.topic_id, topics.name, users.user_id, users.username FROM posts JOIN users ON posts.user_id = users.user_id JOIN topic_user ON topic_user.topic_id = posts.topic_id JOIN topics ON topics.topic_id = topic_user.topic_id WHERE topic_user.user_id = ? ORDER BY post_time DESC";

        db.query(sqlquery, [req.session.user.id], (err, result)=>{
            //err check
            if(err){
                res.redirect("./");
            }
            res.render("index.ejs", {siteData, feed: result});
        });
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
            } else {
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

        let njoin = "SELECT topics.topic_id, topics.name, topics.description FROM topics LEFT JOIN topic_user ON topics.topic_id = topic_user.topic_id AND topic_user.user_id = ? WHERE topic_user.user_id IS NULL";
        let joinquery = "SELECT * FROM topics LEFT JOIN topic_user USING (topic_id) LEFT JOIN users USING (user_id) WHERE user_id = ?";

        //topics user hasn't joined
        db.query(njoin,[req.session.user.id],(err, result) => {
            //if err
            if(err){
                res.redirect("./");
            }
            
            let unjoined = result;

            //topics users have joined
            db.query(joinquery,[req.session.user.id],(err, result) => {
                if(err){
                    res.redirect("./");
                }
                let joined = result;
                res.render("topics.ejs", {siteData, topics: unjoined, joined: joined}); 
            })     
        });

    });

    app.post("/new-topic", function(req,res){
        db.query("INSERT INTO topics (name, description) VALUES (?,?)", [req.body.title, req.body.description], (err, result) => {
            if(err){
                res.redirect("./");
            }
            res.redirect("/topics");
        });
    });

    //make user join topic
    app.post("/topics", function(req, res){
        let parsedinput = parseInt(req.body.topicID);
        db.query("INSERT INTO topic_user (user_id, topic_id) VALUES (?,?)", [req.session.user.id, parsedinput], (err, result) => {

            if(err){
                res.redirect("./");
            } else{
                res.redirect("/topics");
            }
        });
     });

    //show all users in site
    app.get("/users", function(req, res){
        db.query("SELECT * FROM users", (err,result) => {
            if(err){
                res.redirect("./");
            } else {
                res.render("users.ejs", {siteData, results: result});
            }
        });
    });

    //make topic page
    app.get("/new-topic", function(req, res){
        res.render("createTopic.ejs", siteData);
    });

    //post
    app.get("/post", function(req, res){
        // check if user is in session
        if(req.session.user == undefined){
            res.redirect("./");
        }

        //first show all of the topics the user can submit in
        db.query("SELECT * FROM topics LEFT JOIN topic_user USING (topic_id) LEFT JOIN users USING (user_id) WHERE user_id = ?", [req.session.user.id], (err,result) => {
            if(err){
                res.redirect("./");
            }
            let errorMessage = "";
            if(result.length == 0){
                errorMessage = "Please join topics to start posting!"
            }

            res.render("post.ejs", {siteData, results: result, errMessage: errorMessage});
        });
    });

    app.post("/post", function(req,res){
        // check if user is in session
        if(req.session.user == undefined){
            res.redirect("/");
        }

        //insert data
        let parsedID = parseInt(req.body.topic_id);
        db.query("INSERT INTO posts (title, description, user_id, topic_id) VALUES (?,?,?,?)", [req.body.title, req.body.content, req.session.user.id, parsedID],(err,result)=>{
            if(err){
                res.redirect("./");
            }

            res.redirect("/home");
        });

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