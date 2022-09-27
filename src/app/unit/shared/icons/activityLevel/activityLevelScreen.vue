<template>
  <div class="activity-controller">
    <span>{{ propval ?? activityLevelValue }}</span>
    <img :src="require('@/assets/img/svg/activityLevel.svg')" />
  </div>

</template>

<script lang="ts">
import {ref,onMounted} from 'vue'
import { AccountingRepository } from '@/core/repository/accountingRepository';
import { getSelectedPageId } from '@/core/service/utils.service';
export default {
  props: {
    value: Number,
  },
  setup(props) {
    const activityLevelValue = ref(0);
    const propval = ref(props.value);
    onMounted(() => {
        AccountingRepository.getInstance().CalculateActivityLevel({
            urlContent: {
                pageId:getSelectedPageId()
            },onReceive: (res) => {
                activityLevelValue.value = res;
                
            }
        });
    })
    return {activityLevelValue, propval};
  },
};
</script>

<style lang="scss" scoped>
.activity-controller {
  position: relative;
  img {
    width: 50px;
  }
  span {
    position: absolute;
    top: 6px;
    font-size: 14px;
    width: 100%;
    text-align: center;
    width: 50px;
  }
}
</style>
