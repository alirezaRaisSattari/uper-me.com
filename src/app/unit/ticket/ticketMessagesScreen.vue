<template>
  <div>
    <p class="w-100 p-3 text-right uper-card-1 bg-white">
      {{ $t("messages") }}
    </p>
    <loading v-if="messageState.ticketPropertyloading"/>

    <div
        v-if="messageState.ticketProperty != null"
        class="h-100 relative-div mx-2"
    >
      <p v-if="messageState.isNull" class="w-100 text-center mt-5">
        {{ $t("noItem") }}
      </p>
      <div class="d-flex flex-column mb-5 justify-content-start">
        <p class="w-100 text-right mt-2">
          {{ $t("unit") }}:
          {{ unitsList[messageState.ticketProperty.unitId - 1] }}
        </p>
        <p class="w-100 text-right text bg-ganger mt-2">
          {{ $t("ticketSubject") }} :
          {{ messageState.ticketProperty.subject }}
        </p>
        <p class="w-100 text-right mt-2">
          {{ $t("importanceOfTheTopic") }} :
          {{ priority[messageState.ticketProperty.priority - 1] }}
          <img
              v-if="messageState.ticketProperty.priority === 1"
              alt=""
              class="img-importance mx-1"
              src="@/assets/img/high.svg"
          />
          <img
              v-if="messageState.ticketProperty.priority === 2"
              alt=""
              class="img-importance mx-1"
              src="@/assets/img/medium.svg"
          />
          <img
              v-if="messageState.ticketProperty.priority === 3"
              alt=""
              class="img-importance mx-1"
              src="@/assets/img/low.svg"
          />
        </p>
        <div
            v-for="message in messageState.messages"
            :key="message"
            class="d-flex flex-column card uper-card-1 p-2 mb-4"
        >
          <div
              class="
              d-flex
              justify-content-between
              align-items-center
              border-bottom
              pb-2
            "
          >
            <div>
              <img
                  v-lazy="message.pageDetail.profileImageUrl + '_sm.webp'"
                  alt="profile"
                  class="imgstyle"
              />
              <span class="pr-2"> {{ message.pageDetail.name }}</span>
            </div>
            <span class="col p-0">
              {{ changeDate.convertToJalali(message.createdAt, false) }}
            </span>
          </div>
          <p class="w-100 text-right mb-0">
            {{ message.text }}
          </p>
          <div
              class="w-100 mt-1 d-flex align-items-center justify-content-start"
          >
            <img
                v-for="image in message.fileUrls"
                :key="image"
                v-lazy="image"
                alt="profile"
                class="imgstyle ml-2"
            />
          </div>
        </div>
      </div>
      <loading v-if="messageState.closeTicketLoading"/>

      <div v-else class="">
        <div class="footer d-flex justify-content-center py-0">
          <router-link
              :to="'/ticket/addmessages/' + ticketId"
              class="text-dark btn btn-light uper-card-1 mx-4 my-2 px-4"
          >
            {{ $t("addMessage") }}
          </router-link>
          <button
              class="btn btn-light mx-4 my-2 uper-card-1"
              @click="closeTicket()"
          >
            {{ $t("closeTheTicket") }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <div>
    <loading v-if="messageState.messageLoading"/>
  </div>
</template>

<script>
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import {getTicketsMessages} from "./ticketMessagesState";
import {BASE_TAKE} from "@/core/constant/constant";
import {
  getSelectedPageId,
  windowScrolledToBottom,
} from "@/core/service/utils.service";
import {DateService} from "@/core/service/date.service";
import {i18n} from "@/main";

export default {
  name: "messages",
  setup() {
    const route = useRoute();
    const ticketId = ref(route.params.ticketId);
    const changeDate = ref(new DateService());
    const messageState = ref(new getTicketsMessages());
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

    function allMessages() {
      let model = {
        pageId: getSelectedPageId(),
        ticketId: ticketId.value,
        skip: 0,
        take: BASE_TAKE,
      };
      messageState.value.getAllMessages(model);
    }

    onMounted(() => {
      let model = {
        pageId: getSelectedPageId(),
        ticketId: ticketId.value,
      };
      messageState.value.GetTicketById(model);
      allMessages();
      windowScrolledToBottom(() => {
        allMessages();
      });
    });

    function closeTicket() {
      messageState.value.closeTicket(
          getSelectedPageId(),
          route.params.ticketId
      );
    }

    return {
      messageState,
      changeDate,
      ticketId,
      closeTicket,
      unitsList,
      priority,
    };
  },
};
</script>

<style scoped>
.imgstyle {
  height: 43px;
  width: 43px;
  border-radius: 10px;
}

.footer {
  width: 50%;
  position: fixed;
  bottom: 2%;
  right: 27%;
  z-index: 20;
}

.relative-div {
  position: relative;
}

@media only screen and (max-width: 500px) {
  .footer {
    width: 100%;
    right: 0;
  }
}
</style>
