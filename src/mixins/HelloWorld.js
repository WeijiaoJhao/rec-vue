import { mapGetters, mapActions } from 'vuex'
import PageTable from '@C/PageTable'
import { formatDate } from '@UTIL'
import Icon from 'vue-awesome/components/Icon'

export default {
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
        // showLimit: false,
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
