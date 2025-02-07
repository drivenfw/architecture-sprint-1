export const mfConfig = {
  name: "gallery",
  exposes: {
    "./GalleryTest": "./src/components/GalleryTest.tsx",
    "./AddPlace": "./src/components/AddPlace.tsx",
    "./Gallery": "./src/components/Gallery.tsx"
  },
  shared: ["react", "react-dom"],
};
