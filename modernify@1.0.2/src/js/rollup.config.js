import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

export default {
    input: "src/index.js",
    output: [
        {
            file: "dist/modernify.bundle.js",
            format: "umd",
            name: "Modernify",
            plugins: [terser()],
        },
        {
            file: "dist/modernify.esm.js",
            format: "es",
        },
    ],
    plugins: [resolve()],
};
