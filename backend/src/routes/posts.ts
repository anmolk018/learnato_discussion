import express from 'express'
import db from '../db'
import { Post, Reply } from '../types'
import { id, now } from '../utils'


const router = express.Router()



// Create a post
router.post('/', async (req, res) => {
    const { title, content, author } = req.body
    if (!title || !content) return res.status(400).json({ message: 'title and content required' })


    await db.read()
    const newPost: Post = {
        id: id(),
        title,
        content,
        author: author || 'Anonymous',
        votes: 0,
        createdAt: now(),
        replies: []
    }
    db.data!.posts.unshift(newPost)
    await db.write()
    res.status(201).json(newPost)
})


// Get all posts (sorted by votes desc, then date desc)
router.get('/', async (req, res) => {
    await db.read()
    const posts = db.data!.posts.slice().sort((a, b) => {
        if (b.votes !== a.votes) return b.votes - a.votes
        return +new Date(b.createdAt) - +new Date(a.createdAt)
    })
    res.json(posts)
})


// Get single post
router.get('/:id', async (req, res) => {
    await db.read()
    const p = db.data!.posts.find(x => x.id === req.params.id)
    if (!p) return res.status(404).json({ message: 'not found' })
    res.json(p)
})


// Add reply
router.post('/:id/reply', async (req, res) => {
    const { content, author } = req.body
    if (!content) return res.status(400).json({ message: 'content required' })
    await db.read()
    const post = db.data!.posts.find(x => x.id === req.params.id)
    if (!post) return res.status(404).json({ message: 'post not found' })


    const r: Reply = { id: id(), postId: post.id, content, author: author || 'Anonymous', createdAt: now() }
    post.replies.push(r)
    await db.write()
    res.status(201).json(r)
})


// Upvote
router.post('/:id/upvote', async (req, res) => {
    await db.read()
    const post = db.data!.posts.find(x => x.id === req.params.id)
    if (!post) return res.status(404).json({ message: 'post not found' })
    post.votes += 1
    await db.write()
    res.json({ votes: post.votes })
})


export default router