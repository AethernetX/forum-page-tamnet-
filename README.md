# Tamnet

Tamnet is a forum page similar to reddit and quora. It's built on Node, Express, Express-session, Body-parser, EJS and MySql.

***DISCLAIMER:***
This project is not design for production in mind, thus does not include security features. Ensure that users are aware that the data being stored is not protected. It is recommended to import a library such as bcrypt.

## features
Tamnet includes the following...
- Users can create an account
- Users can log in and out
- Users do not need to log off if they have already signed in
- Users who aren't signed in cannot access any other pages and are redirected to the login page
- Users can join communities (called topics)
- Users can post in communities they joined
- Users can create communities
- Users can see a home feed sorted by time it was posted
- Users can visit sites they have joined and see what other users posted
- search for posts (only by exact name of title, and if you're in the topic of the post)
- An about page
- Users can visit other users and can see what they posted
- Users cannot make duplicate usernames
- Users can also search for a user or topic through the links
- Posts show who posted in what topic

## installation guide
You will need node.js and mySql to run this project.

Begin by `git clone` the project onto your machine. Open the directory and run mySql terminal

### For windows:
`mysql -u root -p`
### For ubuntu linux
`sudo mysql`

Once you're in the terminal, go ahead and run the following

`source create_db.sql`

if all goes well, if you run `SHOW DATABASES` you should see `tamnet` amongst the list of databases.
If you want to also make sure all of the tables are successfully installed, you can do the following...

```
USE tamnet;
SHOW TABLES;
```

You should get the following...

```
+------------------+
| Tables_in_tamnet |
+------------------+
| posts            |
| topic_user       |
| topics           |
| users            |
+------------------+
```

This means we have everything! next up we need to install all of the node modules for the project, run `npm install`

Finally to run the project just do `node index.js` then go to localhost:8000 and you should be greeted by a login page.
