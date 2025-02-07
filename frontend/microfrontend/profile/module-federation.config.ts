export const mfConfig = {
  name: "profile",
  exposes: {
    "./Profile": "./src/components/Profile"
  },
  remotes: {
    "gallery": "gallery@http://localhost:8083/mf-manifest.json"
  },
  shared: ["react", "react-dom"],
};
