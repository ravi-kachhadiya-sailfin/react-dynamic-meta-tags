const express = require('express');
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

app.get('/', (req, res, next) => {
    fs.readFile(indexPath, 'utf8', (err, htmlData) => {
        if (err) {
            console.error('Error during file reading', err);
            return res.status(404).end()
        }
        // get post info
//         const postId = req.query.id;
        const post = {
         title: "Home",
            description: "Home page is here",
            thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/1200px-Logo_NIKE.svg.png",
        };
//         if(!post) return res.status(404).send("Post not found");
        
        // inject meta tags
        htmlData = htmlData.replace(
            "<title>React App</title>",
            `<title>${post.title}</title>`
        )
        .replace('__META_OG_TITLE__', post.title)
        .replace('__META_OG_DESCRIPTION__', post.description)
        .replace('__META_DESCRIPTION__', post.description)
        .replace('__META_OG_IMAGE__', post.thumbnail)
        
        .replace('__META_TWT_TITLE__', post.title)
        .replace('__META_TWT_DESCRIPTION__', post.description)
        .replace('__META_TWT_IMAGE__', post.thumbnail)

        return res.send(htmlData);
    });
});

// here we serve the index.html page
app.get('/*', (req, res, next) => {
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
        
        .replace('__META_TWT_TITLE__', post.title)
        .replace('__META_TWT_DESCRIPTION__', post.description)
        .replace('__META_TWT_IMAGE__', post.thumbnail)

        return res.send(htmlData);
    });
});

// here we serve the index.html page
// app.get('origin', (req, res, next) => {
//     fs.readFile(indexPath, 'utf8', (err, htmlData) => {
//         if (err) {
//             console.error('Error during file reading', err);
//             return res.status(404).end()
//         }

//         const post = {
//             title: "Post",
//             description: "Main Title",
//             thumbnail: "https://storage.googleapis.com/pam-images/thumbnail/04cd2fc7-ee74-4153-bc19-31ef2362fda4.jpg"
//         },
        
//         // inject meta tags
//         htmlData = htmlData.replace(
//             "<title>React App</title>",
//             `<title>${post.title}</title>`
//             )
//             .replace('__META_DESCRIPTION__', post.description)
//         .replace('__META_OG_TITLE__', post.title)
//         .replace('__META_OG_DESCRIPTION__', post.description)
//         .replace('__META_OG_IMAGE__', post.thumbnail)
        
//         .replace('__META_TWT_TITLE__', post.title)
//         .replace('__META_TWT_DESCRIPTION__', post.description)
//         .replace('__META_TWT_IMAGE__', post.thumbnail)

//         return res.send(htmlData);
//     });
// });


// listening...
app.listen(PORT, (error) => {
    if (error) {
        return console.log('Error during app startup', error);
    }
    console.log("listening on " + PORT + "...");
});
