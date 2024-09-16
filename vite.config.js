import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { path } from "./src/constants/paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // resolve: {
  //   alias: {
  //     ...path.reduc(
  //       acc,
  //       (cur) => ({
  //         ...acc,
  //         [cur]: `/${cur === "src" ? cur : "src/" + cur}`,
  //       }),
  //       ""
  //     ),
  //   },
  // },
});
