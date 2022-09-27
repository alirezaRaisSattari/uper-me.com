<template>
  <div class="h-100%">
    <p class="w-100 p-3 text-right uper-card-1 bg-white">
      {{ $t("addMessage") }}
    </p>
    <div class="mb-5">
      <loading v-if="sendMessage.ticketPropertyloading"/>

      <div v-if="sendMessage.ticketProperty != null">
        <p class="w-100 text-right mt-2">
          {{ $t("unit") }}:
          {{ unitsList[sendMessage.ticketProperty.unitId - 1] }}
        </p>
        <p class="w-100 text-right text bg-ganger mt-2">
          {{ $t("ticketSubject") }} :
          {{ sendMessage.ticketProperty.subject }}
        </p>
        <p class="w-100 text-right mt-2">
          {{ $t("importanceOfTheTopic") }} :
          {{ priority[sendMessage.ticketProperty.priority - 1] }}
          <img
              v-if="sendMessage.ticketProperty.priority === 1"
              class="img-importance mx-1"
              src="@/assets/img/high.svg"
          />
          <img
              v-if="sendMessage.ticketProperty.priority === 2"
              class="img-importance mx-1"
              src="@/assets/img/medium.svg"
          />
          <img
              v-if="sendMessage.ticketProperty.priority === 3"
              class="img-importance mx-1"
              src="@/assets/img/low.svg"
          />
        </p>
      </div>
      <textarea
          v-model="sendMessage.text"
          :placeholder="$t('writeTheDescriptionOfTheTicket')"
          class="form-control p-3"
          type="text"
      />
      <div
          class="
          w-100
          d-flex
          justify-content-start
          mt-3
          h-auto
          align-items-center
        "
          style="direction: rtl"
      >
        <div
            class="
            add-pic
            d-flex
            align-items-center
            justify-content-center
            py-5
            w-25
          "
        >
          <span class="text-center"> {{ $t("addmainphotos") }} </span>

          <input
              ref="InputOtherImage"
              accept="image/*"
              class="w-100 h-100 hidden"
              multiple
              type="file"
              @change="onFileChange($event, 2)"
          />
        </div>
        <div
            v-for="item in otherPhotoList"
            :key="item"
            class="w-25 h-100 h-100 mx-2"
        >
          <img v-lazy="item" alt="" class="w-100 h-100 rounded"/>
        </div>
      </div>
    </div>
    <loading v-if="sendMessage.closeTicketLoading"/>

    <div class="new-ticket mt-5 d-flex justify-content-end mt-5">
      <button
          class="
          btn
          py-2
          px-3
          text-light
          bg-warning
          d-flex
          align-items-center
          rounded-pill
        "
          @click="replyTicket"
      >
        {{ $t("replyTicket") }}
      </button>
    </div>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import {i18n} from "@/main";
import {ToastService} from "@/core/service/toast.service";
import {convertFileTOBase64} from "@/core/service/utils.service";
import {addMessage} from "./ticketAddMessageState.ts";
import {getTicketsMessages} from "./ticketMessagesState";
import {BASE_TAKE} from "@/core/constant/constant";

import {
  getMainPageId,
  getSelectedPageId,
} from "../../../core/service/utils.service";
import {useRoute} from "vue-router";
import {ImageUploaderKeys} from "@/core/service/fileUploader.service";

export default {
  name: "TicketAddMessage",
  setup() {
    const route = useRoute();
    const messageState = ref(new getTicketsMessages());
    const text = ref("");
    const sendMessage = ref(new addMessage());
    const InputOtherImage = ref();
    const otherPhotoList = ref([]);
    const ticketId = ref();
    const unitsList = ref([
      i18n.global.tc("userUnit"),
      i18n.global.tc("productUnit"),
      i18n.global.tc("postUnit"),
      i18n.global.tc("invoiceUnit"),
      i18n.global.tc("financialUnit"),
      i18n.global.tc("deliveryUnit"),
      i18n.global.tc("storyUnit"),
      i18n.global.tc("MLUnit"),
      i18n.global.tc("settingUnit"),
      i18n.global.tc("AgencyUnit"),
      i18n.global.tc("TicketUnit"),
    ]);
    const priority = ref([
      i18n.global.tc("high"),
      i18n.global.tc("medium"),
      i18n.global.tc("low"),
    ]);

    function onFileChange(e) {
      if (e.target.files.length === 0) return;

      if (e.target.files.length + otherPhotoList.value.length <= 3) {
        for (let i = 0; i < e.target.files.length; i++) {
          convertFileTOBase64(e.target.files[0], (base64) => {
            otherPhotoList.value.push(base64);
          });
        }
      } else {
        ToastService.getInstance().error(i18n.global.tc("Max3"));
      }
    }

    function replyTicket() {
      if (!sendMessage.value.text) {
        ToastService.getInstance().error(i18n.global.tc("characterLimit"));
        return;
      }
      if (otherPhotoList.value.length == 0) {
        ToastService.getInstance().error(
            i18n.global.tc("chooseAtLeastOnePhoto")
        );
        return;
      }
      sendMessage.value.uploadImages(
          otherPhotoList.value,
          (link) => {
            otherPhotoList.value = link;
          },
          ImageUploaderKeys.TICKET
      );
    }

    function findTicket() {
      let model2 = {
        pageId: getSelectedPageId(),
        ticketId: parseInt(route.params.ticketId),
        skip: 0,
        take: BASE_TAKE,
      };
      sendMessage.value.getAllMessages(model2);
    }

    onMounted(() => {
      sendMessage.value.ticketId = route.params.ticketId;
      let model = {
        pageId: getSelectedPageId(),
        ticketId: route.params.ticketId,
      };
      sendMessage.value.GetTicketById(model);
      findTicket();
    });
    return {
      InputOtherImage,
      onFileChange,
      otherPhotoList,
      replyTicket,
      text,
      messageState,
      unitsList,
      sendMessage,
      priority,
    };
  },
};
</script>

<style scoped>
.header-shadow {
  box-shadow: 0px 1px 9px #d0cfcfd4;
}

.add-pic {
  background-color: rgb(193, 225, 229);
  border-radius: 8px;
  position: relative;
}

.hidden {
  position: absolute;
  z-index: 9;
  opacity: 0;
}

.new-ticket {
  position: fixed;
  width: 510px;
  bottom: 4%;
  z-index: 20;
}

@media only screen and (max-width: 500px) {
  .new-ticket {
    width: 100%;
    bottom: 0;
  }
}
</style>
