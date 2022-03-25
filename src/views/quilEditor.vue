<template>
  <div class="edit_container" style="width: 100%;height: 100%">
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @change="onEditorChange($event)"
    >
    </quill-editor>
    <!-- 使用input 标签劫持原本视频上传事件，实现视频上传 -->
    <input
      type="file"
      accept="video/*"
      name="file"
      ref="uploadFileVideo"
      id="uploadFileVideo"
      @change="changevideo"
      style="opacity: 0; width: 0; height: 0;cursor: pointer"
    />
    <!--使用input 标签劫持原本图片上传事件，实现图片上传-->
    <input
      type="file"
      name="file"
      id="uploadFileImg"
      ref="uploadFileImg"
      @change="changeImg"
      style="opacity: 0; width: 0; height: 0;cursor: pointer"
    />
  </div>
</template>

<script>
import * as Quill from "quill"; //引入编辑器
//自定义quill编辑器的字体
var fonts = [
  "Microsoft-YaHei",
  "YouYuan",
  "SimSun",
  "SimHei",
  "KaiTi",
  "FangSong",
  "Arial",
  "Times-New-Roman",
  "sans-serif",
];
var Font = Quill.import("formats/font");
Font.whitelist = fonts; //将字体加入到白名单
Quill.register(Font, true);
/*设置字体大小*/
var Size = Quill.import("attributors/style/size");
Size.whitelist = [
  "10px",
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "24px",
  false,
];
Quill.register(Size, true);
export default {
  data() {
    return {
      content: "",
      editorOption: {
        placeholder: "输入文本...",
        theme: "snow", //主题
        modules: {
          imageResize: {
            //添加图片拖拽上传，自定义大小（下面会详细介绍安装方法）
            displayStyles: {
              //添加
              backgroundColor: "black",
              border: "none",
              color: "white",
            },
            modules: ["Resize", "DisplaySize", "Toolbar"], //添加
          },
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"], //加粗，斜体，下划线，删除线
              ["blockquote", "code-block"], //引用，代码块
              [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
              [{ list: "ordered" }, { list: "bullet" }], //列表
              [{ script: "sub" }, { script: "super" }], // 上下标
              [{ indent: "-1" }, { indent: "+1" }], // 缩进
              [{ direction: "rtl" }], // 文本方向
              [
                {
                  size: [
                    "10px",
                    "12px",
                    "14px",
                    "16px",
                    "18px",
                    "20px",
                    "24px",
                    false,
                  ],
                },
              ], // 字体大小，false设置自定义大小
              [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题
              [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
              [{ font: fonts }], //字体
              [{ align: [] }], //对齐方式
              ["clean"], //清除字体样式
              ["image", "video"], //上传图片、上传视频
            ],
            handlers: {
              video: function(val) {
                // 劫持原来的视频点击按钮事件
                document.querySelector("#uploadFileVideo").click();
              },
              image: function() {
                // 劫持原来的图片点击按钮事件
                document.querySelector("#uploadFileImg").click();
              },
            },
          },
        },
      },
    };
  },
  methods: {
    getMountData() {},
    onEditorReady(editor) {}, // 准备编辑器
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus(e) {
        console.log('获取到焦点',e);
    }, // 获得焦点事件
    onEditorChange() {}, // 内容改变事件
    // 转码
    escapeStringHTML(str) {
      str = str.replace(/&lt;/g, "<");
      str = str.replace(/&gt;/g, ">");
      return str;
    },
    changeImg() {
      //上传图片到服务器
      //回调中调用  this.insertEle('image', data); 方法，插入图片到富文本
    }, //图片上传事件
    changevideo() {
      //上传视频到服务器
      //回调中调用  this.insertEle('video', data); 方法，插入图片到富文本
    }, //视频上传事件
    insertEle(type, url) {
      let quill = this.$refs.myQuillEditor.quill;
      let length = quill.getSelection().index;
      // 插入视频  response.data.url为服务器返回的图片地址
      if (type === "video") {
        quill.insertEmbed(length, "simpleVideo", {
          url,
          controls: "controls",
          width: "100%",
          height: "auto",
        });
      } else {
        quill.insertEmbed(length, type, url);
      }
      // 调整光标到最后
      quill.setSelection(length + 1);
    },
  },
};
</script>

<style scoped>
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "标题1";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "标题2";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "标题3";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "标题4";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "标题5";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "标题6";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="SimSun"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="SimSun"]::before {
  content: "宋体";
  font-family: "SimSun";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="SimHei"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="SimHei"]::before {
  content: "黑体";
  font-family: "SimHei";
}
.ql-snow
  .ql-picker.ql-font
  .ql-picker-label[data-value="Microsoft-YaHei"]::before,
.ql-snow
  .ql-picker.ql-font
  .ql-picker-item[data-value="Microsoft-YaHei"]::before {
  content: "微软雅黑";
  font-family: "Microsoft YaHei";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="YouYuan"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="YouYuan"]::before {
  content: "幼圆";
  font-family: "YouYuan";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="KaiTi"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="KaiTi"]::before {
  content: "楷体";
  font-family: "KaiTi";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="FangSong"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="FangSong"]::before {
  content: "仿宋";
  font-family: "FangSong";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="Arial"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="Arial"]::before {
  content: "Arial";
  font-family: "Arial";
}
.ql-snow
  .ql-picker.ql-font
  .ql-picker-label[data-value="Times-New-Roman"]::before,
.ql-snow
  .ql-picker.ql-font
  .ql-picker-item[data-value="Times-New-Roman"]::before {
  content: "Times New Roman";
  font-family: "Times New Roman";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="sans-serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="sans-serif"]::before {
  content: "sans-serif";
  font-family: "sans-serif";
}

.ql-font-SimSun {
  font-family: "SimSun";
}
.ql-font-SimHei {
  font-family: "SimHei";
}
.ql-font-YouYuan {
  font-family: "YouYuan";
}
.ql-font-Microsoft-YaHei {
  font-family: "Microsoft YaHei";
}
.ql-font-KaiTi {
  font-family: "KaiTi";
}
.ql-font-FangSong {
  font-family: "FangSong";
}
.ql-font-Arial {
  font-family: "Arial";
}
.ql-font-Times-New-Roman {
  font-family: "Times New Roman";
}
.ql-font-sans-serif {
  font-family: "sans-serif";
}
/*字体样式*/
/*//默认的样式*/
.ql-container {
  font-size: 16px;
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="10px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="10px"]::before {
  content: "10px";
  font-size: 10px;
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="12px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="12px"]::before {
  content: "12px";
  font-size: 12px;
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="14px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="14px"]::before {
  content: "14px";
  font-size: 14px;
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="16px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="16px"]::before {
  content: "16px";
  font-size: 16px;
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="18px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="18px"]::before {
  content: "18px";
  font-size: 18px;
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="20px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="20px"]::before {
  content: "20px";
  font-size: 20px;
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="24px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="24px"]::before {
  content: "24px";
  font-size: 24px;
}
</style>
