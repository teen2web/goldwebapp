import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../lib/api";

const initialValues = {
  title: "",
  content: "",
};

export default function CreateEditPostPage({ mode }) {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(mode === "edit");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (mode !== "edit" || !postId) {
      setLoading(false);
      return;
    }

    async function loadPost() {
      try {
        const { data } = await api.get(`/posts/${postId}`);
        setValues({ title: data.title, content: data.content });
      } catch {
        setError("Unable to load this post.");
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [mode, postId]);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      if (mode === "edit") {
        await api.put(`/posts/${postId}`, values);
      } else {
        await api.post("/posts", values);
      }
      navigate("/dashboard");
    } catch {
      setError("Unable to save your post right now.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="py-20 text-center text-white/60">Loading editor...</div>;
  }

  return (
    <section className="mx-auto max-w-3xl rounded-[2rem] border border-gold/15 bg-panel/90 p-8 shadow-glow sm:p-10">
      <p className="text-sm uppercase tracking-[0.35em] text-gold/70">
        {mode === "edit" ? "Edit post" : "Create post"}
      </p>
      <h1 className="mt-3 font-display text-4xl text-white">
        {mode === "edit" ? "Refine your update" : "Publish a new insight"}
      </h1>
      <p className="mt-4 text-sm leading-7 text-white/65">
        Craft a polished post for the public feed. Only the post owner can make changes later.
      </p>
      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <label className="block">
          <span className="mb-2 block text-sm text-white/75">Title</span>
          <input
            type="text"
            name="title"
            value={values.title}
            onChange={handleChange}
            maxLength={255}
            required
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-gold"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm text-white/75">Content</span>
          <textarea
            name="content"
            value={values.content}
            onChange={handleChange}
            rows={10}
            required
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-gold"
          />
        </label>
        {error ? (
          <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        ) : null}
        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-2xl bg-gold px-5 py-3 font-semibold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving..." : mode === "edit" ? "Update post" : "Create post"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="rounded-2xl border border-white/10 px-5 py-3 text-white/75 transition hover:border-gold hover:text-gold"
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
