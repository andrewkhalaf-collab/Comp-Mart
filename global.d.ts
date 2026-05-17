// Type declarations for importing styles and static assets in TypeScript
// This fixes errors like: "Cannot find module or type declarations for side-effect import of './globals.css'"
declare module '*.css';
declare module '*.scss';
declare module '*.module.css';
declare module '*.module.scss';

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.svg';

export {};
