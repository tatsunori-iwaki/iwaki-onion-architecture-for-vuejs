import { mount, shallowMount } from "@vue/test-utils";
import HomeComponent from "@/presentation/views/Home.vue";
import HelloTop from "@/presentation/views/HelloTop.vue";
import HelloForm from "@/presentation/components/HelloForm.vue";
import HelloList from "@/presentation/components/HelloList.vue";
import { EditModeEnum } from "@/presentation/enums/HelloEnums";
import HelloUseCase from "@/application/service/HelloUseCase";

describe("/presentation/view/HelloTop", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
    delete process.env.NODE_ENV;
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  it("presentation - Home - isVueInstance", async () => {
    const wrapper = mount(HomeComponent);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("presentation - HelloTop - isVueInstance", async () => {
    process.env.NODE_ENV = "development";
    process.env.VUE_APP_USE_MOCK = true;
    const wrapper = shallowMount(HelloTop);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("presentation - HelloTop - eventSaveHandler from create", async () => {
    process.env.NODE_ENV = "development";
    process.env.VUE_APP_USE_MOCK = true;
    const wrapper = shallowMount(HelloTop, {
      data() {
        return { editModeState: EditModeEnum.NEW };
      }
    });
    wrapper.find(HelloForm).vm.$emit("save-event");
  });

  it("presentation - HelloTop - eventSaveHandler from update", async () => {
    process.env.NODE_ENV = "development";
    process.env.VUE_APP_USE_MOCK = true;
    const wrapper = shallowMount(HelloTop, {
      data() {
        return { editModeState: EditModeEnum.EDIT };
      }
    });
    wrapper.find(HelloForm).vm.$emit("save-event");
  });

  it("presentation - HelloTop - eventDeleteHelloHandler", async () => {
    process.env.NODE_ENV = "development";
    process.env.VUE_APP_USE_MOCK = true;
    const wrapper = shallowMount(HelloTop);
    wrapper.find(HelloForm).vm.$emit("delete-event");
  });

  it("presentation - HelloTop - eventCancelHandler", async () => {
    process.env.NODE_ENV = "development";
    process.env.VUE_APP_USE_MOCK = true;
    const wrapper = shallowMount(HelloTop);
    wrapper.find(HelloForm).vm.$emit("cancel-event");
  });

  it("presentation - HelloTop - eventSelectHelloHandler", async () => {
    process.env.NODE_ENV = "development";
    process.env.VUE_APP_USE_MOCK = true;
    const wrapper = shallowMount(HelloTop);
    wrapper.find(HelloList).vm.$emit("select-event");
  });

  it("presentation - HelloTop - createHello error case", async () => {
    process.env.NODE_ENV = "development";
    process.env.VUE_APP_USE_MOCK = true;
    const helloUseCase = new HelloUseCase();
    jest.spyOn(helloUseCase, "create").mockImplementation(() => {
      throw new Error("jest error");
    });
    const wrapper = shallowMount(HelloTop, {
      data() {
        return { editModeState: EditModeEnum.NEW, helloUseCase: helloUseCase };
      }
    });
    wrapper.find(HelloForm).vm.$emit("save-event");
  });

  it("presentation - HelloTop - updateHello error case", async () => {
    process.env.NODE_ENV = "development";
    process.env.VUE_APP_USE_MOCK = true;
    const helloUseCase = new HelloUseCase();
    jest.spyOn(helloUseCase, "update").mockImplementation(() => {
      throw new Error("jest error");
    });
    const wrapper = shallowMount(HelloTop, {
      data() {
        return { editModeState: EditModeEnum.EDIT, helloUseCase: helloUseCase };
      }
    });
    wrapper.find(HelloForm).vm.$emit("save-event");
  });

  it("presentation - HelloTop - deleteHello error case", async () => {
    process.env.NODE_ENV = "development";
    process.env.VUE_APP_USE_MOCK = true;
    const helloUseCase = new HelloUseCase();
    jest.spyOn(helloUseCase, "delete").mockImplementation(() => {
      throw new Error("jest error");
    });
    const wrapper = shallowMount(HelloTop, {
      data() {
        return { helloUseCase: helloUseCase };
      }
    });
    wrapper.find(HelloForm).vm.$emit("delete-event");
  });
});
