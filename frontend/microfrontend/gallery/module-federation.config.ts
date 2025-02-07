export const mfConfig = {
  name: "gallery",
  exposes: {
    "./AddPlace": "./src/components/AddPlace.tsx",
    "./Gallery": "./src/components/Gallery.tsx"
  },
  shared: ["react", "react-dom"],
};
