<template>
  <div class="mypage-left">
    <div class="flex-wr">
      <div v-if="profilePic" class="image-innr">
        <figure><img :src="profilePic" alt="" /></figure>
      </div>
      <div v-else class="image-innr">
        <figure><img src="@/assets/images/no-image-view.png" alt="" /></figure>
      </div>
      <div class="text-innr">
        <p class="usname">{{ name }}</p>
        <!-- <span class="lv">{{ userLevel }}</span> -->
        <!-- <div class="points">
          <p>
            <span><img src="@/assets/icons/point.svg" alt="" /></span> {{ userPoints }}
            {{ $t("activity.leftSidePannel.Points") }}
          </p>
        </div> -->
      </div>
    </div>
    <div class="leftpanel-dropdown">
      <a
        class="dropdown-toggle"
        :class="{ contentactive: active }"
        @click="active = !active"
        :aria-pressed="active ? 'true' : 'false'"
      >
        <span><img src="@/assets/icons/icon-activity.svg" alt="" /></span>
        {{ $t("activity.activity") }}
      </a>
      <ul class="mypage-list">
        <!-- <li class="active">
                    <a @click="$router.push('/my-page/activity')" :class="{ contentactive: active }">
                        <span><img src="@/assets/icons/icon-activity.svg" alt="" /></span>
                        {{ $t("activity.activity") }}
                    </a>
                </li> -->
        <!-- <li>
                    <a @click="$router.push('/my-page/message')">
                        <span><img src="@/assets/icons/icon-message.svg" alt="" /></span>
                        {{ $t("activity.leftSidePannel.Messages") }}
                    </a>
                </li> -->
        <li :class="$route.name == 'MyPageCommunication' ? 'active' : ''">
          <a
            @click="$router.push('/my-page/communication')"
            :class="{ contentactive: active }"
          >
            <span
              ><img src="@/assets/icons/icon-communication.svg" alt=""
            /></span>
            {{ $t("activity.leftSidePannel.Communications") }}
          </a>
        </li>
        <li :class="$route.name == 'MyPageLists' ? 'active' : ''">
          <a @click="$router.push('/my-page/lists')">
            <span><img src="@/assets/icons/icon-list.svg" alt="" /></span>
            {{ $t("activity.leftSidePannel.Lists") }}
          </a>
        </li>
        <!-- <li>
                    <a @click="$router.push('/my-page/media')">
                        <span><img src="@/assets/icons/icon-media.svg" alt="" /></span>
                        {{ $t("activity.leftSidePannel.Media") }}
                    </a>
                </li> -->
        <li :class="$route.name == 'MyPageSettings' ? 'active' : ''">
          <a @click="$router.push('/my-page/settings')">
            <span><img src="@/assets/icons/icon-settings.svg" alt="" /></span>
            {{ $t("activity.leftSidePannel.Settings") }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "@vue/runtime-core";
import MyPageService from "@/services/MyPageService.js";
const active = ref(false);
const name = ref("");
const profilePic = ref("");
const userLevel = ref(0);
const userPoints = ref(0);
onMounted(() => {
  getUserInfo();
});
const getUserInfo = () => {
  MyPageService.getUserInfo()
    .then((res) => {
      if (res.status == 200) {
        name.value = res.data.result.user_name;
        profilePic.value = res.data.result.profile_pic;
        userLevel.value = res.data.result.user_level;
        userPoints.value = res.data.result.user_points;
      }
    })
    .catch((err) => {
      return;
    });
};
</script>
