import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

const contactLinks = [
  { label: "Email", value: "jaystack.dev@gmail.com", href: "mailto:jaystack.dev@gmail.com", icon: Mail },
  { label: "GitHub", value: "HyperExtendedReality", href: "https://github.com/HyperExtendedReality", icon: Github },
  { label: "LinkedIn", value: "jb-hyperxr", href: "https://linkedin.com/in/jb-hyperxr/", icon: Linkedin },
];

const fieldClassName = "w-full rounded-2xl border border-[#111411]/10 bg-white/60 px-4 py-3.5 text-base text-[#0b0d0c] outline-none transition placeholder:text-[#0b0d0c]/28 hover:border-[#111411]/20 focus:border-[#0b0d0c]/45 focus:ring-4 focus:ring-[#0b0d0c]/[0.06] sm:text-sm";

const Contact = () => {
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
    const params = { name: formData.name, email: formData.email, title: formData.subject, message: formData.message };

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
    <section id="contact" aria-labelledby="contact-title" className="relative px-3 pb-3 pt-20 sm:px-5 sm:pt-28 lg:pt-36">
      <div className="mx-auto max-w-[96rem] overflow-hidden rounded-[2rem] bg-[#f1eee5] text-[#0b0d0c] sm:rounded-[2.75rem]">
        <div className="grid gap-12 px-5 py-12 sm:px-9 sm:py-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20 lg:px-16 lg:py-20 xl:px-24 xl:py-24">
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} className="flex flex-col">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#0b0d0c]/10 bg-[#c8ff4a] px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.15em]">
              <span className="h-2 w-2 rounded-full bg-[#0b0d0c]" /> Available for the right team
            </span>
            <p className="mt-8 text-xs font-bold uppercase tracking-[0.22em] text-[#0b0d0c]/45">Let&apos;s make it real</p>
            <h2 id="contact-title" className="mt-4 max-w-2xl text-balance text-5xl font-semibold leading-[0.9] tracking-[-0.065em] sm:text-6xl lg:text-7xl">
              Need an engineer who sees the <span className="display-serif font-normal italic text-[#0b0d0c]/38">whole product?</span>
            </h2>
            <p className="mt-7 max-w-xl text-base leading-7 text-[#0b0d0c]/58 sm:text-lg sm:leading-8">I’m interested in full-stack and product engineering roles where ownership, technical range, and thoughtful execution matter.</p>

            <div className="mt-10 space-y-1">
              {contactLinks.map(({ label, value, href, icon: Icon }) => (
                <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} className="group flex min-h-14 items-center gap-3 rounded-2xl px-2 transition hover:bg-[#0b0d0c]/[0.045] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b0d0c]">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#0b0d0c]/10 bg-white/35"><Icon className="h-4 w-4" /></span>
                  <span className="min-w-0 flex-1"><span className="block text-[8px] font-bold uppercase tracking-[0.16em] text-[#0b0d0c]/35">{label}</span><span className="block truncate text-sm font-medium text-[#0b0d0c]/70">{value}</span></span>
                  <ArrowUpRight className="h-4 w-4 text-[#0b0d0c]/25 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#0b0d0c]" />
                </a>
              ))}
            </div>
            <p className="mt-auto flex items-center gap-2 pt-10 text-xs text-[#0b0d0c]/35"><MapPin className="h-3.5 w-3.5" /> Orlando, Florida · Open to remote</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ delay: 0.08 }} className="rounded-[1.75rem] border border-[#0b0d0c]/10 bg-[#e8e4d9] p-5 shadow-[0_28px_80px_rgba(11,13,12,0.09)] sm:p-8">
            <div className="mb-7 flex items-center justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#0b0d0c]/35">Start a conversation</p><h3 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">Tell me what you&apos;re building.</h3></div><span className="hidden h-3 w-3 rounded-full bg-[#c8ff4a] shadow-[0_0_0_6px_rgba(200,255,74,0.22)] sm:block" /></div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block space-y-2 text-xs font-medium text-[#0b0d0c]/48" htmlFor="contact-name"><span className="block">Name</span><input id="contact-name" name="name" value={formData.name} onChange={handleInputChange} className={fieldClassName} autoComplete="name" placeholder="Your name" required /></label>
                <label className="block space-y-2 text-xs font-medium text-[#0b0d0c]/48" htmlFor="contact-email"><span className="block">Email</span><input id="contact-email" type="email" name="email" value={formData.email} onChange={handleInputChange} className={fieldClassName} autoComplete="email" placeholder="you@company.com" required /></label>
              </div>
              <label className="block space-y-2 text-xs font-medium text-[#0b0d0c]/48" htmlFor="contact-subject"><span className="block">Subject</span><input id="contact-subject" name="subject" value={formData.subject} onChange={handleInputChange} className={fieldClassName} placeholder="Role, product, or idea" required /></label>
              <label className="block space-y-2 text-xs font-medium text-[#0b0d0c]/48" htmlFor="contact-message"><span className="block">Message</span><textarea id="contact-message" name="message" value={formData.message} onChange={handleInputChange} rows={6} className={`${fieldClassName} resize-y`} placeholder="A little context goes a long way…" required /></label>
              <button type="submit" disabled={isSubmitting} className="group flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-[#0b0d0c] px-6 py-3.5 text-sm font-semibold text-[#f4f1e8] transition hover:bg-[#20241f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b0d0c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#e8e4d9] disabled:cursor-not-allowed disabled:opacity-50">
                <span>{isSubmitting ? "Sending…" : isSuccess ? "Message sent" : "Send message"}</span>{!isSubmitting && !isSuccess && <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
              </button>
            </form>
          </motion.div>
        </div>

        <footer className="flex flex-col gap-3 border-t border-[#0b0d0c]/10 px-6 py-6 text-xs text-[#0b0d0c]/35 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16">
          <span>© {new Date().getFullYear()} JayStack. Built end to end.</span><span className="font-medium text-[#0b0d0c]/50">Full-Stack Software Engineer · Product-minded builder</span>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
