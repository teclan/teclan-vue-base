<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="table_container">
      <el-table :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column type="index" width="100"></el-table-column>
        <el-table-column property="id" label="ID" width="220"></el-table-column>
        <el-table-column property="post" label="职位" width="220"></el-table-column>
        <el-table-column property="age" label="年龄"></el-table-column>
      </el-table>
      <div class="Pagination" style="text-align: left;margin-top: 10px;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="limit"
          layout="total, prev, pager, next"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import headTop from '../components/headTop'
import { getUsers, getUserCount } from '@/api/getData'

export default {
  data () {
    return {
      tableData: [
      ],
      currentRow: null,
      offset: 0,
      limit: 1,
      total: 0,
      currentPage: 1
    }
  },
  components: {
    headTop
  },
  created () {
    this.initData()
  },
  methods: {
    async initData () {
      try {
        const resp = await getUserCount()
        if (resp.code === 200) {
          this.total = resp.count
        } else {
          throw new Error('获取数据失败')
        }
        this.getUsersList()
      } catch (err) {
        console.log('获取数据失败', err)
      }
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.offset = (val - 1) * this.limit
      this.getUsersList()
    },
    async getUsersList () {
      const resp = await getUsers({offset: this.offset, limit: this.limit})
      const Users = resp.data
      this.tableData = []
      Users.forEach(item => {
        const tableData = {}
        tableData.id = item.id
        tableData.post = item.post
        tableData.age = item.age
        this.tableData.push(tableData)
      })
    }
  }
}
</script>

<style lang="less">
@import "../style/mixin";
.table_container {
  padding: 20px;
}
</style>
