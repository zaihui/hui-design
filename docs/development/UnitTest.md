# UnitTest

hui-design的ut测试使用jest框架，分为对普通工具函数的测试和对组件的测试两种，对组件的测试使用jest提供的Snapshot Test。

## typescript

推荐ut代码使用ts、tsx，可以有更好的类型提示。

## alias

为了方便ut编写时文件引入，test目录下可以使用`@`作为`src`的alias，这一设定对`src`下的文件同样有效，但由于taro对组件的编译近乎于代码拷贝，并不会对`@`这样的alias做处理，为了避免编译后的组件在使用中出现引用路径无法解析问题，请不要在`src`下使用alias。同时在eslint中刻意只为`test`目录配置了alias解析，因此`src`下使用alias会导致lint错误。

## snapshot

taro-ui自身也使用snapshot test，因此有对应配置可以参考。

但taro-ui的snapshot test使用一些令人疑惑的地方。

- 首先是test文件使用js作为扩展名但实际其中却使用了jsx语法，不方便编辑器提示与lint检查。
- 其次是ut是基于`taro-h5`而非基于`taro`，这点一定程度可以理解，因为小程序没有dom接口。
- 最后是测试是组件的引入路径为编译时产生的`.temp`目录而非`src`，这意味着ut执行前必须先执行构建操作，路径依赖过长。

先对`src`和`.temp`下的DemoWidget做一个分析

src下：

```tsx
import { View } from '@tarojs/components'
import Taro, { Component } from '@tarojs/taro'

export interface DemoWidgetProps {
  /**
   * 一个字符串型的属性
   */
  prop1: string
  /**
   * 一个数值类型的可选属性
   */
  prop2?: number
}
/**
 * 一个示例Widget
 */
export default class LoginWidget extends Component<DemoWidgetProps> {
  render() {
    const { prop1, prop2 = 0 } = this.props
    return (
      <View className='demo-widget'>
        this is DemoWidget
        <View>prop1 is {prop1}</View>
        <view>prop2 is {prop2}</view>
      </View>
    )
  }
}

```

.temp下：

```jsx
import Nerv from "nervjs";
import { View } from '@tarojs/components';
import Taro from "@tarojs/taro-h5";
/**
 * 一个示例Widget
 */
export default class LoginWidget extends Taro.Component {
  render() {
    const { prop1, prop2 = 0 } = this.props;
    return <View className="demo-widget">
        this is DemoWidget
        <View>prop1 is {prop1}</View>
        <view>prop2 is {prop2}</view>
      </View>;
  }
}
```

对比可得，`.temp`相比`src`下的代码做了如下处理：

- `@tarojs/taro`模块被替换为了`@tarojs/taro-h5`
- 引入了Nerv
- 将tsx编译为了jsx，但扩展名却使用js。

结合taro-ui使用的ut配置，可以发现，代码书写时jsx的pragam为`Taro.createElement`，但执行ut时更换为了`Nerv.createElement`，所以需要引入`nervjs`。

而`@tarojs/taro`替换为`@tarojs/taro-h5`的操作可以通过jest的moduleNameMapper完成。

因此怀疑taro-ui在ut前执行构建的原因是为了导入`Nerv`与替换`taro`，但为此多一道编译也未免太失之优雅。可能是其中有其他隐藏的问题，但也没有找到官方对此的说明。

为了避免陈陈相因萧规曹随，在项目初期的时候本着大胆尝试的原则，在这里放弃复刻taro-ui的ut设定，按照实际需要来完成ut配置。

对此需要解决taro-ui ut的两大不合理之处，一是在js文件中编写jsx，二是ut依赖`.temp`目录。

首先解决js中编写jsx的问题，由于src下的组件普遍使用tsx编写，如果ut中也使用ts，可以带来更方便的代码提示，所以直接对组件的test文件使用tsx。只需要对应修改tsconfig.json中的include、jest.config.js中的testMatch与对应eslint中的lint配置即可。

解除ut对`.temp`目录的依赖比较麻烦一些，中间有一些踩坑。

首先仿照taro-ui下组件的ut为DemoWidget编写ut文件，同时安装需要的依赖。

由于jest无法处理tsx文件，所以首先要利用`@babel/plugin-transform-react-jsx`编译代码中的tsx语法，同时配置`pragma: 'Nerv.createElement'`以符合ut使用`Nerv`的需要。

但由于组件源代码中引入的是Taro而非Nerv，要求组件对此做适配显然不合理，因此使用[babel-plugin-auto-import](https://www.npmjs.com/package/babel-plugin-auto-import)自动为ut执行时**所有代码**额外引入`Nerv`。

另外由于mobx使用了legacy的decorators语法，typescript使用了class-properties语法，所以需要额外添加`@babel/plugin-proposal-decorators`、`@babel/plugin-proposal-class-properties`，否则会导致jest收集coverage时无法解析对应源代码而报错。

这一步完成后可以尝试执行ut，会遇到无法解析`weui.css`的报错，这里可以参考jest的官方文档以及taro-ui的做法，对css进行mock操作，由于weui是一个单独的npm包，所以jest提供的mock方法对weui无效，需要单独配置。

再次执行ut会遇上`TypeError: Cannot read property 'forEach' of undefined`报错，需要配置`'^@tarojs/taro$': '@tarojs/taro-h5'`以替换`@tarojs/taro`为`@tarojs/taro-h5`。

再次执行ut，这是ut已可以正常运行。

同时回顾一下taro-ui的相关配置，看看是否有遗漏。

taro-ui在`jest.config.js`中配置了额外的moduleNameMapper规则

```js
{
  react: 'nervjs',
  'react-addons-test-utils': 'nerv-test-utils',
  'react-dom': 'nervjs',
}
```

但奇怪的是整个项目中都没有react、react-addons-test-utils、react-dom这三个依赖，所以这三条规则近乎无效。

但是由于这三条规则的键名都为普通字符串不包含正则的`^$`，按照[moduleNameMapper](https://jestjs.io/docs/en/configuration#modulenamemapper-objectstring-string--arraystring)的规则，`react`会命中所有名字中含`react`的库。如果贸然搬运这三条规则，会因此破坏对`react-is`包的导入进而产生`PrettyFormatPluginError: ReactIs.isElement is not a function`报错。

但令人疑惑的是，在taro-ui使用的配置下并不会遇到这个问题，但同时删除这三条规则taro-ui的ut依然可以全部通过，因此这三条规则的存在非常令人疑惑，这里决定不搬运这三条规则。

另外taro-ui的`babel-config.js`中配置了插件`babel-plugin-transform-taroapi`，在npm页面没有找到该插件的功能说明，但google到了凹凸实验室的的一篇[文章](https://www.infoq.cn/article/XkGVKMuMw_zqXw3Plh51)，该插件的作用是避免不必要的`Taro.*`api引入，减少h5包体积。对于ut来说，似乎并不是必要，所以这里不作采用。

自此ut的配置应当结束，为了验证这样的ut配置是否可以正确运行，搬运同样的配置到taro-ui项目中，并修改其`.temp`引用为`src`，执行ut结果如下。

```text
Test Suites: 4 failed, 44 passed, 48 total
Tests:       335 passed, 335 total
Snapshots:   298 passed, 298 total
```

其中有4个测试文件执行失败，临时注释对应的用例后再次执行ut，结果如下。

```text
Test Suites: 48 passed, 48 total
Tests:       354 passed, 354 total
Snapshots:   316 passed, 316 total
```

可以看到，共316个snapshots全部执行成功，其余非snapshots的用例有38个也全部执行成功，从数量上来讲，足够相信新的配置对于snapshots是有效的。

分析失败的4个ut文件，均为包含`toBeCalled`的用例执行失败，是用来在模拟点击后测试元素的回调时间。但包含`toBeCalled`的测试文件共有18个，其中大部分都执行成功了，因此这4个失败怀疑可能是升级jest版本（taro-ui尚在使用v23的jest版本，与babel7搭配会有问题）后导致的不兼容，可以在写到具体用例时再做分析。但总体上新的配置是可以被采用的。

如果后期因为配置异于taro-ui的设置导致ut产生问题的话，可以切换为taro-ui使用的配置，迁移成本不会太高。
