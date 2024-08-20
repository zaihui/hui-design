<template>
  <div class="demo-phone" :class="{ fold }">
    <!-- 提供收起展开功能避免影响阅读文档 -->
    <span v-if="fold" class="tip-unfold" @click="handleUnFold"> 展开 </span>
    <span v-else class="tip-fold" @click="handleFold"> 点击收起 </span>
    <iframe v-show="!fold" class="iframe" :src="src" />
  </div>
</template>
<script>
/**
 * 利用iframe实现组件的h5预览
 */

const getH5BaseUrlFn = () => {
  if (process.env.NODE_ENV === 'development') {
    return () => 'http://localhost:10086/#'
  }

  return (window) => `${window.location.origin}${process.env.H5_BASE_URL}`
}

const getH5BaseUrl = getH5BaseUrlFn()

const getLayoutContainer = () => document.querySelector('.theme-default-content.content__default')

const WITH_DEMO_PHONE_CLASS = 'with-demo-phone'

const foldContainer = () => {
  const layoutContainer = getLayoutContainer()
  if (layoutContainer) {
    layoutContainer.classList.add(WITH_DEMO_PHONE_CLASS)
  }
}

const unFoldContainer = () => {
  const layoutContainer = getLayoutContainer()
  if (layoutContainer) {
    layoutContainer.classList.remove(WITH_DEMO_PHONE_CLASS)
  }
}

export default {
  props: {
    page: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      fold: false,
      src: '',
    }
  },
  /**
   * 这里使用了非常hack的方式手动修改页面内容部分容器的class
   * 虽然非常不vue，但是这种做法可以0侵入性实现引用了DemoPhone的页面内容部分宽度自动调整
   * 考虑到事实上这里不文档系统页面不会有太多的维护，所以这种方法方法可以被接受。
   */
  mounted() {
    foldContainer()
    const h5BaseUrl = getH5BaseUrl(window)
    this.src = `${h5BaseUrl}${this.page}`
  },
  beforeDestroy() {
    unFoldContainer()
  },
  methods: {
    handleFold() {
      this.fold = true
      setTimeout(unFoldContainer, 400)
    },
    handleUnFold() {
      this.fold = false
      foldContainer()
    },
  },
}
</script>
<style lang="scss" scoped>
.demo-phone {
  position: fixed;
  top: 10rem;
  right: 4rem;
  width: 20rem;
  height: 40.35rem;
  background: url('../assets/iframe_iphonex.png');
  background-size: 100% 100%;
  border-radius: 1.5rem;
  box-shadow: 0 4px 30px 0 rgba(4, 59, 85, 0.1);
  transition: width 0.4s ease-in-out, height 0.4s ease-in-out;

  .tip-fold {
    position: absolute;
    top: 0;
    display: block;
    width: 100%;
    margin-top: 0.2rem;
    text-align: center;
  }

  .iframe {
    display: block;
    width: 88%;
    height: 90.5%;
    margin: 14.5% auto 0;
    border: none;
  }

  &.fold {
    width: 4rem;
    height: 4rem;
    overflow: hidden;
    border-radius: 100%;

    .tip-unfold {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      // stylelint-disable-next-line sh-waqar/declaration-use-variable
      background-color: #fff;
    }
  }
}
</style>
