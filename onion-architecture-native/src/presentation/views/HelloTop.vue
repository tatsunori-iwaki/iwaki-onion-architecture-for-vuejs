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
    helloUseCase: new HelloUseCase(),
    helloModels: [],
    helloModel: {},
    editModeState: EditModeEnum.NEW
  },
  async mounted() {
    this.loadHellos();
  },
  computed: {
    /**
     * Link the edit mode to the input component by calculation.
     */
    computedEditModeState() {
      return this.editModeState;
    }
  },
  methods: {
    /**
     * Receive event notifications from input components (select)
     * Set copy to separate from state.
     */
    eventSelectHelloHandler(helloModel) {
      this.editModeState = EditModeEnum.EDIT;
      this.helloModel = { ...helloModel };
    },

    /**
     * Receive event notifications from input components (delete)
     */
    async eventDeleteHelloHandler(helloModel) {
      this.editModeState = EditModeEnum.NEW;
      this.helloModel = { ...helloModel };
      await this.deleteHello(this.helloModel);
      await this.loadHellos();
      this.resetModel();
    },

    /**
     * Receive event notifications from input components (save)
     */
    async eventSaveHandler() {
      if (this.editModeState === EditModeEnum.NEW) await this.createHello();
      if (this.editModeState === EditModeEnum.EDIT) await this.updateHello();
      await this.loadHellos();
    },

    /**
     * Receive event notifications from input components (cancel)
     */
    eventCancelHandler() {
      this.editModeState = EditModeEnum.NEW;
      this.resetModel();
    },

    /**
     * Initializes the model framework.
     */
    resetModel() {
      this.helloModel = {};
    },

    /**
     * Read Hello list.
     */
    async loadHellos() {
      this.helloModels = await this.helloUseCase.reads();
    },

    /**
     * Create Hello list.
     */
    createHello() {
      const copyModel = { ...this.helloModel };
      try {
        this.helloUseCase.create(copyModel);
      } catch (e) {
        console.log("[APP-ERROR]", e);
        return;
      }
      this.resetModel();
    },

    /**
     * Update Hello list.
     */
    updateHello() {
      const copyModel = { ...this.helloModel };
      try {
        this.helloUseCase.update(copyModel);
      } catch (e) {
        console.log("[APP-ERROR]", e);
        return;
      }
    },

    /**
     * Delete Hello list.
     */
    deleteHello() {
      const copyModel = { ...this.helloModel };
      try {
        this.helloUseCase.delete(copyModel);
      } catch (e) {
        console.log("[APP-ERROR]", e);
        return;
      }
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
