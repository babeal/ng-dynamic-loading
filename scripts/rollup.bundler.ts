import * as path from "path";
import { rollup } from "rollup";
import analyze from "rollup-plugin-analyzer";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import replace from "rollup-plugin-replace";
import { terser } from "rollup-plugin-terser";
import visualizer from "rollup-plugin-visualizer";

const moduleName = process.argv.find(arg => arg.match(/module/gi));
const debug = process.argv.find(arg => arg.match(/debug/gi));
console.log('Module Name:', moduleName)
console.log('Debug:', debug ? true : false)

const input = {
    input: `dist/${moduleName}/esm2015/index.js`,
    plugins: [
        peerDepsExternal({
            packageJsonPath: path.resolve(`dist/${moduleName}/package.json`)
        }),

        commonjs({
          include: /node_modules/,
          namedExports: {
            'node_modules/react/index.js': ['Children', 'Component', 'PropTypes', 'createElement'],
            'node_modules/react-dom/index.js': ['render'],
          },
        }),
        babel({
            exclude: ['./node_modules/**']
        }),
        resolve({
            mainFields: ['browser', 'module']
        }),
        replace({
          'process.env.NODE_ENV': JSON.stringify('production'),
        }),
    ],

};

(async function build() {
    let bundle = await rollup(input);
    await bundle.write({
        format: 'cjs',
        file: `dist/${moduleName}/${moduleName}.js`
    })



    input.plugins.push(...[
        terser(),
        analyze({
            summaryOnly: true,
            showExports: true
        }),
        visualizer({
            open: true,
            template: 'treemap'
        })
    ])

    bundle = await rollup(input);
    await bundle.write({
        format: 'cjs',
        file: `dist/${moduleName}/${moduleName}.min.js`
    })
})();
