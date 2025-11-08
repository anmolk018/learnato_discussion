import React, { useState } from "react";
import { createPost } from "../api";

export default function CreatePost({ onCreated }: { onCreated: () => void }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    await createPost({ title, content });
    setTitle(""); setContent("");
    onCreated();
  };

  return (
    <form onSubmit={submit} className="p-4 mb-4 bg-white border rounded">
      <h3 className="font-semibold mb-2">Create Post</h3>
      <input className="w-full p-2 border rounded mb-2" placeholder="Title"
        value={title} onChange={e => setTitle(e.target.value)} />
      <textarea className="w-full p-2 border rounded mb-2" rows={4} placeholder="Content"
        value={content} onChange={e => setContent(e.target.value)} />
      <button className="w-full bg-blue-600 text-white py-2 rounded">Post</button>
    </form>
  );
}
