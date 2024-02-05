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

  const copyDir = (src: string, dest: string) => {
    const entries = fs.readdirSync(src)
    fs.mkdirSync(dest, { recursive: true })
    for (const entry of entries) {
      const srcPath = `${src}/${entry}`
      const destPath = `${dest}/${entry}`
      if (fs.lstatSync(srcPath).isDirectory()) {
        copyDir(srcPath, destPath)
        continue
      }
      fs.copyFileSync(srcPath, destPath)
    }
  }

  const finalPackageJson: Record<string, any> = {
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
    finalPackageJson.bugs = packageJson.keywords
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

  console.log('Copying source for SSR')
  fs.mkdirSync('dist/src', { recursive: true })
  const subfiles = fs.readdirSync('packages/core')
  for (const file of subfiles) {
    if (file === 'node_modules') {
      continue
    }
    if (fs.lstatSync(`packages/core/${file}`).isDirectory()) {
      copyDir(`packages/core/${file}`, `dist/src/${file}`)
      continue
    }
    if (['tsconfig.json', 'package.json'].includes(file)) {
      continue
    }
    fs.copyFileSync(`packages/core/${file}`, `dist/src/${file}`)
  }

  console.log('Postbuild script completed')
}

run()
