<template>
  <el-row>
    <HelloForm
      @save-event="onEvents.eventSaveHandler"
      @cancel-event="onEvents.eventCancelHandler"
      @delete-event="onEvents.eventDeleteHelloHandler"
      :helloModel="computedHelloModel"
      :editMode="computedEditModeState"
    />
    <HelloList
      @select-event="onEvents.eventSelectHelloHandler"
      :helloModels="reactiveStates.helloModels"
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
 * definition of states
 */
interface IState {
  helloModel: HelloModel;
  helloModels: HelloModel[];
  editModeState: EditModeEnum;
  helloUseCase: HelloUseCase;
}
const state: IState = {
  helloModel: new HelloModel(),
  helloModels: [],
  editModeState: EditModeEnum.NEW,
  helloUseCase: new HelloUseCase()
};

/**
 * Definition of private functions
 */
interface IMetiods {
  [key: string]: Function;
  resetModel(): void;
  loadHellos(): void;
  createHello(): Promise<void>;
  updateHello(): Promise<void>;
  deleteHello(helloModel: HelloModel): Promise<void>;
}
const metiods: IMetiods = {
  /** Initializes the model framework. */
  resetModel: () => {
    state.helloModel.message = "";
  },

  /** Get Hello list. */
  loadHellos: async () => {
    state.helloModels = await state.helloUseCase.reads();
  },

  /** Create Hello list. */
  createHello: async () => {
    const copyModel = { ...state.helloModel };
    try {
      await state.helloUseCase.create(copyModel);
    } catch (e) {
      // context.refs.helloModal.show("error", e); // FIXME: refs dose not exist on type SetupContext 👎
      return;
    }
    Message.success({
      showClose: true,
      message: "create success.",
      type: "success"
    });
    state.helloModel.message = "";
  },

  /** Update Hello list. */
  updateHello: async () => {
    const copyModel = { ...state.helloModel };
    try {
      await state.helloUseCase.update(copyModel);
    } catch (e) {
      // context.refs.helloModal.show("error", e); // FIXME: refs dose not exist on type SetupContext 👎
      return;
    }
    Message.success({
      showClose: true,
      message: "update success.",
      type: "success"
    });
  },

  /** Delete Hello list. */
  deleteHello: async (helloModel: HelloModel) => {
    try {
      await state.helloUseCase.delete(helloModel);
    } catch (e) {
      // context.refs.helloModal.show("error", e); // FIXME: refs dose not exist on type SetupContext 👎
      return;
    }
    Message.success({
      showClose: true,
      message: "delete success.",
      type: "success"
    });
  }
};

/** Definition of event functions */
interface IOnEvents {
  [key: string]: Function;
  eventSelectHelloHandler(helloModel: HelloModel): void;
  eventSaveHandler(): void;
  eventCancelHandler(): void;
  eventDeleteHelloHandler(): void;
}
const onEvents: IOnEvents = {
  /**
   * Receive event notifications from input components (select)
   * Set copy to separate from state.
   */
  eventSelectHelloHandler: (helloModel: HelloModel) => {
    state.editModeState = EditModeEnum.EDIT;
    state.helloModel = { ...helloModel };
  },

  /**
   * Receive event notifications from input components (save)
   */
  eventSaveHandler: async () => {
    if (state.editModeState === EditModeEnum.NEW) await metiods.createHello();
    if (state.editModeState === EditModeEnum.EDIT) await metiods.updateHello();
    await metiods.loadHellos();
  },

  /**
   * Receive event notifications from input components (cancel)
   */
  eventCancelHandler: () => {
    state.editModeState = EditModeEnum.NEW;
    metiods.resetModel();
  },

  /**
   * Receive event notifications from input components (delete)
   */
  eventDeleteHelloHandler: async () => {
    state.editModeState = EditModeEnum.NEW;
    const copyModel = { ...state.helloModel };
    await metiods.deleteHello(copyModel);
    await metiods.loadHellos();
    metiods.resetModel();
  }
};

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
    /**
     * setup can also return a render function,
     * which can directly make use of reactive state declared in the same scope.
     * Takes an object and returns a reactive proxy of the original.
     * This is equivalent to 2.x's Vue.observable().
     */
    const reactiveStates = reactive(state);

    /** mounted is the state just after the DOM was created. */
    onMounted(() => {
      metiods.loadHellos();
    });

    /** Link the hello model to the input component by calculation. */
    const computedHelloModel = computed(() => reactiveStates.helloModel);

    /** Link the hello model to the input component by calculation. */
    const computedEditModeState = computed(() => reactiveStates.editModeState);

    /**
     * Remember to always return values, functions
     * used in <template> as objects by return of setup ()
     */
    return {
      reactiveStates,
      onEvents,
      computedHelloModel,
      computedEditModeState
    };
  }
});
</script>

<style scoped lang="scss">
@import "@/presentation/styles/Hello";
</style>
