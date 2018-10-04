export default (pkg, { load }) => {
  // Read nuxt package
  const nuxt = load('../..')

  // Copy version before build for dist banner
  pkg.on('build:before', () => {
    pkg.copyFieldsFrom(nuxt, ['version'])
    pkg.writePackage()
  })

  pkg.on('build:done', () => {
    // Copy fields from nuxt package
    pkg.copyFieldsFrom(nuxt, [
      'contributors',
      'license',
      'repository',
      'keywords',
      'homepage',
      'engines',
      'dependencies'
    ])

    // Copy files from nuxt package
    pkg.copyFilesFrom(nuxt, [
      'LICENSE'
    ])

    // Sort dependencies
    pkg.sortDependencies()

    // Update package.json
    pkg.writePackage()
  })
}
