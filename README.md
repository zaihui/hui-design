# hui-design

> 小程序通用逻辑库

## 安装

```bash
npm install @zaihui/hui-design
```

[CHANGELOG](./CHANGELOG.md)

## 使用

## 开发

参考[基于 Taro 开发第三方多端 UI 库](https://nervjs.github.io/taro/docs/ui-lib.html)。

hui-design 使用 conventional-commit 生态对 commit 规范化并基于此自动生成 changelog。

```bash
// node version 大于14
pnpm i
```

开发组件

```bash
cd packages/weapp-components

// ...do something
```

启动demo小程序

```bash
cd packages/demo

pnpm run dev:weapp
```

### commit

commit 需遵循[@commitlint/config-conventional](https://www.npmjs.com/package/@commitlint/config-conventional)规范，也可以通过`npm run commit`在交互式界面完成 commit，这一功能由[commitizen](https://github.com/commitizen/cz-cli)提供。

建议初次使用时选择`npm run commit`以熟悉 commit 规范。

### 发布

[standard-version](https://github.com/conventional-changelog/standard-version/)可以自动根据 commit 生成 changelog，并通过其中是否有 breaking change 自动更新版本号。

在确保所有需要变动的代码均提交后，执行如下步骤完成发版：

- 本地执行`npm run release`，这会自动生成 changelog 并完成版本号变更，同时在本地创建版本号对应 tag。
- 检查 changelog 无误后提交 release 对应的 commit 到 dev（tag 可以不推送）。
- 合并 dev 到 master，合并完成后基于 master 和`package.json`中 version 字段创建 tag：`v${version}`
- tag 创建完毕后 ci 会完成后续的`npm publish`逻辑。

解释说明：

- [semantic-release](https://github.com/semantic-release/semantic-release)提供了和 standard-version 类似的功能，但差别在于 semantic-release 接管了发版的全部流程，包括`npm run publish`，而 standard-version 只关注于 changelog 和版本号变动等，并不参与发布操作。选择 standard-version 的原因有二，一是 semantic-release 功能更为复杂，接入成本更高；二是避免步子迈太大，这也是为什么选择本地生成 changelog 后再提交远端，这样可以执行一些检查避免疏漏。
- 生成 changelog 后会本地 copy 到 docs 下一份，这是为了能够在文档系统中展示，选择 copy 而不选择 mv 是为了让 changelog 跟随 npm 包发布，这也是一种常见操作。
