import type { Text } from "./site";

// TODO: add real testimonials only, with the client's permission.
// Example shape:
// { name: "Client name", role: { en: "Owner, Mboa Phones", fr: "Gérant, Mboa Phones" }, quote: { en: "…", fr: "…" } }
// The Testimonials section stays hidden while this list is empty.
export const testimonials: { name: string; role: Text; quote: Text }[] = [];
