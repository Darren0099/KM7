"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Motion enhancement for authenticated pages; no dependency or hydration changes. */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = [
      "main > h1", "main > h2", "main > .lead",
      "main > .herox > *", "main > .path > .node",
      "main > .grid > .mcard", "main > .grid > .card",
      "main > .two > .card", "main > .row",
      "main > .mhead", "main > .stages",
      "main > .deck", "main > .cwrap", "main > .cert",
      "main > .card", "main > .map",
      "main > div[style] > .card" // login panel
    ].join(", ");

    const seen = new WeakSet<HTMLElement>();
    let frame = 0;

    const onEnter = (el: HTMLElement) => {
      observer.unobserve(el);
      el.classList.remove("ak-reveal-pending");
      const finish = (event: AnimationEvent) => {
        if (event.target !== el) return;
        el.classList.remove("ak-reveal-enter");
        el.removeEventListener("animationend", finish);
      };
      el.addEventListener("animationend", finish);
      el.classList.add("ak-reveal-enter");
    };

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) onEnter(entry.target as HTMLElement);
      }
    }, { threshold: 0, rootMargin: "0px 0px -6% 0px" });

    const enhance = () => {
      if (document.documentElement.dataset.motion === "1") return;
      document.querySelectorAll<HTMLElement>(targets).forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        // Keep the original transform-based interactions (quiz flip, progress cards).
        const parent = el.parentElement;
        const siblings = parent ? Array.from(parent.children) : [];
        const delay = parent && (
          parent.classList.contains("grid") ||
          parent.classList.contains("path") ||
          parent.classList.contains("two") ||
          parent.classList.contains("herox")
        ) ? (siblings.indexOf(el) % 4) * 85 : 0;
        el.dataset.akReveal = parent?.classList.contains("herox")
          ? (siblings.indexOf(el) === 0 ? "left" : "right")
          : "up";
        el.style.setProperty("--ak-delay", `${delay}ms`);
        const box = el.getBoundingClientRect();
        if (box.top < window.innerHeight * .94 && box.bottom > 0) {
          onEnter(el);
        } else {
          el.classList.add("ak-reveal-pending");
          observer.observe(el);
        }
      });
    };

    enhance();
    // React can add modules after auth hydration or change quiz content.
    const mutations = new MutationObserver(() => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        frame = 0;
        enhance();
      });
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    const calm = new MutationObserver(() => {
      if (document.documentElement.dataset.motion === "1") {
        observer.disconnect();
        document.querySelectorAll<HTMLElement>(".ak-reveal-pending, .ak-reveal-enter")
          .forEach(el => el.classList.remove("ak-reveal-pending", "ak-reveal-enter"));
      } else {
        enhance();
      }
    });
    calm.observe(document.documentElement, { attributes: true, attributeFilter: ["data-motion"] });

    return () => {
      mutations.disconnect();
      calm.disconnect();
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
      document.querySelectorAll<HTMLElement>(".ak-reveal-pending, .ak-reveal-enter")
        .forEach(el => el.classList.remove("ak-reveal-pending", "ak-reveal-enter"));
    };
  }, [pathname]);

  return null;
}
