<template>
  <div>
    <!-- <tiny-editor></tiny-editor> -->
    <!-- <el-button type="success" @click="setDesgin">编辑模式</el-button>
    <el-button type="info" @click="setReadOnly">只读模式</el-button> -->
    <tiny ref="tiny" :value="value"></tiny>
  </div>
</template>

<script>
import TinyEditor from "../components/TinymceNew";
import Tiny from "../components/TinyMce";
export default {
  components: { TinyEditor, Tiny },
  data() {
    return {
      value:''
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
