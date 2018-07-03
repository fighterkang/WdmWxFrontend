<template>
  <div class="container" v-if="true || questionModel2Data.show">
    <div class="content">
      <div class="testChoice">继续上次练习</div>
      <div class="testChoice">重新开始练习</div>
      <div class="practicePoint">
        设置练习起点
        <div class="pointIptBox">
          题号: <input type="text" class="pointIpt"/>
        </div>
        <div class="oBtnBox">
          <span class="oBtn">取消</span>
          <span class="oBtn">确定</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'

  export default {
    components: {
//      IDetailOne
    },
    data() {
      return {}
    },
    computed: {...mapState(['questionModel2Data'])},
    watch: {},
    methods: {},
    created() {
    },
    mounted() {
    },
//    props: ['type', 'data'],
  }
</script>
<style lang="less" scoped>
  @import url('../../theme/index.less');

  .container {
    background: rgba(0, 0, 0, .4);
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
    .content {
      position: absolute;
      height: 300*@vh;
      width: 452*@vh;
      background: #f1f1f1;
      border-radius: 20*@vh;
      font-size: 30*@vh;
      color: #000;
      text-align: center;
      top: 50%;
      margin-top: -150*@vh;
      left: 50%;
      margin-left: -226*@vh;
      .testChoice {
        height: 100*@vh;
        line-height: 100*@vh;
        border-bottom: 1px solid #c1c1c1;
      }
      .practicePoint {
        height: 100*@vh;
        line-height: 100*@vh;
      }
      .pointIptBox {
        display: none;
        .pointIpt {
          width: 100*@vh;
          border-bottom: 1px solid #000;
          padding: 0 20*@vh;
          box-sizing: border-box;
        }
      }
      .oBtnBox {
        display: none;
        .oBtn {
          display: inline-block;
          width: 50%;
        }
      }
      &.active {
        height: 502*@vh;
        margin-top: -251*@vh;
        .pointIptBox {
          display: block;
          border-bottom: 1px solid #c1c1c1;
        }
        .oBtnBox {
          display: block;
        }
      }
    }
  }
</style>
