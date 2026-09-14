import { brand } from "@/config/brand";

interface ToolDefinition {
  icon: string;
  title: string;
  description: string;
  cta: string;
  href: string;
}

const tools: ToolDefinition[] = [
  { icon: "✓", title: "Armenian Translation Tool", description: "Translate English to Armenian instantly", cta: "English to Armenian translation", href: brand.links.translator },
  { icon: "⇄", title: "Armenian Verb Conjugations", description: "Learn the correct Armenian verb tenses", cta: "Try Armenian verb tool", href: brand.links.verbs },
  { icon: "✦", title: "⁠Armenian Social Network", description: "Practice speaking with Armenians online", cta: "⁠Join Armenian Social Network", href: brand.links.socialNetwork },
  { icon: "♧", title: "⁠⁠Learn Armenian Online", description: "Join thousands learning Eastern and Western Armenian online", cta: "Try 4 lessons for $1", href: brand.links.getStarted },
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
