<template>
    <section class="about-us privacy">
        <div class="container">
            <div class="about-content page-not-found">
                <h2 style="margin-bottom: 15px;">Oopps!</h2>
                <h3 style="margin-bottom: 5px;font-weight: bold;">{{ $t("pagenotFound.paragraph") }}</h3>
                <p>{{ $t("pagenotFound.description") }}</p>
                <button @click="$router.push('/')" style="color: #C32D2C;">{{ $t("pagenotFound.goHome") }}</button>
            </div>
        </div>
    </section>
</template>
  
<script>
export default {
    name: "PageNotfound"
};
</script>

<style scoped>
.page-not-found {
    text-align: center;
}
</style>
  