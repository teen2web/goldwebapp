import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PostCard from "../components/PostCard";
import { useAuth } from "../context/AuthContext";
import api from "../lib/api";

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const { data } = await api.get("/posts");
        setPosts(data.filter((post) => post.author_id === user?.id));
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, [user?.id]);

  async function handleDelete(post) {
    await api.delete(`/posts/${post.id}`);
    setPosts((current) => current.filter((item) => item.id !== post.id));
  }

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-gold/15 bg-panel/80 p-8 shadow-glow">
        <p className="text-sm uppercase tracking-[0.35em] text-gold/70">Protected workspace</p>
        <h1 className="mt-3 font-display text-4xl text-white">Welcome, {user?.username}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65">
          Manage your own content with owner-only edit and delete permissions enforced by Django REST Framework.
        </p>
        <button
          type="button"
          onClick={() => navigate("/posts/new")}
          className="mt-6 rounded-2xl bg-gold px-5 py-3 font-semibold text-black transition hover:brightness-110"
        >
          Create new post
        </button>
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-gold/70">Your posts</p>
            <h2 className="mt-2 font-display text-3xl text-white">Portfolio of updates</h2>
          </div>
          <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/55">
            {posts.length} items
          </span>
        </div>
        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-panel/80 p-10 text-center text-white/60">
            Loading your posts...
          </div>
        ) : posts.length ? (
          <div className="grid gap-6 lg:grid-cols-2">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} showActions onDelete={handleDelete} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-gold/25 bg-panel/60 p-10 text-center text-white/60">
            You have not created any posts yet.
          </div>
        )}
      </section>
    </div>
  );
}
