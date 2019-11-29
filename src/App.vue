<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
window.onload = function() {
  document.addEventListener("touchstart", function(event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  });
  document.addEventListener("gesturestart", function(event) {
    event.preventDefault();
  });
};
</script>
<style lang="stylus">
#app
  width: 100%
  height: 100%
</style>
