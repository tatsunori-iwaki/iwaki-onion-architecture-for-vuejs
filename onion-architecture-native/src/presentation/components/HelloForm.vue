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
    save() {
      this.$emit("save-event");
    },
    cancel() {
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
  padding: 10;
}
.input-wrapper {
  flex: 1;
  border-width: 1;
  border-color: black;
  justify-content: center;
  padding: 15;
}
.save-button {
  background-color: #1da1c988;
  border-width: 1;
  justify-content: center;
  padding: 10;
}
.cancel-button {
  background-color: #3d3e3f88;
  border-width: 1;
  justify-content: center;
  padding: 10;
}
</style>
