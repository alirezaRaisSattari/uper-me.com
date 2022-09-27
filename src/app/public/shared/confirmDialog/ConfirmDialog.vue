<template>
  <Dialog
      v-model:visible="showDialog"
      :contentStyle="{background: 'rgb(255, 255, 255)',borderRadius: '4px',}"
      :showHeader="false"
      :style="{ padding: '0 !important', border: 'none', width: '350px' }"
      dismissableMask
      header=""
      modal
      @close="visible=false"
  >
    <div :class="getCssClass(1)" class="w-100" style="height: 7px"></div>
    <p class="w-100 text-right px-3 my-2">
      <i class="fa fa-times hover-pointer" @click="times"></i>
    </p>
    <div class="d-flex flex-column align-items-center justify-content-between m-2">
      <i :class="getCssClass(2)" class="mb-2 text-primary" style="font-size: 40px"></i>
      <h4 class="my-3">{{ header }}</h4>
      <p class="my-3 text-muted w-100 text-center" :style="{'font-size':textSize}">
        {{ text }}
      </p>
      <div class="my-3 w-100 d-flex justify-content-center">
        <Button :label="acceptLabel" class="text-success p-button-text mx-1" @click="accept"/>
        <Button v-if="showReject" :label="$t('no')" class="p-button-danger p-button-text mx-1" @click="reject"/>
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts">
import {ref, watch} from "vue";
import {i18n} from '@/main';

export default {
  name: "confirmDialog",
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    header: {
      type: String,
      required: false,
    },
    text: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: false,
    },
    showReject: {
      type: Boolean,
      required: false,
      default: true
    },
    acceptLabel: {
      type: String,
      required: false,
      default: i18n.global.tc('yes')
    },
    textSize: {
      type: String,
      required: false,
      default: '15px'
    },
  },
  emits: ["accept", "reject", "times"],
  setup(props, {emit}) {

    const showDialog = ref(false);
    const statusClass = ref("primary");
    switch (props.status) {
      case "success":
        statusClass.value = "success";
        break;
      case "danger":
        statusClass.value = "danger";
        break;
      case "warning":
        statusClass.value = "warning";
        break;

      default:
        break;
    }
    const accept = () => {
      emit("accept");
    };
    const reject = () => {
      emit("reject");
    };

    const times = () => {
      emit("times");
    };

    function getCssClass(type) {
      return type == 1 ?
          "bg-" + statusClass.value :
          props.icon + " " + "text-" + statusClass.value;
    }

    watch(
        () => props.visible,
        (value) => {
          showDialog.value = value;
        }
    );

    watch(
        () => showDialog.value,
        (value) => {
          if (!showDialog.value) {
            setTimeout(() => {
              emit("times");
            }, 300);
          }
        }
    );

    watch(
        () => showDialog.value,
        (e) => {
          if (!showDialog.value) {
            setTimeout(() => {
              emit("times");
            }, 300);
          }
        }
    );


    return {
      accept,
      reject,
      statusClass,
      getCssClass,
      times,
      showDialog
    };
  },
};
</script>

<style scoped>
</style>
