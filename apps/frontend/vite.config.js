import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import nodePolyfills from "rollup-plugin-node-polyfills";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";
import replace from "@rollup/plugin-replace";
import path from "path";

console.log(path.resolve(__dirname));

export default defineConfig({
  root: "./",
  define: {
    "process.env.DATABASE_PW": process.env.DATABASE_PW,
    "process.pid": undefined,
  },
  plugins: [
    react(),
    // replace({
    //   "process.env": "import.meta.env",
    // }),
  ],
  build: {
    sourcemap: true,
    rollupOptions: {
      external: ["../../packages/database"],
      plugins: [
        // Enable rollup polyfills plugin
        // used during production bundling
        nodePolyfills(),
      ],
    },
  },
  optimizeDeps: {
    exclude: ["../../packages/database"],
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
        "process.pid": undefined,
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
  resolve: {
    alias: {
      // This Rollup aliases are extracted from @esbuild-plugins/node-modules-polyfill,
      // see https://github.com/remorses/esbuild-plugins/blob/master/node-modules-polyfill/src/polyfills.ts
      // process and buffer are excluded because already managed
      // by node-globals-polyfill
      sys: "util",
      util: "rollup-plugin-node-polyfills/polyfills/util",
      events: "rollup-plugin-node-polyfills/polyfills/events",
      stream: "rollup-plugin-node-polyfills/polyfills/stream",
      path: "rollup-plugin-node-polyfills/polyfills/path",
      querystring: "rollup-plugin-node-polyfills/polyfills/qs",
      punycode: "rollup-plugin-node-polyfills/polyfills/punycode",
      url: "rollup-plugin-node-polyfills/polyfills/url",
      string_decoder: "rollup-plugin-node-polyfills/polyfills/string-decoder",
      http: "rollup-plugin-node-polyfills/polyfills/http",
      https: "rollup-plugin-node-polyfills/polyfills/http",
      os: "rollup-plugin-node-polyfills/polyfills/os",
      assert: "rollup-plugin-node-polyfills/polyfills/assert",
      constants: "rollup-plugin-node-polyfills/polyfills/constants",
      _stream_duplex: "rollup-plugin-node-polyfills/polyfills/readable-stream/duplex",
      _stream_passthrough: "rollup-plugin-node-polyfills/polyfills/readable-stream/passthrough",
      _stream_readable: "rollup-plugin-node-polyfills/polyfills/readable-stream/readable",
      _stream_writable: "rollup-plugin-node-polyfills/polyfills/readable-stream/writable",
      _stream_transform: "rollup-plugin-node-polyfills/polyfills/readable-stream/transform",
      timers: "rollup-plugin-node-polyfills/polyfills/timers",
      console: "rollup-plugin-node-polyfills/polyfills/console",
      vm: "rollup-plugin-node-polyfills/polyfills/vm",
      zlib: "rollup-plugin-node-polyfills/polyfills/zlib",
      tty: "rollup-plugin-node-polyfills/polyfills/tty",
      domain: "rollup-plugin-node-polyfills/polyfills/domain",
    },
  },
});
