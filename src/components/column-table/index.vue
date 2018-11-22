<script>
// 定制列插件
import columnControl from './column-control.vue'
// 报表相关通用函数
import { deepClone } from 'utils/index.js'

export default {
  components: {
    columnControl
  },
  props: {
    // 表格数据
    dataList: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 表格loading状态
    listLoading: {
      type: Boolean,
      default: false
    },
    // 表格名
    tableName: {
      type: String,
      default: 'columnTable'
    },
    // 所有表格列属性
    allColumns: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      // 解决表格错位问题
      refresh: true,
      // 本页隐藏的列 -- 存在localstorage里面
      hiddenColumns: [],
      // 表格列属性
      tableColumns: []
    }
  },
  created() {
    // 从localstorage里拿出需要隐藏的列，初始化表格
    this.hiddenColumns = this.getHiddenColumn(this.tableName)
    this.hiddenColumn(this.hiddenColumns)
    this.tableColumns = deepClone(this.allColumns)
  },
  methods: {
    initRender(createElement) {
      if (this.$refs.columnControl) this.$refs.columnControl.setColumns(this.tableColumns)
      return (
        <div>
          <column-control ref='columnControl'
            onChangeColumn={this.changeShowColumn}>
          </column-control>
          {this.refresh ? this.renderTable(createElement) : <div></div>}
        </div>
      )
    },
    // 渲染表格
    renderTable(createElement) {
      return (
        <el-table
          ref='multipleTable'
          data={this.dataList}
          v-loading={this.listLoading}
          element-loading-text='Loading'
          border={true}
          fit={true}
          highlight-current-row={true}>
          {this.renderColumn(createElement, this.tableColumns, [this.accountType, this.checkAble])}
        </el-table>
      )
    },
    // 初始化时 列指定isShow属性，判断是否显示表格列
    hiddenColumn(hiddens) {
      this.allColumns.forEach((item, index) => {
        this.allColumns[index].isShow = !(hiddens && hiddens.indexOf(item.prop) > -1)
      })
    },
    // 重新绘制表格
    reLayout() {
      this.refresh = false
      this.$nextTick(() => {
        this.refresh = true
      })
    },
    // 给定制列组件使用，同步改变显示的表格列，并改变localstorage中的值
    changeShowColumn(column) {
      this.tableColumns = deepClone(column)
      this.changeLocalHiddenColumn(column, this.tableName)
      this.reLayout()
    },
    // 动态渲染列
    renderColumn(createElement, tableColumns, [accountType, checkAble]) {
      const columnTemplet = []
      for (const index in tableColumns) {
        if (tableColumns[index].isShow) {
          columnTemplet.push(createElement('el-table-column', { props: tableColumns[index] }))
        }
      }
      return columnTemplet
    },
    // 从localstorage里拿出需要隐藏的列，初始化表格
    getHiddenColumn(tableName) {
      const storageString = window.localStorage.getItem('table-manage-detial')
      if (storageString) {
        const allStorage = JSON.parse(storageString)
        return allStorage[tableName] || []
      }
    },
    // 得到隐藏的表列数组，并存入localstorage
    changeLocalHiddenColumn(column, tableName) {
      const hiddenColumn = []
      column.forEach((item) => {
        if (item.isShow === false) {
          hiddenColumn.push(item.prop)
        }
      })
      const storageString = window.localStorage.getItem('table-manage-detial')
      const allStorage = storageString ? JSON.parse(storageString) : {}
      allStorage[tableName] = hiddenColumn
      window.localStorage.setItem('table-manage-detial', JSON.stringify(allStorage))
    }
  },
  render(createElement) {
    return this.initRender(createElement)
  }
}
</script>
