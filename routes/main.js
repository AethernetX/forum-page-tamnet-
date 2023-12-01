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
};