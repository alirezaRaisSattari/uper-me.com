<template>

  <div class="top">

    <p>{{ $t("EditFeaturePrices") }}</p>
    <img src="@/assets/img/svg/appbarShape.svg" alt="appbarShape">
  </div>
  <div class="base">
    <div class="card">
      <p class="title">{{ $t("EditUperiPrice") }}</p>
      <div class="Percentage">
        <input type="number" :placeholder="$t('Percentage')" v-model="uperPrice">
        <p>{{ UpperStatus ? $t("increase") : $t("Decrease") }}</p>
        <label class="switch">
          <input type="checkbox" v-model="UpperStatus">
          <span class="slider round"></span>
        </label>
      </div>
      <div class="base-btn">
        <!--        <button class="submitBtn" @click="upperEdit">{{ $t("submit") }}</button>-->
        <Button :label="$t('submit')" @click="upperEdit" class="submitBtn" :loading="_state.loadingUpper"/>
      </div>
    </div>
    <div class="card">
      <p class="title">{{ $t("EditDefaultPrice") }}</p>
      <div class="currency">
        <p class="m-0">{{ $t("currency") }}</p>
        <select>
          <option>{{ $t("toman") }}</option>
        </select>
      </div>
      <div class="Percentage">
        <input type="number" :placeholder="$t('Percentage')" v-model="TomanPrice">
        <p>{{ TomanStatus ? $t("increase") : $t("Decrease") }}</p>
        <label class="switch">
          <input type="checkbox" v-model="TomanStatus">
          <span class="slider round"></span>
        </label>
      </div>
      <div class="base-btn">
        <!--        <button class="submitBtn" >{{ }}</button>-->
        <Button :label="$t('submit')" @click="TomanEdit" class="submitBtn" :loading="_state.loadingDefault"/>

      </div>
    </div>
  </div>
</template>

<script>
import {ref} from "vue"
import {UpdatePropPriceState} from "@/app/unit/pages/update prop price/updatePropPriceState";
import {ToastService} from "../../../../core/service/toast.service";
import {i18n} from "../../../../main";
import Button from 'primevue/button';

export default {
  name: "updatePropPrice",
  components: {
    Button
  },

  setup() {
    const UpperStatus = ref(false);
    const tomanStatus = ref(false);
    const _state = ref(new UpdatePropPriceState())
    const inc = ref();
    const tomanPrice = ref();
    const uperPrice = ref();

    function upperEdit() {
      if (uperPrice.value !== undefined) {
        if (uperPrice.value <= 80) {
          if (!UpperStatus)
            inc.value =Math.abs(uperPrice.value);
          else inc.value = Math.abs(uperPrice.value) * -1
          _state.value.fetchDataUper(inc.value, (res) => {
            uperPrice.value = undefined;
            UpperStatus.value = false
          });
        } else {
          ToastService.getInstance().error(i18n.global.tc('TheMaximumChangeIs80%'))
        }
      } else {
        ToastService.getInstance().error(i18n.global.tc('TheValuesEnteredAreIncorrect'))
      }
    }

    function TomanEdit() {
      if (tomanPrice.value !== undefined && (tomanPrice.value / 100) <= 1) {
        if (tomanPrice.value <= 80) {
          if (!tomanStatus)
            inc.value = Math.abs(tomanPrice.value) * -1
          else inc.value = Math.abs(tomanPrice.value);
          _state.value.fetchDataDefault(inc.value, (res) => {
            tomanPrice.value = undefined;
            tomanStatus.value = false;
          });
        } else {
          ToastService.getInstance().error(i18n.global.tc('TheMaximumChangeIs80%'))
        }
      } else {
        ToastService.getInstance().error(i18n.global.tc('TheValuesEnteredAreIncorrect'))
      }
    }

    return {
      UpperStatus,
      TomanStatus: tomanStatus,
      upperEdit,
      TomanEdit,
      TomanPrice: tomanPrice,
      uperPrice,
      _state
    }
  }
}
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  img {
    top: 0;
    position: absolute;
  }

  p {
    position: relative;
    z-index: 100;
    font-size: 14px;
    padding-top: 10px;
  }
}

.base {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: right;
  padding: 20px;


  .card {
    width: 100%;
    height: fit-content;
    border: 1px solid #d9d9d9;
    border-radius: 5px;
    box-shadow: 0px 0px 5px 2px #d9d9d9;
    padding: 10px;
    margin-bottom: 50px;

    .title {
      font-weight: 900;
      font-size: 16px
    }

    .currency {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 20px;

      p {
        font-size: 14px;
      }

      p::after {
        content: '*';
        color: red;
        margin-right: 5px;
        margin-top: -10px;
        font-weight: 600;
      }

      select {
        border: 2px solid #d9d9d9;
        border-radius: 10px;
        width: 50%;
        height: 60px;
        padding-right: 10px;
        outline: none;
        margin-right: 70px !important;

      }
    }

    .Percentage {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;

      input[type="number"] {
        border: 2px solid #d9d9d9;
        border-radius: 10px;
        width: 65%;
        height: 60px;
        padding-right: 10px;
        outline: none;
      }

      input[type="number"]::placeholder {
        color: #d9d9d9;
      }

      p {
        margin: 0;
        padding-right: 10px;
        font-weight: 600;
      }


    }

    .base-btn {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
    }

    .submitBtn {
      border: 1px solid #c5e4e7;
      background-color: #c5e4e7;
      padding: 10px 85px;
      border-radius: 5px;
      outline: none;
      cursor: pointer;
      color: #000;
    }
  }

}

// toggle switch
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  margin-right: 20px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 5px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: all .4s;
}

.slider:after {
  left: 16px !important;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:after {
  transform: translateX(-26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
