# DemoWidget

## 示例

<!--
  自动引入代码片段
  参考：https://v1.vuepress.vuejs.org/zh/guide/markdown.html#导入代码段
  文档中描述的代码片段功能只支持导入全部文件
  但后面有人提了pr实现了锚点导入：https://github.com/vuejs/vuepress/pull/2225
  使用格式为#后接锚点名
  只不过文档还没有随之更新
  详见Demo.tsx
-->

<<< src/pages/Demo/Demo.tsx#DemoWidget-case1

## 参数

<!--
  自动生成组件的文档
  详细见AutoDoc.vue
  使用格式为在path中传入组件相对src的路径（不需要带src）
  （vuepress支持直接在markdown中使用vue组件）
-->

<auto-doc path="widgets/DemoWidget/DemoWidget.tsx" />

<!--
  引入组件预览页
  详见DemoPhone.vue
  使用格式为在page中传入组件预览页的路径
-->

<demo-phone page="/pages/Demo/Demo" />
