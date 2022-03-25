<template>
  <div style="overflow:hidden">
    <Toolbar
      id="toolbar"
      style="border-bottom: 1px solid #ccc;width:100%;"
      :editorId="editorId"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <div class="editContent">
      <Editor
        id="content"
        :editorId="editorId"
        :defaultConfig="editorConfig"
        :defaultContent="defaultContent"
        :defaultHtml="defaultHtml"
        :mode="mode"
      />
    </div>
    <!-- 注意： defaultContent （JSON 格式） 和 defaultHtml （HTML 格式），二选一 -->
  </div>
</template>

<script>
import "@wangeditor/editor/dist/css/style.css";
import {
  Editor,
  Toolbar,
  getEditor,
  removeEditor,
} from "@wangeditor/editor-for-vue";

import { DomEditor, Boot } from "@wangeditor/editor";

import "./MyMenus";

export default {
  components: { Editor, Toolbar },
  data() {
    return {
      editorId: `w-e-${Math.random()
        .toString()
        .slice(-5)}`, //【注意】编辑器 id ，要全局唯一
      toolbarConfig: {
        toolbarKeys: [
          "headerSelect",
          "blockquote",
          "|",
          "bold",
          "underline",
          "italic",
          "color",
          "bgColor",
          "|",
          "fontSize",
          "fontFamily",
          "lineHeight",
          "|",
          "bulletedList",
          "numberedList",
          "todo",
          "group-justify",
          "|",
          "emotion",
          "insertLink",
          "insertTable",
          "codeBlock",
          "divider",
          "|",
          "undo",
          "redo",
          "|",
          "menu3",
          // 菜单组，包含多个菜单
          // {
          //   key: "group-more-style", // 必填，要以 group 开头
          //   title: "更多样式", // 必填
          //   iconSvg: "<svg>....</svg>", // 可选
          //   menuKeys: ["through", "code", "clearStyle"], // 下级菜单 key ，必填
          // },
        ],
        excludeKeys: ["fullScreen"], // 排除不显示在工具栏组件
        // insertKeys: {
        //   index: 5, // 插入的位置，基于当前的 toolbarKeys
        //   keys: ["menu-key1", "menu-key2"],
        // },
      },
      editorConfig: { placeholder: "请输入内容..." },
      mode: "default", // or 'simple'

      // defaultContent （JSON 格式） 和 defaultHtml（HTML 格式）二选一
      defaultContent: [{ type: "paragraph", children: [{ text: "一行文字" }] }],
      defaultHtml: "<p>hello</p>",
    };
  },
  mounted() {
    this.$nextTick(() => {
      const editor = getEditor(this.editorId); // 获取 editor 实例（必须等它渲染完成）
      const toolbar = DomEditor.getToolbar(editor);
      if (editor == null) return;
      function MyDropPanelMenu() {}
      MyDropPanelMenu.prototype = editor;
      console.log("getEditor on mounted", editor);
    });
  },
  beforeDestroy() {
    const editor = getEditor(this.editorId);
    if (editor == null) return;

    // 【注意】组件销毁时，及时销毁编辑器
    editor.destroy();
    removeEditor(this.editorId);
  },
  methods: {},
};
</script>

<style scoped lang="scss">
#toolbar /deep/.w-e-toolbar {
  justify-content: center;
}
.editContent {
  height: calc(100vh - 50px);
  background-color: #f5f5f5;
  overflow-y: auto;
}
#content {
  background-color: rgb(245, 245, 245);
  position: relative;
  width: 857px;
  background-color: #fff;
  padding: 20px 50px 50px 50px;
  border: 1px solid #e8e8e8;
  margin: 30px auto 120px auto;
  box-shadow: 0 2px 10px #acaaaa;
}

#content /deep/ .w-e-text-container {
  min-height: 850px;
}
</style>
