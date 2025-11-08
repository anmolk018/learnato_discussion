"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../db"));
const utils_1 = require("../utils");
const router = express_1.default.Router();
// Create a post
router.post('/', async (req, res) => {
    const { title, content, author } = req.body;
    if (!title || !content)
        return res.status(400).json({ message: 'title and content required' });
    await db_1.default.read();
    const newPost = {
        id: (0, utils_1.id)(),
        title,
        content,
        author: author || 'Anonymous',
        votes: 0,
        createdAt: (0, utils_1.now)(),
        replies: []
    };
    db_1.default.data.posts.unshift(newPost);
    await db_1.default.write();
    res.status(201).json(newPost);
});
// Get all posts (sorted by votes desc, then date desc)
router.get('/', async (req, res) => {
    await db_1.default.read();
    const posts = db_1.default.data.posts.slice().sort((a, b) => {
        if (b.votes !== a.votes)
            return b.votes - a.votes;
        return +new Date(b.createdAt) - +new Date(a.createdAt);
    });
    res.json(posts);
});
// Get single post
router.get('/:id', async (req, res) => {
    await db_1.default.read();
    const p = db_1.default.data.posts.find(x => x.id === req.params.id);
    if (!p)
        return res.status(404).json({ message: 'not found' });
    res.json(p);
});
// Add reply
router.post('/:id/reply', async (req, res) => {
    const { content, author } = req.body;
    if (!content)
        return res.status(400).json({ message: 'content required' });
    await db_1.default.read();
    const post = db_1.default.data.posts.find(x => x.id === req.params.id);
    if (!post)
        return res.status(404).json({ message: 'post not found' });
    const r = { id: (0, utils_1.id)(), postId: post.id, content, author: author || 'Anonymous', createdAt: (0, utils_1.now)() };
    post.replies.push(r);
    await db_1.default.write();
    res.status(201).json(r);
});
// Upvote
router.post('/:id/upvote', async (req, res) => {
    await db_1.default.read();
    const post = db_1.default.data.posts.find(x => x.id === req.params.id);
    if (!post)
        return res.status(404).json({ message: 'post not found' });
    post.votes += 1;
    await db_1.default.write();
    res.json({ votes: post.votes });
});
exports.default = router;
