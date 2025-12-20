import { forwardRef } from "react";
import { Toaster, toast } from "react-hot-toast";

const InTouch = forwardRef<HTMLDivElement>((_, ref) => {
  // Form Hanlder
  const formHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const name = (
      form.elements.namedItem("name") as HTMLInputElement
    ).value.trim();
    const email = (
      form.elements.namedItem("email") as HTMLInputElement
    ).value.trim();
    const type = (form.elements.namedItem("type") as HTMLSelectElement).value;
    const message = (
      form.elements.namedItem("message") as HTMLTextAreaElement
    ).value.trim();

    // ===== Validation =====
    if (name.length < 2) {
      toast.error("Name must be at least 2 characters");
      return;
    }

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!type) {
      toast.error("Please select a project type");
      return;
    }

    if (message.length < 10) {
      toast.error("Message must be at least 10 characters");
      return;
    }

    await fetch("http://localhost:5000/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, type, message }),
    });

    toast.success("Message sent successfully");

    form.reset();
  };

  return (
    <section
      ref={ref}
      className="relative pt-24 overflow-hidden bg-slate-950 p-4"
    >
      {/* Toast */}
      <Toaster position="bottom-center" />

      {/* Heading */}
      <h3 className="text-center text-4xl font-bold">
        Get{" "}
        <span
          style={{
            backgroundImage: "var(--gradient)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          In Touch
        </span>
      </h3>

      <p className="text-center text-white/50">
        Have a project in mind? Let&apos;s discuss how we can help bring your
        vision to life.
      </p>

      {/* Background Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.25),transparent_55%),radial-gradient(circle_at_bottom,rgba(129,140,248,0.25),transparent_55%)]" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 md:flex-row md:items-center md:px-8 lg:py-20">
        {/* ================= LEFT ================= */}
        <div className="space-y-6 md:w-1/2">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl">
            Let’s build your next{" "}
            <span className="bg-linear-to-r from-sky-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              digital experience
            </span>
          </h2>

          <p className="max-w-md text-sm text-slate-300/80 sm:text-base">
            Tell me about your project, idea, or question. I usually reply
            within <span className="font-medium text-sky-300">24–48 hours</span>
            .
          </p>

          <div className="space-y-4 text-sm text-slate-200/90">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900/80 ring-1 ring-slate-700/70">
                📧
              </span>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Email
                </p>
                <a
                  href="mailto:dsmeshilmaring13@gmail.com"
                  className="text-sm font-medium text-slate-50 hover:text-sky-300"
                >
                  dsmeshilmaring13@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900/80 ring-1 ring-slate-700/70">
                📍
              </span>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Based in
                </p>
                <p className="text-sm font-medium text-slate-50">
                  Imphal, India
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT (FORM) ================= */}
        <div className="md:w-1/2">
          <div className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.8)] backdrop-blur sm:p-6 lg:p-7">
            <form className="space-y-4" onSubmit={formHandler}>
              {/* Name + Email */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">
                    Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    className="w-full rounded-lg border border-slate-700/70 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/60"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-slate-700/70 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/60"
                  />
                </div>
              </div>

              {/* Project Type */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Project type
                </label>
                <select
                  name="type"
                  className="w-full rounded-lg border border-slate-700/70 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/60"
                >
                  <option value="">Select an option</option>
                  <option>Website design & development</option>
                  <option>Web app / dashboard</option>
                  <option>UI/UX design only</option>
                  <option>Other / not sure</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Share a short brief about your project..."
                  className="min-h-20 w-full rounded-lg border border-slate-700/70 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/60"
                />
              </div>

              {/* Submit */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="inline-flex shrink-0 cursor-pointer items-center justify-center rounded-lg bg-linear-to-r from-sky-500 via-indigo-500 to-purple-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-sky-500/25 transition hover:brightness-110 active:scale-[0.98]"
                >
                  Send message
                </button>

                <p className="text-[11px] text-slate-400">
                  By sending this form you agree to be contacted back.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
});

export default InTouch;
