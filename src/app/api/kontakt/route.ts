import { NextResponse } from "next/server";
import { company } from "@/lib/content";

/**
 * Obsługa formularza kontaktowego.
 * Produkcja: ustaw RESEND_API_KEY (+ CONTACT_TO / CONTACT_FROM) – wysyła e-mail przez Resend.
 * Bez klucza (dev/preview) lead jest logowany na serwerze, żeby nie zginął.
 */
export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  const name = String(data?.name ?? "").trim().slice(0, 200);
  const email = String(data?.email ?? "").trim().slice(0, 200);
  const phone = String(data?.phone ?? "").trim().slice(0, 60);
  const message = String(data?.message ?? "").trim().slice(0, 5000);

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
  }

  const subject = `Nowe zapytanie ze strony DrBlocks – ${name}`;
  const text = `Imię i nazwisko: ${name}\nE-mail: ${email}\nTelefon: ${phone || "–"}\n\nWiadomość:\n${message}`;

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO || company.emailSales;
  const from = process.env.CONTACT_FROM || "DrBlocks <onboarding@resend.dev>";

  if (!key) {
    console.log("[kontakt] (brak RESEND_API_KEY) nowy lead:", { name, email, phone, message });
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, reply_to: email, subject, text }),
    });
    if (!r.ok) {
      console.error("[kontakt] Resend error", r.status, await r.text());
      return NextResponse.json({ ok: false, error: "provider" }, { status: 502 });
    }
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[kontakt] send error", err);
    return NextResponse.json({ ok: false, error: "network" }, { status: 502 });
  }
}
