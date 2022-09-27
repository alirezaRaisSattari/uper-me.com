<template>
  <div class="d-flex justify-content-between">
    <div>
      <p class="smart-text-align font-weight-bold mt-3">{{ names["fa"] }}</p>
      <p class="smart-text-align font-weight-light small mt-1">
        {{ names["area"] }}
      </p>
      <p class="smart-text-align font-weight-light small mt-1">
        {{ names["en"] }}
      </p>
    </div>
    <div>
      <activity-level-screen :value="activityOffCodePercent" v-if="activityOffCodePercent && getExpireStatus()" />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import activityLevelScreen from "@/app/unit/shared/icons/activityLevel/activityLevelScreen.vue";
import {DataFormatterService} from "@/core/service/dataFormater.service";

export default {
  components: { activityLevelScreen },
  props: {
    activityOffCodePercent: Number,
    activityOffCodePercentExpired: Number,
    persianName: String,
    englishName: String,
    areaName: String,
  },
  setup(props) {
    const names = ref({
      fa: props.persianName,
      en: props.englishName,
      area: props.areaName,
    });

    function getExpireStatus() {
      return !!DataFormatterService.getInstance().expireDate(props.activityOffCodePercentExpired);
    }
    return {
      names,
      getExpireStatus
    };
  },
};
</script>
<style scoped>
p {
  padding: 0;
  margin: 0;
  font-size: 14px;
}
</style>
