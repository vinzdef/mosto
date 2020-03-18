export default {
  namespace: 'home',
  beforeEnter(data) {
    console.log(data)
    // do something before leaving the current `index` namespace
  }
}