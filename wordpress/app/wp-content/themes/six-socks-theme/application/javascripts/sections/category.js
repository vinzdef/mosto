export default {
  namespace: 'category',
  beforeEnter(data) {
    console.log(data)
    // do something before leaving the current `index` namespace
  }
}