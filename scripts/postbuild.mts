/* eslint-disable no-console */
import fs from 'node:fs'
import packageJson from '../package.json'

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

  const finalPackageJson: Record<string, any> = {
    name: '@vuemark/core',
    version: packageJson.version,
    type: 'module',
    main: 'vuemark.umd.cjs',
    module: 'vuemark.js',
    types: 'index.d.ts',
    exports: {
      '.': {
        import: './vuemark.js',
        require: './vuemark.umd.cjs',
        types: './index.d.ts',
      },
    },
    unpkg: 'vuemark.iife.js',
    jsdelivr: 'vuemark.iife.js',
    dependencies: {
      '@types/mdast': '^4.0.3',
    },
  }

  if (packageJson.author) {
    finalPackageJson.author = packageJson.author
  }

  if (packageJson.license) {
    finalPackageJson.license = packageJson.license
  }

  if (packageJson.repository) {
    finalPackageJson.repository = packageJson.repository
  }

  if (packageJson.keywords) {
    finalPackageJson.keywords = packageJson.keywords
  }

  if (packageJson.description) {
    finalPackageJson.description = packageJson.description
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
