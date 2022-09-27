<template>
  <div>
    <ConfirmPopup
        :breakpoints="{ '320px': '100vw', '450px': '85vw' }"
    ></ConfirmPopup>
    <Dialog
        v-model:visible="setting.mainDialog"
        :breakpoints="{
        '1400px': '45vw',
        '320px': '100vw',
        '450px': '85vw',
        '700px': '70vw',
        '950px': '60vw',
      }"
        :dismissableMask="true"
        :header="$t('addNewAddress')"
        :modal="true"
    >
      <template v-if="dialogType === 0">
        <buyerReceive
            :data="setting.dataList[0].data"
            @sendData="(event) => setting.saveData(event)"
        />
      </template>
      <template v-else-if="dialogType === 1">
        <sellerSend
            :data="setting.dataList[1].data"
            @sendData="(event) => setting.saveData(event)"
        />
      </template>
      <template v-else-if="dialogType === 2">
        <uperSend
            :data="setting.dataList[2].data"
            @sendData="(event) => setting.saveData(event)"
        />
      </template>
    </Dialog>
    <!--.................. end dialogs .....................................-->
    <h6 class="smart-text-align">{{ $t("uperSend") }}</h6>
    <div class="animate__animated animate__fadeIn">
      <div class="row">
        <div class="col-6 my-2">
          <Button
              :class="[{ 'active-btn': setting.dataList[0].data !== null }, '']"
              :icon="setting.dataList[0].data !== null ? 'fas fa-check' : ''"
              :label="$t('have')"
              class="p-button-outlined p-button-help w-100"
              iconPos="right"
              @click="onSend(0)"
          />
        </div>
        <div class="col-6 my-2">
          <Button
              :class="[{ 'active-btn': setting.dataList[0].data === null }, '']"
              :icon="setting.dataList[0].data === null ? 'fas fa-check' : ''"
              :label="$t('notHave')"
              class="p-button-outlined p-button-help w-100"
              iconPos="right"
              @click="setting.clearData(0)"
          />
        </div>
        <div class="col-12">
          <template v-if="setting.dataList[0].data !== null">
            <Panel
                :header="$t('preview')"
                class="item-list-card shadow-box-custom my-2"
            >
              <template #icons>
                <Button
                    class="p-button-rounded p-button-secondary p-button-text"
                    icon="fas fa-pencil-alt"
                    @click="onSend(0)"
                />
              </template>
              <div class="row smart-text-align text-sm-right m-0">
                <div class="col-6 p-0 smart-text-align">
                  <span class="address-sub-line">
                    <i class="fas fa-map-pin mx-2"></i
                    >{{ getProvinceId(setting.dataList[0].data.provinceId) }}
                  </span>
                </div>
                <div class="col-6 p-0 smart-text-align">
                  <span class="address-sub-line">
                    <i class="fas fa-street-view mx-2"></i
                    >{{ getCityName(setting.dataList[0].data.cityId) }}
                  </span>
                </div>
                <div class="col-6 p-0 mt-2 smart-text-align">
                  <span class="address-sub-line">
                    <i class="fas fa-male mx-2"></i
                    >{{ setting.dataList[0].data.textAddress }}
                  </span>
                </div>
                <div class="col-6 p-0 custom-text-align">
                  <span class="address-sub-line">
                    <Button
                        :title="$t('showOnMap')"
                        class="
                        p-button-rounded p-button-secondary p-button-outlined
                      "
                        icon="fas fa-map-marked-alt"
                    />
                  </span>
                </div>
                <div class="col-12 p-0 smart-text-align">
                  <span class="address-sub-line">
                    <swiper
                        :direction="'horizontal'"
                        :free-mode="true"
                        :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
                        :slides-per-view="'auto'"
                        :space-between="0"
                        class="slider"
                    >
                      <swiper-slide
                          v-for="phone in setting.dataList[0].data.phones"
                          :key="phone"
                          class="pt-2"
                      >
                        <Chip
                            :label="phone.number"
                            class="p-mr-2 p-mb-2 mx-0 my-2"
                        />
                      </swiper-slide>
                    </swiper>
                  </span>
                </div>
              </div>
            </Panel>
          </template>
        </div>
      </div>
      <hr/>
      <h6 class="smart-text-align">{{ $t("sellerSend") }}</h6>
      <div class="row">
        <div class="col-6 my-2">
          <Button
              :class="[{ 'active-btn': setting.dataList[1].data !== null }, '']"
              :icon="setting.dataList[1].data !== null ? 'fas fa-check' : ''"
              :label="$t('have')"
              class="p-button-outlined p-button-help w-100"
              iconPos="right"
              @click="onSend(1)"
          />
        </div>
        <div class="col-6 my-2">
          <Button
              :class="[{ 'active-btn': setting.dataList[1].data === null }, '']"
              :icon="setting.dataList[1].data === null ? 'fas fa-check' : ''"
              :label="$t('notHave')"
              class="p-button-outlined p-button-help w-100"
              iconPos="right"
              @click="setting.clearData(1)"
          />
        </div>
        <div v-if="setting.dataList[1].data !== null" class="col-12">
          <template v-if="setting.dataList[1].data[0].data.areaId !== 0">
            <Panel
                :header="$t('preview')"
                class="item-list-card shadow-box-custom my-2"
            >
              <template #icons>
                <Button
                    class="p-button-rounded p-button-secondary p-button-text"
                    icon="fas fa-pencil-alt"
                    @click="onSend(1)"
                />
              </template>
              <div class="row smart-text-align text-sm-right m-0">
                <div class="col-6 p-0 smart-text-align">
                  <span class="address-sub-line">
                    <i class="fas fa-map-pin mx-2"></i
                    >{{
                      getProvinceId(setting.dataList[1].data[0].data.provinceId)
                    }}
                  </span>
                </div>
                <div class="col-6 p-0 smart-text-align">
                  <span class="address-sub-line">
                    <i class="fas fa-street-view mx-2"></i
                    >{{ getCityName(setting.dataList[1].data[0].data.cityId) }}
                  </span>
                </div>
                <div class="col-6 p-0 mt-2 smart-text-align">
                  <span class="address-sub-line">
                    <i class="fas fa-male mx-2"></i
                    >{{ setting.dataList[1].data[0].data.textAddress }}
                  </span>
                </div>
                <div class="col-6 p-0 mt-2 smart-text-align">
                  <span class="address-sub-line">
                    <i class="fas fa-mail-bulk mx-2"></i>{{ $t("isFree") }}
                    <span
                        v-if="setting.dataList[1].data[0].data.itsFree === true"
                    >{{ $t("yes") }}</span
                    >
                    <span
                        v-if="setting.dataList[1].data[0].data.itsFree === false"
                    >{{ $t("no") }}</span
                    >
                  </span>
                </div>
                <div class="col-12 p-0 smart-text-align">
                  <span class="address-sub-line">
                    <swiper
                        :direction="'horizontal'"
                        :free-mode="true"
                        :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
                        :slides-per-view="'auto'"
                        :space-between="0"
                        class="slider"
                    >
                      <swiper-slide
                          v-for="phone in setting.dataList[1].data[0].data.phones"
                          :key="phone"
                          class="pt-2"
                      >
                        <Chip
                            :label="phone.number"
                            class="p-mr-2 p-mb-2 mx-0 my-2"
                        />
                      </swiper-slide>
                    </swiper>
                  </span>
                </div>
              </div>
            </Panel>
          </template>
          <template v-if="setting.dataList[1].data[1].data.areaId !== 0">
            <Panel
                :header="$t('preview')"
                class="item-list-card shadow-box-custom my-2"
            >
              <template #icons>
                <Button
                    class="p-button-rounded p-button-secondary p-button-text"
                    icon="fas fa-pencil-alt"
                    @click="onSend(1)"
                />
              </template>
              <div class="row smart-text-align text-sm-right m-0">
                <div class="col-6 p-0 smart-text-align">
                  <span class="address-sub-line">
                    <i class="fas fa-map-pin mx-2"></i
                    >{{
                      getProvinceId(setting.dataList[1].data[1].data.provinceId)
                    }}
                  </span>
                </div>
                <div class="col-6 p-0 smart-text-align">
                  <span class="address-sub-line">
                    <i class="fas fa-street-view mx-2"></i
                    >{{ getCityName(setting.dataList[1].data[1].data.cityId) }}
                  </span>
                </div>
                <div class="col-6 p-0 mt-2 smart-text-align">
                  <span class="address-sub-line">
                    <i class="fas fa-male mx-2"></i
                    >{{ setting.dataList[1].data[1].data.textAddress }}
                  </span>
                </div>
                <div class="col-6 p-0 mt-2 smart-text-align">
                  <span class="address-sub-line">
                    <i class="fas fa-mail-bulk mx-2"></i>{{ $t("isFree") }}
                    <span
                        v-if="setting.dataList[1].data[1].data.itsFree === true"
                    >{{ $t("yes") }}</span
                    >
                    <span
                        v-if="setting.dataList[1].data[1].data.itsFree === false"
                    >{{ $t("no") }}</span
                    >
                  </span>
                </div>
                <div class="col-12 p-0 smart-text-align">
                  <span class="address-sub-line">
                    <swiper
                        :direction="'horizontal'"
                        :free-mode="true"
                        :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
                        :slides-per-view="'auto'"
                        :space-between="0"
                        class="slider"
                    >
                      <swiper-slide
                          v-for="phone in setting.dataList[1].data[1].data.phones"
                          :key="phone"
                          class="pt-2"
                      >
                        <Chip
                            :label="phone.number"
                            class="p-mr-2 p-mb-2 mx-0 my-2"
                        />
                      </swiper-slide>
                    </swiper>
                  </span>
                </div>
              </div>
            </Panel>
          </template>
        </div>
      </div>
      <hr/>
      <h6 class="smart-text-align">{{ $t("buyerReceive") }}</h6>
      <div class="row">
        <div class="col-6 my-2">
          <Button
              :class="[{ 'active-btn': setting.dataList[2].data !== null }, '']"
              :icon="setting.dataList[2].data !== null ? 'fas fa-check' : ''"
              :label="$t('have')"
              class="p-button-outlined p-button-help w-100"
              iconPos="right"
              @click="onSend(2)"
          />
        </div>
        <div class="col-6 my-2">
          <Button
              :class="[{ 'active-btn': setting.dataList[2].data === null }, '']"
              :icon="setting.dataList[2].data === null ? 'fas fa-check' : ''"
              :label="$t('notHave')"
              class="p-button-outlined p-button-help w-100"
              iconPos="right"
              @click="setting.clearData(2)"
          />
        </div>
        <div class="col-12">
          <template v-if="setting.dataList[2].data !== null">
            <Panel
                :header="$t('preview')"
                class="item-list-card shadow-box-custom my-2"
            >
              <template #icons>
                <Button
                    class="p-button-rounded p-button-secondary p-button-text"
                    icon="fas fa-pencil-alt"
                    @click="onSend(2)"
                />
              </template>
              <div class="row smart-text-align text-sm-right m-0">
                <div class="col-6 p-0 smart-text-align">
                  <span class="address-sub-line">
                    <i class="fas fa-map-pin mx-2"></i
                    >{{ getProvinceId(setting.dataList[2].data.provinceId) }}
                  </span>
                </div>
                <div class="col-6 p-0 smart-text-align">
                  <span class="address-sub-line">
                    <i class="fas fa-street-view mx-2"></i
                    >{{ getCityName(setting.dataList[2].data.cityId) }}
                  </span>
                </div>
                <div class="col-6 p-0 mt-2 smart-text-align">
                  <span class="address-sub-line">
                    <i class="fas fa-male mx-2"></i
                    >{{ setting.dataList[2].data.textAddress }}
                  </span>
                </div>
                <div v-if="setting.dataList[2].data.selectedLaterReceive">
                  <div
                      v-if="
                      setting.dataList[2].data.selectedLaterReceive.label !== ''
                    "
                      class="col-6 p-0 smart-text-align"
                  >
                    <span class="address-sub-line">
                      <i class="fas fa-business-time mx-2"></i
                      >{{
                        $t("deliveryWithDelay") + " "
                      }}{{
                        setting.dataList[2].data.selectedLaterReceive.label
                      }}
                    </span>
                  </div>
                </div>
                <div class="col-12 p-0 smart-text-align">
                  <span class="address-sub-line">
                    <swiper
                        :direction="'horizontal'"
                        :free-mode="true"
                        :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
                        :slides-per-view="'auto'"
                        :space-between="0"
                        class="slider"
                    >
                      <swiper-slide
                          v-for="phone in setting.dataList[2].data.phones"
                          :key="phone"
                          class="pt-2"
                      >
                        <Chip
                            :label="phone.number"
                            class="p-mr-2 p-mb-2 mx-0 my-2"
                        />
                      </swiper-slide>
                    </swiper>
                  </span>
                </div>
              </div>
            </Panel>
          </template>
        </div>
        <div class="col-12 smart-text-align dl my-2 px-0">
          <bottomBar @clickEvent="setting.onSubmitAll()"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import buyerReceive from "./buyerReceive/buyerReceiveScreen";
import sellerSend from "./sellerSend/sellerSendScreen";
import uperSend from "./uperSend/uperSendScreen";
import {settingWorkPageState} from "./settingWorkPageState";
import Panel from "primevue/panel";
import {CacheService} from "@/core/service/cache.service";
import Chip from "primevue/chip";
import bottomBar from "@/app/public/shared/bottomBar/BottomBar.vue";
import {Swiper, SwiperSlide} from "swiper/vue";

export default {
  components: {
    buyerReceive,
    sellerSend,
    uperSend,
    Panel,
    Chip,
    bottomBar,
    Swiper, SwiperSlide,
  },
  props: {
    workPageId: Number,
  },
  emits: ["insertLevel"],
  setup() {
    const setting = ref(new settingWorkPageState((newItem) => {
    }));
    const dialogType = ref(0);

    onMounted(() => {
      setting.value.pushData(2);
    });

    function onSend(position) {
      dialogType.value = position;
      setting.value.mainDialog = true;
    }

    function getProvinceId(id) {
      return CacheService.getInstance().getProvinceById(id).provinceName;
    }

    function getCityName(id) {
      return CacheService.getInstance().getCityById(id).cityName;
    }

    return {
      setting,
      dialogType,
      onSend,
      getProvinceId,
      getCityName,
    };
  },
};
</script>

<style lang="scss" scoped>
.swiper-container {
  width: 100%;
  height: 54px;
  padding-bottom: 15px !important;
}

.swiper-slide {
  width: auto !important;
  padding: 3px;
}
</style>
