const API = import.meta.env.VITE_API_URL || 'http://localhost:4000'


export async function fetchPosts() {
    const res = await fetch(`${API}/posts`)
    return res.json()
}


export async function createPost(payload: { title: string; content: string; author?: string }) {
    const res = await fetch(`${API}/posts`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    return res.json()
}


export async function getPost(id: string) {
    const res = await fetch(`${API}/posts/${id}`)
    return res.json()
}


export async function addReply(postId: string, payload: { content: string; author?: string }) {
    const res = await fetch(`${API}/posts/${postId}/reply`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    return res.json()
}


export async function upvote(postId: string) {
    const res = await fetch(`${API}/posts/${postId}/upvote`, { method: 'POST' })
    return res.json()
}


export default API