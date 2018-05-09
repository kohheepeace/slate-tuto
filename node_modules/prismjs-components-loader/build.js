#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const child_process = require('child_process');
const componentDefinitions = require('./src/componentDefinitions');

const LIST = Object.keys(componentDefinitions.COMPONENTS);

/**
 * Wrap a JS source in a closure function taking Prism as argument
 * @return {String}
 */
function prismClosure(source) {
    return `function (Prism) {\n${source}\n}\n`;
}

/**
 * Make a JS module that export the given JS expression
 * @return {String}
 */
function moduleExport(source) {
    return `module.exports = ${source}`;
}

/*
 * Generate the sources for closured components
 */
function generateClosuredComponents() {
    const componentsDir = './src/components';

    // Cleanup
    child_process.execSync('rm -rf ' + componentsDir);

    // Generate
    fs.mkdirSync(componentsDir);
    LIST.forEach((name) => {
        const componentSrcPath = `./node_modules/prismjs/components/prism-${name}.js`;
        const componentSrc = fs.readFileSync(componentSrcPath);
        const moduleSrc = moduleExport(prismClosure(componentSrc));
        const outputPath = path.join(componentsDir, `prism-${name}.js`);
        fs.writeFileSync(outputPath, moduleSrc);
    });
}

/*
 * Generate a module exposing all components
 */
function generateComponentIndex() {
    function generateSource(list) {
        const requires = list.map((name) => {
            return `  '${name}': require('./components/prism-${name}.js')`;
        })
        .join(',\n');
        return moduleExport(`{\n${requires}\n};\n`);
    }

    fs.writeFileSync('./src/all-components.js', generateSource(LIST));
    fs.writeFileSync('./src/common-components.js', generateSource(
        LIST.filter(componentDefinitions.isCommon)
    ));
}

generateClosuredComponents();
generateComponentIndex();
