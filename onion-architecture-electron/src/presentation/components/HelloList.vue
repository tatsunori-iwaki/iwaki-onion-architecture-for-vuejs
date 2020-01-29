<template>
  <el-table
    v-show="this.helloModels.length > 0"
    :data="this.helloModels"
    @row-click="selectHello"
  >
    <el-table-column prop="id" label="id" />
    <el-table-column prop="message" label="message" @cell-click="selectHello" />
  </el-table>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import { HelloModel } from "../../domain/model/HelloModel";
import hello from "../../../mocks/api/hellos/hello";

/**
 * The component that displays the list.
 * The data life cycle is handled on the top screen.
 * In the component, the request received from Prop and
 * the operation result of Emit are notified at the top of the link.
 */
@Component
export default class HelloList extends Vue {
  /** Model for list. */
  @Prop()
  private helloModels?: HelloModel[];

  /** Notification operation for select event */
  @Emit("select-event")
  public selectHello(helloModel: HelloModel) {
    return helloModel;
  }
}
</script>

<style scoped lang="scss">
@import "@/presentation/styles/Hello";
</style>
