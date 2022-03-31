<template>
  <div class="contain">
    <div class="right-menu-content">
      <div class="param-type">
        参数类型：<span style="color:grey;font-size:12px">普通文本</span>
      </div>
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="ruleForm"
        size="mini"
      >
        <el-form-item label="参数名称">
          <el-input
            v-model="ruleForm.name"
            class="form-width"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="初始值">
          <el-input
            v-model="ruleForm.value"
            class="form-width"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="外观" prop="appearance">
          <el-radio-group
            v-model="ruleForm.appearance"
            style="display:flex;flex-direction: column;height:100px;justify-content:space-around"
          >
            <el-radio label="bottom">下划线</el-radio>
            <el-radio label="border">边框</el-radio>
            <el-radio label="none">无边框</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item label="控件大小">
            <el-radio-group
            v-model="ruleForm.resize"
            style="display:flex;flex-direction: column;height:100px;justify-content:space-around"
          >
            <el-radio label="bottom">根据填写内容自动变化</el-radio>
            <el-radio label="border">边框</el-radio>
            <el-radio label="none">无边框</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item label="字符限制">
          <el-input
            v-model.number="ruleForm.textNumber"
            class="form-width"
          ></el-input>
        </el-form-item>

        <el-form-item label="中文字体">
          <el-select
            v-model="ruleForm.chineseFontType"
            placeholder="请选择"
            class="form-width"
            clearable
          >
            <el-option
              v-for="item in chineseFontTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :style="{ fontFamily: item.value }"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="字体大小">
          <el-select
            v-model="ruleForm.fontSize"
            placeholder="请选择"
            class="form-width"
            clearable
          >
            <el-option
              v-for="item in fontSizeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="字体颜色">
          <el-color-picker v-model="ruleForm.fontColor"></el-color-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="cancle">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "rightBar",
  data() {
    return {
      labelPosition: "top",
      ruleForm: {
        name: "",
        value: "",
        textNumber: 30,
        fontSize: "",
        westFontType: "",
        chineseFontType: "",
        fontColor: "",
      },
      westFontTypeOptions: [
        {
          value: "andale mono",
          label: "Andale Mono",
        },
        {
          value: "arial",
          label: "Arial",
        },
        {
          value: "helvetica",
          label: "helvetica",
        },
        {
          value: "arial black",
          label: "Arial Black",
        },
        {
          value: "book antiqua",
          label: "Book Antiqua",
        },
        {
          value: "comic sans ms",
          label: "Comic Sans MS",
        },
        {
          value: "courier new",
          label: "Courier New",
        },
        {
          value: "georgia",
          label: "Georgia",
        },
      ],
      chineseFontTypeOptions: [
        {
          value: "微软雅黑",
          label: "微软雅黑",
        },
        {
          value: "宋体",
          label: "宋体",
        },
        {
          value: "仿宋",
          label: "仿宋",
        },
        {
          value: "楷体",
          label: "楷体",
        },
        {
          value: "隶书",
          label: "隶书",
        },
        {
          value: "幼圆",
          label: "幼圆",
        },
        {
          value: "andale mono",
          label: "Andale Mono",
        },
        {
          value: "arial",
          label: "Arial",
        },
        {
          value: "helvetica",
          label: "helvetica",
        },
        {
          value: "arial black",
          label: "Arial Black",
        },
        {
          value: "book antiqua",
          label: "Book Antiqua",
        },
        {
          value: "comic sans ms",
          label: "Comic Sans MS",
        },
        {
          value: "courier new",
          label: "Courier New",
        },
        {
          value: "georgia",
          label: "Georgia",
        },
      ],
      fontSizeOptions: [
        {
          value: 12,
          label: "12",
        },
        {
          value: 14,
          label: "14",
        },
        {
          value: 16,
          label: "16",
        },
        {
          value: 18,
          label: "18",
        },
        {
          value: 20,
          label: "20",
        },
        {
          value: 22,
          label: "22",
        },
        {
          value: 24,
          label: "24",
        },
        {
          value: 26,
          label: "26",
        },
        {
          value: 28,
          label: "28",
        },
      ],
    };
  },
  watch: {
    ruleForm: {
      handler(newValue, oldalue) {
        this.$emit("setSettings", newValue);
        console.log("obj changed", newValue);
      },
      //   immediate: true,
      deep: true,
    },
  },
  methods: {
    onSubmit() {
      this.$emit("insertContent", this.ruleForm);
    },
    cancle() {
      this.$emit("cancle");
    },
  },
};
</script>

<style lang="scss" scoped>
.contain {
  width: 250px;
  position: fixed;
  top: 110px;
  right: calc(50% - 740px);
  max-height: calc(100vh - 150px);
  padding-right: 20px;
  overflow-y: auto;
  overflow-x: hidden;
  font-size: 14px;
  background-color: #f9fafa;
  text-align: left;
}
.right-menu-content {
  margin-bottom: 20px;
}
.param-type {
  margin-bottom: 20px;
}
.form-width {
  width: 100%;
}
/deep/.el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 5px;
}
</style>
