import { boot } from 'quasar/wrappers'
import { pushEntry } from 'navlens/quasar'

export default boot(({ router }) => {
  router.afterEach((to) => {
    pushEntry(to.fullPath)
  })
})
