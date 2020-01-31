<template>
  <hello-top />
</template>

<script>
import HelloTop from "./src/presentation/views/HelloTop";

export default {
  components: {
    HelloTop
  },
  created: function() {
    console.disableYellowBox = true;
  }
};
</script>
 