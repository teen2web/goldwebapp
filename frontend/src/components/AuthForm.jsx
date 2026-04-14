export default function AuthForm({
  title,
  subtitle,
  submitLabel,
  fields,
  values,
  errors,
  loading,
  onChange,
  onSubmit,
}) {
  return (
    <section className="mx-auto max-w-xl rounded-[2rem] border border-gold/20 bg-panel/90 p-8 shadow-glow sm:p-10">
      <p className="text-sm uppercase tracking-[0.35em] text-gold/70">Secure access</p>
      <h1 className="mt-3 font-display text-4xl text-white">{title}</h1>
      <p className="mt-3 text-sm leading-7 text-white/65">{subtitle}</p>
      <form className="mt-8 space-y-5" onSubmit={onSubmit}>
        {fields.map((field) => (
          <label key={field.name} className="block">
            <span className="mb-2 block text-sm text-white/75">{field.label}</span>
            <input
              type={field.type}
              name={field.name}
              value={values[field.name] || ""}
              onChange={onChange}
              required={field.required}
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-white/25 focus:border-gold"
              placeholder={field.placeholder}
            />
            {errors[field.name] ? (
              <span className="mt-2 block text-sm text-red-300">{errors[field.name]}</span>
            ) : null}
          </label>
        ))}
        {errors.non_field_errors ? (
          <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {errors.non_field_errors}
          </div>
        ) : null}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-gold px-5 py-3 font-semibold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Please wait..." : submitLabel}
        </button>
      </form>
    </section>
  );
}
