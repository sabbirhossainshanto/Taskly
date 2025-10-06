export const themeArray = [
  {
    name: "purple",
    color: "text-purple-500",
    bg: "bg-purple-500",
    shadowBG: "bg-purple-50",
    border: "border-purple-500",
    id: 1,
  },
  {
    name: "blue",
    color: "text-blue-500",
    bg: "bg-blue-500",
    shadowBG: "bg-blue-50",
    border: "border-blue-500",
    id: 2,
  },
  {
    name: "pink",
    color: "text-pink-500",
    bg: "bg-pink-500",
    shadowBG: "bg-pink-50",
    border: "border-pink-500",
    id: 3,
  },
  {
    name: "violet",
    color: "text-violet-500",
    bg: "bg-violet-500",
    shadowBG: "bg-violet-50",
    border: "border-violet-500",
    id: 4,
  },
  {
    name: "indigo",
    color: "text-indigo-500",
    bg: "bg-indigo-500",
    shadowBG: "bg-indigo-50",
    border: "border-indigo-500",
    id: 5,
  },
  {
    name: "orange",
    color: "text-orange-500",
    bg: "bg-orange-500",
    shadowBG: "bg-orange-50",
    border: "border-orange-500",
    id: 6,
  },
  {
    name: "teal",
    color: "text-teal-500",
    bg: "bg-teal-500",
    shadowBG: "bg-teal-50",
    border: "border-teal-500",
    id: 7,
  },
];

export type ThemeName = (typeof themeArray)[number]["name"];
export type IAppearance = "light" | "dark" | "auto";
