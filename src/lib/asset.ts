// Deploy basePath (set to e.g. "/drblocks" for the GitHub Pages subpath build).
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

/**
 * Prefix a root-relative asset path with the deploy basePath.
 * Needed for raw <img>/<video> AND next/image — next/image does NOT apply
 * basePath to `src` under `output: export`, so all local image paths must be
 * prefixed explicitly. No-op when BASE_PATH is empty (local dev / root deploy).
 */
export function asset(path: string): string {
  return path.startsWith("/") ? `${BASE_PATH}${path}` : path;
}
