<template>
  <div>
    <h6 class="header mt-3">{{ $t("employees") }}</h6>
    <div class="d-flex justify-content-center">
      <img alt="" class="header-shape" src="@/assets/img/svg/frameup.svg"/>
    </div>
    <Loading v-if="State.loading"/>
    <div
        v-for="permissions in State.permissionList"
        :key="permissions"
        class="bg-light mt-2 mx-3 mt-4"
    >
      <p class="smart-text-align">{{ permissions.unitId}}</p>
      <div
          v-for="permission in permissions.permissions"
          :key="permission"
          class="
          align-content-center
          justify-content-between
          d-flex
          uper-card-1
          p-2
          py-2
          mb-2
          mx-3
          my-2
          bg-light
        "
      >

        <p class="mr-2 my-auto media-controller w-75 rtl smart-text-align">
          {{ permission.title }}
        </p>
        <div v-if="permission.description" class="my-auto">
          <i
              v-if="permission.description.length != 0"
              class="far fa-question-circle my-auto"
              @click="
              descriptionPermision = permission.description;
              descriptionPermisionDisply = true;
            "
          ></i>
        </div>
        <div class="px-2 py-2 my-auto text-left">
          <div class="switch m-0 my-auto mx-2">
            <input
                :id="permission.permissionId"
                v-model="permission.hasAccess"
                checked
                class="input my-auto mx-2"
                type="checkbox"
                @input="log(permission.hasAccess)"
            />
            <label
                :for="permission.permissionId"
                class="slider my-auto mx-2"
            ></label>
          </div>
        </div>
      </div>
    </div>
  </div>

  <bottomBar>
    <button
        :class="State.disableConfirmBtn ? 'p-disabled' : ''"
        class="btn btn-danger text-light rounded-pill px-5 py-1 submit"
        type="submit"
        @click="applyAccess"
    >
      {{ $t("submit") }}
    </button>
  </bottomBar>

  <Dialog
      v-model:visible="descriptionPermisionDisply"
      :contentStyle="{
      background: 'rgb(255, 255, 255)',
      borderRadius: '4px',
    }"
      :showHeader="false"
      :style="{ padding: '0 !important', border: 'none', width: '350px' }"
      dismissableMask
      header=""
      modal
  >
    <div class="w-100 bg-primary" style="height: 7px"></div>
    <p class="w-100 text-right px-3 my-2">
      <i class="fa fa-times" @click="descriptionPermisionDisply = false"></i>
    </p>
    <div
        class="d-flex flex-column align-items-center justify-content-between m-2"
    >
      <i
          class="mb-3 text-primary fas fa-exclamation-triangle"
          style="font-size: 40px"
      ></i>
      <p class="my-3 text-muted w-100 text-center">
        {{ descriptionPermision }}
      </p>
      <div class="my-3 w-100 text-center">
        <Button
            :label="$t('confirm')"
            class="text-success p-button-succsess p-button-text mx-1 w-100"
            @click="descriptionPermisionDisply = false"
        />
      </div>
    </div>
  </Dialog>
</template>

<script>
import {ref, onMounted} from "vue";
import {EmployeePermission} from "./GetEmployeePermissionState";
import {useRoute} from "vue-router";
import {getSelectedPageId} from "@/core/service/utils.service";
import bottomBar from "@/app/public/shared/bottomBar/BottomBar.vue";
import Loading from "@/app/public/shared/loading/Loading.vue";


export default {
  components: {bottomBar, Loading},
  setup() {
    const State = ref(new EmployeePermission());
    const route = useRoute();
    const staffId = ref(route.params.staffId);
    State.value.mainPageId = ref(route.params.staffId);
    const havePermission = ref();
    const permissionId = ref([]);
    const workPageId = ref(Math.abs(getSelectedPageId()));
    const descriptionPermision = ref("");
    const descriptionPermisionDisply = ref(false);

    function getPermission() {
      State.value.getPermissions(workPageId.value, staffId.value);
    }

    onMounted(() => {
      getPermission();
    });

    function applyAccess() {
      State.value.EmployeeAccess();
    }

    return {
      staffId,
      State,
      havePermission,
      descriptionPermision,
      descriptionPermisionDisply,
      applyAccess,
    };
  },
};
</script>

<style scoped>
.header {
  text-align: center;
  width: 100%;
  position: absolute;
}

.header-shape {
  width: 288px;
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

@media (max-width: 700px) {
  .media-controller {
    font-size: 14px;
  }
}

@media (max-width: 400px) {
  .media-controller {
    font-size: 12px;
  }
}

.submit{
  background-color: #579bfc;
}
</style>
