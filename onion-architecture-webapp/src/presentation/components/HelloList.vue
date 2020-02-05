<template>
  <el-table
    v-show="props.helloModels.length > 0"
    :data="props.helloModels"
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
import { SetupContext, createComponent } from "@vue/composition-api";

interface Props {
  helloModels?: HelloModel[];
}

/**
 * The component that displays the list.
 * The data life cycle is handled on the top screen.
 * In the component, the request received from Prop and
 * the operation result of Emit are notified at the top of the link.
 */
export default createComponent({
  props: {
    helloModels: {
      type: Array,
      required: true,
      default: Array
    }
  },
  setup(props: Props, context: SetupContext) {
    const selectHello = (helloModel: HelloModel) => {
      context.emit("select-event", helloModel);
    };
    console.log(props);
    return {
      props,
      selectHello
    };
  }
});
</script>

<style scoped lang="scss">
@import "@/presentation/styles/Hello";
</style>
