<template>
  <h6 class="header mt-3">{{ $t("search") }}</h6>
  <div class="d-flex justify-content-center">
    <img alt="" class="header-shape" src="@/assets/img/svg/appbarShape.svg"/>
  </div>
  <loading v-if="State.loading"/>
  <p v-else-if="State.allFollowers == null" class="w-100 text-center mt-5">
    {{ $t("noItem") }}
  </p>
  <div v-else class="p-3 mt-4">
    <div
        v-for="(follower, index) in State.allFollowers"
        :key="index"
        class="d-flex uper-card-1 my-2 p-2 bg-white"
        @click="openDialog(index, follower.pageId)"
    >
      <img
          v-lazy="follower.profileImageUrl + '_sm.webp'"
          class="image-style rounded-circle border"
      />
      <div class="px-2 h-100 py-auto text-right">
        <span>{{ follower.name }} </span>
        <br/>
        <span>{{ follower.username }}</span>
      </div>
      <Dialog
          v-if="followeIndex === index"
          v-model:visible="State.AddEmployee"
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
          <div class="d-flex my-2 p-2">
            <img
                v-lazy="State.allFollowers[followeIndex].profileImageUrl + '_sm.webp'"
                class="image-style rounded-circle border"
            />
            <div class="px-2 h-100 py-auto text-right">
              <span>{{ State.allFollowers[followeIndex].name }} </span>
              <br/>
              <span>{{ State.allFollowers[followeIndex].username }}</span>
            </div>
          </div>
          <hr/>
          <div class="w-100 d-flex justify-content-center position-relative">
            <div
                :class="urlProfile != '' ? 'mb-2 bg-parent' : ''"
                class="px-auto mx-auto add-pic"
            >
              <input
                  ref="InputProfileImage"
                  accept="image/*"
                  class="hidden"
                  type="file"
                  @change="onFileChange($event, 1)"
              />
              <i v-if="urlProfile === ''" class="fa fa-image image-icon"></i>
              <img
                  v-if="urlProfile !== ''"
                  v-lazy="
                  urlProfile === ''
                    ? State.allFollowers[followeIndex].profileImageUrl + '_sm.webp'
                    : urlProfile
                "
                  alt=""
                  class="img-style my-2 mx-auto"
                  srcset=""
                  @click="pushPhoto(1)"
              />
            </div>
          </div>
          <div class="w-100 d-flex align-items-center rtl my-2">
            <span class="w-25 text-right">{{ $t("personal_code") }} </span>
            <input
                v-model="State.personal_code"
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
                type="text"
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
    <loading v-if="State.addEmployeeLoading"/>
  </div>
</template>

<script>
import {ref, onMounted, watch} from "vue";
import {AddEmployeeState} from "./AddEmployeeState";
import {
  convertFileTOBase64,
  getSelectedPageId,
  unitTitleFunc,
} from "../../../../../core/service/utils.service";
import {BASE_TAKE} from "../../../../../core/constant/constant";
import {ProfileUploaderKeys} from "@/core/service/fileUploader.service";
import {ToastService} from "@/core/service/toast.service";
import {i18n} from "@/main";
import Loading from "@/app/public/shared/loading/Loading.vue";
import {number} from "yup/lib/locale";

export default {
  components: {Loading},
  setup() {
    const State = ref(new AddEmployeeState());
    const followeIndex = ref();
    const InputProfileImage = ref();
    const urlProfile = ref("");
    const employeeRole = ref("");
    const followerPAgeId = ref();
    const unitTitle = ref("");
    let personalCodeStore = 0;

    function getFollowers() {
      let model = {
        requestTime: new Date(),
        workPageId: Math.abs(getSelectedPageId()),
        skip: 0,
        take: BASE_TAKE,
      };
      State.value.getFollowers(model);
    }

    onMounted(() => {
      getFollowers();
    });

    function openDialog(id, pageId) {
      followerPAgeId.value = pageId;
      followeIndex.value = id;
      State.value.AddEmployee = !State.value.AddEmployee;
    }

    function onFileChange(e, params) {
      if (e.target.files.length === 0) return;

      if (params === 1) {
        convertFileTOBase64(e.target.files[0], (base64) => {
          urlProfile.value = base64;
        });
      }
    }

    function pushPhoto(params) {
      if (params === 1) {
        InputProfileImage.value.click();
      } else {
        InputProfileImage.value.click();
      }
    }

    watch(
        () => State.value.personal_code,
        (e) => {
          if (e.length == 8) {
            personalCodeStore = State.value.personal_code;
          }
          if (e.length > 8) {
            State.value.personal_code = personalCodeStore;
          }
        }
    );

    function apply() {
      if (urlProfile.value.length == 0) {
        ToastService.getInstance().error(i18n.global.tc("image_is_required"));
        return;
      }
      if (State.value.personal_code.length == 0) {
        ToastService.getInstance().error(
            i18n.global.tc("personalcode is invalid")
        );
        return;
      }
      if (employeeRole.value < 2) {
        ToastService.getInstance().error(i18n.global.tc("roleName too short"));
        return;
      }
      State.value.disableButton = true;
      ToastService.getInstance().warning(i18n.global.tc("adding"));
      State.value.uploadImages(
          urlProfile.value,
          (url) => {
            let model = {
              mainPageId: followerPAgeId.value,
              workPageId: Math.abs(getSelectedPageId()),
              roleName: employeeRole.value,
              imageUrl: url,
              personalCode: State.value.personal_code,
            };
            State.value.addEmployee(model);
          },
          ProfileUploaderKeys.USER
      );
      urlProfile.value = "";
    }

    function refreshDialog() {
      employeeRole.value = "";
      State.value.personal_code = number;
      urlProfile.value = "";
    }

    return {
      InputProfileImage,
      followerPAgeId,
      followeIndex,
      employeeRole,
      urlProfile,
      State,
      refreshDialog,
      onFileChange,
      openDialog,
      pushPhoto,
      apply,
    };
  },
};
</script>

<style scoped>
.image-style {
  width: 55px;
  height: 55px;
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

.img-style {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  z-index: 8;
}

.add-pic {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #fbdadd;
  position: relative;
}

.image-icon {
  position: absolute;
  right: 22%;
  top: 23%;
  font-size: 54px;
  color: #fff;
}

.width0 {
  width: 0;
  height: 0;
}

.submit-btn {
  border-radius: 8px;
  box-shadow: 1px 0 4px #ada5a55e;
  border: 1px solid #c5c0c04d;
  font-size: 14px;
  outline: none !important;
}

.bg-parent {
  background: transparent;
}

.header-title {
  text-align: center;
  width: 100%;
  position: absolute;
}

.header {
  text-align: center;
  width: 100%;
  position: absolute;
}

.header-shape {
  width: 288px;
}
</style>
