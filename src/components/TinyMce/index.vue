<template>
  <div
    :class="{ fullscreen: fullscreen }"
    class="tinymce-container"
    :style="{ width: containerWidth }"
  >
    <!-- <textarea :id="tinymceId" class="tinymce-textarea" /> -->
    <div :class="tinymceId"></div>
    <!-- <h1>-</h1>
    <div :class="tinymceId">
      Click here to edit the second section of content!
    </div> -->
    <div class="editor-custom-btn-container"></div>
  </div>
</template>

<script>
import plugins from "./plugins";
import toolbar from "./toolbar";

export default {
  name: "Tinymce",
  props: {
    id: {
      type: String,
      default: function() {
        return (
          "vue-tinymce-" +
          +new Date() +
          ((Math.random() * 1000).toFixed(0) + "")
        );
      },
    },
    value: {
      type: String,
      default: "",
    },
    toolbar: {
      type: [Array, Boolean],
      required: false,
      default() {
        return [];
      },
    },
    menubar: {
      type: [Array, Boolean],
      required: false,
      default: () => [],
    },
    inline: {
      type: Boolean,
      required: false,
      default: false,
    },
    height: {
      type: [Number, String],
      required: false,
      default: `calc( 100vh - 70px)`,
    },
    width: {
      type: [Number, String],
      required: false,
      default: "auto",
    },
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id,
      fullscreen: false,
      languageTypeList: {
        en: "en",
        zh: "zh_CN",
        es: "es_MX",
        ja: "ja",
      },
    };
  },
  computed: {
    language() {
      return this.languageTypeList["zh"];
    },
    containerWidth() {
      const width = this.width;
      if (/^[\d]+(\.[\d]+)?$/.test(width)) {
        // matches `100`, `'100'`
        return `${width}px`;
      }
      return width;
    },
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() =>
          window.tinymce.get(this.tinymceId).setContent(val || "")
        );
      }
    },
    language() {
      this.destroyTinymce();
      this.$nextTick(() => this.initTinymce());
    },
  },
  mounted() {
    this.initTinymce();
  },
  activated() {
    if (window.tinymce) {
      this.initTinymce();
    }
  },
  deactivated() {
    this.destroyTinymce();
  },
  destroyed() {
    this.destroyTinymce();
  },
  methods: {
    initTinymce() {
      const _this = this;
      window.tinymce.init({
        language: this.language, // 显示语种
        language_url: "tinymce/zh_CN.js",
        selector: `.${this.tinymceId}`, // 容器的id
        height: this.height, // 高度
        // inline: true, // 开启内联模式
        noneditable_editable_class: "mceEditable",
        noneditable_noneditable_class: "mceNonEditable",
        // body_class: "panel-body ",
        //  skin: 'oxide-dark',
        content_style: "body { margin: 0 auto; width: 210mm; height: 297mm; },", //设置文内容区域样式
        object_resizing: true, // 图片和表格是否开启在编辑器内部缩放
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar, // 工具栏，参数类型是个数组
        toolbar_mode: "floating",
        plugins: plugins,
        menubar: this.menubar, // 菜单栏的配置，也是数组  false取消显示菜单栏
        branding: false, // 隐藏右下角技术支持
        menu: {}, //设置菜单
        statusbar: false, // 隐藏最底部的技术支持、显示字数等
        end_container_on_empty_block: true, // 如果在空的内部块元素中按enter键，则此选项允许您拆分当前容器块元素。
        powerpaste_word_import: "clean", // 此设置控制如何筛选从Microsoft Word粘贴的内容
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: "square", // 此选项允许您在默认bullist工具栏控件中包含特定的无序列表项标记 默认值：default,circle,disc,square
        advlist_number_styles: "default",
        imagetools_cors_hosts: ["www.tinymce.com", "codepen.io"], // 指定跨域地址
        default_link_target: "_blank", // 链接默认打开方式
        link_title: false, // 是否允许禁用链接对话框中的链接标题输入字段
        nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
        // paste_word_valid_elements: "[]", // 此选项使您能够配置特定于MS Office的有效_元素
        paste_data_images: true, // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
        // paste_convert_word_fake_lists: false, // 插入word文档需要该属性
        paste_webkit_styles: "all", // 此选项允许您指定在WebKit中粘贴时要保留的样式
        paste_merge_formats: true, // 此选项启用粘贴插件的合并格式功能
        paste_auto_cleanup_on_paste: false, //
        // nonbreaking_force_tab: true, // 此选项允许您在用户按下键盘tab键时强制TinyMCE插入三个实体
        file_brower_callback_type: "media", // 此选项允许您使用空格或逗号分隔的类型名称列表指定所需的文件选取器类型。目前有三种有效类型：文件、图像和媒体
        file_picker_types: "media", // 此选项允许您通过空格或逗号分隔的类型名称列表指定所需的文件选取器类型。目前有三种有效类型：文件、图像和媒体
        // CONFIG: Font
        placeholder: "请输入内容",
        fontsize_formats: "10px 11px 12px 14px 16px 18px 20px 24px 36pt",
        font_formats: `微软雅黑='微软雅黑';宋体='宋体';黑体='黑体';仿宋='仿宋';楷体='楷体';隶书='隶书';幼圆='幼圆';
          Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;
          Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;
          Comic Sans MS=comic sans ms,sans-serif;
          Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;
          Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;
          Terminal=terminal,monaco;Times New Roman=times new roman,times;
          Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;
          Webdings=webdings;Wingdings=wingdings`,
        save_enablewhendirty: false,

        save_onsavecallback: function(editor) {
          _this.$message.success("已保存");
          console.log("保存：", editor.getContent());
        },
        //编辑器初始化完成后触发
        init_instance_callback: (editor) => {
          if (_this.value) {
            editor.setContent(_this.value);
          }
          _this.hasInit = true;
          editor.on("NodeChange Change KeyUp SetContent", () => {
            this.hasChange = true;
            this.$emit("input", editor.getContent());
          });
        },
        //编辑器初始化前执行
        setup(editor) {
          editor.on("FullscreenStateChanged", (e) => {
            _this.fullscreen = e.state;
          });
          editor.on("click", (e) => {
            console.log("光标点击_dom", e.target);
            console.log("光标点击_dataset值", e.target.dataset);
            console.log("光标点击_事件", e);
          });
          console.log("设置：", editor);
          //定义一个名为 assignment 的toolbar
          editor.ui.registry.addButton("assignment", {
            text: `<i class="el-icon-position" style="font-size: 18px"></i>`,
            tooltip: "赋值",
            onAction: () => {
              _this.$message.success("点击了自定义toolbar");
            },
          });
          /* Menu button that has a simple "insert date" menu item, and a submenu containing other formats. */
          /* Clicking the first menu item or one of the submenu items inserts the date in the selected format. */
          /* Helper functions */
          let toDateHtml = function(date) {
            return (
              '<time datetime="' +
              date.toString() +
              '">' +
              date.toDateString() +
              "</time>"
            );
          };
          let toGmtHtml = function(date) {
            return (
              '<time datetime="' +
              date.toString() +
              '">' +
              date.toGMTString() +
              "</time>"
            );
          };
          let toIsoHtml = function(date) {
            return (
              '<time datetime="' +
              date.toString() +
              '">' +
              date.toISOString() +
              "</time>"
            );
          };
          let btn = function() {
            return `
            <input style="background-color: transprent"  maxlength="5"></input>
            `;
          };
          let radiokBox = function() {
            return `
            <div class="radio-group">
              <label><input type="radio" name="sex" value="男" checked> 男</label>
              <label><input type="radio" name="sex" value="女"> 女</label>
            </div>
            `;
          };
          let checkBox = function() {
            return `
            <div class="radio-group">
              <label><input type="checkBox" name="sex" value="男" checked> 男</label>
              <label><input type="checkBox" name="sex" value="女"> 女</label>
            </div>
            `;
          };
          /**
            自定义插入按钮
          */
          editor.ui.registry.addMenuButton("menuDateButton", {
            text: "参数",
            fetch: function(callback) {
              var items = [
                {
                  type: "menuitem",
                  text: "普通文本",
                  onAction: function(_) {
                    // editor.insertContent(toDateHtml(new Date()));
                    _this.$emit("setInput");
                  },
                },
                {
                  type: "menuitem",
                  text: "性别单选框",
                  onAction: function(_) {
                    editor.insertContent(radiokBox());
                  },
                },
                {
                  type: "menuitem",
                  text: "性别复选框",
                  onAction: function(_) {
                    editor.insertContent(checkBox());
                  },
                },
                {
                  type: "nestedmenuitem",
                  text: "更多",
                  getSubmenuItems: function() {
                    return [
                      // {
                      //   type: "menuitem",
                      //   text: "GMT",
                      //   onAction: function(_) {
                      //     editor.insertContent(toGmtHtml(new Date()));
                      //   },
                      // },
                      // {
                      //   type: "menuitem",
                      //   text: "ISO",
                      //   onAction: function(_) {
                      //     editor.insertContent(toIsoHtml(new Date()));
                      //   },
                      // },
                      {
                        type: "menuitem",
                        text: "插入自定义按钮",
                        onAction: function(_) {
                          editor.insertContent(btn());
                        },
                      },
                    ];
                  },
                },
              ];
              callback(items);
            },
          });
        },
        //自定义上传
        images_upload_handler(blobInfo, success) {
          const formData = new FormData();
          formData.append("file", blobInfo.blob());
          // console.log("自定义上传：", blobInfo.blob(), "----", success);
          // apiServe.uploadImg(formData).then(res => {
          //   success(res.fullPath)
          // })
        },
        importword_handler: function(editor, files, next) {
          let file_name = files[0].name;
          if (file_name.substr(file_name.lastIndexOf(".") + 1) == "docx") {
            editor.notificationManager.open({
              text: "正在转换中...",
              type: "info",
            });
            next(files);
          } else {
            editor.notificationManager.open({
              text: "目前仅支持docx文件格式，若为doc，请将扩展名改为docx",
              type: "warning",
              closeButton: false, //设置为true可以自定关闭提示
            });
          }
          // next(files);
          // console.log("导入文件", files);
        },
        importword_filter: function(result, insert, message) {
          // 自定义操作部分
          insert(result); //回插函数
          console.log("自定义导入文件", result);
        },
      });
    },

    setDesgin() {
      const tinymce = window.tinymce.get(this.tinymceId);
      tinymce.setMode("design"); //开启编辑模式
      this.$message.success("开启编辑模式");
      // console.log("实例：", tinymce);
    },
    setReadOnly() {
      const tinymce = window.tinymce.get(this.tinymceId);
      tinymce.setMode("readonly"); //开启只读模式
      this.$message("开启只读模式");
    },
    destroyTinymce() {
      const tinymce = window.tinymce.get(this.tinymceId);
      if (this.fullscreen) {
        tinymce.execCommand("mceFullScreen");
      }

      if (tinymce) {
        tinymce.destroy();
      }
    },
    setContent(value) {
      if (window.tinymce) {
        window.tinymce.get(this.tinymceId).setContent(value);
      }
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent();
    },
    insertContent(value) {
      if (window.tinymce) {
        window.tinymce.get(this.tinymceId).insertContent(value);
      }
    },
    getNode() {
      if (window.tinymce) {
        let node = window.tinymce
          .get(this.tinymceId)
          .activeEditor.selection.getNode();
        console.log("node", node);
      }
    },
    imageSuccessCBK(arr) {
      arr.forEach((v) =>
        window.tinymce
          .get(this.tinymceId)
          .insertContent(`<img class="wscnph" src="${v.url}" >`)
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.tinymce-container {
  position: relative;
  line-height: normal;

  & /deep/.tox-tinymce {
    border: none;
  }
  & /deep/ .tox .tox-toolbar,
  .tox .tox-toolbar__overflow,
  .tox .tox-toolbar__primary {
    justify-content: center;
  }

  & /deep/ .tox .tox-sidebar-wrap {
    width: 220mm;
    margin: 20px auto;
    box-shadow: 0 2px 10px #acaaaa;
    /*滚动条样式*/
    & ::-webkit-scrollbar {
      width: 4px;
      /*height: 4px;*/
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: rgba(0, 0, 0, 0.2);
    }
    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 0;
      background: rgba(0, 0, 0, 0.1);
    }
  }
}

.tinymce-container {
  ::v-deep {
    .mce-fullscreen {
      z-index: 10000;
    }
  }
}

.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
  border: 1px solid black;
}

.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  /*z-index: 2005;*/
}

.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}

.editor-upload-btn {
  display: inline-block;
}
</style>
