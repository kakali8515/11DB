<template>
    <section class="mypage-sec">
        <div class="container">
            <div class="mypage-wrapper">
                <LeftSidePanel />
                <div class="mypage-rght">
                    <h2 class="flex"><a href="#">
                        <img src="@/assets/icons/left-arrow-icon.svg" class="dark-th" alt="" />
                        <img src="@/assets/icons/left-arrow-icon-blk.svg" class="light-th" alt="" />
                    </a>Messages</h2>
                    <div class="message-list border-rd">
                        <div class="message-list-item">
                            <div class="admin-left">
                                <div class="admin-name">
                                    <span>
                                        <img src="@/assets/icons/user.svg" class="dark-th" alt="" />
                                        <img src="@/assets/icons/user-icon-gray.svg" class="light-th" alt="" />
                                    </span>
                                    <h4>Admin name</h4>
                                </div>
                                <div class="admin-txt">
                                    <div class="admin-right mbl-blk">
                                        <div class="date">
                                            <span>June 10. 2021 </span>
                                            <span>11:00</span>
                                        </div>
                                    </div>
                                    <p class="gray"> Message Text Message Text Message Text Message Text Message Text Message Text Message Text </p>
                                </div>
                            </div>
                            <div class="admin-right">
                                <div class="date mbl-none">
                                    <span>June 10. 2021 </span>
                                    <span>11:00</span>
                                </div>
                                <a href="#" class="delete">
                                    <img src="@/assets/icons/delete.svg" class="dark-th" alt="" />
                                    <img src="@/assets/icons/delete-blk.svg" class="light-th" alt="" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="dtl-box">
                        <span>Dr. Romance</span>
                        <h4>Escape : Mogadishu</h4>
                        <p>Your edit on “movie title” was rejected.Your edit on “movie title” was rejected.Your edit on “movie title” was rejected.Your edit on “movie title” was rejected.Your edit on “movie title” was rejected.Your edit on “movie title” was rejected.</p>
                    </div>
                    <div class="message-list">
                        <div class="message-list-item br">
                            <div class="flex-innr">
                                <div class="admin-left">
                                    <div class="admin-name">
                                        <span>
                                            <img src="@/assets/icons/user.svg" class="dark-th" alt="" />
                                            <img src="@/assets/icons/user-icon-gray.svg" class="light-th" alt="" />
                                        </span>
                                        <h4>Admin name</h4>
                                    </div>
                                    <div class="admin-txt">
                                        <div class="admin-right mbl-blk">
                                        <div class="date">
                                            <span>June 10. 2021 </span>
                                            <span>11:00</span>
                                        </div>
                                    </div>
                                        <p class="gray"> Message Text Message Text Message Text Message Text Message Text Message Text Message Text </p>
                                    </div>
                                </div>
                                <div class="admin-right">
                                    <div class="date mr-0 mbl-none">
                                        <span>June 10. 2021 </span>
                                        <span>11:00</span>
                                    </div>
                                </div>
                            </div>
                            <div class="send-box">
                                <div class="send-box-input">
                                    <input type="text" placeholder="Reason for Rejection" />
                                </div>
                                <input type="submit" value="Send" class="btn orange-btn" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import LeftSidePanel from "@/components/MyPage/LeftSidePanel.vue";   
export default {
  name: 'MyPageMessageDetails',
  components: {
    LeftSidePanel
  }
};
</script>