// DrBlocks partner network. Locale-independent (names, cities, coordinates).
// Display copy (headings, legend, categories) comes from the content dictionary.
//
// All eight are PRODUCERS of modular buildings / pavilions / containers — none is
// an earthworks contractor. Coordinates are the exact street addresses (so pins
// sit at the real spot); the list shows only the city. Two pairs share a city
// (Radom: Artpawilony + NoviPawilony · Bytom: JR + Komato) — their pins are at the
// real per-address points and the labels are spread by the collision layout.

export type PartnerCategory = "producent" | "wykonawca";

export type Partner = {
  name: string;
  /** City shown in the list (Polish place name). */
  city: string;
  /** [latitude, longitude] WGS84 of the exact address. */
  coords: [number, number];
  category: PartnerCategory;
};

export const partners: Partner[] = [
  // Mikołaja Ryńskiego 23A, 87-213 Ryńsk
  { name: "Qubehouse", city: "Ryńsk", coords: [53.2718, 18.9585], category: "producent" },
  // Wrocławska 4, 26-600 Radom
  { name: "Artpawilony", city: "Radom", coords: [51.3992, 21.1575], category: "producent" },
  // Ślepowron 96, 26-625 (k. Radomia)
  { name: "Global Home Containers", city: "Ślepowron", coords: [51.4875, 21.0875], category: "producent" },
  // Gliwicka 98, 43-190 Mikołów
  { name: "Letniskowo", city: "Mikołów", coords: [50.178, 18.888], category: "producent" },
  // Bytom, 41-905
  { name: "JR Modular Systems", city: "Bytom", coords: [50.3525, 18.9115], category: "producent" },
  // ul. Siemianowicka 98, 41-902 Bytom
  { name: "Komato Kontenery", city: "Bytom", coords: [50.3375, 18.9525], category: "producent" },
  // Warsaw, Poland
  { name: "Cont4You", city: "Warszawa", coords: [52.2297, 21.0122], category: "producent" },
  // Ofiar Firleja 7, 26-600 Radom
  { name: "NoviPawilony", city: "Radom", coords: [51.4185, 21.178], category: "producent" },
];
