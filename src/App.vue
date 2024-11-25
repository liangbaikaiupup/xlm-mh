<template>
  <div id="app">
    <h3>mmmhh...</h3>
    <xlmOfficeView></xlmOfficeView>
    <xlmGantt ref="gantt"></xlmGantt>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  mounted(){
    this.$refs['gantt'].renderGantt([])
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
