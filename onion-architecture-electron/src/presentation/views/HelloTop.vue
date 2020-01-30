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
      :helloModels="helloModels"
    />
    <HelloModal ref="helloModal" />
  </el-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloForm from "@/presentation/components/HelloForm.vue";
import HelloList from "@/presentation/components/HelloList.vue";
import HelloModal from "@/presentation/components/HelloModal.vue";
import HelloUseCase from "../../application/service/HelloUseCase";
import { HelloModel } from "../../domain/model/HelloModel";
import { EditModeEnum } from "../enums/HelloEnums";

/**
 * This is the top screen for CRUD of Hello.
 * Responsible for linking each component and linking with the application layer.
 * The basics of the data are all handled by the parent top screen.
 */
@Component({ components: { HelloForm, HelloList, HelloModal } })
export default class HelloTop extends Vue {
  /** Hello model. */
  private helloModel: HelloModel = new HelloModel();
  /** Hello list model. */
  private helloModels: HelloModel[] = [];
  /** It is in registration edit mode. */
  private editModeState: EditModeEnum = EditModeEnum.NEW;
  /** Class provided from application layer. */
  private helloUseCase: HelloUseCase = new HelloUseCase();

  /** mounted is the state just after the DOM was created. */
  async mounted() {
    this.loadHellos();
  }

  /** Link the hello model to the input component by calculation. */
  get computedHelloModel(): HelloModel {
    return this.helloModel;
  }

  /** Link the edit mode to the input component by calculation. */
  get computedEditModeState(): EditModeEnum {
    return this.editModeState;
  }

  /**
   * Receive event notifications from input components (save)
   */
  public eventSaveHandler() {
    if (this.editModeState === EditModeEnum.NEW) this.createHello();
    if (this.editModeState === EditModeEnum.EDIT) this.updateHello();
    this.loadHellos();
  }

  /**
   * Receive event notifications from input components (cancel)
   */
  public eventCancelHandler() {
    this.editModeState = EditModeEnum.NEW;
    this.resetModel();
  }

  /**
   * Receive event notifications from input components (delete)
   */
  public eventDeleteHelloHandler() {
    this.editModeState = EditModeEnum.NEW;
    const copyModel = { ...this.helloModel };
    this.deleteHello(copyModel);
    this.loadHellos();
    this.resetModel();
  }

  /**
   * Receive event notifications from input components (select)
   * Set copy to separate from state.
   */
  public eventSelectHelloHandler(helloModel: HelloModel) {
    this.editModeState = EditModeEnum.EDIT;
    this.helloModel = { ...helloModel };
  }

  /**
   * Methodize ref and access child component methods.
   * Because in TypeScript,
   * if ref is not defined as "any" type, a compile error will occur.
   */
  private refs(): any {
    return this.$refs;
  }

  /** Initializes the model framework. */
  private resetModel() {
    this.helloModel.message = "";
  }

  /** Show toast. */
  private toast(infomationMassege: string) {
    this.$message({
      showClose: true,
      message: infomationMassege,
      type: "success"
    });
  }

  /** Get Hello list. */
  private async loadHellos() {
    this.helloModels = await this.helloUseCase.reads();
  }

  /** Create Hello list. */
  private async createHello() {
    const copyModel = { ...this.helloModel };
    try {
      this.helloUseCase.create(copyModel);
    } catch (e) {
      this.refs().helloModal.show("error", e);
      return;
    }
    this.toast("create success.");
    this.resetModel();
  }

  /** Update Hello list. */
  private async updateHello() {
    const copyModel = { ...this.helloModel };
    try {
      this.helloUseCase.update(copyModel);
    } catch (e) {
      this.refs().helloModal.show("error", e);
      return;
    }
    this.toast("update success.");
  }

  /** Delete Hello list. */
  private async deleteHello(helloModel: HelloModel) {
    try {
      this.helloUseCase.delete(helloModel);
    } catch (e) {
      this.refs().helloModal.show("error", e);
      return;
    }
    this.toast("delete success.");
  }
}
</script>

<style scoped lang="scss">
@import "@/presentation/styles/Hello";
</style>
