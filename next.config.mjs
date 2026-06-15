/** @type {import('next').NextConfig} */

// Static export (GitHub Pages) is opt-in via env so local `next dev` / a normal
// server build stay fully featured. The Pages workflow sets:
//   STATIC_EXPORT=true  NEXT_PUBLIC_BASE_PATH=/drblocks
const staticExport = process.env.STATIC_EXPORT === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  reactStrictMode: true,
  basePath,
  ...(staticExport
    ? { output: "export", trailingSlash: true, images: { unoptimized: true } }
    : { images: { formats: ["image/avif", "image/webp"] } }),
};

export default nextConfig;
