import { configure } from 'quasar/wrappers'

export default configure(() => ({
  boot: ['navlens'],
  framework: { config: {} },
  build: {
    target: { browser: ['es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1'] },
    vueRouterMode: 'history',
  },
}))
