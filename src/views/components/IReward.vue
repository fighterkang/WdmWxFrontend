<template lang="html">
  <transition name="fade">
    <div class="layer" v-if="show" @click.self="hideReward">
      <div class="reward-container">
        <div class="head-image" :style="{backgroundImage: `url('static/icon/reward.png')`}"></div>
        <ul class="box box-wrap" v-if="!noMenoy">
          <li class="box box-item" :class="{active: selectReward === item.gc}" @click="setReward(item)" v-for="item in rewardArr">
            {{ item.gc }}
          </li>
        </ul>
        <ol v-if="!noMenoy">
          <li class="box box-item" v-if="item.handle" @click="payType=key" v-for="(item, key) in payArr" :key="key">
            <img :src="getImage(item.type, key == payType)">
          </li>
        </ol>
        <p v-if="noMenoy">
          10000颗钻石起赏，还不够哟~
        </p>
        <IButton @clickFn="addReward" class="s-btn">
          {{ noMenoy ? '我再攒攒' : '赏了' }}
        </IButton>
        <!-- <div class="s-btn box box-item" @click="addReward">
          {{ noMenoy ? '我再攒攒' : '赏了' }}
        </div> -->
        <!-- <div v-if="!noMenoy">
          <p>请选择打赏的钻石数：</p>
          <ul class="reward-ul">
            <li class="box box-item" :class="{active: selectReward === item.gc}" @click="setReward(item)" v-for="item in rewardArr">
              {{ item.gc }}
            </li>
          </ul>
          <div class="half-x-line"></div>
          <p>请选择支付方式：</p>
          <ul class="pay-ul box">
            <li class="box box-item" :class="{active: key == payType}" v-if="item.handle" @click="payType=key" v-for="(item, key) in payArr" :key="key">
              {{ item.name }}
            </li>
          </ul>
        </div>
        <div class="box box-item no-money" v-else>
          您的钻石余额不足！
        </div>
        <div class="half-x-line"></div>
        <ul class="btn-ul box">
          <li class="box box-item box-col-flex" @click="addReward" v-if="!noMenoy">
            打赏
          </li>
          <div class="half-y-line" v-if="!noMenoy"></div>
          <li class="box box-item box-col-flex" @click="hideReward">
            再想想
          </li>
        </ul> -->
      </div>
    </div>
  </transition>
</template>

<script>
// import router from '@/router'
import { mapState } from 'vuex'
import _ from 'lodash'
import IButton from './IButton'
export default {
  components: {
    IButton,
  },
  data() {
    return {
      rewardArr: [],
      selectReward: null,
      rmb: null,
      payArr: [],
      payType: null,
      token: null,
    }
  },
  computed: {
    ...mapState(['rewardData']),
    ...mapState('basic', ['basic']),
    show() {
      return this.rewardData.show
    },
    noMenoy() {
      return this.rewardArr.length === 0
    },
  },
  watch: {
    show() {
      if (this.show) {
        this.initData()
      }
    },
  },
  methods: {
    isEmpty(data) {
      return _.isEmpty(data)
    },
    initData() {
      let { alipay, wxpay } = _.get(this, 'basic.power')
      let bcNumber = _.get(this, 'basic.power.bc_number')
      let chosedPayType = this.findFristExist([wxpay, alipay, bcNumber])
      if (!chosedPayType) {
        this.$Helper.message.toast({
          text: '请至少填写一种支付方式',
          long: 2000,
        })
        this.hideReward()
        this.$Helper.jumpPage('Setting', this)
        return
      }
      let payArr = [
        {
          name: '微信',
          handle: wxpay,
          type: 'wxpay',
        },
        {
          name: '支付宝',
          handle: alipay,
          type: 'alipay',
        },
        {
          name: '银行卡',
          handle: bcNumber,
          type: 'bcNumber',
        },
      ]
      this.payArr = payArr
      this.payType = chosedPayType
      this.$Helper.ajax({
        url: 'Open.RewardStart',
        params: {
        },
        success: ({ gcList, token }) => {
          this.rewardArr = this.OtoA(gcList)
          if (!this.noMenoy) this.setReward(this.rewardArr[0])
          this.token = token
        },
      })
    },
    hideReward() {
      this.$store.dispatch('ToggleReward', { titleid: null, show: false })
    },
    addReward() {
      if (this.rewardArr.length === 0) {
        this.hideReward()
        return
      }
      this.$Helper.ajax({
        url: 'Open.RewardEnd',
        params: {
          microblog_id: this.rewardData.titleid,
          gc: this.selectReward,
          rmb: this.rmb,
          token: this.token,
          class: parseInt(this.payType) + 1,
        },
        success: ({ code, context }) => {
          this.$Helper.message.toast({
            text: context,
            long: 2000,
          })
          this.hideReward()
        },
      })
    },
    setReward(item) {
      this.selectReward = item.gc
      this.rmb = item.rmb
    },
    OtoA(obj) {
      let returnData = []
      for (let i in obj) {
        returnData.push(obj[i])
      }
      return returnData
    },
    findFristExist(arr) {
      let returnData
      for (let key in arr) {
        if (arr[key]) {
          returnData = key
          break
        }
      }
      return returnData
    },
    getImage(name, active) {
      return `static/icon/reward_${name}${active ? '_active' : ''}.png`
    },
  },
}
</script>

<style lang="less" scoped>
@import '../../theme/index.less';
.reward-container {
  margin:18vh auto; // height: 50vh;
  width: 80%;
  background: white; // padding: 2vw 4vw;
  border-radius: 1.2vw;
  overflow: hidden;
  .head-image {
    height: 6.5vh;
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-position: center center;
  }
  ul {
    // height:25vh;
    padding: 3vh 2vh; // border: 1px solid red;
    // display: flex;
    // justify-content: flex-start;
    // align-content: center;
    // align-items: center;
    // flex-wrap: wrap;
    li {
      width: 28.7%;
      height: 6vh;
      border-radius: 6vh;
      border: 1px solid @activeFontColor;
      color: @activeFontColor;
      margin: .7vh 1.6vw;
      font-size:3.8vw;
      &.active{
        background: @activeFontColor;
        color: white;
      }
    }
  }
  ol {
    height: 7vh;
    display: flex;
    justify-content: center;
    align-content: space-around;
    flex-wrap: wrap;
    li {
      margin-left: 10vw;
    }
    li:nth-child(1) {
      margin-left: 0;
    }
    img {
      height: 5.7vh;
    }
  }
  p{
    text-align: center;
    margin:12vh 0;
    font-size: 4vw;
    color:@mainFontColor;
  }
  .s-btn {
    height: 13vw;
    border-radius: 13vw;
    border: 1px solid @activeFontColor;
    color: @activeFontColor;
    width:45%;
    margin:4vh auto;
    font-size:4vw;
  }
}


// .reward-container {
//   .no-money {
//     height: 80%;
//   }
//   position: absolute;
//   bottom: 0;
//   top:0;
//   left: 5vw;
//   right: 5vw;
//   margin:auto;
//   height: 50vh;
//   background: white;
//   padding: 2vw 4vw;
//   border-radius: 1.5vw;
//   p {
//     color: #333;
//     font-size: 4vw;
//     margin-top: 3vw;
//     margin-bottom: 6vw;
//   }
//   .reward-ul {
//     height: 14vh;
//     margin-top: 1.5vh;
//     margin-bottom: 3vh;
//     li {
//       border: 1px solid #ccc;
//       width: 18%;
//       margin-right:2%;
//       height: 4.7vh;
//       border-radius: .6vw;
//       color: #666;
//       float:left;
//       margin-top:2vh;
//     }
//     li.active {
//       border: 1px solid #ff7373;
//       color: #ff7373;
//     }
//   }
//   .pay-ul {
//     margin-top: 1.5vh;
//     li {
//       height: 4.8vh;
//       width: 20%;
//       border-radius: .6vw;
//       background: #e5e5e5;
//       color: #333;
//       margin-right: 5vw;
//       font-size: 4vw;
//     }
//     li.active {
//       background: #ff7373;
//       color: white;
//     }
//   }
//   .half-x-line {
//     position: absolute;
//     bottom: 7vh;
//     left: 0;
//     right: 0;
//   }
//   .btn-ul {
//     position: absolute;
//     bottom: 0;
//     left: 0;
//     right: 0;
//     .half-y-line {
//       height: 7vh;
//     }
//     li {
//       height: 7vh; // border:1px solid red;
//       color: #ccc;
//     }
//     li:nth-child(1) {
//       color: #ff7373;
//     }
//   }
// }
</style>
