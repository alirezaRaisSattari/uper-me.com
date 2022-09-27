<template>
  <Loading v-if="State.getAllEmployeeLoading"/>
  <div v-if="State.allEmployee != null" class="px-3">
    <confirmDialog
        :header="$t('delete')"
        :icon="'fas fa-delete'"
        :status="'danger'"
        :text="$t('deleteEmployeeMessage')"
        :visible="deleteEmployee"
        @accept="removeEmployee"
        @reject="deleteEmployee = false"
        @times="deleteEmployee = false"
    />
    <h6 class="header mt-3 mx-auto">{{ $t("employees") }}</h6>
    <div class="d-flex justify-content-center">
      <img alt="" class="header-shape" src="@/assets/img/svg/appbarShape.svg"/>
    </div>
    <br/>
    <div
        v-for="(employee, index) in State.allEmployee"
        :key="index"
        class="d-flex uper-card-1 my-2 bg-light mt-2"
    >
      <router-link
          :to="'/employee-permission/' + employee.mainPageId"
          class="text-decoration-none text-dark d-flex p-2 w-75"
      >
        <div class="d-flex">
          <img
              :src="
              employee.roleName == 'مدیر'
                ? userDate.profileUrl + '_sm.webp'
                : employee.imageUrl + '_sm.webp'
            "
              class="image-style rounded-circle border"
          />

          <div class="px-2 h-100 py-auto text-right">
            <span class="media-controller"
            >{{ $t("employeeRole") }} : {{ employee.roleName }}</span
            >
            <br/>
            <span class="media-controller"
            >{{ $t("personal_code") }} : {{ employee.personalCode }}</span
            >
          </div>
        </div>
      </router-link>
      <div
          v-if="employee.roleName != 'مدیر'"
          class="px-4 w-25 text-left h-100 my-auto hover-pointer"
          @click="showOptions(employee)"
      >
        <i class="fas fa-ellipsis-v fa-lg"/>
      </div>
      <Dialog
          v-if="employeeId === employee.mainPageId"
          v-model:visible="employeeOptions"
          :breakpoints="{
          '2000px': '30vw',
          '1000px': '40vw',
          '800px': '60vw',
          '600px': '90vw',
        }"
          :contentStyle="{
          background: 'rgb(255, 255, 255)',
          borderRadius: '12px',
        }"
          :showHeader="false"
          :style="{ padding: '10px', border: 'none', width: 'auto' }"
          dismissableMask
          header=""
          modal
      >
        <div class="p-2">
          <div
              class="
              w-100
              text-right
              my-2
              hover-pointer hover-bg-primary
              py-2
              border-radius-10px
            "
              @click="
              State.updateEmployeeDialog = !State.updateEmployeeDialog;
              employeeOptions = false;
            "
          >
            <p class="px-2 py-0 m-0">{{ $t("editEmployee") }}</p>
          </div>
          <div
              class="
              w-100
              text-right
              my-2
              hover-pointer hover-bg-primary
              py-2
              border-radius-10px
            "
              @click="
              deleteEmployee = !deleteEmployee;
              employeeOptions = false;
            "
          >
            <p class="px-2 py-0 m-0">{{ $t("deleteEmployee") }}</p>
          </div>
        </div>
      </Dialog>
      <Dialog
          v-if="employeeId === employee.mainPageId"
          v-model:visible="State.updateEmployeeDialog"
          :breakpoints="{
          '2000px': '30vw',
          '1000px': '40vw',
          '800px': '60vw',
          '600px': '90vw',
        }"
          :contentStyle="{
          background: 'rgb(255, 255, 255)',
          borderRadius: '12px',
        }"
          :showHeader="false"
          :style="{ padding: '10px', border: 'none', width: 'auto' }"
          dismissableMask
          header=""
          modal
          @hide="refreshDialog"
      >
        <div class="p-3 d-flex flex-column">
          <div class="w-100 d-flex justify-content-center position-relative">
            <div
                :class="urlProfile != '' ? 'mb-2 bg-parent' : 'bg-custom'"
                class="px-auto mx-auto add-pic"
            >
              <input
                  v-if="urlProfile == ''"
                  ref="InputProfileImage"
                  accept="image/*"
                  class="hidden"
                  type="file"
                  @change="onFileChange($event, 1)"
              />
              <i v-if="urlProfile === ''" class="fa fa-image image-icon"></i>
              <ratio :ratio="'1/1'">
                <img
                    v-if="urlProfile !== ''"
                    v-lazy="
                    urlProfile === ''
                      ? employee.profileImageUrl + '_sm.webp'
                      : urlProfile
                  "
                    alt=""
                    class="main img-style my-2 mx-auto"
                    srcset=""
                    @click="pushPhoto(1)"
                />
              </ratio>
            </div>
          </div>
          <div class="w-100 d-flex align-items-center rtl my-2">
            <span class="w-25 text-right">{{ $t("personal_code") }} </span>
            <input
                v-model="personal_code"
                :placeholder="$t('personal_code')"
                class="form-control w-75"
                type="number"
            />
          </div>
          <div class="w-100 d-flex align-items-center rtl my-2">
            <span class="w-25 text-right">{{ $t("employeeRole") }} </span>
            <input
                v-model="employeeRole"
                :placeholder="$t('employeeRole')"
                class="form-control w-75"
                maxlength="20"
            />
          </div>
          <div class="w-100 my-2 text-center">
            <button
                :class="State.disableButton ? 'p-disabled' : ''"
                class="mt-3 px-5 py-1 submit-btn"
                @click="apply"
            >
              {{ $t("apply") }}
            </button>
          </div>
        </div>
      </Dialog>
    </div>
    <div class="new-ticket position-fixed mt-5">
      <router-link to="/add-employee">
        <button
            class="
            btn
            rounded-circle
            px-3
            text-light
            bg-warning
            align-items-center
            justify-content-center
            ml-4
            uper-card-1
            float-btn
          "
            style="font-size: 25px"
        >
          +
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import {ref, onMounted, watch} from "vue";
import {employeeState} from "./workPageEmployeeState";
import {
  convertFileTOBase64,
  getSelectedPageData,
  getSelectedPageId,
} from "../../../../../core/service/utils.service";
import ConfirmDialog from "@/app/public/shared/confirmDialog/ConfirmDialog.vue";
import {ToastService} from "../../../../../core/service/toast.service";
import {ProfileUploaderKeys} from "@/core/service/fileUploader.service";
import {i18n} from "@/main";
import Ratio from "@/app/public/shared/ratio/ratio.vue";

export default {
  components: {ConfirmDialog, Ratio},
  setup() {
    const State = ref(new employeeState());
    const employeeOptions = ref(false);
    const InputProfileImage = ref();
    const urlProfile = ref("");
    const employeeId = ref();
    const employeeRole = ref("");
    const personal_code = ref("");
    const userDate = ref(new getSelectedPageData());
    const deleteEmployee = ref(false);
    let personalCodeStore = 0;

    function getEmployee() {
      State.value.getAllEmployee(Math.abs(getSelectedPageId()));
    }

    onMounted(() => {
      getEmployee();
    });

    function showOptions(id) {
      employeeOptions.value = !employeeOptions.value;
      employeeId.value = id.mainPageId;
    }

    function onFileChange(e, params) {
      if (e.target.files.length === 0) return;

      if (params === 1) {
        convertFileTOBase64(e.target.files[0], (base64) => {
          urlProfile.value = base64;
        });
      }
    }

    watch(
        () => personal_code.value,
        (e) => {
          if (e.length == 8) {
            personalCodeStore = personal_code.value;
          }
          if (e.length > 8) {
            personal_code.value = personalCodeStore;
          }
        }
    );

    function apply() {
      if (urlProfile.value.length == 0)
        ToastService.getInstance().warning(
            i18n.global.tc("profileImageNotSelected")
        );
      else if (personal_code.value.length == 0)
        ToastService.getInstance().warning(i18n.global.tc("personal_code"));
      else if (employeeRole.value.length == 0)
        ToastService.getInstance().warning(i18n.global.tc("employeeRole"));
      else {
        State.value.disableButton = true;
        State.value.uploadImages(
            urlProfile.value,
            (url) => {
              let model = {
                mainPageId: employeeId.value,
                workPageId: Math.abs(getSelectedPageId()),
                roleName: employeeRole.value,
                imageUrl: url,
                personalCode: personal_code.value,
              };
              State.value.updateEmployee(model, () => {
                getEmployee();
              });
            },
            ProfileUploaderKeys.USER
        );
        employeeOptions.value = false;
      }
    }

    function refreshDialog() {
      employeeRole.value = "";
      personal_code.value = Number;
      urlProfile.value = "";
    }

    const removeEmployee = () => {
      deleteEmployee.value = false;
      ToastService.getInstance().warning(i18n.global.tc("deleting"));
      let workPageId = Math.abs(getSelectedPageId());
      State.value.deleteEmployee(employeeId.value, workPageId, () => {
        getEmployee();
      });
    };
    return {
      removeEmployee,
      refreshDialog,
      apply,
      onFileChange,
      State,
      employeeOptions,
      showOptions,
      employeeId,
      InputProfileImage,
      urlProfile,
      employeeRole,
      personal_code,
      userDate,
      deleteEmployee,
    };
  },
};
</script>


<style scoped>
.bg-parent {
  background: transparent;
}

.header {
  text-align: center;
  width: 100%;
  z-index: 10;
}

.header-shape {
  top: 0%;
  width: 288px;
  position: absolute;
  z-index: -10;
}

.image-style {
  width: 55px;
  height: 55px;
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

.add-pic {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  position: relative;
}

.bg-custom {
  background: #fbdadd;
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
  /* z-index: 99; */
}

.img-style {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  z-index: 8;
}

.submit-btn {
  border-radius: 8px;
  box-shadow: 1px 0 4px #ada5a55e;
  border: 1px solid #c5c0c04d;
  font-size: 14px;
  outline: none !important;
}

.main {
  z-index: 4;
  position: absolute;
  background-color: white;
  width: 100%;
  height: 100%;
  object-fit: contain;
  box-shadow: 0 0 22px 0.1px rgb(215 215 215);
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
</style>
