import MyInput from "./input.vue";

const MyPlugin = {};

const components = [MyInput];

MyPlugin.install = function(Vue) {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
};

export default MyPlugin;
