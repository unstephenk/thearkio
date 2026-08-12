"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function ProjectShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const desktopY = useTransform(scrollYProgress, [0, 1], [reduceMotion ? 0 : 24, reduceMotion ? 0 : -20]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [reduceMotion ? 0 : 42, reduceMotion ? 0 : -34]);

  return (
    <div className="project-visual" ref={ref}>
      <motion.div className="project-frame" style={{ y: desktopY }}>
        <div className="browser-bar" aria-hidden="true">
          <div className="browser-dots"><span /><span /><span /></div>
          <div className="browser-address">jakegrovesmusic.com</div>
          <span className="browser-open">↗</span>
        </div>

        <div className="jake-preview">
          <div className="jake-texture" aria-hidden="true" />
          <div className="jake-nav">
            <span className="jake-wordmark">JAKE GROVES</span>
            <span className="jake-menu">EVENTS &nbsp;&nbsp; MEDIA &nbsp;&nbsp; BLOG &nbsp;&nbsp; ABOUT</span>
          </div>

          <div className="jake-stage">
            <p>Touring musician · harmonica · songwriter</p>
            <strong>Music that<br />lives online.</strong>
            <span>
              A flexible WordPress site built around live events, media, collaborations,
              community content, and Jake&apos;s growing catalog.
            </span>
          </div>

          <div className="jake-content-grid" aria-label="Website content represented in the project mockup">
            <article>
              <span>01</span>
              <strong>Events</strong>
              <small>Tour dates and live performance information</small>
            </article>
            <article>
              <span>02</span>
              <strong>Media</strong>
              <small>Video tutorials and performance content</small>
            </article>
            <article>
              <span>03</span>
              <strong>Releases</strong>
              <small>Collaborations, singles, and music discovery</small>
            </article>
            <article>
              <span>04</span>
              <strong>Community</strong>
              <small>Patreon and blog content for fans and musicians</small>
            </article>
          </div>
        </div>
      </motion.div>

      <motion.div className="project-phone" style={{ y: phoneY }} aria-hidden="true">
        <div className="phone-speaker" />
        <div className="phone-screen">
          <div className="phone-topline"><span>JG</span><span>☰</span></div>
          <div className="phone-hero">
            <span>JAKE</span>
            <strong>GROVES</strong>
            <small>Music · Events · Media</small>
          </div>
          <div className="phone-card"><span>NOW ON TOUR</span><strong>Live performances</strong></div>
          <div className="phone-card"><span>LATEST</span><strong>Collaborations</strong></div>
          <div className="phone-card phone-card-dark"><span>LEARN</span><strong>Join the community</strong></div>
        </div>
      </motion.div>

      <div className="project-visual-caption" aria-hidden="true">
        <span>Responsive by design</span>
        <span>Desktop / Mobile</span>
      </div>
    </div>
  );
}
