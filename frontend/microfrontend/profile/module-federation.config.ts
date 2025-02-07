export const mfConfig = {
  name: "profile",
  exposes: {
    "./ProfileTest": "./src/components/ProfileTest.tsx",
    "./Profile": "./src/components/Profile"
  },
  shared: ["react", "react-dom"],
};
