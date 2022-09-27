<template>
  <Dialog v-model:visible="loginState.showSessionDialog" :breakpoints="{ '440px': '100vw' }" :contentStyle="{'border-radius':'10px','height':'500px' ,  'width':'100%','max-width':'512px'}" :dismissableMask="true" :modal="true" :position="'bottom'" :showHeader="false" :style="{width: '100%', 'max-width':'512px','border-radius':'10px'}">
    <Header :title="$t('yourPreviousMeetings')" />
     <div class="session-list-controller">
          <div class="session-item" v-for="item in loginState.sessionList" :key="item">
              <div class="child">
                  <span :class="item.deviceName.length > 50 ? 'two-Line':null">{{item.deviceName}}</span>
              </div>
              <div class="child">
                  <span>{{$filters.jalali(item.createDate)}}</span>
                  <Button @click="loginState.deleteSession(item)" icon="pi pi-trash" class="p-button-rounded p-button-text p-button-plain" />
              </div>
          </div>
          <loading v-if="loginState.loading"/>
      </div>
  </Dialog>
  <div id="dcba" class="d-flex flex-column align-items-center justify-content-center h-auto">
    <Form v-slot="{ errors }" :validation-schema="loginSchema" class="w-100" @submit="onSubmitLogin">
      <div class=" d-flex flex-column align-items-center justify-content-center h-auto">
        <h4 class="mt-5">{{ $t("login") }}</h4>
        <div class=" w-75 d-flex flex-column rounded-container p-2 mt-5 div-of-input">
          <div class="d-flex mx-1 py-2 main-input-holder">
            <i class="far fa-user icon"></i>
            <Field id="userdata" :placeholder="$t('enterUsernameOrMobileNumber')" class="px-2 input-style w-100"
              name="userData" type="text" />
          </div>
          <div class="d-flex mx-1 py-2">
            <i class="fas fa-lock icon"></i>
            <div class="d-flex align-content-center justify-content-between w-100">
              <Field id="password" :placeholder="$t('enterPassword')" :type="showPassword ? 'text' : 'password'"
                class="w-100 px-2 input-style" name="password" />
              <i class="fas fa-eye my-auto hover-pointer" @click="showPassword = !showPassword"></i>
            </div>
          </div>
        </div>
        <div class="text-danger text-sm">{{ errors.userData }}</div>
        <div class="text-danger text-sm">{{ errors.password }}</div>

        <Button :label="$t('login')" :loading="loading" class=" w-50 btn mt-2 rounded-pill py-1 color-light bg-success text-light mt-5 border-noun " type="submit" />
        <router-link class=" text-decoration-none text-dark mt-4 hover-pointer hover-bg-primary rounded-pill py-1 px-2 " to="/register">
          {{ $t("register") }}
        </router-link>
        <router-link class=" text-decoration-none text-dark mt-2 hover-pointer hover-bg-primary rounded-pill py-1 px-2" to="/forget-password">
          {{ $t("didYouForgetYourPassword") }}
        </router-link>
      </div>
    </Form>
  </div>
  <div id="abcd"></div>
</template>
<script lang="ts">
import {computed, defineComponent, ref} from "vue";
import {Field, Form} from "vee-validate";
import * as Yup from "yup";
import {i18n} from "@/main";
import {LoginModel, SessionModel} from "@/data/auth/login.model";
import router from "@/core/router/router";
import {LoginState} from "@/app/unit/auth/login/LoginState";
import {genMAC, toEnglishDigits} from "@/core/service/utils.service";
import Header from "@/app/unit/shared/headerApp/headerAppScreen.vue";
export default defineComponent({
  name: "loginScreen",
  components: {
    Form,
    Field,
    Header
  },
  setup() {
    let showPassword = ref(false);
    const loginState = ref(new LoginState());
    const loading = computed(() => loginState.value.loading);
    const loginSchema = Yup.object().shape({
      password: Yup.string()
          .test(
              "len",
              i18n.global.tc("passwordInvalidatin", {
                min: 4,
                max: 14,
              }),
              (val) => val.length >= 4 && val.length <= 14
          )
          .default(""),
      userData: Yup.string()
          .test(
              "len",
              i18n.global.tc("userNameInvalidatin", {
                min: 4,
                max: 40,
              }),
              (val) => val.length >= 4 && val.length <= 40
          )
          .default(""),
    });

    function onSubmitLogin(values) {
      let model = {} as LoginModel;
      if (isNaN(Number(values.userData))) {
        model.username = values.userData.toLowerCase();
      } else {
        model.mobileNumber = values.userData;
      }

      model.password = values.password;
      model.session = {} as SessionModel;
      model.session.deviceType = 2;
      model.session.deviceName = window.navigator.userAgent.slice(0, 248);
      model.session.fireBaseToken = genMAC();
      model.session.serialNumber = genMAC();

      loginState.value.login(model);
    }

    function navigateToSignUp() {
      router.push("/register");
    }

    function navigateToForgetPassword() {
      router.push("/forget-password");
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //     const resize = () => {
    //       let x = document.getElementsByTagName("body")[0]
    //       if (x.offsetHeight <= window.innerHeight + 5) {
    //         alert("Vertical Scrollbar is off! D:");
    //       }
    //     };
    //     window.onresize = resize;

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function scrollbarVisible(element) {
      return element.scrollHeight > element.clientHeight;
    }

    return {
      showPassword,
      window,
      loginState,
      loading,
      loginSchema,
      onSubmitLogin,
      navigateToSignUp,
      navigateToForgetPassword,
    };
  },
});
</script>
<style lang="scss" scoped>
.rounded-container {
  border-radius: 20px;
  background: #fff;
}

.main-input-holder {
  border: none;
  border-bottom: 1px solid black;
}

.input-style {
  border: none;
  outline: none;
  box-shadow: none;
}

.border-noun {
  border: none !important;
}

:focus {
  outline: none;
}

body[dir="rtl"] .icon {
  padding: 5px 10px;
  font-size: 23px;
  border-left: 1px solid black;
}

body[dir="ltr"] .icon {
  padding: 5px 10px;
  font-size: 23px;
  border-right: 1px solid black;
}

.session-list-controller {
        display: flex;
        flex-direction: column;
        padding: 10px 5px;
        margin-top: 30px;
        .session-item {
            display: flex;
            flex-direction: column;
            margin-bottom: 8px;
            box-shadow: 0 0 5px #b5b5b5;
            border-radius: 8px;
            padding: 5px;

            .child {
                display: flex;
                flex-direction: row;
                width: 100%;
                align-items: center;
               

                span {
                    display: block ;
                    overflow: hidden ;
                    text-overflow: ellipsis ;
                    font-size: 14px;
                    color: #212121;
                   
                }
                &:last-child {
                    justify-content: space-between;
                    span {
                        color: #686868;
                        font-size: 13px;
                    }
                }
            }

        }
    }

</style>
