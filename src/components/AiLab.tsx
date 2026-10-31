import type { CSSProperties } from "react";
import { ArrowUpRight, MessageCircle, ScanLine } from "lucide-react";
import { SiPython, SiReact, SiTensorflow, SiZod, SiNodedotjs } from "react-icons/si";
import camera from "../assets/camera.webp";
import { Stack } from "./Builds";
const pipeline = ["Data", "Train", "Quantize", "Serve"];

export default function AiLab({ onAsk }: { onAsk: () => void }) {
  return (
    <section id="ai" className="ai-section section-shell" aria-labelledby="ai-title">
      <div className="section-heading">
        <h2 id="ai-title">Applied AI,<br /><em>end to end.</em></h2>
        <p>From training and quantizing models, to running them offline on a phone, to a grounded assistant you can talk to on this page.</p>
      </div>
      <div className="ai-grid">
        <article className="ai-card ai-vision">
          <div className="ai-visual vision-visual" aria-hidden="true">
            <img src={camera} alt="" loading="lazy" />
            <span className="scan-box"><i /></span>
            <span className="scan-label mono">COMMON PUFFBALL · 88%</span>
          </div>
          <span className="mono eyebrow">ON-DEVICE COMPUTER VISION</span>
          <h3>A vision model that works off the grid.</h3>
          <p>FungEye runs a distilled YOLO11 classifier on the phone itself, so identification keeps working with no signal. The confidence shown is from the app’s sample screens.</p>
          <Stack items={[["Python", SiPython, "#3776AB"], ["TensorFlow", SiTensorflow, "#FF6F00"], ["React Native", SiReact, "#61DAFB"]]} />
          <a className="text-link" href="#fungeye"><ScanLine size={16} /> Try the scan flow</a>
        </article>
        <article className="ai-card ai-pip">
          <div className="ai-visual pip-visual" aria-hidden="true">
            <p className="pip-q">Tell me about his AI work.</p>
            <p className="pip-a">FungEye identifies mushrooms with on-device inference, built from the interface to the model.<span className="mono">SOURCE · FUNGEYE</span></p>
          </div>
          <span className="mono eyebrow">GROUNDED ASSISTANT</span>
          <h3>Pip answers from the facts, and cites them.</h3>
          <p>The OpenAI Responses API returns structured JSON that must cite note IDs from a curated knowledge file. Requests are validated with Zod and guarded by an origin allowlist, per-client rate limits and a request budget.</p>
          <Stack items={[["Node.js", SiNodedotjs, "#5FA04E"], ["Zod", SiZod, "#408AFF"], ["React", SiReact, "#61DAFB"]]} />
          <button type="button" className="text-link" onClick={onAsk}><MessageCircle size={16} /> Ask Pip a question</button>
        </article>
        <article className="ai-card ai-pipeline">
          <ol className="ai-visual pipeline-visual" aria-label="Model delivery pipeline">
            {pipeline.map((step, index) => <li key={step} style={{ "--i": index } as CSSProperties}><span className="mono">{step}</span></li>)}
          </ol>
          <span className="mono eyebrow">MODELS TO PRODUCTION</span>
          <h3>From training run to a dependable API.</h3>
          <p>Training, fine-tuning and quantizing models, then delivering them through inference APIs that apps can rely on. Smaller models where they fit, so they run fast and cheaply.</p>
          <Stack items={[["Python", SiPython, "#3776AB"], ["TensorFlow", SiTensorflow, "#FF6F00"]]} />
          <a className="text-link" href="#contact">Talk about an AI feature <ArrowUpRight size={16} /></a>
        </article>
      </div>
    </section>
  );
}
