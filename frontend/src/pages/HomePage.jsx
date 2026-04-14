import { useEffect, useState } from "react";

import PostCard from "../components/PostCard";
import api from "../lib/api";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const { data } = await api.get("/posts");
        setPosts(data);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  return (
    <div className="space-y-10">
      <section className="grid gap-8 rounded-[2rem] border border-gold/10 bg-panel/70 p-8 shadow-glow lg:grid-cols-[1.2fr_0.8fr] lg:p-12">
        <div>
          <p className="text-sm uppercase tracking-[0.45em] text-gold/70">Gold-standard publishing</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl leading-tight text-white sm:text-6xl">
            A public Django and React stack styled for modern fintech storytelling.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/65">
            Every visitor can browse the site and work with posts immediately, without logging in.
          </p>
        </div>
        <div className="rounded-[1.75rem] border border-white/10 bg-black/40 p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-gold/70">Platform controls</p>
          <ul className="mt-5 space-y-4 text-sm leading-7 text-white/70">
            <li>Public access across the full site without a login requirement.</li>
            <li>Django REST Framework serves a fully open post workflow.</li>
            <li>Azure-ready static serving with Gunicorn and WhiteNoise.</li>
          </ul>
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-gold/70">Latest posts</p>
            <h2 className="mt-2 font-display text-3xl text-white">Public market updates</h2>
          </div>
          <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/55">
            {posts.length} published
          </span>
        </div>
        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-panel/80 p-10 text-center text-white/60">
            Loading posts...
          </div>
        ) : posts.length ? (
          <div className="grid gap-6 lg:grid-cols-2">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-gold/25 bg-panel/60 p-10 text-center text-white/60">
            No posts yet. Publish the first one.
          </div>
        )}
      </section>
    </div>
  );
}
