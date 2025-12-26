import { forwardRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { server_url } from "../../utils/url";

const InTouch = forwardRef<HTMLDivElement>((_, ref) => {
  const [loading, setLoading] = useState(false);

  // ================= FORM HANDLER =================
  const formHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

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

    // ================= VALIDATION =================
    if (name.length < 2) {
      toast.error("Name must be at least 2 characters");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
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

    const toastId = toast.loading("Sending your message...");

    // ✅ Abort controller
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 15000); // 15 seconds

    try {
      setLoading(true);

      const res = await fetch(`${server_url}/send-mail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, type, message }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error("Server error");
      }

      toast.success("Message sent! I’ll reply within 24–48 hours", {
        id: toastId,
      });

      form.reset();
    } catch (error: any) {
      clearTimeout(timeoutId);

      if (error.name === "AbortError") {
        toast.error("Request timed out. Please try again later", {
          id: toastId,
        });
      } else {
        toast.error("Something went wrong. Please try again", {
          id: toastId,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-slate-950 p-4 pt-24"
    >
      {/* TOAST */}
      <Toaster position="bottom-center" />

      {/* HEADING */}
      <h3 className="text-center text-4xl font-bold text-white">
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

      <p className="mt-2 text-center text-white/50">
        Have a project in mind? Let’s build something great together.
      </p>

      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.25),transparent_55%),radial-gradient(circle_at_bottom,rgba(129,140,248,0.25),transparent_55%)]" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-4 py-16 md:flex-row md:items-center">
        {/* ================= LEFT ================= */}
        <div className="space-y-6 md:w-1/2">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
            Let’s build your next{" "}
            <span className="bg-linear-to-r from-sky-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              digital experience
            </span>
          </h2>

          <p className="max-w-md text-slate-300/80">
            Tell me about your project, idea, or question. I usually reply
            within <span className="font-medium text-sky-300">24–48 hours</span>
            .
          </p>

          <div className="space-y-4 text-sm text-slate-200/90">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900/80 ring-1 ring-slate-700/70">
                📧
              </span>
              <a
                href="mailto:dsmeshilmaring13@gmail.com"
                className="font-medium text-white hover:text-sky-300"
              >
                dsmeshilmaring13@gmail.com
              </a>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900/80 ring-1 ring-slate-700/70">
                📍
              </span>
              <span className="font-medium text-white">Imphal, India</span>
            </div>
          </div>
        </div>

        {/* ================= RIGHT (FORM) ================= */}
        <div className="md:w-1/2">
          <div className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-6 shadow-xl backdrop-blur">
            <form onSubmit={formHandler} className="space-y-4">
              {/* NAME + EMAIL */}
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-500/50"
                />

                <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-500/50"
                />
              </div>

              {/* TYPE */}
              <select
                name="type"
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-500/50"
              >
                <option value="">Select project type</option>
                <option>Website design & development</option>
                <option>Web app / dashboard</option>
                <option>UI/UX design only</option>
                <option>Other / not sure</option>
              </select>

              {/* MESSAGE */}
              <textarea
                name="message"
                required
                rows={4}
                placeholder="Tell me about your project..."
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-500/50"
              />

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full rounded-lg px-5 py-2.5 text-sm font-medium text-white transition
                ${
                  loading
                    ? "cursor-not-allowed bg-slate-600"
                    : "bg-linear-to-r from-sky-500 via-indigo-500 to-purple-500 hover:brightness-110 active:scale-[0.98]"
                }`}
              >
                {loading ? "Sending..." : "Send message"}
              </button>

              <p className="text-center text-[11px] text-slate-400">
                By submitting this form, you agree to be contacted back.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
});

export default InTouch;
