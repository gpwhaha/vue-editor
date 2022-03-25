import { IDropPanelMenu } from "@wangeditor/core";
import { Boot } from "@wangeditor/editor";

// 定义菜单 class
class MyDropPanelMenu  {
  // 菜单配置，代码可参考“颜色”菜单源码

}

// 定义菜单配置
export const menu3Conf = {
  key: "menu3", // menu key ，唯一。注册之后，可配置到工具栏
  factory() {
    return new MyDropPanelMenu();
  },
};

// 注册到 wangEditor
Boot.registerMenu(menu3Conf);
