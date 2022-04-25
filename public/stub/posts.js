const posts = [
    {
        title: "Post #1",
        description: "This is the first post",
        thumbnail: "https://storage.googleapis.com/pam-images/thumbnail/04cd2fc7-ee74-4153-bc19-31ef2362fda4.jpg"
    },
    {
        title: "Post #2",
        description: "This is the second post",
        thumbnail: "https://images.unsplash.com/photo-1625034712314-7bd692b60ecb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
    },
    {
        title: "Post #3",
        description: "This is the third post",
        thumbnail: "https://images.unsplash.com/photo-1625034892070-6a3cc12edb42?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=766&q=80"
    }
]

module.exports.getPostById = id => posts[id-1];
