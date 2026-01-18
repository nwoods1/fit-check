export interface ClothingItem {
  id: string;
  name: string;
  type: "hat" | "glasses" | "top" | "pants" | "socks" | "shoes";
  color: string;
  image?: string;
}

export interface Outfit {
  id: string;
  name: string;
  style: string;
  items: ClothingItem[];
  image: string;
}

// Sample fits data - complete outfit combinations
export const sampleFits: Outfit[] = [
  {
    id: "fit-1",
    name: "Tech Bro Classic",
    style: "tech-bro",
    image: "/placeholder.svg",
    items: [
      { id: "h1", name: "None", type: "hat", color: "none" },
      { id: "g1", name: "Blue Light Glasses", type: "glasses", color: "black" },
      { id: "t1", name: "Patagonia Vest + Gray Tee", type: "top", color: "gray" },
      { id: "p1", name: "Slim Chinos", type: "pants", color: "khaki" },
      { id: "s1", name: "No-show Socks", type: "socks", color: "white" },
      { id: "sh1", name: "Allbirds Wool Runners", type: "shoes", color: "gray" },
    ],
  },
  {
    id: "fit-2",
    name: "Startup Founder",
    style: "tech-bro",
    image: "/placeholder.svg",
    items: [
      { id: "h2", name: "None", type: "hat", color: "none" },
      { id: "g2", name: "Warby Parker Frames", type: "glasses", color: "tortoise" },
      { id: "t2", name: "Black Quarter Zip", type: "top", color: "black" },
      { id: "p2", name: "Dark Jeans", type: "pants", color: "black" },
      { id: "s2", name: "Athletic Socks", type: "socks", color: "black" },
      { id: "sh2", name: "White Sneakers", type: "shoes", color: "white" },
    ],
  },
  {
    id: "fit-3",
    name: "Pinterest Aesthetic",
    style: "pinterest-girly",
    image: "/placeholder.svg",
    items: [
      { id: "h3", name: "Ribbon Bow", type: "hat", color: "pink" },
      { id: "g3", name: "Cat Eye Sunglasses", type: "glasses", color: "white" },
      { id: "t3", name: "Cropped Cardigan", type: "top", color: "cream" },
      { id: "p3", name: "Pleated Skirt", type: "pants", color: "brown" },
      { id: "s3", name: "Lace Ankle Socks", type: "socks", color: "white" },
      { id: "sh3", name: "Mary Janes", type: "shoes", color: "black" },
    ],
  },
  {
    id: "fit-4",
    name: "Baggy Streetwear",
    style: "baggy",
    image: "/placeholder.svg",
    items: [
      { id: "h4", name: "Beanie", type: "hat", color: "black" },
      { id: "g4", name: "None", type: "glasses", color: "none" },
      { id: "t4", name: "Oversized Graphic Tee", type: "top", color: "white" },
      { id: "p4", name: "Wide Leg Cargo Pants", type: "pants", color: "olive" },
      { id: "s4", name: "Crew Socks", type: "socks", color: "white" },
      { id: "sh4", name: "New Balance 550", type: "shoes", color: "white" },
    ],
  },
  {
    id: "fit-5",
    name: "Business Formal Classic",
    style: "business-formal",
    image: "/placeholder.svg",
    items: [
      { id: "h5", name: "None", type: "hat", color: "none" },
      { id: "g5", name: "None", type: "glasses", color: "none" },
      { id: "t5", name: "Navy Suit Jacket + White Shirt", type: "top", color: "navy" },
      { id: "p5", name: "Navy Dress Pants", type: "pants", color: "navy" },
      { id: "s5", name: "Dress Socks", type: "socks", color: "navy" },
      { id: "sh5", name: "Oxford Shoes", type: "shoes", color: "brown" },
    ],
  },
  {
    id: "fit-6",
    name: "Tech Noir",
    style: "techwear",
    image: "/placeholder.svg",
    items: [
      { id: "h6", name: "Bucket Hat", type: "hat", color: "black" },
      { id: "g6", name: "Shield Sunglasses", type: "glasses", color: "black" },
      { id: "t6", name: "Technical Jacket", type: "top", color: "black" },
      { id: "p6", name: "Tactical Cargo Pants", type: "pants", color: "black" },
      { id: "s6", name: "Compression Socks", type: "socks", color: "black" },
      { id: "sh6", name: "Nike ACG Boots", type: "shoes", color: "black" },
    ],
  },
];
