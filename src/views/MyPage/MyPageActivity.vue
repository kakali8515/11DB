<template>
    <section class="mypage-sec">
        <div class="container">
            <div class="mypage-wrapper">
                <LeftSidePanel />
                <div class="mypage-rght">
                    <h2>{{ $t("activity.activity") }}</h2>
                    <div class="tab-outr full-wd five">
                        <TabWrapper>
                            <Tabs title="All (10)">
                                <p class="act-hdr">Jun 04,2022</p>
                                <ActivityCard />
                                <ActivityCardTwo />
                                <p class="act-hdr">Jun 01,2022</p>
                                <ActivityCardThree />
                                <!-- <div class="activity-box mb-8">
                                    <div class="act-box-top">
                                        <h4>Yumi’s cells <span>Jun 20, 2022 </span></h4>
                                        <span class="tag">TV Show</span>
                                    </div>
                                    <div class="approved-inn">
                                        <span class="text-lft">Approved</span>
                                        <span class="text-rg">+ 300 P</span>
                                    </div>
                                    <div class="approved-txt-otr">
                                        <h5>Text</h5>
                                        <div class="approved-txt-input">
                                            <div class="symbol">
                                                <span>-</span>
                                            </div>
                                            <p>TextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextText</p>
                                        </div>
                                    </div>
                                    <div class="approved-txt-otr">
                                        <h5>Text</h5>
                                        <div class="approved-txt-input">
                                            <div class="symbol">
                                                <span>-</span>
                                            </div>
                                            <p>TextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextText</p>
                                        </div>
                                    </div>
                                    <p class="wtg">Waiting</p>
                                    <div class="approved-txt-otr">
                                        <h5>Image</h5>
                                        <div class="approved-txt-input">
                                            <div class="symbol">
                                                <span>+</span>
                                            </div>
                                            <p>dlksjdlg39487.jpg</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="activity-box mb-30">
                                    <div class="act-box-top">
                                        <h4>Kim Jung-young <span>Jun 20, 2022 </span></h4>
                                        <span class="tag light">Movie</span>
                                    </div>
                                    <div class="approved-inn">
                                        <span class="text-lft">Approved</span>
                                        <span class="text-rg">+ 300 P</span>
                                    </div>
                                    <div class="approved-txt-otr">
                                        <h5>Text</h5>
                                        <div class="approved-txt-input">
                                            <div class="symbol">
                                                <span>-</span>
                                            </div>
                                            <p>TextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextText</p>
                                        </div>
                                    </div>
                                    <div class="approved-txt-otr">
                                        <h5>Text</h5>
                                        <div class="approved-txt-input">
                                            <div class="symbol">
                                                <span>+</span>
                                            </div>
                                            <p>TextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextText</p>
                                        </div>
                                    </div>
                                    <div class="approved-inn pt-10">
                                        <span class="text-lft">Approved</span>
                                        <span class="text-rg">+ 500 P</span>
                                    </div>
                                    <div class="approved-txt-otr">
                                        <h5>Text</h5>
                                        <div class="approved-txt-input">
                                            <div class="symbol">
                                                <span>+</span>
                                            </div>
                                            <p>TextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextText</p>
                                        </div>
                                    </div>
                                </div> -->
                                
                                <!-- <div class="activity-box">
                                    <div class="act-box-top">
                                        <h4>Yumi’s cells <span>Jun 20, 2022 </span></h4>
                                        <span class="tag light">Webtoons</span>
                                    </div>
                                    <p class="wtg">Rejected</p>
                                    <div class="approved-txt-otr">
                                        <h5>Poster</h5>
                                        <div class="approved-txt-input">
                                            <div class="symbol">
                                                <span>+</span>
                                            </div>
                                            <p>sldkgln3350485.jpg</p>
                                        </div>
                                    </div>
                                    <p class="wtg">Waiting</p>
                                    <div class="approved-txt-otr">
                                        <h5>Video</h5>
                                        <div class="approved-txt-input">
                                            <div class="symbol">
                                                <span>+</span>
                                            </div>
                                            <p>http://dgsdgoiwnlegn.com</p>
                                        </div>
                                    </div>
                                </div> -->
                            </Tabs>
                            <Tabs :title="$t('activity.tab.Movies')">
                                <ActivityCard />
                            </Tabs>
                            <Tabs :title="$t('activity.tab.TVShows')">
                                <ActivityCardTwo />
                            </Tabs>
                            <Tabs :title="$t('activity.tab.Webtoons')">
                                <ActivityCardThree />
                            </Tabs>
                            <Tabs :title="$t('activity.tab.People')">
                                <ActivityCard />
                            </Tabs>
                        </TabWrapper>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import TabWrapper from "@/components/TabWrapper.vue";
import Tabs from "@/components/Tabs.vue";
import LeftSidePanel from "@/components/MyPage/LeftSidePanel.vue";
import ActivityCard from "@/components/MyPage/ActivityCard.vue";
import ActivityCardTwo from "@/components/MyPage/ActivityCardTwo.vue";
import ActivityCardThree from "@/components/MyPage/ActivityCardThree.vue";

export default {
  name: 'MyPageActivity',   
  components: {
    Tabs,
    TabWrapper,
    LeftSidePanel,
    ActivityCard,
    ActivityCardTwo,
    ActivityCardThree
}
};
</script>