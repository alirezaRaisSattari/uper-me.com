<template>
  <div class="container p-0">
    <div id="blocklist" class="mx-auto p-1">
      <div id="title" class=" d-flex align-items-center">
        <img
            id="profailImag"
            v-lazy="sorcePage.profileUrl + '_sm.webp'"
            alt="profile"
            class="rounded-circle my-1"
        />
        <div class="col">
          <div class="row">
            <div class="col-12  d-flex justify-content-start ">
              <span id="username">{{ sorcePage.name }}</span>
            </div>
            <div class="col-12  d-flex justify-content-start">
              <span>{{ sorcePage.username }}</span>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-end p-3 ">
          <span>کاربران مسدود شده</span>
        </div>
      </div>
      <div>
        <loading v-if="mainPageBlockListState.loading"></loading>
      </div>
      <div class="text-center mt-5">
       <span v-if=" mainPageBlockListState.users.length == 0 && mainPageBlockListState.loading== false ">
        مخاطب بلاک شده وجود ندارد 
        </span></div>
      <div
          v-for="(user, index) in mainPageBlockListState.users"
          id="contain"
          :key="user.pageId"
          class="m-2 d-flex align-items-center ">

        <div class=" d-flex justify-content-center  ">
          <img
              id="profailImag"
              v-lazy="user.profileImageUrl + '_sm.webp'"
              alt="profile"
              class="rounded-circle my-1"
          />
        </div>
        <div class="col">
          <div class="row">
            <div class="col-12 d-flex justify-content-start">
              <span id="username">{{ user.name }}</span>
            </div>
            <div class="col-12 d-flex justify-content-start">
              <span>{{ user.username }}</span>
            </div>
          </div>
        </div>
        <div class=" d-flex justify-content-end p-2 ">
          <loading
              v-if="mainPageBlockListState.loadinUnBlock && mainPageBlockListState.selectedPageId==user.pageId"></loading>
          <Button v-if="!(mainPageBlockListState.loadinUnBlock && mainPageBlockListState.selectedPageId==user.pageId)"
                  id="block-btn"
                  class="p-button-rounded p-button-secondary"
                  @click="unBlockUser(index, user.pageId)">
            رفع مسدودیت
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import Button from "primevue/button";
import {getSelectedPageData} from '@/core/service/utils.service';

export default {
  name: "blockUser",
  components: {
    Button,
  },
  setup() {
    const sorcePage = ref({})
    const workPageBlockListState = ref(new WorkPageBlockListState())
    // let instance = axios.create({
    //   headers: {
    //     Authorization:
    //       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJTZXNzaW9uSWQiOiI1MTEiLCJNYWluUGFnZUlkIjoiMyIsIlBvc3QiOiIyLzQvMjAyMSA2OjI0OjMyIEFNIiwiUHJvZHVjdCI6IjIvNC8yMDIxIDY6MjQ6MzIgQU0iLCJTdG9yeSI6IjIvNC8yMDIxIDY6MjQ6MzIgQU0iLCJDb21tZW50IjoiMi80LzIwMjEgNjoyNDozMiBBTSIsIlJlcG9ydCI6IjIvNC8yMDIxIDY6MjQ6MzIgQU0iLCJDYXJnbyI6IjIvNC8yMDIxIDY6MjQ6MzIgQU0iLCJDaGF0IjoiMi80LzIwMjEgNjoyNDozMiBBTSIsIkNvbXBsYWludCI6IjIvNC8yMDIxIDY6MjQ6MzIgQU0iLCJTaG9wcGluZ0NhcnQiOiIyLzQvMjAyMSA2OjI0OjMyIEFNIiwiTGlrZSI6IjIvNC8yMDIxIDY6MjQ6MzIgQU0iLCJGb2xsb3ciOiIyLzQvMjAyMSA2OjI0OjMyIEFNIiwiZXhwIjoxNjIwODU0MzY2LCJpc3MiOiJVcGVyIiwiYXVkIjoiVXBlciJ9.8y-RTboNcGiCLcHN4wyyN6u5wMelmk1jSxiypWZZ2PM",
    //     "set-cookie":
    //       "oxdZBjVA/jYh3KdYnnFpNDigZ89Jvheru901ROan2pbSyhWwH1C0A/rPksub3YlU5E9M3zRWFkkV08jaQBPrP8H8ReFR3Hn5fo+DwFLDG8w=",
    //     "Content-Type": "application/json",
    //   },
    // });

    onMounted(() => {
      sorcePage.value = (getSelectedPageData());
      mainPageBlockListState.value.getBlockList()
    })

    function unBlockUser(index, pageId) {
      workPageBlockListState.loadinUnBlock = true
      var check = confirm("آیا حذف این مخاطب از لیست مسدود شدگان را تایید می کنید؟");
      if (check == 1) {
        workPageBlockListState.value.unblockUser(index, pageId)
      }
    }

    // function getUsers() {
    //   instance
    //     .get(
    //       "http://api.follow.upermall.ir/api/v1/follow/Block/GetMyBlockList/3"
    //     )
    //     .then(function (response) {
    //       users.value = response.data.payload;
    //       loading.value = false;
    //     })
    //     .catch(function (error) {
    //     });
    // }
    // getUsers();

    return {
      sorcePage,
      unBlockUser,
      workPageBlockListState,
    };
  },
};
</script>

<style scoped>
#profailImag {
  width: 50px;
  height: 50px;
}

#block-btn {
  border: 2px solid #ececec;
  background-color: #ffff;
  color: #050505 !important;
  font-size: 12px;
}

#blocklist {
  padding: 3px;
}

#contain {
  border: 1px solid #9b9b97;
  border-radius: 1em;
  padding-right: 10px;
}

#title {
  box-shadow: 2px 5px 5px #e6e5e1;
  margin-bottom: 10px;
  border-radius: 1em;
  padding-right: 10px;
}

#username {
  font-weight: 700;
}
</style>



