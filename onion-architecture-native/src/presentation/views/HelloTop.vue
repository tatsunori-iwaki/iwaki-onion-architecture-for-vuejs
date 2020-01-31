<template>
  <view class="container">
    <hello-list />
  </view>
</template>

<script>
import HelloList from "../components/HelloList";
import HelloUseCase from "../../application/service/HelloUseCase";

export default {
  components: {
    HelloList
  },
  created() {
    const helloUseCase = new HelloUseCase();
    console.log("[DEBUG]-created()");
    console.log("[DEBUG]-created()", helloUseCase.reads());
  }
};
</script>
 
<style>
.container {
  background-color: rgb(172, 169, 169);
  flex: 1;
  padding-top: 40;
}
</style>
