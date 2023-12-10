// Create web server

// Import modules

const express = require('express'); // Import express module
const router = express.Router(); // Create router object
const comments = require('../data/comments'); // Import comments data
const { v4: uuidv4 } = require('uuid'); // Import uuid module

// Routes

// GET /comments
// Returns all comments

router.get('/', (req, res) => {
    res.json(comments);
}
);

// GET /comments/:id
// Returns a single comment by id

router.get('/:id', (req, res) => {
    const found = comments.some(comment => comment.id === parseInt(req.params.id));
    if (found) {
        res.json(comments.filter(comment => comment.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `No comment with the id of ${req.params.id}` });
    }
}
);

// POST /comments
// Creates a new comment

router.post('/', (req, res) => {
    const newComment = {
        id: uuidv4(),
        text: req.body.text,
        user: req.body.user,
        post: req.body.post
    };

    if (!newComment.text || !newComment.user || !newComment.post) {
        return res.status(400).json({ msg: 'Please include a text, user and post' });
    }

    comments.push(newComment);
    res.json(comments);
}
);

// PUT /comments/:id
// Updates a comment

router.put('/:id', (req, res) => {
    const found = comments.some(comment => comment.id === parseInt(req.params.id));
    if (found) {
        const updComment = req.body;
        comments.forEach(comment => {
            if (comment.id === parseInt(req.params.id)) {
                comment.text = updComment.text ? updComment.text : comment.text;
                comment.user = updComment.user ? updComment.user : comment.user;
                comment.post = updComment.post ? updComment.post : comment.post;
                res.json({ msg: 'Comment updated', comment });
            }
        });
    } else {
        res.status(400).json({ msg: `No comment with the id of ${req.params.id}` });
    }
}
);

// DELETE /comments/:id
// Deletes a comment

router.delete('/:id', (req, res) => {
    const found = comments.some(comment => comment.id === parseInt(req.params.id));
    if (found) {
        res.json({ msg: 'Comment deleted', comments: comments.filter(comment => comment.id !== parseInt(req.params.id)) });
    } else {
        res.status(400).json({ msg: `No comment with the id of ${req.params.id}` });
    }
}
);

// Export module

module.exports = router;    // Export router object

// End of file