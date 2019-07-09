/**
 * build tooling to handle appconfig.json
 */

const gitRev = require('git-rev');
const fs = require('fs');
const json = require('../../appconfig.json');

const cmdMap = {
  'preBuild': () => preBuild(),
  'postBuild': () => postBuild()
}

const cmd = process.argv[2];
const fn = cmdMap[cmd];

if (fn) {
  fn().catch(error => (console.error(error), process.exit(1)))
} else {
  const hint = `${Object.keys(cmdMap).map(it => `- ${it}`).join('\n')}`;
  console.error(`\nunknown argument [${cmd}] \nsupported:\n${hint}\n\n`);
  process.exit(127);
}

function mergeConfigAsync() {
  return new Promise((done) => {
    gitRev.long(sha => {
      done(Object.assign({}, json, {
        lastCommit: sha,
        buildTimestamp: new Date()
      }));
    });
  })
}

function preBuild() {
  return mergeConfigAsync()
    .then(config => {

      // create ts file for read before compile
      const tsFileName = './src/environments/auto-generated-appconfig.ts';
      const tsFileContent = [
        '// do not edit, auto-generated file',
        '// tslint:disable',
        `export const appConfigJson = ${JSON.stringify(config, null, 2)};`,
        '// tslint:enable',
        '' // new line EOF
      ].join('\n');

      fs.writeFileSync(tsFileName, tsFileContent);
      console.log(`[INFO] generated => ${tsFileName}`);
    });
}

function postBuild() {
  return mergeConfigAsync()
    .then(config => {

      // copy file to release as json for public read
      fs.writeFileSync('./release/appconfig.json', JSON.stringify(config, null, 2));

    });
}




