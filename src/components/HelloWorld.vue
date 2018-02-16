<template>
  <div class="hello">
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <h1>{{ msg }}</h1>
          <button type="button" class="btn btn-dark" @click="search">search</button>

          <page-table :limit="limit" :tableData="tableData" :tableOption="tableOption" @triggerEv="open">
            <template v-for="idx in tableOption.tableCell.length" :slot="`mdayF_${idx - 1}`" slot-scope="{ value }">
              {{ value.mdayF }}
              <span :key="idx" @click="iconEvent(value)">
                <icon name="search"></icon>
              </span>
            </template>
          </page-table>
          <!-- PageTable -->

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
                      <label :for="item.key" class="col-4 col-form-label">{{item.label}}</label>
                      <div class="col-8">
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
import HelloWorld from '@MIXIN/HelloWorld'

export default {
  name: 'HelloWorld',
  mixins: [HelloWorld]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
/*
@import '~@SCSS/_custom.scss';
*/
</style>
