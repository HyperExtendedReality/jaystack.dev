import { useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

const contactLinks = [
  { label: "Email", value: "jaystack.dev@gmail.com", href: "mailto:jaystack.dev@gmail.com", icon: Mail },
  { label: "GitHub", value: "HyperExtendedReality", href: "https://github.com/HyperExtendedReality", icon: Github },
  { label: "LinkedIn", value: "jb-hyperxr", href: "https://linkedin.com/in/jb-hyperxr/", icon: Linkedin },
];

const fieldClassName =
  "w-full rounded-xl border border-white/[0.09] bg-black/35 px-4 py-3.5 text-base text-white outline-none transition placeholder:text-white/20 hover:border-white/15 focus:border-green-300/40 focus:ring-2 focus:ring-green-300/10 sm:text-sm";

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    const serviceId = "service_sk53gp9";
    const adminTemplateId = "template_nyjop5e";
    const clientTemplateId = "template_il66wjv";
    const publicKey = "eVzC94wmV_OUuTQn0";
    const params = {
      name: formData.name,
      email: formData.email,
      title: formData.subject,
      message: formData.message,
    };

    try {
      await Promise.all([
        emailjs.send(serviceId, adminTemplateId, params, publicKey),
        emailjs.send(serviceId, clientTemplateId, params, publicKey),
      ]);

      setIsSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      toast.success("Message sent successfully.");
      window.setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error("Contact form delivery failed.", error);
      toast.error("Message could not be sent. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden px-4 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:px-12 lg:pt-24">
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-green-400/[0.04] blur-3xl" />
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="mx-auto mb-10 max-w-3xl text-center sm:mb-12"
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.24em] text-green-400">Contact / open channel</p>
          <h2 id="contact-title" className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl md:text-5xl">
            Let’s build something useful.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/[0.45] sm:text-lg">
            Tell me what you’re making, where it’s stuck, or what you want to explore.
          </p>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-[0.72fr_1.28fr]">
          <motion.aside
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col rounded-3xl border border-white/[0.09] bg-white/[0.03] p-5 sm:p-7"
          >
            <span className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-green-300/20 bg-green-300/[0.06] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-green-300">
              <span className="h-1.5 w-1.5 rounded-full bg-green-300 shadow-[0_0_10px_rgba(134,239,172,0.75)]" />
              Available for the right build
            </span>
            <h3 className="max-w-sm text-2xl font-semibold tracking-[-0.025em] text-white">Have an ambitious technical problem?</h3>
            <p className="mt-3 max-w-sm text-sm leading-6 text-white/[0.42]">
              I’m especially interested in product engineering, applied AI, mobile, and Game + XR systems.
            </p>

            <div className="mt-8 space-y-2">
              {contactLinks.map(({ label, value, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex min-h-14 min-w-0 items-center gap-3 rounded-xl border border-transparent px-2 py-2 transition hover:border-white/[0.07] hover:bg-white/[0.035] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-black/25 text-white/55 transition group-hover:text-green-300">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-[9px] uppercase tracking-[0.15em] text-white/25">{label}</span>
                    <span className="block truncate text-sm text-white/[0.65]">{value}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-white/20 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-green-300" />
                </a>
              ))}
            </div>

            <div className="mt-auto flex items-center gap-2 pt-8 font-mono text-[10px] uppercase tracking-[0.15em] text-white/25">
              <MapPin className="h-3.5 w-3.5 text-green-300/60" /> Orlando, Florida
            </div>
          </motion.aside>

          <motion.div
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: 0.06 }}
            className="rounded-3xl border border-white/[0.09] bg-white/[0.03] p-5 sm:p-7 lg:p-8"
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block space-y-2 text-xs text-white/[0.45]" htmlFor="contact-name">
                  <span className="block">Name</span>
                  <input id="contact-name" name="name" value={formData.name} onChange={handleInputChange} className={fieldClassName} autoComplete="name" required />
                </label>
                <label className="block space-y-2 text-xs text-white/[0.45]" htmlFor="contact-email">
                  <span className="block">Email</span>
                  <input id="contact-email" type="email" name="email" value={formData.email} onChange={handleInputChange} className={fieldClassName} autoComplete="email" required />
                </label>
              </div>
              <label className="block space-y-2 text-xs text-white/[0.45]" htmlFor="contact-subject">
                <span className="block">Subject</span>
                <input id="contact-subject" name="subject" value={formData.subject} onChange={handleInputChange} className={fieldClassName} required />
              </label>
              <label className="block space-y-2 text-xs text-white/[0.45]" htmlFor="contact-message">
                <span className="block">Message</span>
                <textarea id="contact-message" name="message" value={formData.message} onChange={handleInputChange} rows={6} className={`${fieldClassName} resize-y sm:resize-none`} required />
              </label>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-green-300 px-5 py-3.5 font-medium text-black transition hover:bg-green-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span>{isSubmitting ? "Sending…" : isSuccess ? "Message sent" : "Send message"}</span>
                {!isSubmitting && !isSuccess && <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
