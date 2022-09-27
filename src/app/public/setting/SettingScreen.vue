<template>
  <div class="col-12">
    <confirmDialog :header="$t('logOut')" :icon="'fa fa-exclamation-triangle'" :text="$t('log-out-of-your-account')"
      :visible="openConfirmDialog" @accept="logOut" @reject="openConfirmDialog = false"
      @times="openConfirmDialog = false" />
    <div class="login-box-controller">
      <div class="profile" v-if="isLogin">
        <div class="side">
          <div class="child">
             <img  :src="profile.profileUrl + '_sm.webp'" class="profile-login">
          </div>
          <div class="child">
            <span>{{profile.name}}</span>
            <span>{{profile.username}}</span>
          </div>
        </div>
        <div class="side reverse-direction">
          <img :src="require('@/assets/img/exit user.svg')" @click="openConfirmDialog = !openConfirmDialog" class="hover-pointer exit-user">
        </div>
      </div>
      <div class="login-menu-controller editPersonalInformation" v-if="showMenu">
         <Accordion class="accordion-custom" >
            <AccordionTab v-if="isLogin">
                <template #header>
                  <div class="accordion-head"  @click="router.push('/page/edit/:username')">
                    <span>{{$t("editPersonalInformation")}}</span>
                    <i class="uprofile"></i>
                  </div>
                </template>
            </AccordionTab>
            <AccordionTab>
                <template #header>
                  <div class="accordion-head"  >
                    <span>{{$t("language")}}</span>
                    <i class="ulanguage"></i>
                  </div>
                </template>
                  <div class="list-accordion">
                    <div class="item-accordion p-ripple" v-ripple>
                      <span>فارسی</span>
                      <RadioButton value="fa" @change="change" v-model="currentLanguage" />
                    </div>
                    <div class="item-accordion p-ripple" v-ripple>
                      <span>English</span>
                      <RadioButton value="en" @change="change" v-model="currentLanguage" />
                    </div>
                  </div>
            </AccordionTab>
            <AccordionTab v-if="isLogin">
                <template #header>
                   <div class="accordion-head"  >
                    <span>{{$t("security")}}</span>
                    <i class="usecurity"></i>
                  </div>
                </template>
                <div class="list-accordion">
                  <div class="item-accordion p-ripple" v-ripple @click="$function.goTo('/setting/change-password')">
                      <span>{{$t('password')}}</span>
                      <i class="upassword"></i>
                  </div>
                  <div class="item-accordion p-ripple" v-ripple @click="$function.goTo('/setting/Change-security-question')">
                      <span>{{$t('securityQuestion')}}</span>
                      <i class="uquestion-security"></i>
                  </div>
                  <div class="item-accordion p-ripple" @click="$function.goTo('/setting/session')" v-ripple>
                      <span>{{$t('activeSession')}}</span>
                      <i class="umobile"></i>
                  </div>
                </div>
            </AccordionTab>
        </Accordion>
        <div class="invite-friends">

        </div>

        <div class="row p-3 text-center align-items-center justify-content-center">
          <p class="text-center">Uper web application {{versionOfBuilt}}:Beta</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {changeAppDirection, getLanguageFromCache, getMainPageData, getSelectedPageData, isLoggedIn} from "@/core/service/utils.service";
import {i18n} from "@/main";
import {computed, defineComponent, onMounted, ref, watch} from "vue";
import {SettingState} from "./SettingState";
import {ToastService} from "@/core/service/toast.service";
import confirmDialog from "@/app/public/shared/confirmDialog/ConfirmDialog.vue";
import editMainPage from "@/app/unit/pages/mainPage/edit/EditMainPageScreen.vue";
import router from '@/core/router/router';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Ripple from 'primevue/ripple';
import RadioButton from 'primevue/radiobutton';
import {Constant} from "@/core/constant/constant";

export default defineComponent({
  directives: {
    'ripple': Ripple
  },
  name: "SettingScreen",
  components: {
    confirmDialog,
    editMainPage,
    Accordion,
    AccordionTab,
    RadioButton
  },
  setup() {
    let currentLanguage = ref("");
    const settingState = ref(new SettingState());
    const openConfirmDialog = ref(false);
    const profile =  ref(getMainPageData())
    const showMenu = ref(true);
    const isLogin = ref(false);
    const versionOfBuilt = ref(Constant.VERSION_OF_BUILT_PRODUCTION)
    function change(event: any) {
      i18n.global.locale = event.target.value;
      changeAppDirection(currentLanguage.value);
      window.location.reload();
    }

    function logOut() {
      settingState.value.logout(() => {
        ToastService.getInstance().success(
            i18n.global.tc("missionAccomplished")
        );
        location.reload();

      });
      openConfirmDialog.value = false;
    }

    onMounted(() => {
      currentLanguage.value = getLanguageFromCache();
      if (!profile.value) return isLogin.value = false;
        else isLogin.value = true;
    });


    return {
      currentLanguage,
      change,
      logOut,
      settingState,
      openConfirmDialog,
      profile,
      router,
      showMenu,  
      isLogin,
      versionOfBuilt
    };
  },
});
</script>
<style lang="scss">
.login-box-controller {
  display: flex;
  flex-direction: column;
  padding: 10px;
  justify-content: flex-start;
  .profile {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .side {
      display: flex;
      flex-direction: row;
      width: 50%;
      align-items: center;
      justify-content: flex-start;
      &:last-child {
        direction: ltr;
        img {
          width: 25px;
        }
      }
      .child {
        display: flex;
        flex-direction: column;
        img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
        }

        span {
          padding: 0 10px;
          font-size: 16px;
          text-align: center;
          color:#212121;
          &:last-child {
            font-size: 14px;
            margin-top: 5px;
            color:#404040;
          }
        }
      }
    }
  }
}
.accordion-head {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    span {
      font-size: 15px;
      margin:0 .8rem;
      position: relative;
      top: 2px;
      display: flex;
      align-items: center;
    }
}
.list-accordion {
  display: flex;
  flex-direction: column;
  .item-accordion {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    cursor: pointer;
    transition: .6s;
    padding: 10px;
    &:hover {
      background: #eee;

    }
    span {
      margin: 0 .8rem ;
    }
  }
}

.invite-friends {
  display: flex;

}

</style>

