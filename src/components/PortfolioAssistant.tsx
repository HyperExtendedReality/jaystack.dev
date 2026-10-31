import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { ArrowUpRight, Code2, Gamepad2, Send, Sparkles, Square, X } from "lucide-react";
import { useReducedMotion } from "motion/react";
import notes from "@/data/portfolio-knowledge.json";
import "./portfolio-assistant.css";

type Source = { id: string; title: string; url: string };
type Message = { role: "user" | "assistant"; content: string; sources?: Source[]; note?: boolean };
const endpoint = import.meta.env.VITE_CHAT_API_URL || (import.meta.env.DEV ? "/api/chat" : "");
const welcome: Message = { role: "assistant", content: "Hey, I’m Pip — Jay’s portfolio sidekick. Curious about his projects, technical toolkit, or how he could fit your team? Let’s find the useful bits." };

function Robot({ tool, thinking = false }: { tool: string; thinking?: boolean }) {
  return <span className={`pip-robot ${thinking ? "is-thinking" : ""}`} aria-hidden="true">
    <span className="pip-antenna" /><span className="pip-head"><span className="pip-face"><i /><i /><b /></span></span>
    <span className="pip-body"><span>{tool === "play" ? <Gamepad2 size={17} /> : <Code2 size={17} />}</span></span>
    <span className="pip-arm pip-left" /><span className="pip-arm pip-right" /><span className="pip-foot pip-foot-left" /><span className="pip-foot pip-foot-right" />
  </span>;
}

export default function PortfolioAssistant({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const reduced = useReducedMotion();
  const [messages, setMessages] = useState<Message[]>([welcome]);
  const [question, setQuestion] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<"checking" | "online" | "offline">("checking");
  const [error, setError] = useState("");
  const [tool, setTool] = useState("code");
  const [look, setLook] = useState({ x: 0, y: 0 });
  const dialog = useRef<HTMLDialogElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const request = useRef<AbortController | null>(null);
  const launcher = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) { dialog.current?.close(); return; }
    dialog.current?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    setStatus("checking");
    if (!endpoint) { setStatus("offline"); clearTimeout(timeout); return; }
    fetch(endpoint, { signal: controller.signal }).then(async response => {
      const data = response.ok ? await response.json() : {};
      setStatus(data.available ? "online" : "offline");
    }).catch(() => { if (!controller.signal.aborted) setStatus("offline"); })
      .finally(() => { clearTimeout(timeout); if (controller.signal.aborted) setStatus("offline"); });
    return () => { clearTimeout(timeout); controller.abort(); };
  }, [open]);
  useEffect(() => { if (log.current) log.current.scrollTop = log.current.scrollHeight; }, [messages, busy, error, open]);
  useEffect(() => () => { request.current?.abort(); }, []);
  useEffect(() => {
    const projects = document.getElementById("projects");
    if (!projects) return;
    const observer = new IntersectionObserver(([entry]) => setTool(entry.isIntersecting ? "play" : "code"), { threshold: 0.15 });
    observer.observe(projects); return () => observer.disconnect();
  }, []);

  function close() { onOpenChange(false); }
  function showNote(note: typeof notes[number]) {
    setMessages(current => [...current, { role: "user", content: note.question }, { role: "assistant", content: note.facts, sources: [note], note: true }]);
  }
  async function ask(text: string) {
    const content = text.trim();
    if (!content || request.current || content.length > 1200) return;
    if (!endpoint || status !== "online") { setError("AI chat is currently offline. Explore the portfolio notes below, or ask Jay directly."); return; }
    setError(""); setQuestion(""); setBusy(true);
    // Send only recent completed turns. Local reference cards aren't AI conversation history.
    const history: { role: "user" | "assistant"; content: string }[] = [];
    for (let i = 1; i < messages.length - 1; i++) {
      if (messages[i].role === "user" && messages[i + 1].role === "assistant" && !messages[i + 1].note) {
        history.push({ role: "user", content: messages[i].content }, { role: "assistant", content: messages[i + 1].content }); i++;
      }
    }
    const pending: Message = { role: "user", content };
    const conversation = [...history.slice(-4), pending];
    setMessages(current => [...current, pending]);
    const controller = new AbortController(); request.current = controller;
    const timeout = setTimeout(() => controller.abort("timeout"), 25000);
    try {
      const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: conversation }), signal: controller.signal });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Pip couldn’t answer right now. Please try again.");
      if (typeof data.answer !== "string" || !data.answer.trim()) throw new Error("Pip received an incomplete answer. Please try again.");
      const sources = Array.isArray(data.sources) ? notes.filter(note => data.sources.some((source: Source) => source.id === note.id)) : [];
      setMessages(current => [...current, { role: "assistant", content: data.answer, sources }]);
    } catch (reason) {
      setMessages(current => current.filter(message => message !== pending));
      setQuestion(content);
      setError(controller.signal.aborted ? (controller.signal.reason === "timeout" ? "That took too long. Your question is saved below — try again." : "Stopped. Your question is ready if you’d like to try again.") : reason instanceof Error ? reason.message : "Pip couldn’t connect. Please try again.");
    } finally { clearTimeout(timeout); request.current = null; setBusy(false); input.current?.focus(); }
  }
  function submit(event: FormEvent) { event.preventDefault(); void ask(question); }
  return <>
    <button ref={launcher} className="pip-launcher" onClick={() => onOpenChange(true)} aria-label="Ask Pip about Jay’s portfolio" aria-haspopup="dialog" aria-expanded={open}
      onPointerMove={event => { if (reduced) return; const rect = event.currentTarget.getBoundingClientRect(); setLook({ x: (event.clientX - rect.left) / rect.width - 0.5, y: (event.clientY - rect.top) / rect.height - 0.5 }); }}
      onPointerLeave={() => setLook({ x: 0, y: 0 })} style={{ "--look-x": `${look.x * 12}deg`, "--look-y": `${-look.y * 10}deg` } as CSSProperties}>
      <span className="pip-bubble">Hiring? <strong>Ask Pip.</strong><Sparkles size={12} /></span><Robot tool={tool} thinking={busy} />
    </button>
    <dialog ref={dialog} className="pip-chat" aria-labelledby="pip-title" aria-describedby="pip-description" onCancel={event => { event.preventDefault(); close(); }} onClose={() => { onOpenChange(false); launcher.current?.focus(); }} onClick={event => { if (event.target === event.currentTarget) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close(); } }}>
      <header className="pip-header"><Robot tool={tool} thinking={busy} /><div><h2 id="pip-title">A little help from Pip.</h2><p id="pip-description">Jay’s portfolio guide <span> / {status === "online" ? "AI connected" : status === "checking" ? "Connecting…" : "Portfolio notes"}</span></p></div><button onClick={close} aria-label="Close portfolio chat"><X size={19} /></button></header>
      <div ref={log} className="pip-messages" role="log" aria-label="Conversation with Pip" aria-live="polite" aria-relevant="additions" aria-busy={busy}>
        {messages.map((message, index) => <div key={index} className={`pip-message pip-${message.role}`}><span className="pip-message-author">{message.role === "user" ? "YOU" : message.note ? "PIP / PORTFOLIO NOTE" : index === 0 ? "PIP" : "PIP / AI"}</span><p>{message.content}</p>{!!message.sources?.length && <div className="pip-sources">{message.sources.map(source => <a key={source.id} href={source.url} onClick={() => { if (source.url.startsWith("#")) close(); }} target={source.url.startsWith("https:") ? "_blank" : undefined} rel="noreferrer">{source.title}<ArrowUpRight size={12} /></a>)}</div>}</div>)}
        {busy && <div className="pip-thinking" role="status"><span /><span /><span /> Checking Jay’s portfolio…</div>}
      </div>
      {error && <p className="pip-error" role="alert">{error}</p>}
      <div className="pip-prompts"><span>{status === "online" ? "A FEW GOOD QUESTIONS" : "EXPLORE THE PORTFOLIO NOTES"}</span><div>{[notes[0], notes[1], notes[4], notes[7]].map(note => <button key={note.id} disabled={busy || status === "checking"} onClick={() => status === "online" ? void ask(note.question) : showNote(note)}>{note.question}</button>)}</div></div>
      <form onSubmit={submit} className="pip-form" noValidate><label htmlFor="pip-question" className="sr-only">Your question about Jay</label><input ref={input} id="pip-question" autoFocus value={question} onChange={event => setQuestion(event.target.value)} maxLength={1200} placeholder={status === "offline" ? "AI offline — browse the notes above" : "Ask about Jay’s work…"} disabled={busy || status !== "online"} autoComplete="off" />{busy ? <button type="button" onClick={() => request.current?.abort()} aria-label="Stop response"><Square size={16} /></button> : <button type="submit" disabled={!question.trim() || status !== "online"} aria-label="Send question"><Send size={17} /></button>}</form>
      <footer className="pip-footer"><span>{status === "online" ? "AI can make mistakes. Messages are sent to OpenAI; chat stays in this tab." : "AI chat is offline. These are saved portfolio facts."}</span><a href="mailto:jaystack.dev@gmail.com">Ask Jay directly ↗</a></footer>
    </dialog>
  </>;
}
