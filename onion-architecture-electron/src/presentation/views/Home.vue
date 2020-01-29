<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <p>{{ presenter }}</p>
  </div>
</template>

<script>
export default {
  name: "home",
  data: function() {
    return {
      presenter: "hello world"
    };
  }
};
</script>
