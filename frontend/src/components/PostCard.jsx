import { Link } from "react-router-dom";

export default function PostCard({ post, showActions = false, onDelete }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-panel/90 p-6 shadow-glow">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold/70">Market note</p>
          <h3 className="mt-2 font-display text-2xl text-white">{post.title}</h3>
        </div>
        <span className="rounded-full border border-gold/30 px-3 py-1 text-xs text-gold">
          {post.author?.username}
        </span>
      </div>
      <p className="line-clamp-4 whitespace-pre-wrap text-sm leading-7 text-white/75">
        {post.content}
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-white/45">
        <span>Created {new Date(post.created_at).toLocaleString()}</span>
        {showActions ? (
          <div className="flex gap-3">
            <Link to={`/posts/${post.id}/edit`} className="text-gold transition hover:text-white">
              Edit
            </Link>
            <button
              type="button"
              onClick={() => onDelete(post)}
              className="text-red-300 transition hover:text-red-200"
            >
              Delete
            </button>
          </div>
        ) : null}
      </div>
    </article>
  );
}
