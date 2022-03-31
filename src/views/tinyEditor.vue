<template>
  <div>
    <el-button type="success" @click="setDesgin">编辑模式</el-button>
    <el-button type="info" @click="setReadOnly">只读模式</el-button>
    <tiny ref="tiny" :value="value" @setInput="setInput"></tiny>
    <right-bar
      @insertContent="insertContent"
      @cancle="cancle"
      v-if="isshow"
    ></right-bar>
  </div>
</template>

<script>
import TinyEditor from "../components/TinymceNew";
import Tiny from "../components/TinyMce";
import RightBar from "./components/rightBar.vue";
import Input from "../libs/Plugins/input.vue";
export default {
  components: { TinyEditor, Tiny, RightBar, Input },
  data() {
    return {
      value: `
    <div class='mceNonEditable  mydiv'>
      让我们来测试一下这个插入输入框转word什么效果，<input
        style="font-size: 14px; font-family: '宋体'; border-bottom: 1px solid #000; border-top: none; border-left: none; border-right: none;"
        type="text"
        value="测试插入输入框"
      />哈哈哈哈哈。
      <span
        class="myclass mceEditable"
        style="font-size: 18px; display: inline-block; min-width: 148px; min-height: 24px; font-family: '宋体'; color: #c22424; border: 1px solid #000;"
        data-display-type="block"
        data-qys-version="1.0"
        data-qys-type="text"
        data-qys-name="参数1"
        data-border-type="all"
        data-max="300"
        data-shadow-value="111"
        data-value="1111"
      >
        测试边框</span>&nbsp; 少时诵诗书所所
    </div>
    <div class="radio-group">
      <label
        ><input checked="checked" name="sex" type="radio" value="男" />
        男</label>
      <label><input name="sex" type="radio" value="女" /> 女</label>
    </div>
    <div>
      &nbsp;
      <span
        class="myclass mceEditable"
        style="font-size: 14px; display: inline-block; min-width: 148px; min-height: 24px; font-family: '楷体'; color: #1c91a3; border-bottom: 1px solid #000; border-top: none; border-left: none; border-right: none;"
        data-display-type="block"
        data-qys-version="1.0"
        data-qys-type="text"
        data-qys-name="参数1"
        data-border-type="all"
        data-max="300"
        data-shadow-value="111"
        data-value="1111"
      >
        测试下边框额鹅鹅鹅</span>少时诵诗书所所
      &nbsp;
    </div>

`,
      isshow: false,
    };
  },
  methods: {
    setDesgin() {
      this.$refs.tiny.setDesgin();
    },
    setReadOnly() {
      this.$refs.tiny.setReadOnly();
    },
    setInput() {
      this.isshow = true;
      console.log("我被调用了");
    },
    cancle() {
      this.isshow = false;
    },
    insertContent(form) {
      let border = "";
      if (form.appearance == "bottom") {
        border = `border-bottom:1px solid #000;
                  border-top:none;
                  border-left:none;
                  border-right:none`;
      } else if (form.appearance == "none") {
        border = "border:none";
      } else {
        border = "border:1px solid #000";
      }
      let input = `<input value="${form.value}" 
                          type="text" 
                          maxlength="${form.textNumber}"
                          style="font-size:${form.fontSize}px;
                          font-family:'${form.chineseFontType}';
                          color:${form.fontColor};
                          ${border}"></input>`;

      let spanInput = `<span
                          data-display-type="block"
                          contenteditable="ture"
                          data-qys-version="1.0"
                          data-qys-type="text"
                          data-qys-name="参数1"
                          data-border-type="all"
                          data-max="300"
                          data-shadow-value="111"
                          data-value="1111"
                          class="mceEditable"
                          style="font-size:${form.fontSize}px;
                          display:inline-block;
                          min-width: 148px;
                          min-height: 24px;
                          font-family:'${form.chineseFontType}';
                          color:${form.fontColor};
                          ${border}"> ${form.value}</span>`;
      this.$refs.tiny.insertContent(spanInput);
      this.isshow = false;
      this.$message.success("插入成功");
      console.log("submit!", input);
    },
  },
};
</script>

<style></style>
