export type Palette = {
  id: string;
  name: string;
  role: string;
  ink: string;
  paper: string;
  colors: string[];
  src: string;
};

export const PALETTES: Palette[] = [
  {
    id: "aer",
    name: "AER",
    role: "House coloration",
    ink: "#f4f4f5",
    paper: "#0a0a0b",
    colors: ["#0a0a0b", "#121214", "#c4b08a", "#8a7a5a", "#f4f4f5"],
    src: "/showcase/devices.jpg",
  },
  {
    id: "north-room",
    name: "North Room",
    role: "Music",
    ink: "#e8dcc8",
    paper: "#0b0a09",
    colors: ["#0b0a09", "#1c1712", "#c9a15b", "#3d8f8a", "#e8dcc8"],
    src: "/showcase/music.jpg",
  },
  {
    id: "halo-grade",
    name: "Halo Grade",
    role: "Video",
    ink: "#f2ece4",
    paper: "#0c0b0a",
    colors: ["#0c0b0a", "#2a1c12", "#d4a574", "#8aa0b8", "#f2ece4"],
    src: "/showcase/video.jpg",
  },
  {
    id: "atelier",
    name: "Atelier",
    role: "Fashion",
    ink: "#f4efe6",
    paper: "#161412",
    colors: ["#161412", "#cfc6b8", "#8c7354", "#2b2a28", "#f4efe6"],
    src: "/showcase/fashion.jpg",
  },
  {
    id: "hearth",
    name: "Hearth",
    role: "Restaurant",
    ink: "#f3e6d4",
    paper: "#1a120e",
    colors: ["#1a120e", "#7a3e2a", "#c9a078", "#3d2a1c", "#f3e6d4"],
    src: "/showcase/restaurant.jpg",
  },
  {
    id: "massing",
    name: "Massing",
    role: "Architecture",
    ink: "#eceae4",
    paper: "#1c1c1a",
    colors: ["#1c1c1a", "#b7b1a4", "#6e7a72", "#d8c9a6", "#eceae4"],
    src: "/showcase/architecture.jpg",
  },
  {
    id: "ironwood",
    name: "Ironwood",
    role: "Fitness",
    ink: "#e7e4dc",
    paper: "#12110f",
    colors: ["#12110f", "#3f4a42", "#c2b59a", "#8a9a8c", "#e7e4dc"],
    src: "/showcase/fitness.jpg",
  },
  {
    id: "private",
    name: "Private Book",
    role: "Wealth",
    ink: "#efe8d8",
    paper: "#12100c",
    colors: ["#12100c", "#3a3226", "#b08a4a", "#7a6a4a", "#efe8d8"],
    src: "/showcase/wealth.jpg",
  },
];

export const WORKS = [
  {
    id: "music",
    title: "North Room",
    kind: "Music",
    line: "Session desk. Meters live. Dominance without noise.",
    src: "/showcase/music.jpg",
  },
  {
    id: "video",
    title: "Halo Grade",
    kind: "Video",
    line: "Cinema camera. Color suite. The cut is the brand.",
    src: "/showcase/video.jpg",
  },
  {
    id: "fashion",
    title: "Atelier",
    kind: "Commerce",
    line: "Garment as architecture. No merch grid.",
    src: "/showcase/fashion.jpg",
  },
  {
    id: "restaurant",
    title: "Hearth",
    kind: "Hospitality",
    line: "Reservation as ritual. Candle, copper, hush.",
    src: "/showcase/restaurant.jpg",
  },
  {
    id: "architecture",
    title: "Massing",
    kind: "Practice",
    line: "Models first. The site is a drawing board.",
    src: "/showcase/architecture.jpg",
  },
  {
    id: "fitness",
    title: "Ironwood",
    kind: "Club",
    line: "Stone, steel, daylight. Not a chain.",
    src: "/showcase/fitness.jpg",
  },
  {
    id: "wealth",
    title: "Private Book",
    kind: "Wealth",
    line: "A desk, a city, no dashboard circus.",
    src: "/showcase/wealth.jpg",
  },
] as const;