"use client";

import { useEffect, useState, type FormEvent } from "react";

/** Adds .is-in to every [data-reveal] element as it scrolls into view. */
export const RevealOnScroll = () => {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }),
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
};

/** Highlights the pill of the section you're reading. */
export const StickyNav = ({ items }: { items: { id: string; label: string }[] }) => {
  const [active, setActive] = useState("");
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [items]);

  return (
    <nav className="stickynav" aria-label="Sections">
      <a href="#top" className="stickynav__name">
        Samuel<span>.</span>
      </a>
      <YaoundeClock />
      <ul>
        {items.map((it, i) => (
          <li key={it.id}>
            <a href={`#${it.id}`} className={active === it.id ? "is-active" : ""}>
              {String(i + 1).padStart(2, "0")} {it.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

/** Live time in Yaoundé, with a guess at what I'm doing. */
const YaoundeClock = () => {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);
  if (!now) return <span className="clock" />;
  const time = new Intl.DateTimeFormat("en-GB", { timeZone: "Africa/Douala", hour: "2-digit", minute: "2-digit" }).format(now);
  const h = Number(time.slice(0, 2));
  const mood = h < 6 ? "probably still coding" : h < 9 ? "coffee first" : h < 18 ? "at the desk" : h < 22 ? "editing something" : "should be asleep";
  return (
    <span className="clock" title="My local time">
      Yaoundé {time} · <em>{mood}</em>
    </span>
  );
};

/** No backend needed: the form opens WhatsApp or your mail app with the message filled in. */
export const ContactForm = ({ whatsapp, email }: { whatsapp: string; email?: string }) => {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  const text = () => `Hi Samuel, I'm ${name || "…"}.\n\n${msg}`;

  const sendWhatsApp = (e: FormEvent) => {
    e.preventDefault();
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(text())}`, "_blank", "noopener");
  };

  const sendEmail = () => {
    window.location.href = `mailto:${email}?subject=${encodeURIComponent("Website enquiry")}&body=${encodeURIComponent(text())}`;
  };

  return (
    <form className="contact-form" onSubmit={sendWhatsApp}>
      <label>
        Your name
        <input value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" />
      </label>
      <label>
        What do you need?
        <textarea
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          rows={4}
          required
          placeholder="I run a café in Lyon and we still don't have a website…"
        />
      </label>
      <div className="contact-form__row">
        <button type="submit" className="btn btn--ink">Send on WhatsApp</button>
        {email && (
          <button type="button" className="btn btn--outline" onClick={sendEmail}>Send by email</button>
        )}
      </div>
    </form>
  );
};
