/// <reference types="vite/client" />

// SVG imports — Vite returns the URL as a string by default
declare module '*.svg' {
  const src: string;
  export default src;
}

// PNG / JPG / WebP / GIF / ICO imports
declare module '*.png' {
  const src: string;
  export default src;
}
declare module '*.jpg' {
  const src: string;
  export default src;
}
declare module '*.jpeg' {
  const src: string;
  export default src;
}
declare module '*.webp' {
  const src: string;
  export default src;
}
declare module '*.gif' {
  const src: string;
  export default src;
}
declare module '*.ico' {
  const src: string;
  export default src;
}
