export const mfConfig = {
  name: "host",
  exposes: {},
  remotes: {
    "auth": "auth@http://localhost:8081/mf-manifest.json",
    "profile": "profile@http://localhost:8082/mf-manifest.json",
    "gallery": "gallery@http://localhost:8083/mf-manifest.json"
  },
  shared: ["react", "react-dom"],
};
