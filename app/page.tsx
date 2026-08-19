import { ContactForm } from "@/components/contact-form";
import { FaqList } from "@/components/faq-list";
import { Hero } from "@/components/hero";
import { ProjectShowcase } from "@/components/project-showcase";
import { LionProjectShowcase } from "@/components/lion-project-showcase";
import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";
import { BrandLockup } from "@/components/brand-lockup";
import { faqs } from "@/content/faqs";

const capabilities = [
  {
    number: "01",
    title: "Modern design",
    body: "Custom layouts built around your business, your customers, and the action you want visitors to take.",
  },
  {
    number: "02",
    title: "Fast performance",
    body: "Lean, responsive builds designed to feel quick on phones, tablets, and desktops.",
  },
  {
    number: "03",
    title: "Built to convert",
    body: "Clear hierarchy, strong calls to action, and fewer distractions between a visitor and a new lead.",
  },
  {
    number: "04",
    title: "Search-ready",
    body: "Technical SEO foundations, metadata, structured content, and launch setup that help search engines understand your site.",
  },
];

const process = [
  ["01", "Discover", "You tell me about the business, the customer, the offer, and what the page needs to accomplish."],
  ["02", "Design", "I turn that into a focused visual direction and page structure built around your brand and message."],
  ["03", "Build", "The approved direction becomes a fast, responsive React site with the important details dialed in."],
  ["04", "Launch", "I connect the domain, verify the essentials, deploy the site, and stay available after launch."],
] as const;

const packageFeatures = [
  "Custom landing-page design",
  "Responsive React development",
  "Conversion-focused page structure",
  "Contact / lead capture form",
  "Basic on-page + technical SEO",
  "Analytics-ready setup",
  "Performance optimization",
  "Vercel deployment + domain connection",
  "Two revision rounds",
  "30 days of post-launch support",
];

const areas = ["Dallas", "Richardson", "Plano", "Garland", "Fort Worth"];

const jakeProjectFacts = [
  ["End-to-end", "Strategy, design + development"],
  ["WordPress", "Flexible content management"],
  ["SEO", "Search-ready structure + setup"],
] as const;

const lionProjectFacts = [
  ["Headless", "Next.js storefront + WooCommerce backend"],
  ["Commerce", "Inventory, checkout + order workflow"],
  ["Launch", "DNS, email, SEO + analytics setup"],
] as const;

export default function Home() {
  const businessId = "https://theark.io/#business";
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": businessId,
      name: "The Ark",
      url: "https://theark.io",
      email: "Stephen@theark.io",
      description:
        "Custom landing-page design and development for small businesses in Dallas-Fort Worth and beyond.",
      areaServed: [
        ...areas.map((name) => ({ "@type": "City", name: `${name}, Texas` })),
        { "@type": "AdministrativeArea", name: "Dallas–Fort Worth metroplex" },
        { "@type": "Country", name: "United States" },
      ],
      serviceType: ["Web Design", "Landing Page Design", "Web Development", "Technical SEO"],
      knowsAbout: [
        "Landing page design",
        "Responsive web design",
        "React development",
        "Technical SEO",
        "Website performance",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "Stephen@theark.io",
        availableLanguage: ["English"],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Custom Landing Page Design & Development",
      serviceType: "Landing page web design and development",
      provider: { "@id": businessId },
      areaServed: [
        ...areas.map((name) => ({ "@type": "City", name: `${name}, Texas` })),
        { "@type": "Country", name: "United States" },
      ],
      description:
        "Custom, conversion-focused landing page design, React development, technical SEO, launch, and optional ongoing maintenance.",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://theark.io/#website",
      name: "The Ark",
      url: "https://theark.io",
      publisher: { "@id": businessId },
      description: "Custom landing pages for small businesses in Dallas-Fort Worth and beyond.",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
        },
      })),
    },
  ];

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />

      <main id="main-content">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <Hero />

        <section id="services" className="section section-light border-top">
          <div className="shell">
            <Reveal>
              <div className="eyebrow-row">
                <span>02 / What I build</span>
                <span>One focused page. One clear job.</span>
              </div>
              <div className="section-heading-grid">
                <h2>Simple, powerful websites for real businesses.</h2>
                <p>
                  The Ark builds focused landing pages that help small businesses look established,
                  explain what they do quickly, and turn attention into calls, bookings, quote requests, and leads.
                </p>
              </div>
            </Reveal>

            <div className="capability-grid">
              {capabilities.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.05}>
                  <article className="capability-card">
                    <span className="capability-number">{item.number}</span>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <div className="outcome-strip" aria-label="Common landing page goals">
                <span className="outcome-label">Built around one clear outcome</span>
                <div className="outcome-list">
                  {["More calls", "Quote requests", "Bookings", "Credibility"].map((outcome) => (
                    <span key={outcome}>{outcome}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="work" className="section section-ink border-top border-dark">
          <div className="shell">
            <Reveal>
              <div className="eyebrow-row eyebrow-row-dark">
                <span>03 / Featured work</span>
                <span>Selected client launches</span>
              </div>
            </Reveal>

            <div className="project-layout">
              <Reveal className="project-copy">
                <p className="project-kicker">Jake Groves Music</p>
                <h2>Music.<br />Built online.</h2>
                <p className="project-description">
                  A complete digital home for musician Jake Groves—bringing live events, media,
                  collaborations, community content, and his story together in one cohesive experience.
                </p>
                <div className="tag-list" aria-label="Project services">
                  {["Strategy", "Web Design", "Development", "WordPress", "SEO"].map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <a
                  className="text-link text-link-light"
                  href="https://jakegrovesmusic.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit the live site <span aria-hidden="true">↗</span>
                </a>
              </Reveal>

              <Reveal delay={0.08}>
                <ProjectShowcase />
              </Reveal>
            </div>

            <div className="project-facts" aria-label="Jake Groves Music project scope">
              {jakeProjectFacts.map(([value, label], index) => (
                <Reveal key={value} delay={index * 0.05}>
                  <div className="project-fact">
                    <span>{value}</span>
                    <p>{label}</p>
                  </div>
                </Reveal>
              ))}
              <Reveal delay={0.15}>
                <div className="project-fact project-fact-note">
                  <span>Built to evolve</span>
                  <p>A content system Jake can keep using as his music, events, and audience grow.</p>
                </div>
              </Reveal>
            </div>

            <div className="portfolio-divider" aria-hidden="true">
              <span>02 / Lion RUO Peptides</span>
              <span>Headless commerce · Production launch</span>
            </div>

            <div className="project-layout project-layout-secondary">
              <Reveal className="project-copy">
                <p className="project-kicker">Lion RUO Peptides</p>
                <h2>Research.<br />Built clean.</h2>
                <p className="project-description">
                  A production ecommerce storefront for a research-use-only catalog—pairing a custom
                  Next.js frontend with WooCommerce inventory and order management, transactional email,
                  shipping logic, technical SEO, and a decoupled WordPress backend.
                </p>
                <div className="tag-list" aria-label="Lion RUO Peptides project services">
                  {["Strategy", "Web Design", "Next.js", "WooCommerce", "Headless CMS", "Vercel"].map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <a
                  className="text-link text-link-light"
                  href="https://lionruopeptides.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit the live site <span aria-hidden="true">↗</span>
                </a>
              </Reveal>

              <Reveal delay={0.08}>
                <LionProjectShowcase />
              </Reveal>
            </div>

            <div className="project-facts" aria-label="Lion RUO Peptides project scope">
              {lionProjectFacts.map(([value, label], index) => (
                <Reveal key={value} delay={index * 0.05}>
                  <div className="project-fact">
                    <span>{value}</span>
                    <p>{label}</p>
                  </div>
                </Reveal>
              ))}
              <Reveal delay={0.15}>
                <div className="project-fact project-fact-note">
                  <span>Built for operations</span>
                  <p>The client manages products, stock, and orders in WooCommerce while the public storefront stays fast and focused.</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="why" className="section section-light border-top">
          <div className="shell">
            <Reveal>
              <div className="eyebrow-row">
                <span>04 / Why The Ark</span>
                <span>Small studio. Focused work.</span>
              </div>
              <div className="section-heading-grid section-heading-grid-wide">
                <h2>Better websites.<br />Fewer barriers.</h2>
                <p>
                  No agency handoffs and no bloated process. You work directly with the person
                  designing and building your site—from the first conversation through launch and support.
                </p>
              </div>
            </Reveal>

            <div className="why-grid">
              {[
                ["Direct communication", "Work directly with me throughout the project."],
                ["Thoughtful design", "No one-size-fits-all template pretending to understand your business."],
                ["Reliable delivery", "Clear milestones and a typical one-week build once requirements and assets are ready."],
                ["Built for performance", "Fast, modern, responsive code from day one."],
                ["Conversion focused", "Every section has a job: establish trust, answer questions, or move the visitor forward."],
                ["Support after launch", "I stay available for maintenance instead of disappearing when the site goes live."],
              ].map(([title, body], index) => (
                <Reveal key={title} delay={index * 0.04}>
                  <article className="why-item">
                    <span className="why-mark" aria-hidden="true">↳</span>
                    <div><h3>{title}</h3><p>{body}</p></div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="section section-ink border-top border-dark">
          <div className="shell">
            <Reveal>
              <div className="eyebrow-row eyebrow-row-dark">
                <span>05 / The process</span>
                <span>Typical build: about one week*</span>
              </div>
              <div className="process-heading">
                <h2>From idea to launch—<br />in four clear steps.</h2>
                <p>*Timeline begins once requirements, content, and needed brand assets are ready.</p>
              </div>
            </Reveal>

            <div className="process-grid">
              {process.map(([number, title, body], index) => (
                <Reveal key={title} delay={index * 0.05}>
                  <article className="process-step">
                    <span>{number}</span>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="service-area" className="service-area section-light border-top">
          <div className="shell service-area-inner">
            <Reveal>
              <span className="mini-label">06 / Service area</span>
              <h2>Based in DFW.<br />Building everywhere.</h2>
            </Reveal>
            <Reveal className="area-copy" delay={0.08}>
              <p>
                The Ark provides landing-page web design for small businesses across Dallas,
                Richardson, Plano, Garland, Fort Worth, and the surrounding Dallas–Fort Worth area.
                Remote projects are welcome anywhere in the U.S.
              </p>
              <div className="area-list">
                {areas.map((area) => <span key={area}>{area}</span>)}
                <span>DFW</span>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="package" className="section section-light border-top">
          <div className="shell package-layout">
            <Reveal className="package-heading">
              <span className="mini-label">07 / The package</span>
              <h2>One focused page. Everything it needs.</h2>
              <p>
                Every project is scoped around the business, so pricing stays private until I understand
                the content, integrations, and work required. You get a clear scope before we start.
              </p>
              <a className="button button-dark" href="#contact">Start a Project <span>→</span></a>
            </Reveal>

            <Reveal className="package-card" delay={0.08}>
              <div className="package-card-top">
                <span>Custom Landing Page</span>
                <span>Design · Development · Launch</span>
              </div>
              <ul>
                {packageFeatures.map((feature) => <li key={feature}><span>✓</span>{feature}</li>)}
              </ul>
              <div className="care-callout">
                <div>
                  <span className="care-label">Optional</span>
                  <strong>Ark Care</strong>
                </div>
                <p>
                  Ongoing maintenance for content updates, monitoring, minor fixes, and keeping the site
                  healthy after launch. Bigger features stay separate so maintenance never becomes an unlimited-work promise.
                </p>
              </div>

              <div className="scope-fit-grid">
                <div className="scope-fit-card">
                  <span className="scope-fit-label">A strong fit</span>
                  <h3>You need one page to do one job extremely well.</h3>
                  <ul>
                    <li>Local or service-based business</li>
                    <li>One clear offer or primary call to action</li>
                    <li>Need to look established and trustworthy</li>
                    <li>Want direct access to the person doing the work</li>
                  </ul>
                </div>
                <div className="scope-fit-card scope-fit-card-muted">
                  <span className="scope-fit-label">Usually a custom scope</span>
                  <h3>You need more than a focused landing page.</h3>
                  <ul>
                    <li>Large multi-page content sites</li>
                    <li>Ecommerce catalogs or checkout systems</li>
                    <li>Customer portals or web applications</li>
                    <li>Complex custom integrations</li>
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="faq" className="section section-paper border-top">
          <div className="shell faq-layout">
            <Reveal>
              <span className="mini-label">08 / FAQ</span>
              <h2>Questions?<br />I’ve got answers.</h2>
              <p className="faq-intro">
                If your project does not fit neatly into one of these answers, send it anyway. I can tell you quickly whether it is a fit.
              </p>
            </Reveal>
            <Reveal delay={0.08}><FaqList /></Reveal>
          </div>
        </section>

        <section id="contact" className="contact-section section-ink border-top border-dark">
          <div className="shell contact-layout">
            <Reveal className="contact-copy">
              <span className="mini-label mini-label-light">09 / Start a project</span>
              <h2>Ready to move your business forward?</h2>
              <p>
                Tell me what you are building, what the website should help customers do, and when you hope to launch.
                I’ll reply directly at <a href="mailto:Stephen@theark.io">Stephen@theark.io</a>.
              </p>
              <div className="contact-notes">
                <span>Dallas–Fort Worth + remote</span>
                <span>Typical landing-page build: ~1 week*</span>
                <span>Maintenance available after launch</span>
              </div>
            </Reveal>
            <Reveal delay={0.08}><ContactForm /></Reveal>
          </div>
        </section>

        <footer className="site-footer">
          <div className="shell footer-topline">
            <span className="footer-signature"><BrandLockup markOnly tone="gold" /> Landing-page design &amp; development for small businesses.</span>
            <a href="#top">Back to top ↑</a>
          </div>
          <div className="shell footer-wordmark" aria-hidden="true">The Ark</div>
          <div className="shell footer-inner">
            <a href="mailto:Stephen@theark.io">Stephen@theark.io</a>
            <span>Dallas–Fort Worth · Remote projects welcome</span>
            <span>© {new Date().getFullYear()} The Ark</span>
          </div>
        </footer>
      </main>
    </>
  );
}
