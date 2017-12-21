<template lang="html">
  <div class="s-container box">
    <div class="box-col-flex">
      <h2 class="overtext">
        你赠送<span>{{ data.nickname }}</span>钻石
      </h2>
      <h3 class="overtext">
        -{{ data.gc }}<span>颗</span>
      </h3>
    </div>
    <div>
      <div class="box box-x-right box-y-center">
        <span class="box box-item status0" v-if="data.type === '1'">
          处理中
        </span>
        <span class="box box-item" :class="{success: data.type === '2'}" v-else>
          <img :src="statusIcon">{{ data.type === '2' ? '赠送成功' : '赠送失败' }}
        </span>
      </div>
      <p class="box box-x-right">{{ formatTime(data.create_time) }}</p>
    </div>
    <!-- <div class="image box box-item">
      <div class="icon box box-item" :data-status="data.type">
        <i class="iconfont">&#xe613;</i>
      </div>
    </div>
    <div class="text box-col-flex">
      <h5 class="overtext">你赠送了{{ data.nickname }}<span> {{ data.gc }} </span>颗钻石</h5>
      <p>{{ formatTime(data.create_time) }}</p>
    </div>
    <div class="status box box-item">
      {{ data.type == 1 ? '处理中' : (data.type == 2 ? '赠送成功' : '赠送失败') }}
    </div> -->
  </div>
</template>

<script>
// import router from '@/router'
import _ from 'lodash'
export default {
  data() {
    return {
      icon: {
        success: 'static/icon/success.png',
      },
    }
  },
  props: ['data'],
  computed: {
    statusIcon() {
      return `static/icon/${_.get(this, 'data.type') === '2' ? 'success' : 'fail'}.png`
    },
  },
  methods: {
    formatTime(time) {
      return this.$Helper.formatTime(time)
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../theme/index.less";
.s-container {
  background-color: white;
  margin:1vh 0;
  height:15vh;
  padding:2vh 2vw;
  &>div{
    height: 100%;
    // border:1px solid red;
    width:30%;
    &>h2{
      font-size:5vw;
      font-weight: 400;
      margin:1vh auto;
      color:#333;
      span{
        color:@activeFontColor;
      }
    }
    &>h3{
      color:#f38c14;
      font-size: 6vw;
      font-weight: 300;
      span{
        font-size:4vw;
        color:#333;
      }
    }
    &>div{
      height:6vh;
      // border:1px solid black;
      .status0{
        height:4.5vh;
        border-radius: 4.5vh;
        color:white;
        font-size:4vw;
        padding:3vw;
        background: @activeFontColor;
      }
      span{
        color: @failFontColor;
        img{
          height:3.2vh;
          margin-right:1vw;
        }
      }
      span.success{
        color: @activeFontColor;
      }
    }
    &>p{
      margin-top:.7vh;
      padding-right:2vw;
      color:@basicFontColor;
      font-size:3vw;
    }
  }
  // .image{
  //   width:18%;
    
  //   .icon{
  //     height:6vh;
  //     width:6vh;
  //     border-radius: 100%;
  //     background: #bbbbbb;
  //     i{
  //       color:white;
  //       font-size:6vw;
  //     }
  //   }
  //   .icon[data-status="2"]{
  //     background: #7dc38d;
  //   }
  //   .icon[data-status="3"]{
  //     background: #ff7373;
  //   }
  // }
  // .status{
  //   width:25%;
    
  //   color:#b1b1b1;
  //   font-size:4vw;
  // }
  // .text{
  //   color:#999;
  //   h5{
  //     margin-top:14%;
  //     margin-bottom:1vh;
  //     font-size:4.3vw;
  //     span{
  //       color:#333;
  //     }
  //   }
  //   p{
  //     font-size:3vw; 
  //   }
  // }
}


</style>
