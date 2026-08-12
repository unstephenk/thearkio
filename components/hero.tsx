"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const artY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 90]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 40]);
  const artScale = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 1.035]);

  return (
    <section id="top" ref={ref} className="hero" aria-labelledby="hero-title">
      <motion.div className="hero-art" style={{ y: artY, scale: artScale }} aria-hidden="true">
        <div className="hero-horizon" />
        <div className="hero-sun" />
        <div className="hero-monolith">
          <div className="monolith-face" />
          <div className="monolith-edge" />
          <span className="monolith-light" />
        </div>
        <div className="hero-rock hero-rock-a" />
        <div className="hero-rock hero-rock-b" />
        <div className="hero-grid-lines" />
        <div className="hero-grain" />
      </motion.div>
      <div className="hero-vignette" aria-hidden="true" />

      <div className="hero-side-label hero-side-label-left" aria-hidden="true">THE ARK / WEB STUDIO</div>
      <div className="hero-side-label hero-side-label-right" aria-hidden="true">32.7767° N / DFW</div>

      <div className="shell hero-inner">
        <motion.div
          className="hero-copy"
          style={{ y: copyY }}
          initial={reduceMotion ? false : "hidden"}
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
          }}
        >
          <motion.p className="hero-kicker" variants={fadeUp}>Landing pages for small businesses</motion.p>
          <h1 id="hero-title" aria-label="Websites built to move businesses forward.">
            {["Websites built", "to move businesses", "forward."].map((line) => (
              <span className="hero-line" key={line}>
                <motion.span variants={lineReveal}>{line}</motion.span>
              </span>
            ))}
          </h1>
          <motion.p className="hero-subhead" variants={fadeUp}>
            Custom landing pages for small businesses that want to look established,
            earn trust, and turn more visitors into customers.
          </motion.p>
          <motion.div className="hero-actions" variants={fadeUp}>
            <a className="button button-light" href="#contact">Start a Project <span>→</span></a>
            <a className="button button-ghost" href="#work">See My Work <span>↓</span></a>
          </motion.div>
        </motion.div>

        <div className="hero-bottom">
          <span>Dallas–Fort Worth</span>
          <span>Typical build · about one week*</span>
          <span>Ongoing care available</span>
          <a href="#services">Scroll to explore <span aria-hidden="true">↓</span></a>
        </div>
      </div>
    </section>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const lineReveal = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
};
