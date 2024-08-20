<template>
  <!-- 利用Loader自动生成色板文档，详见colors.scss -->
  <div class="color-palette">
    <div v-for="(item, itemIndex) in colorsList" :key="itemIndex">
      <h3>{{ item.title }}</h3>
      <div class="colors-list">
        <div v-for="(color, colorIndex) in item.colors" :key="colorIndex" class="color-item">
          <span class="color-name">{{ color.name }}</span>
          <div class="line">
            <span
              class="color-preview"
              :style="{
                backgroundColor: color.value,
              }"
            />
            <span
              class="color-value"
              :style="{
                color: color.value,
              }"
              >{{ color.value }}</span
            >
          </div>
          <code class="color-usage">{{ color.usage }} </code>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line import/no-webpack-loader-syntax
import colorsList from '!!ColorPaletteLoader!../../../src/styles/colors.scss'

export default {
  data() {
    return {
      colorsList,
    }
  },
}
</script>
<style lang="scss" scoped>
.color-palette {
  .colors-list {
    display: flex;
    flex-wrap: wrap;

    .color-item {
      display: flex;
      flex-direction: column;
      width: 300px;
      margin: 2rem;

      .line {
        display: flex;
        align-items: center;
        margin-top: 10px;

        .color-preview {
          display: block;
          width: 20px;
          height: 20px;
          margin-right: 5px;
        }

        .color-value {
          margin-left: 10px;
        }
      }

      .color-name {
        font-weight: bold;
        background-color: transparent;
      }

      .color-usage {
        margin-top: 10px;
      }
    }
  }
}
</style>
