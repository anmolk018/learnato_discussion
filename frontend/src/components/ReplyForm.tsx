import React, { useState } from "react";

export default function ReplyForm({ onSubmit }: { onSubmit: (content: string) => void }) {
  const [content, setContent] = useState("");

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;
    onSubmit(content);
    setContent("");
  };

  return (
    <form onSubmit={send} className="p-3 border rounded bg-white">
      <textarea className="w-full p-2 border rounded" rows={3}
        value={content} onChange={e => setContent(e.target.value)}
        placeholder="Write a reply..."
      />
      <button className="mt-2 px-3 py-1 bg-blue-600 text-white rounded">Reply</button>
    </form>
  );
}
