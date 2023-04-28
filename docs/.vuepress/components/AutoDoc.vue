<template>
  <div class="auto-doc">
    <p>{{ componentInfo.description }}</p>
    <table>
      <thead>
        <th
          v-for="(head,index) in tableHeader"
          :key="index"
        >
          {{ head }}
        </th>
      </thead>
      <tbody>
        <tr
          v-for="(row, ri) in tableContents"
          :key="ri"
        >
          <td
            v-for="(item, ii) in row"
            :key="ii"
          >
            <div
              v-if="Array.isArray(item)"
            >
              <p
                v-for="(line, li) in item"
                :key="li"
              >
                {{ line }}
              </p>
            </div>
            <p
              v-else
            >
              {{ item }}
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <!--
      TODO: 利用tsType.type === 'function'筛选作为回调函数的props
      taro-ui作为ui库回调方法有限，hui-design中的业务组件会有不少回调方法
    -->
  </div>
</template>
<script>

const tableHeader = ['参数名', '说明', '类型', '是否必须', '默认值']

const breakDescription = d => d.split('\n')
/**
 * 利用react-docgen自动生成文档，关于文档系统参见DocSystem.md
 *
 * 之前使用自定义容器实现该功能，但发现如果使用组件配合自定义loader的方式会更好
 * 这样可以完美利用webpack的loader缓存，且可以实现文档渲染结果随tsx文件变化而变化
 */
export default {
  props: {
    /**
     * 组件相对于src的path，不需要带src
     * eg. widgets/DemoWidget/DemoWidget.tsx
     */
    path: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      tableHeader,
    }
  },
  computed: {
    /**
     * 为了实现根据传入的path自动生成组件信息，冒天下之大不韪使用了dynamic-require
     *
     * 这里使用内联方式手动指定使用AutoDocLoader，并使用!!禁用了其他loader
     * 参考：https://webpack.docschina.org/concepts/loaders/#%E5%86%85%E8%81%94%E6%96%B9%E5%BC%8F
     */
    componentInfo() {
      // eslint-disable-next-line import/no-dynamic-require
      return require(`!!AutoDocLoader!@/${this.path}`) // eslint-disable-line global-require
    },
    tableContents() {
      if (!this.componentInfo) {
        return []
      }
      const { props } = this.componentInfo
      return Object.entries(props).map(([propName, propInfo]) => [
        propName,
        breakDescription(propInfo.description),
        propInfo.type.name,
        propInfo.required ? '✔️' : '',
        propInfo.defaultValue ? propInfo.defaultValue.value : '-',
      ])
    },
  },
}
</script>
