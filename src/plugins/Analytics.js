export default {
  install (Vue, options) {
    window.dataLayer = window.dataLayer || []
    window.gtag = function () { window.dataLayer.push(arguments) }
    Vue.prototype.$gtag = window.gtag
  }
}
