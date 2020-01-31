<template>
  <view class="container">
    <hello-list @select-event="eventSelectHelloHandler" :helloModels="helloModels" />
  </view>
</template>

<script>
import HelloList from "../components/HelloList";
import HelloUseCase from "../../application/service/HelloUseCase";

export default {
  components: {
    HelloList
  },
  data: {
    helloModels: []
  },
  async created() {
    const helloUseCase = new HelloUseCase();
    this.helloModels = await helloUseCase.reads();
    console.log("[DEBUG]-helloTop-loadHellos()", this.helloModels);
  },
  methods: {
    eventSelectHelloHandler(helloModel) {
    console.log("[DEBUG]-helloTop-eventSelectHelloHandler()", helloModel);
    }
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
