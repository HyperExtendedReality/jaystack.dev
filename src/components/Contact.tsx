import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Terminal, Mail, Github, Linkedin, MapPin, Send, Minus, Square, X, Cpu } from "lucide-react";
import emailjs from '@emailjs/browser';
import { toast } from "sonner";

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
    const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [latency, setLatency] = useState<number | null>(null);

  useEffect(() => {
    const measureLatency = async () => {
      try {
        const start = performance.now();
        await fetch(window.location.origin, { method: 'HEAD' });
        const end = performance.now();
        setLatency(Math.round(end - start));
      } catch (e) {
        // Fallback or ignore errors silently for UI aesthetics
        setLatency(null);
      }
    };

    measureLatency();
    const interval = setInterval(measureLatency, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceId = 'service_sk53gp9';
    const adminTemplateId = 'template_nyjop5e'; // Admin Notification
    const clientTemplateId = 'template_il66wjv'; // Client Auto-Reply
    const publicKey = 'eVzC94wmV_OUuTQn0';

    try {
        // Send Admin Notification
        const adminParams = {
            name: formData.name,
            email: formData.email,
            title: formData.subject,
            message: formData.message,
        };
        
        // Send Client Auto-Reply
        const clientParams = {
            name: formData.name,
            email: formData.email,
            title: formData.subject,
            message: formData.message,
        };

        await Promise.all([
            emailjs.send(serviceId, adminTemplateId, adminParams, publicKey),
            emailjs.send(serviceId, clientTemplateId, clientParams, publicKey)
        ]);

        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        toast.success("Message transmitted successfully!");
        setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
        console.error('FAILED...', error);
        setIsSubmitting(false);
        toast.error("Transmission failed. Please try again.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-12 px-4 relative">
        {/* Background Elements removed as requested */}
        
        <div className="max-w-5xl mx-auto relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-8"
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight">
                    Get In Touch
                </h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    Ready to bring your ideas to life? Let's collaborate on your next big project.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative rounded-xl overflow-hidden bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl shadow-green-900/20 ring-1 ring-white/5"
            >
                {/* Window Header */}
                <div className="bg-white/5 px-4 py-3 border-b border-white/5 flex items-center justify-between backdrop-blur-md">
                    <div className="flex items-center gap-2">
                        <Terminal className="w-3.5 h-3.5 text-green-500" />
                        <span className="text-xs font-mono text-green-500/80 tracking-wide">secure_uplink.exe</span>
                    </div>
                    <div className="flex gap-3">
                        <Minus className="w-3 h-3 text-gray-500 hover:text-white cursor-pointer transition-colors" />
                        <Square className="w-2.5 h-2.5 text-gray-500 hover:text-white cursor-pointer transition-colors" />
                        <X className="w-3 h-3 text-gray-500 hover:text-red-500 cursor-pointer transition-colors" />
                    </div>
                </div>

                <div className="grid md:grid-cols-12 p-0">
                    {/* Sidebar / System Stats - 4 cols */}
                    <div className="md:col-span-4 bg-black/20 p-6 border-r border-white/5 flex flex-col justify-between">
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-[10px] font-mono text-green-500/50 mb-6 uppercase tracking-widest border-b border-green-500/10 pb-2">System_Status</h3>
                                <div className="space-y-4">
                                    <div className="group p-3 rounded-lg bg-white/5 border border-white/5 hover:border-green-500/30 transition-all duration-300">
                                        <div className="flex items-center justify-between text-sm font-mono mb-1">
                                            <span className="text-gray-400 flex items-center gap-2"><Cpu className="w-3 h-3 text-green-500" /> Latency</span>
                                            <span className="text-green-400 text-xs">{latency ? `${latency}ms` : '---'}</span>
                                        </div>
                                        <div className="flex gap-0.5 mt-1">
                                            {[1,2,3,4,5].map(i => (
                                                <div key={i} className={`h-1 flex-1 rounded-full ${i < 5 ? 'bg-green-500' : 'bg-gray-800'} ${latency ? 'opacity-100' : 'opacity-50'}`} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-[10px] font-mono text-green-500/50 mb-6 uppercase tracking-widest border-b border-green-500/10 pb-2">Direct_Link</h3>
                                <div className="space-y-3">
                                    <a href="mailto:jaystack.dev@gmail.com" className="flex items-center gap-3 text-gray-400 hover:text-white transition-all group p-2 rounded-lg hover:bg-white/5">
                                        <div className="p-2 bg-white/5 rounded-md group-hover:bg-green-500/20 group-hover:text-green-400 transition-colors">
                                            <Mail className="w-4 h-4" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs text-gray-500 font-mono">Email</span>
                                            <span className="text-sm font-medium">jaystack.dev@gmail.com</span>
                                        </div>
                                    </a>
                                    <a href="https://github.com/HyperExtendedReality" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-white transition-all group p-2 rounded-lg hover:bg-white/5">
                                        <div className="p-2 bg-white/5 rounded-md group-hover:bg-green-500/20 group-hover:text-green-400 transition-colors">
                                            <Github className="w-4 h-4" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs text-gray-500 font-mono">GitHub</span>
                                            <span className="text-sm font-medium">@HyperExtendedReality</span>
                                        </div>
                                    </a>
                                    <a href="https://linkedin.com/in/jb-hyperxr/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-white transition-all group p-2 rounded-lg hover:bg-white/5">
                                        <div className="p-2 bg-white/5 rounded-md group-hover:bg-green-500/20 group-hover:text-green-400 transition-colors">
                                            <Linkedin className="w-4 h-4" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs text-gray-500 font-mono">LinkedIn</span>
                                            <span className="text-sm font-medium">/in/jb-hyperxr</span>
                                        </div>
                                    </a>
                                    <div className="flex items-center gap-3 text-gray-400 p-2 rounded-lg">
                                        <div className="p-2 bg-white/5 rounded-md">
                                            <MapPin className="w-4 h-4" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs text-gray-500 font-mono">Location</span>
                                            <span className="text-sm font-medium">Orlando, FL</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-8 pt-6 border-t border-white/5">
                            <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <div className="flex flex-col">
                                    <span className="text-green-500/80 font-semibold">System Online</span>
                                    <span className="text-[10px] opacity-60">Ready for connection</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Form Area - 8 cols */}
                    <div className="md:col-span-8 p-6 md:p-10 bg-gradient-to-br from-transparent to-white/5">
                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-mono text-green-500 ml-1">name:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder=""
                                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-gray-200 font-mono text-sm placeholder:text-gray-700 focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 outline-none transition-all hover:border-white/20 shadow-[0_0_15px_rgba(74,222,128,0.05)] focus:shadow-[0_0_20px_rgba(74,222,128,0.15)]"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-mono text-green-500 ml-1">email:</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder=""
                                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-gray-200 font-mono text-sm placeholder:text-gray-700 focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 outline-none transition-all hover:border-white/20 shadow-[0_0_15px_rgba(74,222,128,0.05)] focus:shadow-[0_0_20px_rgba(74,222,128,0.15)]"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-mono text-green-500 ml-1">subject:</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    placeholder=""
                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-gray-200 font-mono text-sm placeholder:text-gray-700 focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 outline-none transition-all hover:border-white/20 shadow-[0_0_15px_rgba(74,222,128,0.05)] focus:shadow-[0_0_20px_rgba(74,222,128,0.15)]"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-mono text-green-500 ml-1">message:</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows={6}
                                    placeholder=""
                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-gray-200 font-mono text-sm placeholder:text-gray-700 focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 outline-none transition-all resize-none hover:border-white/20 shadow-[0_0_15px_rgba(74,222,128,0.05)] focus:shadow-[0_0_20px_rgba(74,222,128,0.15)]"
                                    required
                                />
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-green-500/10 to-green-500/20 hover:from-green-500/20 hover:to-green-500/30 border border-green-500/50 text-green-400 font-mono py-4 rounded-lg flex items-center justify-center gap-3 transition-all hover:shadow-[0_0_30px_rgba(74,222,128,0.1)] disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-green-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                    {isSubmitting ? (
                                        <span className="animate-pulse relative z-10">Transmitting...</span>
                                    ) : isSuccess ? (
                                        <span className="text-green-400 relative z-10">Transmission Complete ✓</span>
                                    ) : (
                                        <>
                                            <span className="relative z-10">Send</span>
                                            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </motion.div>
        </div>
    </section>
  );
};

export default Contact;
