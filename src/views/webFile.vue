<template>
  <div class="webFile">
    <h1 style="margin-top: 3%">请输入可访问的FileUrl地址</h1>
    <div style="margin: 30px 0;" />
    <el-input
      class="cl-textarea"
      type="textarea"
      :autosize="{ minRows: 3, maxRows: 4 }"
      placeholder="请输入内容，保证文档可访问，如http://www.file.cn/a.docx"
      v-model="textarea"
    />
    <div style="margin: 40px 0;" />
    <br />
    <el-button icon="el-icon-delete" class="el-button" @click="clClean"
      >clean</el-button
    >
    <el-button
      icon="el-icon-check"
      class="el-button"
      @click="clSubmit"
      v-loading.fullscreen.lock="loading"
      >view</el-button
    >
    <el-button
      icon="el-icon-refresh-right"
      class="el-button"
      @click="clConvert"
      v-loading.fullscreen.lock="loading"
    >
      convert
    </el-button>
    <div
      @mouseenter="mouseenter(i)"
      @mouseleave="mouseleave(i)"
      v-for="i in 2"
      :key="i"
      class="template"
      style="margin-top:20px;position:relative;width: 200px; height: 200px;left:50%;transform: translateX(-100px);"
    >
      <el-image
        class="template-img"
        src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      ></el-image>
      <div v-if="chooseIndex !== i" class="template-title">
        文件标题文件标题文件标题文件标题
      </div>
      <div v-if="chooseIndex === i" class="template-shadow">
        <div class="template-shadow-title">
          哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
        </div>
        <el-button type="primary" class="template-shadow-btn">查看</el-button>
        <div class="template-shadow-collect">收藏</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getViewUrlWebPath, convertReq, convertRes } from "../api/index";
import { fileSuffix } from "@/utils/common-data";
import { throttle } from "../utils/index";

export default {
  name: "webFile",
  data() {
    return {
      loading: false,
      textarea: "",
      convertResIndex: 0,
      convertRes: "",
      chooseIndex: "",
    };
  },
  methods: {
    mouseenter(i) {
      this.chooseIndex = i;
      console.log("鼠标移入了", i);
    },
    mouseleave: throttle(function(i) {
      this.chooseIndex = "";
      console.log("鼠标移出了", i);
    }, 1000),
    checkFileUrl(e) {
      if (!this.textarea) {
        this.showErrMeg("输入内容不能为空！");
        return false;
      } else {
        let reg = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/;
        if (!reg.test(this.textarea)) {
          this.showErrMeg("请输入正确的file url！");
          return false;
        }
        const fileName = this.textarea;
        const fileStrArr = fileName.split(".");
        const suffix = fileStrArr[fileStrArr.length - 1];

        let result = fileSuffix.some((item) => {
          return item === suffix;
        });

        if (!result) {
          this.showErrMeg("不支持该文件类型");
          return false;
        }
      }
      return true;
    },
    clClean() {
      this.textarea = "";
      this.console.success("cleaned textarea value");
    },
    clSubmit() {
      this.getViewUrlWebPath();
    },
    clConvert() {
      if (!this.checkFileUrl()) {
        return;
      }
      this.loading = true;
      const fileUrl = {
        fileUrl: this.textarea,
      };
      if (fileUrl) {
        const params = {
          taskId: this.getUUId(),
          srcUri: this.textarea,
          // 参数可调，详见 https://open.wps.cn/docs/doc-format-conversion/api-list
          exportType: "pdf",
        };
        // convert
        convertReq(params)
          .then((res) => {
            if (res.data) {
              // convert res
              this.loading = true;
              this.getConvertRes(params.taskId);
            } else {
              this.showErrMeg("请求错误！");
              this.loading = false;
            }
          })
          .catch(() => {
            this.showErrMeg("请求错误！");
            this.loading = false;
          });
      }
    },
    getConvertRes: async function(taskId) {
      const params = { taskId };
      await convertRes(params).then((res) => {
        this.convertRes = res.data.data;
      });
      if (!this.convertRes && this.convertResIndex <= 5) {
        setTimeout(() => {
          this.convertResIndex += 1;
          this.getConvertRes(taskId);
        }, 1000);
      }
      if (this.convertRes) {
        this.loading = false;
        // 下载转换结果
        let a = document.createElement("a");
        a.href = this.convertRes;
        a.click();
      }
    },
    getViewUrlWebPath() {
      if (!this.checkFileUrl()) {
        return;
      }
      this.loading = true;
      const params = {
        fileUrl: this.textarea,
      };
      getViewUrlWebPath(params)
        .then((res) => {
          if (res.data) {
            let r = res.data.data;

            // 跳转 使用sessionStorage，避免关键信息在ip中暴露
            // 使用push会停留当前页面，故不采纳
            // params 传递参数，子组件无法渲染iframe组件，故不采纳
            sessionStorage.wpsUrl = r.wpsUrl;
            sessionStorage.token = r.token;
            const jump = this.$router.resolve({ name: "viewFile" });
            window.open(jump.href, "_blank");
          } else {
            this.showErrMeg("请求错误！");
          }
          this.loading = false;
        })
        .catch(() => {
          this.showErrMeg("请求错误！");
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>
.cl-textarea {
  width: 55%;
  height: 40%;
}

.template {
  margin-top: 20px;
  position: relative;
  width: 200px;
  height: 200px;
  left: 50%;
  transform: translateX(-100px);
}
.template-img {
  width: 200px;
  height: 200px;
}
.template-title {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 200px;
  height: 50px;
  background-color: #000;
  z-index: 99;
  opacity: 0.7;
  text-align: center;
  line-height: 50px;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
@keyframes templateon {
  0% {
    background-color: rgba(0, 0, 0, 0.2);
  }
  50% {
    background-color: rgba(0, 0, 0, 0.4);
  }
  75% {
    background-color: rgba(0, 0, 0, 0.6);
  }
  100% {
    background-color: rgba(0, 0, 0, 0.8);
  }
}
@-webkit-keyframes templateon {
  0% {
    background-color: rgba(0, 0, 0, 0.2);
  }
  50% {
    background-color: rgba(0, 0, 0, 0.4);
  }
  75% {
    background-color: rgba(0, 0, 0, 0.6);
  }
  100% {
    background-color: rgba(0, 0, 0, 0.8);
  }
}
.template-shadow {
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  height: 200px;
  z-index: 99;
  animation: templateon .2s;
  background-color: rgba(0, 0, 0, 0.8);
}
.template-shadow-title {
  position: absolute;
  top: 15%;
  color: #fff;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  box-sizing: border-box;
  padding: 0 10px;
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.template-shadow-btn {
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.template-shadow-collect {
  font-size: 14px;
  color: rgb(19, 150, 236);
  position: absolute;
  bottom: 20px;
  width: 100%;
  text-align: center;
  letter-spacing: 2px;
  cursor: pointer;
}
</style>
