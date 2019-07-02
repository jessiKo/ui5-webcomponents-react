const fs = require('fs');
const puppeteer = require('puppeteer');
const fileUrl = require('file-url');
const path = require('path');
const chalk = require('chalk');
const prettier = require('prettier');
const dedent = require('dedent');
const generateTypingStatements = require('./generateTypingStatements');
const generateComponentDemos = require('./generateComponentDemos');
const showOptions = require('./showOptions');

let pattern;
let onlyStopForMerge = false;
const queue = [];

process.argv.forEach((val) => {
  if (val.startsWith('-pattern') || val.startsWith('--pattern')) {
    pattern = val.split('=')[1];
  } else if (val.indexOf('onlyStopForMerge') !== -1) {
    onlyStopForMerge = true;
  }
});

async function generateWebComponentWrapper(dto) {
  const componentName = dto.componentName;
  const ui5ComponentName = `UI5${componentName}`;

  const folderName = path.resolve(__dirname, '..', '..', 'src', 'webComponents', componentName);
  const libFolder = path.resolve(__dirname, '..', '..', 'src', 'lib');

  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
  }

  const tsTypings = generateTypingStatements(dto.typings, dto.componentName);
  const indexPath = path.resolve(folderName, 'index.tsx');

  let jsxContent = prettier.format(
    dedent`
    ${tsTypings.importStatements}
    import ${ui5ComponentName} from '@ui5/webcomponents/dist/${componentName}';
    import { withWebComponent, WithWebComponentPropTypes } from '../../internal/withWebComponent';
    
    ${tsTypings.interfaceStatement}
    
    const ${componentName}: FC<${tsTypings.interfaceName}> = withWebComponent<${tsTypings.interfaceName}>(${ui5ComponentName});
    
    ${componentName}.displayName = '${componentName}';
    
    ${tsTypings.defaultPropsStatement}
    
    export { ${componentName} };
    `,
    { printWidth: 120, parser: 'typescript', singleQuote: true, arrowParens: 'always' }
  );

  const libContent = `import { ${componentName} } from '../webComponents/${componentName}';
  
  export { ${componentName} };
  
  `;

  if (fs.existsSync(indexPath)) {
    // update interface and defaultProps
    return showOptions(componentName, tsTypings, indexPath, jsxContent, onlyStopForMerge);
  } else {
    fs.writeFileSync(indexPath, jsxContent);
    fs.writeFileSync(path.resolve(libFolder, `${componentName}.ts`), libContent);
    console.log(chalk.green(`Wrapper for ${componentName} created`));
  }
}

async function executeQueue() {
  for await (const dto of queue) {
    if (!pattern || dto.componentName.indexOf(pattern) !== -1) {
      await generateWebComponentWrapper(dto);
      generateComponentDemos(dto);
    }
  }
}

(async () => {
  const browser = await puppeteer.launch(); //{devtools: true}
  const page = await browser.newPage();
  page.on('console', (msg) => {
    try {
      const dto = JSON.parse(msg.text());
      queue.push(dto);
    } catch (e) {
      console.error('Failed to parse JSON', msg.text());
    }
  });
  await page.goto(fileUrl('./scripts/wrapperGeneration/puppeteer.html'));
  await browser.close();
  await executeQueue();
  require('./generateWebComponentTests');
})();
