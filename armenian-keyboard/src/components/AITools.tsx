import { brand } from "@/config/brand";

interface ToolDefinition {
  icon: string;
  title: string;
  description: string;
  cta: string;
  href: string;
}

const tools: ToolDefinition[] = [
  { icon: "✓", title: "Armenian Translation Tool", description: "Get spelling and grammar suggestions.", cta: "Check text →", href: brand.links.translator },
  { icon: "⇄", title: "Try Armenian verb tool", description: "Switch between Western and Eastern Armenian.", cta: "Convert →", href: brand.links.verbs },
  { icon: "✦", title: "Join Armenian Social Network", description: "Explain, improve or create more with AI.", cta: "Ask a question →", href: brand.links.socialNetwork },
  { icon: "♧", title: "Try 4 lessons for $1", description: "Save words from your text to practise later.", cta: "Save words →", href: brand.links.getStarted },
];

export function AITools() {
  return (
    <section className="smart-tools-section" aria-labelledby="smart-tools-title">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Smart learning tools</p>
          <h2 id="smart-tools-title">Do more with your Armenian</h2>
        </div>
      </div>

      <div className="feature-card-grid">
        {tools.map((tool) => (
          <article className="feature-card" key={tool.title}>
            <span className="feature-icon" aria-hidden="true">{tool.icon}</span>
            <div>
              <h3>{tool.title}</h3>
              <p>{tool.description}</p>
              <a className="outline-action" href={tool.href} target="_blank" rel="noopener noreferrer">
                {tool.cta}
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
