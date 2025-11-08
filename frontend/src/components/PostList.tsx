import React from "react";
import { upvote } from "../api";

export default function PostList({ posts, onSelect, onRefresh }: any) {
  const vote = async (id: string) => { await upvote(id); onRefresh(); };

  return (
    <div className="space-y-3">
      {posts.map((p:any) => (
        <div key={p.id} className="p-3 bg-white border rounded flex justify-between">
          <div onClick={() => onSelect(p.id)} className="cursor-pointer">
            <h4 className="font-semibold">{p.title}</h4>
            <p className="text-sm text-gray-500">{p.replies.length} replies</p>
          </div>
          <button onClick={() => vote(p.id)}
            className="px-2 py-1 bg-green-600 text-white rounded text-sm">
            {p.votes} ▲
          </button>
        </div>
      ))}
    </div>
  );
}
