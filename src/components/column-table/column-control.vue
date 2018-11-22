<template>
  <div style="margin-bottom: 10px">
    <!-- 定制列 -->
    <el-popover :max-width="720" placement="right-start">
      <el-button slot="reference" class="opt-button" size="small">列定制</el-button>
      <el-checkbox v-model="isCheckAll" class="column-checkAll-item" @change="changeAll">全选</el-checkbox>
      <div class="column-dropdown-item">
        <el-checkbox
          v-for="(item, index) in allColumns"
          :key="index"
          v-model="item.isShow"
          class="column-check-box"
          @change="(check) => changeColumnShow(check, index)">
          {{ item.label }}
        </el-checkbox>
        <div class="clearfix"/>
      </div>
    </el-popover>
    <a
      href="https://github.com/zhaoluting/vue-element-template-pc/blob/master/src/components/column-table"
      target="_blank"
      style="text-decoration: underline;color: #68a5bb;font-size: 12px">
      查看源码
    </a>
  </div>
</template>
<script>
import { deepClone } from 'utils/index.js'

export default {
  props: {
  },
  data() {
    return {
      // 所有列属性
      allColumns: [],
      // 是否全部选中
      isCheckAll: false,
      // 是否不定选中
      isIndeterminate: false
    }
  },
  methods: {
    // 初始化列属性
    setColumns(tableColumn) {
      this.allColumns = deepClone(tableColumn, [])
    },
    // 改变某列显示状态
    changeColumnShow(check, index) {
      this.allColumns[index].isShow = check
      this.$emit('changeColumn', this.allColumns)
    },
    // 批量改变所有列的显示状态
    changeAll() {
      this.allColumns.forEach((item, index) => {
        this.allColumns[index].isShow = this.isCheckAll
      })
      this.$emit('changeColumn', this.allColumns)
    }
  }
}
</script>
<style>
.column-checkAll-item {
    width: 100%;
    padding: 5px 0;
    margin-bottom: 5px;
    border-bottom: 1px solid #e7e7e7;
}
</style>
