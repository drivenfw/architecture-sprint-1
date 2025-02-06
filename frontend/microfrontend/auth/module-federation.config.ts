export const mfConfig = {
  name: "auth",
  dts: false,
  exposes: {
    "./AuthTest": "./src/components/AuthTest.tsx"
  },
  shared: ["react", "react-dom"],
};
