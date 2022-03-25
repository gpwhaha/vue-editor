<template>
  <div>
    <div id="viewFile"></div>

    <el-drawer
      title="我是标题"
      :visible.sync="dialogVisible"
      :with-header="false"
    >
      <span>我来啦!</span>
    </el-drawer>
  </div>
</template>
<script>
export default {
  props: ["wpsUrl", "token"],
  data() {
    return {
      // 是否开启简易模式
      simpleMode: false,
      dialogVisible: false,
    };
  },
  mounted() {
    this.openWps(this.wpsUrl, this.token);
  },
  methods: {
    async openWps(url, token) {
      let _this = this;
      const wps = _this.wps.config({
        mode: _this.simpleMode ? "simple" : "normal",
        mount: document.querySelector("#app"),
        wpsUrl: url,
      });
      wps.setToken({ token });

      wps.ApiEvent.AddApiEventListener("fileOpen", (data) => {
        console.log("fileOpen: ", data);
      });
      await wps.ready();

      wps.ApiEvent.AddApiEventListener("fileNameChange", (data) => {
        console.log("fileNameChange: ", data);
      });
      const app = wps.Application;

      // // 获取剪切板回调事件
      // app.Sub.ClipboardCopy = (e) => {
      //   console.log("剪切", e);
      // };

      // 控制评论显示与否
      app.ActiveDocument.ActiveWindow.View.ShowComments = false;

      // 定制元素对象【开始 Tab】
      const controls = await app.CommandBars("StartTab").Controls;

      // 新增按钮型定制元素
      const controlButton = await controls.Add(1);
      controlButton.Caption = "按钮";
      controlButton.TooltipText = "悬浮提示-按钮";
      controlButton.Picture =
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjM0Q0NzU3IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik04LjIxMyAxM0g2LjhsNi42MzYtNi42MzYtNC4yNDMtNC4yNDMtNy4wNyA3LjA3MUw1LjkyOCAxM0g0LjUxNUwxLjA2IDkuNTQ2YS41LjUgMCAwIDEgMC0uNzA3TDguODM5IDEuMDZhLjUuNSAwIDAgMSAuNzA3IDBsNC45NSA0Ljk1YS41LjUgMCAwIDEgMCAuNzA3TDguMjEzIDEzeiIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTQuNTM2IDYuMzY0bDQuOTUgNC45NS0uNzA3LjcwNy00Ljk1LTQuOTV6TTQuNTIxIDEzaDEwLjAzdjFINS40OTZ6Ii8+PC9nPjwvc3ZnPg==";
      controlButton.OnAction = () => {
        console.log("按钮点击了");
        this.$message.success("按钮被点击了");
      };

      // 新增下拉框型定制元素
      const controlPopup = await controls.Add(10);
      controlPopup.Caption = "参数";
      controlPopup.Picture =
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik03LjUgMnYyLjVINGEuNS41IDAgMCAwLS41LjV2MmEuNS41IDAgMCAwIC41LjVoOWEuNS41IDAgMCAwIC41LS41VjVhLjUuNSAwIDAgMC0uNS0uNUg5LjVWMmEuNS41IDAgMCAwLS41LS41SDhhLjUuNSAwIDAgMC0uNS41eiIgc3Ryb2tlPSIjM0Q0NzU3Ii8+PHBhdGggZmlsbD0iIzNENDc1NyIgZD0iTTEzIDdoMXY0aC0xeiIvPjxwYXRoIGQ9Ik0xMSAxM2EyIDIgMCAwIDAgMi0yVjguNzY0QTMgMyAwIDEgMSA4Ljc2NCAxM0gxMXoiIGZpbGw9IiMzRDQ3NTciLz48cGF0aCBmaWxsPSIjM0Q0NzU3IiBkPSJNMSAxM2gxMHYxSDF6Ii8+PHBhdGggZD0iTTEgMTNhMiAyIDAgMCAwIDItMlY4Ljc2NEEzIDMgMCAwIDEgMSAxNHYtMXoiIGZpbGw9IiMzRDQ3NTciLz48cGF0aCBmaWxsPSIjM0Q0NzU3IiBkPSJNMyA3aDF2NEgzeiIvPjwvZz48L3N2Zz4=";

      // 获取下拉框
      const popupControls = await controlPopup.Controls;
      // 新增下拉框内定制元素
      const button = await popupControls.Add(1);
      button.Caption = "打开抽屉";
      const button2 = await popupControls.Add(1);
      button2.Caption = "插入内容控件";
      button.OnAction = () => {
        console.log("打开抽屉");
        this.dialogVisible = true;
      };
      button2.OnAction = async () => {
        console.log("插入内容控件");
        this.$message.success("成功插入内容控件");
        // 内容控件对象
        const contentControls = await app.ActiveDocument.ContentControls;

        // 在光标处插入内容控件
        await contentControls.Add();
      };

      // 内容控件对象
      const contentControls = await app.ActiveDocument.ContentControls;

      // 内容控件数量
      const count = await contentControls.Count;
      console.log("内容控件数量", count);

      // 获取第 1 个内容控件
      const contentControl = await contentControls.Item(1);

      // 获取第 1 个内容控件的范围
      const range = await contentControl.Range;

      // 获取第 1 个内容控件的文本
      const text = range.Text;

      // 设置第 1 个内容控件的文本
      range.Text = "--WebOffice";

      // 获取指定区域的带格式 HTML 数据
      const htmlInfo = await range.GetHtmlData();
      console.log(htmlInfo);

      // 获取第 1 个控件占位符文本
      const placeholderText = await contentControl.PlaceholderText;
      console.log("占位符文本", placeholderText);

      // 移动光标过去指定位置（前面）
      const info = await app.ActiveDocument.Find.Execute("欢迎");
      const pos = (info[0] && info[0].pos) || 0;
      //   await app.ActiveDocument.Range.SetRange(pos, pos);
      //   // 内容控件对象
      //   const contentControls = await app.ActiveDocument.ContentControls;

      //   // 在光标处插入内容控件
      //   await contentControls.Add();

      //   this.console.log("app:", JSON.stringify(app));
      // 导出 PDF，并获取导出后的 url
      // const pdfUrl = await app.ActiveDocument.ExportAsFixedFormat(); // 默认导出 PDF，所以可以不传参
      // console.log("pdfUrl", pdfUrl.url);

      // 开启限制编辑
      await app.ActiveDocument.Protect("test");
      this.$message.success("已开启内容限制编辑");
      // 停止限制编辑
      // await app.ActiveDocument.Unprotect("test");
      setTimeout(async () => {
        console.log("停止限制编辑");
        // 停止限制编辑
        await app.ActiveDocument.Unprotect("test");
        this.$message.success("已停止限制编辑");
      }, 5000);
    },
  },
};
</script>
