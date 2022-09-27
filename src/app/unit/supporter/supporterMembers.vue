<template>
  <div class="d-flex flex-column">
    <div class="w-100">
      <mainSupporter/>
    </div>
    <div
        v-for="i in 5"
        :key="i"
        class="members-card w-100 d-flex flex-column my-3"
    >
      <div class="w-100 d-flex align-items-center">
        <img alt="" class="img" src="@/assets/img/uper.png"/>
        <div class="d-flex flex-column px-2">
          <span>ascsac</span>
          <span>cvgbhnj</span>
        </div>
      </div>
      <span class="product-name mt-2">تولیدی عرقی جات</span>
      <div class="line my-2"></div>
      <div class="w-100">
        <table class="w-100">
          <tr>
            <th></th>
            <th>{{ $t("post") }}</th>
            <th>{{ $t("product") }}</th>
            <th>{{ $t("purchases") }}</th>
            <th>{{ $t("sells") }}</th>
          </tr>
          <tr>
            <td>{{ $t("today") }}</td>
            <td>1</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
          </tr>
          <tr>
            <td>{{ $t("yesterday") }}</td>
            <td>1</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
          </tr>
          <tr>
            <td>{{ $t("2daysago") }}</td>
            <td>1</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import mainSupporter from "./mainSupporter.vue";

export default {
  name: "supporterMembers",
  components: {mainSupporter},
};
</script>

<style scoped>
.img {
  width: 70px;
  height: 70px;
  background: blue;
  border-radius: 50%;
  text-align: center;
  border: 1px solid #fafafa;
}

.product-name {
  border: 1px solid #bdb2b2;
  width: 20%;
  text-align: center;
  font-size: 11px;
  padding: 5px 4px;
  border-radius: 9px;
  color: #4c4b4b;
}

.members-card {
  font-size: 14px;
  border-radius: 10px;
  width: calc(100% - 40px);
  padding: 10px;
  margin: 10px;
  box-shadow: 1px 2px 10px #afadad;
}

.line {
  width: 100%;
  height: 1px;
  background: #bdb2b2;
}

td {
  text-align: center;
}

th {
  text-align: center;
}
</style>
