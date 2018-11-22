<template>
  <div class="app-container">
    <el-alert
      style="margin-bottom: 5px"
      title="element UI的table组件目前只支持template模式，此组价封装后可支持传入columns数组生成表格组件，并自带定制列功能"
      type="info"/>
    <columnTable
      ref="columnTable"
      :data-list="list"
      :list-loading="listLoading"
      :all-columns="allColumns"
      table-name="columnTable"/>
  </div>
</template>

<script>
import { formatDate, statusToName } from 'utils/filter.js'
import { getList } from '@/api/table'
import columnTable from 'components/column-table/index.vue'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  components: {
    columnTable
  },
  data() {
    return {
      list: [],
      listLoading: true,
      // 所有表格列属性
      allColumns: [
        {
          label: '序号',
          prop: 'index',
          type: 'index',
          width: 50,
          align: 'center'
        }, {
          label: '标题',
          prop: 'title',
          align: 'center'
        }, {
          label: '作者',
          prop: 'author',
          width: 110,
          align: 'center'
        }, {
          label: '页码',
          prop: 'pageviews',
          width: 110,
          align: 'center'
        }, {
          label: '状态',
          prop: 'status',
          width: 110,
          align: 'center',
          formatter: (value) => statusToName(value.status, 'statusMap')
        }, {
          label: '时间',
          prop: 'display_time',
          width: 110,
          align: 'center',
          formatter: (value) => formatDate(value.display_time)
        }
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
</script>
