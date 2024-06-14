<template>
  <div class="home">
    <header>
      <h1>中柏网络科技</h1>
    </header>
    <RouterView />
  </div>
</template>
<script setup>
</script>

<style scoped lang="scss">
header {
  height: 50px;
  line-height: 50px;
  box-shadow: 0 2px #ccc;
  padding: 0 35px;

  h1 {
    font-size: 12px;
    float: right;
    cursor: pointer;
  }
}
</style>
