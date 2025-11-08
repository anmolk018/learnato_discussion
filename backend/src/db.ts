import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { Post } from './types'
import path from 'path'

const file = path.join(process.cwd(), 'data', 'db.json')
const adapter = new JSONFile<{ posts: Post[] }>(file)

const db = new Low(adapter, { posts: [] })

export async function initDb() {
    await db.read()
    db.data ||= { posts: [] }
    await db.write()
}

export default db
