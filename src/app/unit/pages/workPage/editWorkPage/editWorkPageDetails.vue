<template>
  <div class="d-flex flex-column align-items-center p-2 main-card w-100 mt-4">
    <p class="w-100 text-right">{{ $t("bio") }}</p>
    <Textarea
      v-model="state.bioTxt"
      :autoResize="true"
      :placeholder="$t('bio')"
      class="form-control mt-2"
    ></Textarea>
    <button
      :class="
        state.bioTxt === getSelectedPageData().bio || state.loading
          ? 'p-disabled'
          : ''
      "
      class="btn w-100 mt-2 btn-color text-dark"
      @click="updateBio"
    >
      {{ $t("submit") }}
    </button>
  </div>
  <div class="d-flex flex-column align-items-center p-2 main-card w-100 mt-4">
    <p class="w-100 text-right">{{ $t("pageType") }}</p>
    <div class="w-100 d-flex justify-content-between px-2 mt-3">
      <span class="text-secondary"> {{ $t("pageType") }}</span>
      <div class="d-flex align-items-center">
        <span class="mx-1">{{ $t("public") }}</span>
        <div class="switch">
          <input
            id="index"
            v-model="state.pageType"
            checked
            class="input"
            type="checkbox"
          />
          <label class="slider" for="index"></label>
        </div>
      </div>
    </div>
    <button
      class="btn w-100 mt-2 btn-color text-dark"
      @click="publicStatusFunc"
      :class="
        state.pageType == getSelectedPageData().isPublic || state.loading
          ? 'p-disabled'
          : ''
      "
    >
      {{ $t("submit") }}
    </button>
  </div>
  <div class="d-flex flex-column align-items-center p-2 main-card w-100 mt-4">
    <p class="w-100 text-right">{{ $t("flowing-status") }}</p>
    <div class="w-100 mt-2 px-2">
      <div class="w-100 d-flex justify-content-between align-items-center">
        <span class="mx-1">{{ $t("showFollowers") }}</span>
        <div class="switch">
          <input
            id="flowersState"
            v-model="state.showFollower"
            checked
            class="input"
            type="checkbox"
          />
          <label class="slider" for="flowersState"></label>
        </div>
      </div>
    </div>
    <div class="w-100 mt-2 px-2">
      <div class="w-100 d-flex justify-content-between align-items-center">
        <span class="mx-1">{{ $t("showFollowings") }}</span>
        <div class="switch">
          <input
            id="flowingState"
            v-model="state.showFollowing"
            checked
            class="input"
            type="checkbox"
          />
          <label class="slider" for="flowingState"></label>
        </div>
      </div>
    </div>
    <div class="w-100" @click="followDisableFunc">
      <button
        class="btn w-100 mt-2 btn-color text-dark"
        @click="followStatusFunc"
        :class="
          (state.showFollowing == getSelectedPageData().showFollowing &&
            state.showFollower == getSelectedPageData().showFollower) ||
          state.loading
            ? 'p-disabled'
            : ''
        "
      >
        {{ $t("submit") }}
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { editWorkPageDetailsState } from "./editWorkPageDetailsState";
import Textarea from "primevue/textarea";
import { getSelectedPageData } from "@/core/service/utils.service";

export default {
  components: { Textarea },
  setup() {
    const state = ref(new editWorkPageDetailsState());
    const updateBio = () => {
      state.value.UpdateBio();
    };
    const publicStatusFunc = () => {
      state.value.UpdateFollowInfo();
    };
    const followStatusFunc = () => {
      state.value.UpdateFollowInfo();
    };
    return {
      state,
      updateBio,
      publicStatusFunc,
      followStatusFunc,
      getSelectedPageData,
    };
  },
};
</script>

<style scoped>
.main-card {
  background: rgb(249 249 249);
  box-shadow: 0 0 3px 1px rgba(180, 180, 180, 0.66);
  border-radius: 8px;
}
::v-deep(.p-inputtextarea) {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem !important;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da !important;
  border-radius: 0.25rem !important;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.hidden {
  opacity: 0;
  z-index: 9;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  position: absolute;
  right: 0;
  top: 0;
}

.image-icon {
  position: absolute;
  right: 22%;
  top: 23%;
  font-size: 54px;
  color: #fff;
}

.main-card {
  background: rgb(249 249 249);
  box-shadow: 0 0 3px 1px rgba(180, 180, 180, 0.66);
  border-radius: 8px;
}

.btn-color {
  background: #7262ab;
  color: #fff !important;
}

.switch {
  display: block;
  margin-top: 24px;
}

.switch .slider {
  position: relative;
  display: inline-block;
  height: 11px;
  width: 32px;
  border-radius: 8px;
  cursor: pointer;
  background: #c5c5c5;
  transition: all 0.2s ease;
}

.switch .slider:after {
  background: #eeeeee;
  position: absolute;
  left: -8px;
  top: -8px;
  display: block;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  content: "";
  transition: all 0.2s ease;
}

.switch label {
  margin-right: 7px;
}

.switch .input {
  display: none;
}

.switch .input ~ .label {
  margin-left: 8px;
}

.switch .input:checked ~ .slider:after {
  left: 16px;
}

.switch .input:checked ~ .slider {
  background: #c1e1e5;
}

.switch .input:checked ~ .slider:after {
  background: #74bdc6;
}
</style>
