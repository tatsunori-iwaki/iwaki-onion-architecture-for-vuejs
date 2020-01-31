<template>
  <scroll-view>
    <view class="hello-wrapper" v-for="(helloModel, index) in helloModels" :key="index">
      <text>{{helloModel.message}}</text>
      <view class="hello-button-wrapper">
        <touchable-opacity :on-press="() => selectHello(helloModel)" class="edit-button">
          <image :source="editIcon" class="image-style" />
        </touchable-opacity>
      </view>
    </view>
  </scroll-view>
</template>

<script>
import editIcon from "../../../assets/edit_icon.png";

export default {
  props: ["helloModels"],
  data: function() {
    return { editIcon };
  },
  mounted: function() {
    console.log("[DEBUG-HelloList-mounted]", this.helloModels);
  },
  methods: {
    selectHello(helloModel) {
      this.$emit("select-event", helloModel);
    }
  }
};
</script>

<style>
.hello-wrapper {
  background-color: beige;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding: 10;
  border-radius: 5;
}
.hello-button-wrapper {
  flex-direction: row;
}
.edit-button {
  padding-right: 20;
}
.image-style {
  height: 20;
  width: 20;
}
</style>
