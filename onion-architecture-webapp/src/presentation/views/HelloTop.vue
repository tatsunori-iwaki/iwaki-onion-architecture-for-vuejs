<template>
  <el-row>
    <HelloForm
      @save-event="eventSaveHandler"
      @cancel-event="eventCancelHandler"
      @delete-event="eventDeleteHelloHandler"
      :helloModel="computedHelloModel"
      :editMode="computedEditModeState"
    />
    <HelloList
      @select-event="eventSelectHelloHandler"
      :helloModels="state.helloModels"
    />
    <HelloModal ref="helloModal" />
  </el-row>
</template>

<script lang="ts">
import {
  createComponent,
  reactive,
  computed,
  onMounted
} from "@vue/composition-api";
import HelloForm from "@/presentation/components/HelloForm.vue";
import HelloList from "@/presentation/components/HelloList.vue";
import HelloModal from "@/presentation/components/HelloModal.vue";
import HelloUseCase from "../../application/service/HelloUseCase";
import { HelloModel } from "../../domain/model/HelloModel";
import { EditModeEnum } from "../enums/HelloEnums";
import { Message } from "element-ui";

/**
 * This is the top screen for CRUD of Hello.
 * Responsible for linking each component and linking with the application layer.
 * The basics of the data are all handled by the parent top screen.
 */
export default createComponent({
  components: {
    HelloForm,
    HelloList,
    HelloModal
  },
  setup(props, context) {
    const state = reactive<{
      helloModel: HelloModel;
      helloModels: HelloModel[];
      editModeState: EditModeEnum;
      helloUseCase: HelloUseCase;
    }>({
      helloModel: new HelloModel(),
      helloModels: [],
      editModeState: EditModeEnum.NEW,
      helloUseCase: new HelloUseCase()
    });

    /** mounted is the state just after the DOM was created. */
    onMounted(() => {
      loadHellos();
    });

    /** Link the hello model to the input component by calculation. */
    const computedHelloModel = computed(() => state.helloModel);

    /** Link the hello model to the input component by calculation. */
    const computedEditModeState = computed(() => state.editModeState);

    /**
     * Receive event notifications from input components (select)
     * Set copy to separate from state.
     */
    const eventSelectHelloHandler = (helloModel: HelloModel) => {
      state.editModeState = EditModeEnum.EDIT;
      state.helloModel = { ...helloModel };
    };

    /**
     * Receive event notifications from input components (save)
     */
    const eventSaveHandler = () => {
      if (state.editModeState === EditModeEnum.NEW) createHello();
      if (state.editModeState === EditModeEnum.EDIT) updateHello();
      loadHellos();
    };

    /**
     * Receive event notifications from input components (cancel)
     */
    const eventCancelHandler = () => {
      state.editModeState = EditModeEnum.NEW;
      resetModel();
    };

    /**
     * Receive event notifications from input components (delete)
     */
    const eventDeleteHelloHandler = () => {
      state.editModeState = EditModeEnum.NEW;
      const copyModel = { ...state.helloModel };
      deleteHello(copyModel);
      loadHellos();
      resetModel();
    };

    /** Initializes the model framework. */
    const resetModel = () => {
      state.helloModel.message = "";
    };

    /** Get Hello list. */
    const loadHellos = async () => {
      state.helloModels = await state.helloUseCase.reads();
    };

    /** Create Hello list. */
    const createHello = async () => {
      const copyModel = { ...state.helloModel };
      try {
        state.helloUseCase.create(copyModel);
      } catch (e) {
        context.refs.helloModal.show("error", e); // FIXME: refs dose not exist on type SetupContext 👎
        return;
      }
      toast("create success.");
      resetModel();
    };

    /** Update Hello list. */
    const updateHello = async () => {
      const copyModel = { ...state.helloModel };
      try {
        state.helloUseCase.update(copyModel);
      } catch (e) {
        context.refs.helloModal.show("error", e); // FIXME: refs dose not exist on type SetupContext 👎
        return;
      }
      toast("update success.");
    };

    /** Delete Hello list. */
    const deleteHello = async (helloModel: HelloModel) => {
      try {
        state.helloUseCase.delete(helloModel);
      } catch (e) {
        context.refs.helloModal.show("error", e); // FIXME: refs dose not exist on type SetupContext 👎
        return;
      }
      toast("delete success.");
    };

    /** Show toast. */
    const toast = (infomationMassege: string) => {
      Message.success({
        showClose: true,
        message: infomationMassege,
        type: "success"
      });
    };

    /**
     * Remember to always return values, functions
     * used in <template> as objects by return of setup ()
     */
    return {
      state,
      eventSelectHelloHandler,
      eventSaveHandler,
      eventCancelHandler,
      eventDeleteHelloHandler,
      computedHelloModel,
      computedEditModeState
    };
  }
});
</script>

<style scoped lang="scss">
@import "@/presentation/styles/Hello";
</style>
