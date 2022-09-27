<template>
  <div class="container p-0">
    <div id="div-main" class="card p-0">
      <div class="d-flex justify-content-between mb-3 p-0">
        <div class="col-3 p-3 d-flex justify-content-sm-start">
          <img
              alt="profile"
              class="rounded-circle profile-img"
              src="https://picsum.photos/512/512/"
          />
          <div class="div-img">
            <img alt="" class="svg-img img" src="@/assets/img/ic_crown_golden.svg"/>
          </div>
        </div>
        <div class="col-6 p-0 d-flex justify-content-center">
          <img alt="" class="svg-img" src="@/assets/img/appbarShape.svg"/>
          <div class="fontSizeLarge div-comment">
            <span>ثبت نظر</span>
          </div>
        </div>
        <div class="col-3 p-0 pt-3">
          <div class="col-12">
            <span class="overflow-text">مهدی عنبر سوز</span>
          </div>
          <div id="font-username" class="col-12 overflow-text">mahdihayper</div>
        </div>
      </div>
      <div class="d-flex justify-content-center align-items-end fontSizeSmall">
        <span>ثبت امتیاز به صورت اختصاصی</span>
        <i class="fas fa-chevron-down px-2"></i>
      </div>
      <div class="justify-content-center mb-4">
        <div class="mt-2 row justify-content-center">
          <label>{{ $t("good") }}</label>
        </div>
        <Slider v-model.number="value" class="custom-slider mx-3"/>
        <div class="mt-4 row justify-content-center">
          <label class="">{{ $t("middle") }}</label>
        </div>
        <Slider v-model.number="value" class="custom-slider mx-3"/>
        <div class="mt-4 row justify-content-center">
          <label>{{ $t("weak") }}</label>
        </div>
        <Slider v-model.number="value" class="custom-slider mx-3"/>
        <div class="mt-4 row justify-content-center">
          <label>{{ $t("excellent") }}</label>
        </div>
        <Slider v-model.number="value" class="custom-slider mx-3"/>
        <div class="mt-4 row justify-content-center">
          <label>{{ $t("corking") }}</label>
        </div>
        <Slider v-model.number="value" class="custom-slider mx-3"/>
      </div>
      <div class="d-flex text-center px-4 fontSizeSmall">
        <div class="col border rounded-right py-2 p-0 active">
          <div>
            <i class="far fa-smile icon-large"></i>
          </div>
          <span>{{ $t("suggest") }}</span>
        </div>
        <div class="col border py-2 p-0 div-ractive">
          <div>
            <i class="far fa-meh icon-large"></i>
          </div>
          <span>{{ $t("noIdea") }}</span>
        </div>
        <div class="col border py-2 p-0 div-ractive">
          <div>
            <i class="far fa-frown icon-large"></i>
          </div>
          <span>{{ $t("notSuggest") }}</span>
        </div>
        <div class="col border rounded-left py-2 p-0 div-ractive">
          <div>
            <i class="fas fa-question icon-large"></i>
          </div>
          <span>{{ $t("haveQuestion") }}</span>
        </div>
      </div>
      <div class="m-3">
        <input
            :placeholder="$t('yourComment')"
            class="form-control fontSize-placholder"
            type="text"
        />
      </div>
      <div class="mx-3 text-center">
        <div class="m-2 fontSizeLarge">
          <span>{{ $t("positivePoints") }}</span>
        </div>
        <div class="input-group rounded">
          <input
              :placeholder="$t('yourComment')"
              class="form-control rounded fontSize-placholder"
              type="text"
          />
          <div class="mx-1 div-ractive">
            <div class="btn border rounded" type="button">
              <i class="fas fa-plus"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="m-3 text-center">
        <div class="m-2 fontSizeLarge">
          <span>{{ $t("negativePoints") }}</span>
        </div>
        <div class="input-group rounded">
          <input
              :placeholder="$t('yourComment')"
              class="form-control rounded fontSize-placholder"
              type="text"
          />
          <div class="mx-1 div-ractive">
            <div class="btn border rounded" type="button">
              <i class="fas fa-plus"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="mx-3">
        <div class="input-group-prepend rounded">
          <input
              :placeholder="$t('yourComment')"
              class="form-control rounded fontSize-placholder"
              type="text"
          />
          <div class="mx-1">
            <div class="btn border rounded div-ractive" type="button">
              <i class="far fa-trash-alt"></i>
            </div>
          </div>
        </div>
      </div>
      <div id="footer" class="d-flex justify-content-center mt-5">
        <div class="btn rounded-pill btn-comment-save">{{ $t("addComment") }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import {ref} from "vue";
import Slider from "primevue/slider";

export default {
  name: "PageComment",
  components: {
    Slider,
  },
  setup() {
    const value = ref(30);
    return {value};
  },
};
</script>

<style scoped>
.profile-img {
  width: 50px;
  height: 50px;
}

.div-comment {
  position: absolute;
  top: 9px;
}

.div-img {
  position: relative;
  top: 20px;
  left: 18px;
}

.img {
  position: absolute;
  width: 20px;
  height: 20px;
}

#div-main {
  font-size: 14px;
}

#footer {
  background-color: #fbdadd;
  border-radius: 30px 30px 0 0;
  box-shadow: 0 -5px 10px -5px #333;
}

.btn-comment-save {
  background-color: #f15b67;
  color: white;
  font-size: 14px;
  padding: 5px 20px 5px 20px;
  margin: 15px;
}

.div-ractive {
  background-color: #eeeeee;
}

.fontSize-placholder {
  font-size: 12px;
  padding: 18px 5px;
}

.fontSizeLarge {
  font-size: 16px;
  font-weight: 600x;
}

.fontSizeSmall {
  font-size: 12px;
}

.icon-large {
  font-size: 30px;
  padding-bottom: 10px;
}

.active {
  background-color: #ffa000;
}

#font-username {
  font-size: 12px;
  color: #bdbdbd;
}

.overflow-text {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.svg-img {
  height: 42px;
}

.svg-img {
  height: 42px;
}
</style>
