/* eslint-disable no-console */
import fs from 'node:fs'
import packageJson from '../package.json'
import corePackageJson from '../packages/core/package.json'

async function run() {
  console.log('Running postbuild script')
  // check if dist folder exists
  if (!fs.existsSync('dist')) {
    console.log('dist folder does not exist')
  }

  // copy LICENSE and README.md to dist folder
  console.log('Copying LICENSE')
  fs.copyFileSync('LICENSE', 'dist/LICENSE')
  console.log('Copying README.md')
  fs.copyFileSync('README.md', 'dist/README.md')

  // generate package.json

  if (!packageJson || !packageJson.version) {
    console.error('package.json or version is not defined')
    return
  }

  const finalPackageJson = {
    name: '@vuemark/core',
    version: packageJson.version,
    type: 'module',
    main: 'vuemark.umd.cjs',
    module: 'vuemark.js',
    types: 'vuemark.d.ts',
    exports: {
      '.': {
        import: './vuemark.js',
        require: './vuemark.umd.cjs',
        types: './vuemark.d.ts',
      },
    },
    dependencies: corePackageJson.devDependencies,
  }

  console.log('Writing package.json')
  fs.writeFileSync('dist/package.json', JSON.stringify(finalPackageJson, null, 2))

  console.log('Creating .npmrc')
  fs.writeFileSync('dist/.npmrc', `//registry.npmjs.org/:_authToken=\${NODE_AUTH_TOKEN}
registry=https://registry.npmjs.org/
always-auth=true`)

  console.log('Postbuild script completed')
}

run()
