"use client";
import { useEffect, useState } from "react";
const KEY = "asakita";
export type State = { name: string; done: Record<string, number>; xp: number };
const empty: State = { name: "", done: {}, xp: 0 };
export function load(): State {
  try { return { ...empty, ...JSON.parse(localStorage.getItem(KEY) ?? "null") }; } catch { return empty; }
}
export function save(s: State) {
  localStorage.setItem(KEY, JSON.stringify(s));
  window.dispatchEvent(new Event("asakita"));
}
export function useStore(): State | null {
  const [s, setS] = useState<State | null>(null);
  useEffect(() => {
    const f = () => setS(load());
    f();
    window.addEventListener("asakita", f);
    return () => window.removeEventListener("asakita", f);
  }, []);
  return s;
}
export function clear() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("asakita"));
}
