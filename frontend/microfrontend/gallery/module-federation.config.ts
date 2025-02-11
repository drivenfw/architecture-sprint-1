export const mfConfig = {
  name: "gallery",
  dts: false,
  exposes: {
    "./AddPlace": "./src/components/AddPlace.tsx",
    "./Gallery": "./src/components/Gallery.tsx"
  },
  shared: ["react", "react-dom"],
};
