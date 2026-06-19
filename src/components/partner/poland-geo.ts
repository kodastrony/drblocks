// Simplified Poland border (≈47 vertices) + a shared lon/lat → SVG projection
// used for BOTH the country outline and the partner pins, so they always align.
// Source ring: johan/world.geo.json (POL), public domain.

// [lon, lat] pairs.
const RING: [number, number][] = [
  [15.016996, 51.106674], [14.607098, 51.745188], [14.685026, 52.089947], [14.4376, 52.62485],
  [14.074521, 52.981263], [14.353315, 53.248171], [14.119686, 53.757029], [14.8029, 54.050706],
  [16.363477, 54.513159], [17.622832, 54.851536], [18.620859, 54.682606], [18.696255, 54.438719],
  [19.66064, 54.426084], [20.892245, 54.312525], [22.731099, 54.327537], [23.243987, 54.220567],
  [23.484128, 53.912498], [23.527536, 53.470122], [23.804935, 53.089731], [23.799199, 52.691099],
  [23.199494, 52.486977], [23.508002, 52.023647], [23.527071, 51.578454], [24.029986, 50.705407],
  [23.922757, 50.424881], [23.426508, 50.308506], [22.51845, 49.476774], [22.776419, 49.027395],
  [22.558138, 49.085738], [21.607808, 49.470107], [20.887955, 49.328772], [20.415839, 49.431453],
  [19.825023, 49.217125], [19.320713, 49.571574], [18.909575, 49.435846], [18.853144, 49.49623],
  [18.392914, 49.988629], [17.649445, 50.049038], [17.554567, 50.362146], [16.868769, 50.473974],
  [16.719476, 50.215747], [16.176253, 50.422607], [16.238627, 50.697733], [15.490972, 50.78473],
  [15.016996, 51.106674],
];

const LON0 = 14.07, LON1 = 24.03, LAT0 = 49.0, LAT1 = 54.9;
const KX = Math.cos((((LAT0 + LAT1) / 2) * Math.PI) / 180); // longitude compression at mid-lat
const PAD = 70;
export const MAP_W = 1000;
const SPAN_X = (LON1 - LON0) * KX;
const SPAN_Y = LAT1 - LAT0;
const SCALE = (MAP_W - 2 * PAD) / SPAN_X;
export const MAP_H = Math.round(SPAN_Y * SCALE + 2 * PAD);

/** Project [lat, lon] (note order) to SVG [x, y] in the MAP_W × MAP_H viewBox. */
export function project(lat: number, lon: number): [number, number] {
  const x = PAD + (lon - LON0) * KX * SCALE;
  const y = PAD + (LAT1 - lat) * SCALE;
  return [x, y];
}

/** The Poland outline as an SVG path string. */
export const POLAND_PATH = (() => {
  return (
    RING.map(([lon, lat], i) => {
      const [x, y] = project(lat, lon);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join("") + "Z"
  );
})();
