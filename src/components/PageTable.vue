<template>
  <div class="table-responsive-sm">
    <form v-if="isShowLimit">
      <div class="form-group row">
        <label for="limit" class="col-sm-1 col-form-label">limit</label>
        <div class="col-sm-2">
        <select id="limit" class="form-control" v-model="nowLimit" @change="changeLimit">
          <option v-for="item in limitOptions" :key="item">{{item}}</option>
        </select>
        </div>
      </div>
    </form><!-- limit -->

    <table class="table table-hover table-sm">
      <thead class="thead-light">
        <tr>
          <th scope="col" v-for="(item, index) in tableOption.tableCell" :key="item.title" :class="item.titleStyle">
            <slot :name="'title_' + item.key + '_' + index" :title="item">
              {{item.title}}
            </slot>
          </th>
        </tr>
      </thead>
      <tbody v-if="isShowList">
        <tr v-for="item in dataList" :key="item.sno" @click="open(item)">
          <td v-for="(td, idx) in tableOption.tableCell" :key="td.key" :class="td.style">
            <slot :name="td.key + '_' + idx" :value="item">
              {{ item[td.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td :colspan="tableOption.tableCell.length">no data</td>
        </tr>
      </tbody>
    </table><!-- table -->

    <nav aria-label="Page navigation example" v-if="isShowPagintion">
      <ul class="pagination justify-content-end">
        <li class="page-item" :class="{'disabled': page === 1}">
          <a class="page-link" tabindex="-1" @click="previous">上一頁</a>
        </li>
        <li class="page-item">
          <!--<a class="page-link" href="#">2</a>-->
          <input type="text" class="page-link pageInput" v-model="pageImput" />
        </li>
        <li class="page-item" :class="{'disabled': page === totalPage}">
          <a class="page-link" @click="next">下一頁</a>
        </li>
      </ul>
    </nav><!-- pagination -->
  </div>
</template>

<script>
export default {
  name: 'PageTable',
  props: ['limit', 'tableOption', 'tableData'],
  data () {
    return { // tryy後續簡單整理一下component用法，規劃版面..
      nowLimit: '',
      limitOptions: [10, 15, 30],
      page: 1
    }
  },
  created () {
    this.nowLimit = this.limitOptions.includes(this.limit) ? this.limit : 10
  },
  methods: {
    changeLimit () {
      this.page = 1
    },
    open (item) {
      this.$emit('triggerEv', item)
    },
    previous () {
      this.page > 1 && this.page--
    },
    next () {
      this.page < this.totalPage && this.page++
    }
  },
  computed: {
    dataList () {
      let nowObject = {}
      if (this.isShowList) {
        let start = ((this.page - 1) * this.nowLimit)
        let num = this.page * this.nowLimit
        let dataNum = Object.keys(this.tableData).length
        for (start; start < num && start < dataNum; start++) {
          nowObject[Object.keys(this.tableData)[start]] = this.tableData[Object.keys(this.tableData)[start]]
        }
      }
      return nowObject
    },
    isShowList () {
      return Object.keys(this.tableData).length !== 0
    },
    totalPage () {
      return Math.ceil(Object.keys(this.tableData).length / this.nowLimit)
    },
    isShowLimit () {
      return this.tableOption.hasOwnProperty('showLimit') ? this.tableOption.showLimit : true
    },
    isShowPagintion () {
      return this.tableOption.hasOwnProperty('showPagintion') ? (this.tableOption.showPagintion ? this.totalPage > 0 : false) : this.totalPage > 0
    },
    pageImput: {
      get () {
        return this.page
      },
      set (val) {
        !!val && (this.page = val <= this.totalPage ? val : this.totalPage)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
