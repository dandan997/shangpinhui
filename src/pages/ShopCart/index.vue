<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul v-for="good in cartInfoList" :key="good.id" class="cart-list">
          <li class="cart-list-con1">
            <input @click="handleisCheck(good.skuId,$event.target.checked)" :checked="good.isChecked" type="checkbox" name="chk_list" />
          </li>
          <li class="cart-list-con2">
            <img :src="good.imgUrl" />
            <div class="item-msg">{{ good.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ good.cartPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a class="mins" @click="changeSkuNum('mins', good)">-</a>
            <input
              autocomplete="off"
              type="text"
              :value="good.skuNum"
              minnum="1"
              class="itxt"
              @change="changeSkuNum('text', good, $event.target.value)"
            />
            <a class="plus" @click="changeSkuNum('plus', good)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ good.cartPrice * good.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="handleDelete(good.skuId)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input @click="chooseAll($event.target.checked)" class="chooseAll" :checked="isAllCheck" type="checkbox" />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedGoods">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="$router.push({name:'trade'})">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import throttle from 'lodash/throttle'
import debounce from 'lodash/throttle'
import { mapGetters } from "vuex";
export default {
  name: "ShopCart",
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$store.dispatch("getCartList");
    },
    changeSkuNum:throttle(async function(type, good, num = 1) {
      let changeNum;
      switch (type) {
        case "plus":
          changeNum = 1;
          break;
        case "text":
          if (isNaN(num * 1)) {
            changeNum = 0;
          } else if (num < 1) {
            changeNum = 0;
          } else {
            changeNum = parseInt(num * 1,10) - good.skuNum;
          }
          break;
        case "mins":
          if (good.skuNum > 1) {
            changeNum = -1;
          } else {
            changeNum = 0;
          }
          break;
      }
        try {
        await this.$store.dispatch('addtoCart',{skuId:good.skuId,skuNum:changeNum})
        this.getData()
      } catch (error) {
        alert(error.message)
      }
      
      
      
    },300),
    async handleDelete(id){
      try {
        await this.$store.dispatch('deletSku',id)
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    handleisCheck:debounce(async function(skuid,value){
      try {
        let check = value?'1':'0'
        await this.$store.dispatch('changeCartIschecked',{id:skuid,isChecked:check})
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },500),
    async chooseAll(ischecked){
      let a = ischecked?'1':'0'
      try {
        await this.$store.dispatch('handleChooseAll',a)
        this.getData()
        // alert('全选成功')
      } catch (error) {
        alert(error.message)
      }
    },
    async deleteAllCheckedGoods(){
      try {
        await this.$store.dispatch('deleteAllCheckedGoods')
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    }
  },
  computed: {
    ...mapGetters(["cartInfo"]),
    isAllCheck() {
      return this.cartInfoList.every((item) => item.isChecked)&&this.cartInfoList.length>0;
    },
    totalPrice() {
      return this.cartInfoList.reduce(function (prev, cur) {
        // console.log(prev, cur);
        if (cur.isChecked) {
          return prev + cur.cartPrice * cur.skuNum;
        }else{
          return prev
        }
      }, 0);
    },
    cartInfoList() {
      return this.cartInfo.cartInfoList || [];
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 0%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>