<template>
  <el-row>
    <HelloForm
      @save-event="Presenter.eventSaveHandler"
      @cancel-event="Presenter.eventCancelHandler"
      @delete-event="Presenter.eventDeleteHelloHandler"
      :helloModel="reactiveStates.helloModel"
      :editMode="reactiveStates.editModeState"
    />
    <HelloList
      @select-event="Presenter.eventSelectHelloHandler"
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
  onMounted,
  SetupContext
} from "@vue/composition-api";
import HelloUseCase from "../../application/service/HelloUseCase";
import { HelloModel } from "../../domain/model/HelloModel";
import { EditModeEnum } from "../enums/HelloEnums";
import { Message } from "element-ui";
import { ComponentPropsOptions } from "@vue/composition-api/dist/component/componentProps";

/**
 * definition of states
 */
interface IState {
  helloModel: HelloModel;
  helloModels: HelloModel[];
  editModeState: EditModeEnum;
}

class Presenter {
  private static props: ComponentPropsOptions;
  private static context: SetupContext;
  private static state: IState;
  private static helloUseCase = new HelloUseCase();

  constructor(props: ComponentPropsOptions, context: SetupContext) {
    Presenter.props = props;
    Presenter.context = context;
    Presenter.state = {
      helloModel: new HelloModel(),
      helloModels: [],
      editModeState: EditModeEnum.NEW
    };
  }

  public static getState(): IState {
    return Presenter.state;
  }

  /**
   * Receive event notifications from input components (select)
   * Set copy to separate from state.
   */
  public static eventSelectHelloHandler(helloModel: HelloModel) {
    Presenter.state.editModeState = EditModeEnum.EDIT;
    Presenter.state.helloModel = { ...helloModel };
  }

  /**
   * Receive event notifications from input components (save)
   */
  public static eventSaveHandler() {
    if (Presenter.state.editModeState === EditModeEnum.NEW)
      Presenter.createHello();
    if (Presenter.state.editModeState === EditModeEnum.EDIT)
      Presenter.updateHello();
    Presenter.loadHellos();
  }

  /**
   * Receive event notifications from input components (cancel)
   */
  public static eventCancelHandler() {
    Presenter.state.editModeState = EditModeEnum.NEW;
    Presenter.resetModel();
  }

  /**
   * Receive event notifications from input components (delete)
   */
  public static async eventDeleteHelloHandler() {
    Presenter.state.editModeState = EditModeEnum.NEW;
    const copyModel = { ...Presenter.state.helloModel };
    await Presenter.deleteHello(copyModel);
    await Presenter.loadHellos();
    Presenter.resetModel();
  }

  /** Get Hello list. */
  public static async loadHellos() {
    Presenter.state.helloModels = await Presenter.helloUseCase.reads();
  }

  /** Initializes the model framework. */
  private static resetModel() {
    Presenter.state.helloModel.message = "";
  }

  /** Create Hello list. */
  private static async createHello() {
    const copyModel = { ...Presenter.state.helloModel };
    try {
      await Presenter.helloUseCase.create(copyModel);
    } catch (e) {
      // context.refs.helloModal.show("error", e); // FIXME: refs dose not exist on type SetupContext 👎
      return;
    }
    Message.success({
      showClose: true,
      message: "create success.",
      type: "success"
    });
    Presenter.state.helloModel.message = "";
  }

  /** Update Hello list. */
  private static async updateHello() {
    const copyModel = { ...Presenter.state.helloModel };
    try {
      await Presenter.helloUseCase.update(copyModel);
    } catch (e) {
      // context.refs.helloModal.show("error", e); // FIXME: refs dose not exist on type SetupContext 👎
      return;
    }
    Message.success({
      showClose: true,
      message: "update success.",
      type: "success"
    });
  }

  /** Delete Hello list. */
  private static async deleteHello(helloModel: HelloModel) {
    try {
      await Presenter.helloUseCase.delete(helloModel);
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
}

/**
 * This is the top screen for CRUD of Hello.
 * Responsible for linking each component and linking with the application layer.
 * The basics of the data are all handled by the parent top screen.
 */
export default createComponent({
  components: {
    HelloForm: () => import("@/presentation/components/HelloForm.vue"),
    HelloList: () => import("@/presentation/components/HelloList.vue"),
    HelloModal: () => import("@/presentation/components/HelloModal.vue")
  },
  setup(props: ComponentPropsOptions, context: SetupContext) {
    /** controller service */
    new Presenter(props, context);

    /**
     * setup can also return a render function,
     * which can directly make use of reactive state declared in the same scope.
     * Takes an object and returns a reactive proxy of the original.
     * This is equivalent to 2.x's Vue.observable().
     */
    const reactiveStates = reactive(Presenter.getState());

    /** mounted is the state just after the DOM was created. */
    onMounted(() => {
      Presenter.loadHellos();
    });

    /**
     * Remember to always return values, functions
     * used in <template> as objects by return of setup ()
     */
    return {
      reactiveStates,
      Presenter
    };
  }
});
</script>

<style scoped lang="scss">
@import "@/presentation/styles/Hello";
</style>
