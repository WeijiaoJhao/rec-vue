<template>
  <div class="hello">
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <h1>{{ msg }}</h1>

          <page-table :limit="limit" :tableData="tableData" :tableOption="tableOption" @triggerEv="open">
            <template v-for="idx in tableOption.tableCell.length" :slot="`mdayF_${idx - 1}`" slot-scope="{ value }">
              {{ value.mdayF }}
              <span :key="idx" @click="iconEvent(value)">
                <icon name="search"></icon>
              </span>
            </template>
          </page-table>
          <!-- PageTable -->
          <button type="button" class="btn btn-dark" @click="search">Dark</button>
          <button type="button" class="btn btn-danger">Danger</button>
          <!--<button type="button" class="btn btn-custom-color">Custom</button>-->

          <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">詳細資料</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <form>
                    <div class="form-group row" v-for="item in modalList" :key="item.key">
                      <label :for="item.key" class="col-sm-4 col-form-label">{{item.label}}</label>
                      <div class="col-sm-8">
                        <input type="text" readonly class="form-control-plaintext" :id="item.key" :value="modalData[item.key]">
                      </div>
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
                </div>
              </div>
            </div>
          </div><!-- modal -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import PageTable from '@C/PageTable'
import { formatDate } from '@UTIL'
import Icon from 'vue-awesome/components/Icon'

export default {
  name: 'HelloWorld',
  components: { PageTable, Icon },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      tableOption: {
        tableCell: [{
          title: '站點代號',
          titleStyle: '',
          key: 'sno',
          style: ''
        }, {
          title: '場站區域',
          titleStyle: '',
          key: 'sarea',
          style: ''
        }, {
          title: '場站名稱',
          titleStyle: '',
          key: 'sna',
          style: ''
        }, {
          title: '目前車輛數量',
          titleStyle: '',
          key: 'sbi',
          style: 'strong'
        }, {
          title: '車輛總數',
          titleStyle: '',
          key: 'tot',
          style: ''
        }, {
          title: '資料更新時間',
          titleStyle: '',
          key: 'mdayF',
          style: ''
        }]
        // showPagintion: false
        // showLimit: false
      },
      modalList: [{
        label: '站點代號',
        key: 'sno'
      }, {
        label: '場站區域',
        key: 'sarea'
      }, {
        label: '場站名稱',
        key: 'sna'
      }, {
        label: '場站總停車格',
        key: 'tot'
      }, {
        label: '場站目前車輛數量',
        key: 'sbi'
      }, {
        label: '緯度',
        key: 'lat'
      }, {
        label: '經度',
        key: 'lng'
      }, {
        label: '地址',
        key: 'ar'
      }, {
        label: '空位數量',
        key: 'bemp'
      }, {
        label: '全站禁用狀態',
        key: 'act'
      }, {
        label: '資料更新時間',
        key: 'mdayF'
      }],
      modalData: {},
      limit: 10
    }
  },
  created () {
    this.search()
  },
  methods: {
    ...mapActions([
      _M.GET_DATA
    ]),
    search () {
      this[_M.GET_DATA]()
    },
    formatDate (date) {
      return formatDate(date)
    },
    open (item) {
      this.modalData = item
      $('#exampleModal').modal('show')
    },
    iconEvent (value) {
      this.modalData = value
      $('#exampleModal').modal('show')
    }
  },
  computed: {
    ...mapGetters([
      'getData'
    ]),
    tableData () {
      let list = this.getData ? this.getData : {}
      if (Object.keys(list).length !== 0) {
        // list.find( v => return this.formatDate(v.mday))
        Object.keys(list).forEach(v => {
          list[v].mdayF = this.formatDate(list[v].mday)
        })
      }
      return list
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
/*
@import '~@SCSS/_custom.scss';
*/
</style>
