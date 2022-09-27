<template>
  <div>
    <div class="header">
      <div class="header-right">
        <img src="#" alt="load later" />
      </div>

      <div class="header-center">
        <p>جزئیات فاکتور</p>
        <img src="@/assets/img/svg/appbarShape.svg" />
      </div>
      <div class="header-left">
        <p class="m-0">هایپر مارکت آپر</p>
        <p class="m-0">upper-hypermarket</p>
      </div>
    </div>
    <div class="base">
      <div class="base-item m-1">
        <p>تاریخ فاکتور : 1400/08/13 12:33</p>
      </div>
      <div class="base-item m-1">
        <p>شماره فاکتور :UF_1819</p>
      </div>
      <div class="base-item m-1">
        <p>امتیاز آپری : 0.171</p>
        <!-- <img :src="require('src/assets/img/svg/uperCoin.svg')" alt=""> -->
      </div>
      <div class="base-item m-1">
        <p>نحوه پرداخت :اعتباری</p>
      </div>
      <div class="base-item m-1">
        <p>تعداد اقلام : 1</p>
      </div>
      <div class="base-item m-1">
        <p>هزینه ارسال : 19300</p>
        <!--        <img :src="require('src/assets/img/svg/uperCoin.svg')" alt="">-->
      </div>
      <div class="base-item m-1">
        <p>مبلغ کل : 7600</p>
        <!--        <img :src="require('src/assets/img/svg/uperCoin.svg')" alt="">-->
      </div>
    </div>
    <div class="itemList">
      <swiper
        id="phones"
        :direction="'horizontal'"
        :free-mode="true"
        :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
        :slides-per-view="'auto'"
        :space-between="0"
        class="slider item-bottom-left-swiper"
      >
        <swiper-slide v-for="pictures in 4" :key="pictures">
          <div class="itemList-item">
            <img class="item-pic" src="#" alt="load later" />
            <p class="item-name">
              رشته سوپ آشیانه ای زر ماکارون
              <br />مقدار 500 گرم
            </p>
            <p class="item-price">قیمت : 12.950</p>
            <p class="item-count">تعداد : 1</p>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="d-flex flex-row justify-content-center">
      <div class="description">
        <div class="description-right">
          <div class="description-right-top">
            <i class="fa fa-exclamation-triangle danger" aria-hidden="true"></i>
            <p>علت لغو فاکتور</p>
          </div>
          <div class="description-right-bottom">علت لغو سفارش اینست ک</div>
        </div>
        <div class="description-left">
          <i class="fa fa-exclamation-triangle danger" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "factorDetails2pageScreen"
};
</script>
<style lang="scss" scoped>
.swiper-container {
  padding: 5px;
}

.swiper-slide {
  width: auto !important;
  padding: 0 !important;
}

.header {
  margin-top: 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  &-left {
    margin-top: 10px;
    width: 25%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p {
      font-size: 14px;
    }
  }

  &-center {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      position: absolute;
      top: 0;
      width: 288px;
    }

    p {
      z-index: 10;
      font-size: 14px;
    }
  }

  &-right {
    width: 25%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      //background-color: red;
      margin: 3px 10px 0 0;
    }
  }
}

.base {
  text-align: right;

  &-item {
    margin-top: 20px;
    padding: 0 10px 0 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    p {
      font-size: 14px;
      margin: 2px;
    }
  }
}

.itemList {
  &-item {
    width: 240px;
    margin-left: 5px;
    margin-right: 5px;
    border: 1px solid #cecece6b;
    border-radius: 10px;
    box-shadow: 0 1px 5px 1px #cecece4a;
    padding: 5px;
    text-align: right;
    .item-pic {
      height: 100px;
      padding: 90px 69px;
    }
    .item-name {
      font-size: 14px;
    }
  }
}

.description {
  padding: 10px;
  margin-top: 10px;
  width: 95%;
  border: 1px solid #b7b6b5;
  border-radius: 10px;
  box-shadow: 0 1px 5px 1px #cecece4a inset;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  &-right {
    display: flex;
    flex-direction: column;
    &-top {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 5px;

      p {
        color: #ff9900;
      }
    }
  }

  .danger {
    font-size: 40px;
    color: #ff9900;
  }
}
</style>
