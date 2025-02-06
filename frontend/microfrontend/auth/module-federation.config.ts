export const mfConfig = {
  name: "auth",
  dts: false,
  exposes: {
    "./AuthTest": "./src/components/AuthTest.tsx",
    "./Login": "./src/components/Login.tsx",
    "./Register": "./src/components/Register.tsx",
    "./auth": "./src/utils/auth.js"
  },
  shared: ["react", "react-dom"],
};
