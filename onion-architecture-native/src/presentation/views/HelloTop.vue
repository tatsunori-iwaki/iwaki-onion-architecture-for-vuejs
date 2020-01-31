<template>
  <view class="container">
    <hello-form
      :helloModel="helloModel"
      @save-event="eventSaveHandler"
      @cancel-event="eventCancelHandler"
      :editMode="computedEditModeState"
    />
    <hello-list
      :helloModels="helloModels"
      @select-event="eventSelectHelloHandler"
      @delete-event="eventDeleteHelloHandler"
    />
  </view>
</template>

<script>
import HelloList from "../components/HelloList";
import HelloForm from "../components/HelloForm";
import HelloUseCase from "../../application/service/HelloUseCase";
import { EditModeEnum } from "../enums/HelloEnums";

export default {
  components: {
    HelloList,
    HelloForm
  },
  data: {
    helloModels: [],
    helloModel: {},
    editModeState: EditModeEnum.NEW
  },
  async created() {
    const helloUseCase = new HelloUseCase();
    this.helloModels = await helloUseCase.reads();
  },
  computed: {
    computedEditModeState() {
      return this.editModeState;
    }
  },
  methods: {
    eventSelectHelloHandler(helloModel) {
      this.editModeState = EditModeEnum.EDIT;
      this.helloModel = { ...helloModel };
    },
    eventSaveHandler() {
      if (this.editModeState === EditModeEnum.NEW) this.createHello();
      if (this.editModeState === EditModeEnum.EDIT) this.updateHello();
    },
    eventCancelHandler() {
      this.editModeState = EditModeEnum.NEW;
      this.resetModel();
    },
    eventDeleteHelloHandler() {
      this.editModeState = EditModeEnum.NEW;
      const copyModel = { ...this.helloModel };
      this.deleteHello(copyModel);
      this.resetModel();
    },
    resetModel() {
      this.helloModel.message = "";
    },
    createHello() {
      console.log("[DEBUG-createHello()]");
      this.resetModel();
    },
    updateHello() {
      console.log("[DEBUG-updateHello()]");
    },
    deleteHello() {
      console.log("[DEBUG-deleteHello()]");
    }
  }
};
</script>
 
<style>
.container {
  background-color: white;
  flex: 1;
  padding-top: 40;
}
</style>
