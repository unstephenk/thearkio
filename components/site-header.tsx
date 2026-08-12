"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { BrandLockup } from "./brand-lockup";

const links = [
  ["Work", "#work"],
  ["Process", "#process"],
  ["Services", "#package"],
  ["FAQ", "#faq"],
] as const;

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>("");
  const reduceMotion = useReducedMotion();
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 24);
      setProgress(max > 0 ? Math.min(y / max, 1) : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const sectionIds = links.map(([, href]) => href.slice(1));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-25% 0px -58% 0px", threshold: [0.05, 0.2, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 961px)");
    const closeAtDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    media.addEventListener("change", closeAtDesktop);
    return () => media.removeEventListener("change", closeAtDesktop);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const main = document.querySelector<HTMLElement>("main");
    const footer = document.querySelector<HTMLElement>("footer");

    document.body.style.overflow = "hidden";
    if (main) main.inert = true;
    if (footer) footer.inert = true;

    const frame = window.requestAnimationFrame(() => {
      const firstMenuLink = headerRef.current?.querySelector<HTMLElement>("#mobile-menu a[href]");
      firstMenuLink?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key !== "Tab" || !headerRef.current) return;

      const focusables = Array.from(
        headerRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter((element) => !element.hasAttribute("disabled") && element.offsetParent !== null);

      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      if (main) main.inert = false;
      if (footer) footer.inert = false;
      window.removeEventListener("keydown", onKeyDown);
      if (menuButtonRef.current?.offsetParent !== null) {
        menuButtonRef.current?.focus({ preventScroll: true });
      }
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      className={`site-header ${scrolled ? "is-scrolled" : ""} ${open ? "menu-open" : ""}`}
    >
      <div className="header-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>
      <div className="shell header-inner">
        <a className="brand" href="#top" onClick={() => setOpen(false)} aria-label="The Ark home">
          <BrandLockup />
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(([label, href]) => {
            const active = activeSection === href.slice(1);
            return (
              <a
                key={href}
                href={href}
                className={active ? "is-active" : undefined}
                aria-current={active ? "location" : undefined}
              >
                {label}
              </a>
            );
          })}
          <a className="nav-cta" href="#contact">Start a Project <span>→</span></a>
        </nav>
        <button
          ref={menuButtonRef}
          className="menu-button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span /><span />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu-shell"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.24 }}
          >
            <motion.nav
              className="mobile-nav shell"
              aria-label="Mobile navigation"
              initial={reduceMotion ? false : "hidden"}
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.045, delayChildren: 0.05 } },
              }}
            >
              {links.map(([label, href], index) => (
                <motion.a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  variants={{ hidden: { y: 14, opacity: 0 }, show: { y: 0, opacity: 1 } }}
                >
                  <span className="mobile-nav-number">0{index + 1}</span>
                  <span>{label}</span>
                  <span aria-hidden="true">↘</span>
                </motion.a>
              ))}
              <motion.a
                className="mobile-cta"
                href="#contact"
                onClick={() => setOpen(false)}
                variants={{ hidden: { y: 14, opacity: 0 }, show: { y: 0, opacity: 1 } }}
              >
                Start a Project <span aria-hidden="true">→</span>
              </motion.a>
              <motion.div
                className="mobile-menu-meta"
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
              >
                <span>Dallas–Fort Worth</span>
                <a href="mailto:Stephen@theark.io">Stephen@theark.io</a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
