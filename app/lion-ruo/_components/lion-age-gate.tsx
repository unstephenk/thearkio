"use client";

import { useEffect, useState } from "react";
import type { SiteContentDocument } from "@/lib/lion-ruo/types";
import { LionBrand } from "./lion-brand";
import styles from "../lion-ruo.module.css";

type AgeGateContent = SiteContentDocument["acf"]["age_gate"];
type BrandContent = SiteContentDocument["acf"]["brand"];

const STORAGE_KEY = "lion-ruo-age-confirmed-v1";

type StoredAcceptance = {
  acceptedAt: number;
  minimumAge: number;
};

export function LionAgeGate({
  content,
  brand,
}: {
  content: AgeGateContent;
  brand: BrandContent;
}) {
  const [open, setOpen] = useState(content.enabled);

  useEffect(() => {
    if (!content.enabled) {
      setOpen(false);
      return;
    }

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;

      const stored = JSON.parse(raw) as StoredAcceptance;
      const maxAgeMs = Math.max(1, content.storage_days) * 24 * 60 * 60 * 1000;
      const stillValid =
        stored.minimumAge === content.minimum_age &&
        Date.now() - stored.acceptedAt < maxAgeMs;

      if (stillValid) setOpen(false);
    } catch {
      // If storage is unavailable or malformed, keep the gate visible.
    }
  }, [content.enabled, content.minimum_age, content.storage_days]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  if (!open) return null;

  const accept = () => {
    try {
      const value: StoredAcceptance = {
        acceptedAt: Date.now(),
        minimumAge: content.minimum_age,
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch {
      // The visitor can still continue even if localStorage is unavailable.
    }
    setOpen(false);
  };

  return (
    <div className={styles.ageGateOverlay} role="dialog" aria-modal="true" aria-labelledby="lion-age-title">
      <div className={styles.ageGateCard}>
        <LionBrand logoUrl={brand.logo_url} />
        <span className={styles.ageGateEyebrow}>Research Use Only</span>
        <h2 id="lion-age-title">{content.heading}</h2>
        <p>{content.description}</p>
        <p className={styles.ageGateAge}>You must be at least {content.minimum_age} years old to continue.</p>
        <div className={styles.ageGateActions}>
          <button type="button" className={styles.ageGateConfirm} onClick={accept}>
            {content.confirm_label}
          </button>
          <a className={styles.ageGateLeave} href={content.leave_href} rel="nofollow">
            {content.leave_label}
          </a>
        </div>
      </div>
    </div>
  );
}
