import { nanoid } from 'nanoid'
export const id = () => nanoid(10)
export const now = () => new Date().toISOString()