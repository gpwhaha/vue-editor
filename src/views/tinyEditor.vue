<!--
 * @Author: your name
 * @Date: 2022-03-25 09:35:44
 * @LastEditTime: 2022-03-28 10:29:05
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V5.0_Webe:\workSpace\vue-editor\src\views\tinyEditor.vue
-->
<template>
  <div>
    <!-- <tiny-editor></tiny-editor> -->
    <!-- <el-button type="success" @click="setDesgin">编辑模式</el-button>
    <el-button type="info" @click="setReadOnly">只读模式</el-button> -->
    <tiny ref="tiny" :value="value" :inline="true"></tiny>
  </div>
</template>

<script>
import TinyEditor from "../components/TinymceNew";
import Tiny from "../components/TinyMce";
export default {
  components: { TinyEditor, Tiny },
  data() {
    return {
      value: "测试代码",
    };
  },
  methods: {
    setDesgin() {
      this.$refs.tiny.setDesgin();
    },
    setReadOnly() {
      this.$refs.tiny.setReadOnly();
    },
  },
};
</script>

<style></style>
