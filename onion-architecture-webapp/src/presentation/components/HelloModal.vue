<template>
  <modal name="error-modal" width="300" height="200">
    <el-col :span="24">
      <el-card class="box-card box-card-wrapper">
        <div slot="header">
          <span>{{ this.title }}</span>
        </div>
        <el-row class="row-wrapper">
          <span>{{ this.message }}</span>
        </el-row>
        <el-row class="row-wrapper">
          <el-button type="warning" @click="close">close</el-button>
        </el-row>
      </el-card>
    </el-col>
  </modal>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class HelloModal extends Vue {
  /** Modal title. */
  private title: string = "";
  /** Modal message */
  private message: string = "";

  /**
   * Show modal.
   * Call this method via refs.
   */
  public show(title: string, message: string) {
    this.title = title;
    this.message = message;
    this.$modal.show("error-modal");
  }

  /** Close modal */
  public close() {
    this.$modal.hide("error-modal");
  }
}
</script>

<style lang="scss">
@import "@/presentation/styles/Hello";
</style>
