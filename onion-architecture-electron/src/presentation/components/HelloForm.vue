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
            v-model="helloModel.message"
            placeholder="message..."
            clearable
          ></el-input>
        </el-col>
      </el-row>
      <el-row class="row-wrapper">
        <el-col :span="24">
          <el-button v-show="!isEditMode" type="success" @click="save"
            >create</el-button
          >
          <el-button v-show="isEditMode" type="success" @click="save"
            >update</el-button
          >
          <el-button v-show="isEditMode" type="info" @click="cancel"
            >cancel</el-button
          >
          <el-button v-show="isEditMode" type="danger" @click="remove"
            >delete</el-button
          >
        </el-col>
      </el-row>
    </el-card>
  </el-col>
</template>

<script lang="ts">
import { Component, Emit, Prop, Watch, Vue } from "vue-property-decorator";
import { HelloModel } from "../../domain/model/HelloModel";
import { EditModeEnum } from "../enums/HelloEnums";

/**
 * Input component
 * The data life cycle is handled on the top screen.
 * In the component, the request received from Prop and
 * the operation result of Emit are notified at the top of the link.
 */
@Component
export default class HelloForm extends Vue {
  /** It is a model for input. */
  @Prop()
  private helloModel?: HelloModel;
  /** Input component edit mode. */
  @Prop({ default: EditModeEnum.NEW })
  private editMode: EditModeEnum = EditModeEnum.NEW;
  /** Whether you are in edit mode. */
  private isEditMode: Boolean = false;

  /** Monitor edit mode. */
  @Watch("editMode")
  public watchEditMode() {
    this.isEditMode = this.editMode === EditModeEnum.EDIT;
  }

  /** Notification operation for save event */
  @Emit("save-event")
  public save() {}

  /** Notification operation for cancel event */
  @Emit("cancel-event")
  public cancel() {}

  /** Notification operation for delete event */
  @Emit("delete-event")
  public remove() {}
}
</script>

<style scoped lang="scss">
@import "@/presentation/styles/Hello";
</style>
