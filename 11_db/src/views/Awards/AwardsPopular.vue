<template>
    <section class="award-popular">
        <div class="container">
            <h2>{{ $t('header.subMenu.AllEvents') }}</h2>
            <div class="awards-list" v-if="awardList.length > 0">
                <AwardsCard v-for="(item, index) in awardList" :award="item" :key="index"
                    :RedirectLink="`/awards/detail/${item.id}`" />
            </div>
            <p v-if="isData && awardList.length == 0" class="list-no-data">
                {{ $t("searchResults.noData") }}
            </p>
            <div v-if="isLoading"></div>
            <div ref="bottom"></div>
        </div>
    </section>
</template>


<script setup>
import AwardsCard from '@/components/AwardsCard.vue';
import { onMounted, ref, watch } from "@vue/runtime-core";
import AwardServices from "@/services/AwardServices.js";
import { inject } from "vue";

const awardList = ref([]);
const page = ref(1);
const limit = ref(20);
const observer = ref(null);
const isLoading = ref(false);
const bottom = ref(null);
const date = ref(new Date().toJSON().slice(0, 10).replace(/-/g, '-'));
const common = inject("common");
const isData = ref(false)

watch(
    () => common.state.SelectedLang,
    function (newVal, oldVal) {
        if (newVal && oldVal && newVal != oldVal) {
            page.value = 1;
            isData.value = false;
            awardList.value = [];
            getAwardList();
        }
    }
);

onMounted(() => {
    localStorage.removeItem("site_language");
    localStorage.removeItem("draft_ids");
    localStorage.removeItem("saveIdList");
    observeWindow();
});

const observeWindow = () => {
    observer.value = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting && !isLoading.value) {
                getAwardList();
            }
        },
        { threshold: 0 }
    );
    observer.value.observe(bottom.value);
};

// award info
const getAwardList = () => {
    isLoading.value = true;
    let data = {
        page: page.value,
        limit: limit.value,
        date: date.value,
    };
    AwardServices.getAllAwardList(data)
        .then((res) => {
            if (res.status == 200) {
                isData.value = true;
                awardList.value = [...awardList.value, ...res.data.result];
                if (res.data.total_records > awardList.value.length) {
                    page.value = page.value + 1;
                    isLoading.value = false;
                }
            }
        })
        .catch((err) => {
            console.log(err)
            return;
        });
};

</script>