<template>
  <div class="container">
    <div class="d-flex justify-content-around align-content-center">
      <div
          v-for="(page, index) in pages"
          :key="page.text"
          :class="index == selectedUnit ? 'border-botton' : ''"
          class="tiket-nav nav-item w-50"
      >
        <div>
          <p
              class="items text-center mx-auto my-2"
              @click="selectUnitFunc(page, index)"
          >
            {{ $t(page.text) }}
          </p>
        </div>
      </div>
    </div>
    <div class="w-100 d-flex justify-content-center">
      <div class="w-75">
        <select
            v-model="ticketPriority"
            class="form-control border-radius-22 px-2 my-3"
            @change="changeUnit"
        >
          <option
              v-for="units in unitsList"
              :key="units.key"
              :value="units.key"
              class="my-2"
          >
          {{ units.title }}
          </option>
        </select>
      </div>
    </div>
    <div class="d-flex flex-column mb-5 pb-5">
      <loading v-if="allTickets.loadingTickets"/>

      <p v-if="allTickets.allTickets.length === 0" class="w-100 text-center mt-5">
        {{ $t("noItem") }}
      </p>

      <div
          v-else
          v-for="ticket in allTickets.allTickets"
          :key="ticketScreen"
          class="d-flex flex-column bg-light card uper-card-1 mt-3 px-2"
      >
        <router-link
            :to="
            ticketScreen.activeStatus == 2
              ? ``
              : `/ticket/messages/${ticketScreen.ticketId}`
          "
            class="text-decoration-none text-dark"
        >
          <p class="w-100 my-1 d-flex justify-content-between px-2">
            <span>{{ Priority[ticketScreen.priority - 1] }}</span>
            <span>{{ unitsList[ticketScreen.unitId].title }}</span>
          </p>
          <p class="w-100 my-1 px-2 text-right">
            {{ changeDate.convertToJalali(ticketScreen.createDate, false) }}
          </p>
          <p class="w-100 my-1 px-2 text-right">{{ ticketScreen.subject }}</p>
          <p class="w-100 my-1 d-flex justify-content-between px-2">
            <span>{{ $t("status") }}</span>
            <span
                :class="ticketScreen.activeStatus == 2 ? 'text-danger' : 'text-dark'"
            >{{ TicketActiveStatus[ticketScreen.activeStatus].title }}</span
            >
          </p>
        </router-link>
      </div>
    </div>

    <router-link :to="allTickets.openNum < 3 ? '/ticket/create' : ''">
      <div class="float-btn hover-pointer d-flex justify-content-center">
        <i class="my-auto fa fa-plus"></i>
      </div>
    </router-link>
  </div>
</template>

<script>
import {onMounted, onUnmounted, ref, watch} from "vue";
import {i18n} from "@/main";
import supporterMembers from "@/app/unit/supporter/supporterMembers.vue";
import createticket from "@/app/unit/ticket/createTicketScreen.vue";
import router from "@/core/router/router";
import {getTickets} from "./ticketState.ts";
import {PageStore} from "@/core/store/page.store";
import {BASE_TAKE} from "@/core/constant/constant";
import {DateService} from "@/core/service/date.service";

import {windowScrolledToBottom} from "@/core/service/utils.service";

export default {
  name: "ticket",
  components: {
    supporterMembers,
    createticket,
  },
  setup() {
    const allTickets = ref(new getTickets());
    const changeDate = ref(new DateService());
    const ticketPriority = ref(null);
    const activeStatus = ref(null);
    const selectedUnit = ref(0);
    const ticketStatus = ref([
      i18n.global.tc("needToCheck"),
      i18n.global.tc("checking"),
      i18n.global.tc("done"),
      i18n.global.tc("needToEdit"),
    ]);
    const Priority = ref([
      i18n.global.tc("veryImportant"),
      i18n.global.tc("mediumImportance"),
      i18n.global.tc("lowImportance"),
    ]);
    const pages = ref([
      {
        key: 1,
        text: i18n.global.tc("ticket"),
        route: "/ticket",
      },
      {
        key: 2,
        text: i18n.global.tc("notifications"),
        route: "/ticket/messages",
      },
    ]);
    const unitsList = ref([
      {
        key: null,
        title: i18n.global.tc("all"),
        icon: "uticet"
      },
      {
        key: 1,
        title: i18n.global.tc("userUnit"),
        icon: "ut-users"
      },
      {
        key: 2,
        title: i18n.global.tc("productUnit"),
        icon: "ut-product"
      },
      {
        key: 3,
        title: i18n.global.tc("postUnit"),
        icon: "ut-post"
      },
      {
        key: 4,
        title: i18n.global.tc("invoiceUnit"),
        icon: "0xe80c"
      },
      {
        key: 5,
        title: i18n.global.tc("financialUnit"),
        icon: "ut-mall"
      },
      {
        key: 5,
        title: i18n.global.tc("financialUnit"),
        icon: "ut-accounting"
      },
      {
        key: 6,
        title: i18n.global.tc("deliveryUnit"),
        icon: "ut-delivery"
      },
      {
        key: 7,
        title: i18n.global.tc("storyUnit"),
        icon: "ut-story"
      },
      {
        key: 8,
        title: i18n.global.tc("MLUnit"),
        icon: "ut-voice-assistant"
      },
      {
        key: 9,
        title: i18n.global.tc("settingUnit"),
        icon: "ut-settings"
      },
      {
        key: 10,
        title: i18n.global.tc("AgencyUnit"),
        icon: "ut-ticket"
      },
      {
        key: 11,
        title: i18n.global.tc("TicketUnit"),
        icon: "ut-ticket"
      },
      {
        key: 12,
        title: i18n.global.tc("productCommentUnit"),
        icon: "ut-representation"
      },
    ]);
    const TicketActiveStatus = ref([
      {key: null, title: i18n.global.tc("all")},
      {
        key: 1,
        title: i18n.global.tc("checking"),
      },
      {
        key: 2,
        title: i18n.global.tc("closedByUser"),
      },
      {
        key: 3,
        title: i18n.global.tc("closedByTheOperator"),
      },
    ]);

    function getAllTickets() {
      let ticketModel = {
        requestTime: new Date(),
        pageId: PageStore().selectedPageId,
        unitType: ticketPriority.value,
        activeStatus: activeStatus.value,
        skip: 0,
        take: BASE_TAKE,
      };
      allTickets.value.getTicket(ticketModel);
    }

    const createtick = () => {
      router.push("/ticket/create");
    };
    onMounted(() => {
      getAllTickets();
      windowScrolledToBottom(() => {
        getAllTickets();
      });
    });

    function changeUnit() {
      allTickets.value.loadingTickets = false;
      allTickets.value.ticketsIsFinished = false;
      allTickets.value.skipNum = 0;
      allTickets.value.allTickets = [];
      getAllTickets();
    }

    onUnmounted(() => {
      window.addEventListener(
          "scroll",
          function (event) {
            event.stopImmediatePropagation();
          },
          true
      );
    });

    const selectUnitFunc = (Unit, Index) => {
      selectedUnit.value = Index;
      router.push(Unit.route);
    };

    return {
      pages,
      changeUnit,
      selectedUnit,
      selectUnitFunc,
      createtick,
      allTickets,
      unitsList,
      TicketActiveStatus,
      ticketPriority,
      activeStatus,
      ticketStatus,
      Priority,
      changeDate,
    };
  },
};
</script>

<style scoped>
.router-link-active {
  color: rgba(0, 0, 0, 0.9) !important;
}

.border-botton {
  border-bottom: 2px solid black;
}

.items {
  font-size: 17px;
  color: #000;
}

.new-ticket {
  width: 510px;
  bottom: 3%;
  z-index: 20;
}

@media only screen and (max-width: 500px) {
  .new-ticket {
    width: 95%;
  }
}

.border-radius-22 {
  border-radius: 22px;
}

</style>
