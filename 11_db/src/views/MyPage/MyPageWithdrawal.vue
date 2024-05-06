<template>
  <div class="my-accout-otr">
    <div class="large-container">
      <div class="my-accout-box">
        <h2 class="delete">{{ $t("myPage.withdrawl.header") }}</h2>
        <p>{{ $t("myPage.withdrawl.subText") }}</p>
        <ul>
          <li>{{ $t("myPage.withdrawl.subText1") }}</li>
          <li>{{ $t("myPage.withdrawl.subText2") }}</li>
          <li>{{ $t("myPage.withdrawl.subText3") }}</li>
        </ul>
        <div class="login-wrap p-o">
          <div class="form-box box">
            <form>
              <div class="form-group mb-0">
                <label>{{ $t("myPage.withdrawl.reason") }}</label>
                <textarea
                  v-model="reason"
                  :placeholder="$t('myPage.withdrawl.reasonText')"
                  class="form-control"
                ></textarea>
              </div>
              <div class="btn-otr">
                <div class="btn-innr">
                  <a href="#" class="btn outline red" @click="deleteAccount">{{
                    $t("button.delete")
                  }}</a>
                </div>
                <div class="btn-innr">
                  <a
                    @click="$router.push(`/my-page/settings`)"
                    class="btn solid orange-btn"
                    >{{ $t("button.cancel") }}</a
                  >
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MyPageService from "@/services/MyPageService.js";
import { useRoute, useRouter } from "vue-router";
import { ref } from "@vue/runtime-core";
import { useCookies } from "vue3-cookies";
const reason = ref("");
const route = useRoute();
const router = useRouter();
const { cookies } = useCookies();

const userName = localStorage.getItem("uname");
const deleteAccount = () => {
  let data = {
    user_id: localStorage.getItem("uid"),
    reason: reason.value,
  };

  MyPageService.accountWithdrawal(data)
    .then((res) => {
      if (res.status == 200) {
        logOut();
      }
    })
    .catch((err) => {
      return;
    });
};
// log out
const logOut = () => {
  cookies.set("lastLoggedinUser", userName);
  let storedTheme = localStorage.getItem("theme-colour");
  let my_cookie_value = cookies.get("userCookie");
  localStorage.clear();
  localStorage.setItem("theme-colour", storedTheme);
  cookies.set("userCookie", my_cookie_value);
  localStorage.setItem("redirectPath", route.fullPath);
  window.location.href = "/login";
};
</script>
