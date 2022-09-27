<template>
  <div class="container">
    <div class="row">
      <div class="col-10 mx-auto mt-5 mx-2">
        <div class="payment">
          <div class="payment_header">
            <div class="check"><i class="fa fa-check" aria-hidden="true"></i></div>
          </div>
          <div class="content">
            <h1>پرداخت با موفقیت انجام شد</h1>
            <p>عملیات پرداخت شما با موفقیت انجام شد لطفا برای بازگشت به اپ دکمه زیر را بزنید</p>
            <br>
            <a href="http://web.uper-me.com/increaseCash" >بازگشت به اپلیکیشن</a>
            <br>
          </div>

        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {useRoute} from "vue-router";
import {ref} from "vue";
import {AccountingRepository} from "@/core/repository/accountingRepository";

export default {
  setup(){
    const route = useRoute()
    const tref = route.fullPath.match(/tref=(.*?)&iN/)[1]
    const isPay = ref(false)
    AccountingRepository.getInstance().ValidateTransactionWithTrf({
      body:{
        "transactionReferenceID": tref.toString()
      },
      onReceive: res => {
        isPay.value = true
      }
    })


    return {
      tref
    };
  }

}
</script>

<style scoped>

body
{
  background:#f2f2f2;
}

.payment
{
  border:1px solid #f2f2f2;
  height:280px;
  border-radius:20px;
  background:#fff;
}
.payment_header
{
  background: #0c7a14;
  padding:20px;
  border-radius:20px 20px 0px 0px;

}

.check
{
  margin:0px auto;
  width:50px;
  height:50px;
  border-radius:100%;
  background:#fff;
  text-align:center;
}

.check i
{
  vertical-align:middle;
  line-height:50px;
  font-size:30px;
}

.content
{
  text-align:center;
}

.content  h1
{
  font-size:25px;
  padding-top:25px;
}

.content a
{
  width:200px;
  height:35px;
  color:#fff;
  border-radius:30px;
  padding:5px 10px;
  background: rgb(0, 166, 255);
  transition:all ease-in-out 0.3s;
}

.content a:hover
{
  text-decoration:none;
  background:#000;
}

</style>
