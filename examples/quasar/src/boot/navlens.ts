import { boot } from 'quasar/wrappers'
import { pushEntry } from 'navlens'

export default boot(({ router }) => {
  router.afterEach((to) => {
    pushEntry(to.fullPath)
  })
})
