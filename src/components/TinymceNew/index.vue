<template>
  <div
    :class="{ fullscreen: fullscreen }"
    class="tinymce-container"
    :style="{ width: containerWidth }"
  >
    <textarea :id="tinymceId" class="tinymce-textarea" />
    <div class="editor-custom-btn-container">
      <!-- <editorImage
        color="#1890ff"
        class="editor-upload-btn"
        @successCBK="imageSuccessCBK"
      /> -->
    </div>
  </div>
</template>

<script>
/**
 * docs:
 * https://panjiachen.github.io/vue-element-admin-site/feature/component/rich-editor.html#tinymce
 */
import editorImage from "./components/EditorImage";
import plugins from "./plugins";
import toolbar from "./toolbar";
import load from "./dynamicLoadScript";
// import "./cdn.js";
// import apiServe from '@/api/apiServe';
// import { getLocalbaseURL } from "@/api/axios";
//https://cdn.jsdelivr.net/npm/tinymce@5.1.0/tinymce.min.js
// why use this cdn, detail see https://github.com/PanJiaChen/tinymce-all-in-one
// const ZH = "https://cdn.jsdelivr.net/npm/tinymce@5.1.0/langs/zh_CN.js";
const CDN4 =
  "https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js";
const CDN5 = "https://cdn.jsdelivr.net/npm/tinymce@5.1.0/tinymce.min.js";
const tinymceCDN = CDN5;
export default {
  name: "Tinymce",
  components: { editorImage },
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
      default: "<em>哈哈哈哈哈</em>",
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
    menubar: {
      type: String,
      default: "file edit insert view format table",
    },
    height: {
      type: [Number, String],
      required: false,
      default: 360,
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
      // return this.languageTypeList[this.$store.getters.language]
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
    this.init();
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
    init() {
      // dynamic load tinymce from cdn
      load(tinymceCDN, (err) => {
        if (err) {
          this.$message.error(err.message);
          return;
        }
        this.initTinymce();
      });
    },
    initTinymce() {
      const _this = this;
      window.tinymce.init({
        language: this.language, // 显示语种
        selector: `#${this.tinymceId}`, // 容器的id
        height: this.height, // 高度
        body_class: "panel-body ",
        object_resizing: false, // 图片和表格是否开启在编辑器内部缩放
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar, // 工具栏，参数类型是个数组
        menubar: this.menubar, // 菜单栏的配置，也是数组
        plugins: plugins,
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

        paste_word_valid_elements: "[]", // 此选项使您能够配置特定于MS Office的有效_元素
        paste_data_images: true, // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
        paste_convert_word_fake_lists: false, // 插入word文档需要该属性
        paste_webkit_styles: "all", // 此选项允许您指定在WebKit中粘贴时要保留的样式
        paste_merge_formats: true, // 此选项启用粘贴插件的合并格式功能
        paste_auto_cleanup_on_paste: false, //
        // nonbreaking_force_tab: true, // 此选项允许您在用户按下键盘tab键时强制TinyMCE插入三个实体
        file_brower_callback_type: "media", // 此选项允许您使用空格或逗号分隔的类型名称列表指定所需的文件选取器类型。目前有三种有效类型：文件、图像和媒体
        file_picker_types: "media", // 此选项允许您通过空格或逗号分隔的类型名称列表指定所需的文件选取器类型。目前有三种有效类型：文件、图像和媒体
        // CONFIG: Font
        fontsize_formats: "10px 11px 12px 14px 16px 18px 20px 24px 36pt",
        branding: false, // 隐藏右下角技术支持
        menu: {}, //设置菜单
        statusbar: false, // 隐藏最底部的显示字数等

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
        setup(editor) {
          editor.on("FullscreenStateChanged", (e) => {
            _this.fullscreen = e.state;
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
          var toDateHtml = function(date) {
            return (
              '<time datetime="' +
              date.toString() +
              '">' +
              date.toDateString() +
              "</time>"
            );
          };
          var toGmtHtml = function(date) {
            return (
              '<time datetime="' +
              date.toString() +
              '">' +
              date.toGMTString() +
              "</time>"
            );
          };
          var toIsoHtml = function(date) {
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
          editor.ui.registry.addMenuButton("menuDateButton", {
            text: "自定义插入时间",
            fetch: function(callback) {
              var items = [
                {
                  type: "menuitem",
                  text: "Insert Date",
                  onAction: function(_) {
                    editor.insertContent(toDateHtml(new Date()));
                  },
                },
                {
                  type: "nestedmenuitem",
                  text: "Other formats",
                  getSubmenuItems: function() {
                    return [
                      {
                        type: "menuitem",
                        text: "GMT",
                        onAction: function(_) {
                          editor.insertContent(toGmtHtml(new Date()));
                        },
                      },
                      {
                        type: "menuitem",
                        text: "ISO",
                        onAction: function(_) {
                          editor.insertContent(toIsoHtml(new Date()));
                        },
                      },
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
        // it will try to keep these URLs intact
        // https://www.tiny.cloud/docs-3x/reference/configuration/Configuration3x@convert_urls/
        // https://stackoverflow.com/questions/5196205/disable-tinymce-absolute-to-relative-url-conversions
        convert_urls: false,
        // 整合七牛上传
        images_dataimg_filter(img) {
          setTimeout(() => {
            const $image = img;
            $image.removeAttr("width");
            $image.removeAttr("height");
            if ($image[0].height && $image[0].width) {
              $image.attr("data-wscntype", "image");
              $image.attr("data-wscnh", $image[0].height);
              $image.attr("data-wscnw", $image[0].width);
              $image.addClass("wscnph");
            }
          }, 0);
          return img;
        },
        images_upload_handler(blobInfo, success) {
          const formData = new FormData();
          formData.append("file", blobInfo.blob());
          // apiServe.uploadImg(formData).then(res => {
          //   success(res.fullPath)
          // })
        },
      });
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
