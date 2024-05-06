<template>
    <section class="mypage-sec">
        <div class="container">
            <div class="mypage-wrapper">
                <LeftSidePanel />
                <div class="mypage-rght">
                    <h2>Communications</h2>
                    <div class="tab-outr full-wd four">
                        <TabWrapper>
                            <Tabs title="Commnets (6)">
                                <!-- start no data -->
                                <div class="no-data">
                                    <p>No Data</p>
                                </div>
                                <!-- end no data -->

                            </Tabs>
                            <Tabs title="Trivia (6)">
                                <!-- start no data -->
                                <div class="no-data">
                                    <p>No Data</p>
                                </div>
                                <!-- end no data -->
                            </Tabs>
                            <Tabs title="Famous Line (6)">
                                 <!-- start no data -->
                                 <div class="no-data">
                                    <p>No Data</p>
                                </div>
                                <!-- end no data -->
                            </Tabs>
                            <Tabs title="Goofs (6)">
                                 <!-- start no data -->
                                 <div class="no-data">
                                    <p>No Data</p>
                                </div>
                                <!-- end no data -->
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

export default {
  name: 'MyPageCommunicationNoData',  
  components: {
    Tabs,
    TabWrapper,
    LeftSidePanel
  }
};
</script>
