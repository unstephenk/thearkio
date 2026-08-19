"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function LionProjectShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const desktopY = useTransform(scrollYProgress, [0, 1], [reduceMotion ? 0 : 24, reduceMotion ? 0 : -20]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [reduceMotion ? 0 : 42, reduceMotion ? 0 : -34]);

  return (
    <div className="project-visual lion-project-visual" ref={ref}>
      <motion.div className="project-frame" style={{ y: desktopY }}>
        <div className="browser-bar" aria-hidden="true">
          <div className="browser-dots"><span /><span /><span /></div>
          <div className="browser-address">lionruopeptides.com</div>
          <span className="browser-open">↗</span>
        </div>

        <div className="lion-preview">
          <div className="lion-preview-glow" aria-hidden="true" />
          <div className="lion-preview-nav">
            <div className="lion-preview-brand">
              <span className="lion-preview-mark">L</span>
              <span>LION RUO</span>
            </div>
            <span className="lion-preview-menu">CATALOG &nbsp;&nbsp; VERIFICATION &nbsp;&nbsp; FAQ</span>
          </div>

          <div className="lion-preview-stage">
            <div className="lion-preview-copy">
              <p>Research use only · premium catalog</p>
              <strong>Research.<br />Built with clarity.</strong>
              <span>
                A fast headless storefront with live WooCommerce inventory, order handling,
                documentation, email, and launch infrastructure working behind the scenes.
              </span>
              <div className="lion-preview-pills" aria-label="Project capabilities represented in the mockup">
                <span>Live inventory</span>
                <span>COA records</span>
                <span>Order workflow</span>
              </div>
            </div>

            <div className="lion-preview-vial" aria-hidden="true">
              <Image
                src="/lion-ruo-logo.png"
                alt=""
                fill
                sizes="(max-width: 640px) 44vw, 28vw"
                priority={false}
              />
            </div>
          </div>

          <div className="lion-preview-grid" aria-hidden="true">
            <article><span>01</span><strong>Catalog</strong><small>WooCommerce-managed products and stock</small></article>
            <article><span>02</span><strong>Verification</strong><small>Lot, testing, and COA information</small></article>
            <article><span>03</span><strong>Orders</strong><small>Validated checkout and fulfillment flow</small></article>
          </div>
        </div>
      </motion.div>

      <motion.div className="project-phone lion-project-phone" style={{ y: phoneY }} aria-hidden="true">
        <div className="phone-speaker" />
        <div className="lion-phone-screen">
          <div className="lion-phone-topline"><span>LION RUO</span><span>☰</span></div>
          <div className="lion-phone-hero">
            <span>RESEARCH USE ONLY</span>
            <strong>Catalog</strong>
            <small>Live product inventory</small>
          </div>
          <div className="lion-phone-card"><span>AVAILABLE</span><strong>Research catalog</strong><small>Inventory synced live</small></div>
          <div className="lion-phone-card"><span>VERIFY</span><strong>Testing records</strong><small>Lot + COA details</small></div>
          <div className="lion-phone-card lion-phone-card-accent"><span>ORDER</span><strong>Fast checkout</strong><small>Responsive from end to end</small></div>
        </div>
      </motion.div>

      <div className="project-visual-caption" aria-hidden="true">
        <span>Headless commerce</span>
        <span>Next.js / WooCommerce</span>
      </div>
    </div>
  );
}
