import React, { useEffect, useState } from "react";
import { getPost, addReply, upvote } from "../api";
import ReplyForm from "./ReplyForm";

export default function PostView({ id, onBack, onRefresh }: any) {
  const [post, setPost] = useState<any>(null);

  const load = async () => setPost(await getPost(id));
  useEffect(() => { load(); }, [id]);

  const reply = async (content: string) => { await addReply(id, { content }); load(); onRefresh(); };
  const vote = async () => { await upvote(id); load(); onRefresh(); };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-white border rounded">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">{post.title}</h2>
        <button onClick={vote} className="px-3 py-1 bg-green-600 text-white rounded">
          {post.votes} Upvote
        </button>
      </div>
      <p className="mb-6">{post.content}</p>

      <h3 className="font-semibold mb-2">Replies</h3>
      <div className="space-y-3 mb-4">
        {post.replies.map((r: any) => (
          <div key={r.id} className="p-3 border rounded bg-gray-50">
            {r.content}
          </div>
        ))}
      </div>

      <ReplyForm onSubmit={reply} />
      <button onClick={onBack} className="mt-4 border px-3 py-1 rounded">Back</button>
    </div>
  );
}
