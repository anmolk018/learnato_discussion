import React, { useState, useEffect } from "react";
import { fetchPosts } from "./api";
import CreatePost from "./components/CreatePost";
import PostList from "./components/PostList";
import PostView from "./components/PostView";

export default function App() {
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const load = async () => setPosts(await fetchPosts());
  useEffect(() => { load(); }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Learnato — Discussion Forum</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <CreatePost onCreated={load} />
          <PostList posts={posts} onSelect={setSelectedId} onRefresh={load} />
        </div>

        <div className="md:col-span-2">
          {selectedId ? (
            <PostView id={selectedId} onBack={() => setSelectedId(null)} onRefresh={load} />
          ) : (
            <div className="p-6 border rounded bg-white text-gray-500">
              Select a post to view replies.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
