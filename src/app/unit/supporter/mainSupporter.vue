<template>
  <div
      class="d-flex h-100 w-100 flex-column align-content-center justify-content-center"
  >
    <p class="w-100 text-right my-2">{{ $t("support") }}</p>
    <ul class="nav-tabs p-0 w-100">
      <li v-for="page in pages" :key="page.text">
        <router-link :to="page.route" class="text-decoration-none">
          <div class="items">
            <span>
              {{ $t(page.text) }}
            </span>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {ref} from "vue";
import {i18n} from "@/main";
import {useRoute} from "vue-router";
import supporterMembers from "@/app/unit/supporter/supporterMembers.vue";

export default {
  name: "mainSupporter",
  components: {
    supporterMembers,
  },
  setup() {
    const route = useRoute();
    const pages = ref([
      {
        text: i18n.global.tc("members"),
        route: "/supporter/members",
      },
      {text: i18n.global.tc("activities"), route: "/supporter/activities"},
      {text: i18n.global.tc("incomes"), route: "/supporter/incomes"},
      {text: i18n.global.tc("awards"), route: "/supporter/reward"},
      {text: i18n.global.tc("sells"), route: "/supporter/sells"},
      {text: i18n.global.tc("purchases"), route: "/supporter/shopping"},
    ]);
    return {pages};
  },
};
</script>

<style lang="scss" scoped>
.router-link-active * {
  background-color: #e3e3e3;
}

.nav-tabs {
  display: flex;
  justify-content: space-between;
  list-style-type: none;
}

li {
  font-size: 15px;
}

.items {
  padding: 10px 3px;
  font-size: 14px;
}

@media screen and (max-width: 450px) {
  .items {
    padding: 5px 0;
    font-size: 12px;
  }
}
</style>