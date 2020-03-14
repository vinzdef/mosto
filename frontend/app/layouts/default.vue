<template>
  <div>
    <nuxt />
  </div>
</template>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.links {
  display: flex;
  justify-content: space-between;
}

.button--black {
  display: inline-block;
  border: 1px solid #ffffff;
  color: #ffffff;
  text-decoration: none;
  padding: 10px 30px;
  transition: all 0.4s;
}

.button--black:hover {
  color: #fff;
  background-color: #000;
}
</style>
