<template>
    <section class="mypage-sec">
        <div class="container">
            <div class="mypage-wrapper">
                <LeftSidePanel />
                <div class="mypage-rght">
                    <h2>Messages</h2>
                    <ul class="message-list">
                        <li>
                            <MessageCardOne />
                        </li>
                        <li>
                            <MessageCardOne />
                        </li>
                        <li>
                            <MessageCardOne />
                        </li>
                        <li>
                            <MessageCardTwo />
                        </li>
                        <li>
                            <MessageCardThree />
                        </li>
                        <li>
                            <MessageCardThree />
                        </li>
                        <li>
                            <MessageCardThree />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>


<script>
import LeftSidePanel from "@/components/MyPage/LeftSidePanel.vue";
import MessageCardOne from "@/components/MyPage/MessageCardOne.vue";
import MessageCardTwo from "@/components/MyPage/MessageCardTwo.vue";
import MessageCardThree from "@/components/MyPage/MessageCardThree.vue";
export default {
  name: 'MyPageMessage',  
  components: {
    LeftSidePanel,
    MessageCardOne,
    MessageCardTwo,
    MessageCardThree
}
};
</script>

