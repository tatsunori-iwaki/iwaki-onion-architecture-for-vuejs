<template>
  <view class="input-container">
    <view class="input-wrapper">
      <text-input placeholder="Enter new hello" v-model="helloModel.message" />
    </view>
    <touchable-opacity v-if="!isEditMode" class="save-button" title="Button" :on-press="save">
      <text>create</text>
    </touchable-opacity>
    <touchable-opacity v-if="isEditMode" class="save-button" title="Button" :on-press="save">
      <text>update</text>
    </touchable-opacity>
    <touchable-opacity v-if="isEditMode" class="cancel-button" title="Button" :on-press="cancel">
      <text>cancel</text>
    </touchable-opacity>
  </view>
</template>

<script>
import { EditModeEnum } from "../enums/HelloEnums";

export default {
  props: ["helloModel", "editMode"],
  data: {
    isEditMode: false
  },
  watch: {
    editMode: function(newIsEditMode, oldIsEditMode) {
      this.isEditMode = this.editMode === EditModeEnum.EDIT;
    }
  },
  methods: {
    save(helloModel) {
      this.$emit("save-event");
    },
    cancel(helloModel) {
      this.$emit("cancel-event");
    }
  }
};
</script>

<style>
.input-container {
  flex-direction: row;
  padding-top: 40;
  padding-bottom: 40;
}
.input-wrapper {
  flex: 1;
  border-width: 1;
  border-color: rgb(112, 84, 46);
  justify-content: center;
  padding: 10;
}
.save-button {
  background-color: #1da1c988;
  border-width: 1;
  justify-content: center;
}
.cancel-button {
  background-color: #3d3e3f88;
  border-width: 1;
  justify-content: center;
}
</style>
