const express = require('express');
const request = require('request')
const path = require('path');
const fs = require("fs"); 
const { getPostById } = require('./stub/posts');
const app = express();

const PORT = process.env.PORT || 3000;
const indexPath  = path.resolve(__dirname, '..', 'build', 'index.html');

// static resources should just be served as they are
app.use(express.static(
    path.resolve(__dirname, '..', 'build'),
    { maxAge: '30d' },
));

// here we serve the index.html page
app.get('/*', (req, res, next) => {
    console.log("reuq...")
    // console.log(req);
    var url1="https://pam-api-uat.med.stanford.edu/";
    let options={
        url:url1+ "api/v1/tool/details?toolId=3d5f006c-dcc1-4bd4-99a9-e3adda6fda42",
        method: "GET"
    }
    request(options,(err,data)=>{
        if(err) {
            return res.send(err);
        } else {
            if(data && data.body){
                console.log(JSON.parse(data.body))
                console.log(JSON.parse(data.body).data.tool)
                data.body = JSON.parse(data.body)
                fs.readFile(indexPath, 'utf8', (err, htmlData) => {
                    if (err) {
                        console.error('Error during file reading', err);
                        return res.status(404).end()
                    }
                    // get post info
                    const postId = req.query.id;
                    const post = getPostById(postId);
                    if(!post) return res.status(404).send("Post not found");
                    
                    // inject meta tags
                    htmlData = htmlData.replace(
                        "<title>React App</title>",
                        `<title>${post.title}</title>`
                    )
                    .replace('__META_OG_TITLE__', post.title)
                    .replace('__META_OG_DESCRIPTION__', post.description)
                    .replace('__META_DESCRIPTION__', post.description)
                    .replace('__META_OG_IMAGE__', post.thumbnail)
            
                    return res.send(htmlData);
                });
            }
        }
    })
});

app.get('/posts', (req, res, next) => {
    fs.readFile(indexPath, 'utf8', (err, htmlData) => {
        if (err) {
            console.error('Error during file reading', err);
            return res.status(404).end()
        }
        // get post info
        const postId = req.query.id;
        const post = getPostById(postId);
        if(!post) return res.status(404).send("Post not found");
        
        // inject meta tags
        htmlData = htmlData.replace(
            "<title>React App</title>",
            `<title>${post.title}</title>`
        )
        .replace('__META_OG_TITLE__', post.title)
        .replace('__META_OG_DESCRIPTION__', post.description)
        .replace('__META_DESCRIPTION__', post.description)
        .replace('__META_OG_IMAGE__', post.thumbnail)

        return res.send(htmlData);
    });
});


// listening...
app.listen(PORT, (error) => {
    if (error) {
        return console.log('Error during app startup', error);
    }
    console.log("listening on " + PORT + "...");
});