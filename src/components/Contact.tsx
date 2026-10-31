import { useRef, useState } from "react";
import { motion, type MotionStyle } from "motion/react";
import { useScrollVar } from "@/hooks/use-scroll-var";
import { ArrowUp, ArrowUpRight, Check, Github, Linkedin, LoaderCircle, Mail, MapPin, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import { Textarea } from "@/components/ui/textarea";

const contactLinks = [
  { label: "GitHub", href: "https://github.com/HyperExtendedReality", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com/in/jb-hyperxr/", icon: Linkedin },
];
const initialData = { name: "", email: "", subject: "", message: "" };
type FieldName = keyof typeof initialData;
type FieldErrors = Partial<Record<FieldName, string>>;
const fields: { name: FieldName; label: string; placeholder: string; type?: string; autoComplete?: string }[] = [
  { name: "name", label: "Name", placeholder: "Your name", autoComplete: "name" },
  { name: "email", label: "Email", placeholder: "you@company.com", type: "email", autoComplete: "email" },
  { name: "subject", label: "Subject", placeholder: "A role, a product, an idea" },
  { name: "message", label: "Message", placeholder: "Tell me a little about what you have in mind…" },
];

export default function Contact() {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const sending = useRef(false);
  const form = useRef<HTMLFormElement>(null);
  const section = useRef<HTMLElement>(null);
  const progress = useScrollVar(section, ["start end", "start 0.25"]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (sending.current) return;
    const values = Object.fromEntries(Object.entries(formData).map(([key, value]) => [key, value.trim()])) as typeof initialData;
    const nextErrors: FieldErrors = {};
    for (const { name, label } of fields) {
      if (!values[name]) nextErrors[name] = `Please enter your ${label.toLowerCase()}.`;
    }
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = "Enter an email address like you@company.com.";
    }
    setErrors(nextErrors);
    const invalidField = fields.find(({ name }) => nextErrors[name]);
    if (invalidField) {
      setStatus("idle");
      form.current?.querySelector<HTMLElement>(`[name="${invalidField.name}"]`)?.focus();
      return;
    }
    sending.current = true;
    setStatus("sending");
    const params = { name: values.name, email: values.email, title: values.subject, message: values.message };
    try {
      await Promise.all([
        emailjs.send("service_sk53gp9", "template_nyjop5e", params, "eVzC94wmV_OUuTQn0"),
        emailjs.send("service_sk53gp9", "template_il66wjv", params, "eVzC94wmV_OUuTQn0"),
      ]);
      setStatus("success");
      setFormData(initialData);
    } catch {
      setStatus("error");
    } finally {
      sending.current = false;
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = event.target.name as FieldName;
    setFormData((current) => ({ ...current, [name]: event.target.value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    if (status !== "sending") setStatus("idle");
  };

  return (
    <motion.section ref={section} id="contact" className="contact-section section-shell" aria-labelledby="contact-title" style={{ "--p": progress } as MotionStyle}>
      <div className="contact-panel">
        <div className="contact-layout">
          <div className="contact-copy">
            <span className="contact-availability mono"><span className="status-dot" /> OPEN TO FULL-STACK OPPORTUNITIES</span>
            <h2 id="contact-title"><span className="close-line"><span>Let’s build</span></span><span className="close-line"><em>what’s next.</em></span></h2>
            <p>Looking for an engineer who can connect the interface, the infrastructure, and everything in between? Let’s talk.</p>
            <a className="contact-email" href="mailto:jaystack.dev@gmail.com"><Mail size={19} /><span>jaystack.dev@gmail.com</span><ArrowUpRight size={20} /></a>
            <div className="contact-socials">
              {contactLinks.map(({ label, href, icon: Icon }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer"><Icon size={16} />{label}<ArrowUpRight size={15} /></a>
              ))}
            </div>
            <p className="contact-location"><MapPin size={15} /> Orlando, Florida</p>
          </div>
          <form ref={form} onSubmit={handleSubmit} className="contact-form" noValidate aria-busy={status === "sending"}>
            <div className="contact-form-heading"><span className="mono">START A CONVERSATION</span><h3>What are you working on?</h3></div>
            <div className="contact-fields">
              {fields.map(({ name, label, placeholder, type, autoComplete }) => {
                const props = {
                  id: `contact-${name}`, name, value: formData[name], onChange: handleChange,
                  placeholder, required: true, disabled: status === "sending",
                  "aria-invalid": !!errors[name], "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
                };
                return (
                  <div className={`contact-field field-${name}`} key={name}>
                    <label htmlFor={props.id}>{label}</label>
                    {name === "message" ? <Textarea {...props} rows={5} className="resize-none" /> : <input {...props} type={type || "text"} autoComplete={autoComplete} />}
                    <p className="field-error" id={`contact-${name}-error`}>{errors[name]}</p>
                  </div>
                );
              })}
            </div>
            <button className="contact-send" type="submit" disabled={status === "sending"}>
              {status === "sending" ? <LoaderCircle className="sending-icon" size={18} /> : status === "success" ? <Check size={18} /> : <Send size={18} />}
              <span>{status === "sending" ? "Sending…" : status === "success" ? "Message sent" : "Send message"}</span>
              <ArrowUpRight size={18} />
            </button>
            <div className="contact-feedback" role="status" aria-live="polite">
              {status === "success" ? <p>Thanks for reaching out. Your message has been sent to Jay.</p> : status === "error" ? <p>Delivery could not be confirmed. Your message is still here. You can <a href="mailto:jaystack.dev@gmail.com">email Jay directly</a>.</p> : <p>Prefer email? You can also reach me directly.</p>}
            </div>
          </form>
        </div>
        <footer className="contact-footer"><span>© {new Date().getFullYear()} JayStack</span><span>Built with curiosity. Refined with care.</span><a href="#home">Back to top <ArrowUp size={14} /></a></footer>
      </div>
    </motion.section>
  );
}
