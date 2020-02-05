<template>
  <el-col :span="24">
    <el-card class="box-card box-card-wrapper">
      <div slot="header">
        <span>Add message form</span>
      </div>
      <el-row class="row-wrapper">
        <el-col :span="12">
          <span>Hello message</span>
        </el-col>
        <el-col :span="12">
          <el-input
            v-model="props.helloModel.message"
            placeholder="message..."
            clearable
          ></el-input>
        </el-col>
      </el-row>
      <el-row class="row-wrapper">
        <el-col :span="24">
          <el-button
            v-show="!state.isEditMode"
            type="success"
            @click="$emit('save-event', $event.target.helloModel)"
            >create</el-button
          >
          <el-button
            v-show="state.isEditMode"
            type="success"
            @click="$emit('save-event', $event.target.helloModel)"
            >update</el-button
          >
          <el-button
            v-show="state.isEditMode"
            type="info"
            @click="$emit('cancel-event')"
            >cancel</el-button
          >
          <el-button
            v-show="state.isEditMode"
            type="danger"
            @click="$emit('delete-event')"
            >delete</el-button
          >
        </el-col>
      </el-row>
    </el-card>
  </el-col>
</template>

<script lang="ts">
import {
  SetupContext,
  createComponent,
  watch,
  reactive
} from "@vue/composition-api";
import { HelloModel } from "../../domain/model/HelloModel";
import { EditModeEnum } from "../enums/HelloEnums";
import { PropsDefinition } from "vue/types/options";

/**
 * Input component
 * The data life cycle is handled on the top screen.
 * In the component, the request received from Prop and
 * the operation result of Emit are notified at the top of the link.
 */
interface Props {
  helloModel?: HelloModel;
  editMode: EditModeEnum;
}
export default createComponent({
  props: {
    helloModel: {
      type: Object,
      required: true,
      default: null
    },
    editMode: {
      type: String,
      required: true,
      default: EditModeEnum.NEW
    }
  },
  setup(props: Props, context: SetupContext) {
    const state = reactive({ isEditMode: false });
    watch(() => {
      state.isEditMode = props.editMode === EditModeEnum.EDIT;
    });
    return {
      state,
      props
    };
  }
});
</script>

<style scoped lang="scss">
@import "@/presentation/styles/Hello";
</style>
