<template>
    <div class="slider-innr">
        <a class="slider-pic" @click="navigateToDetails(connection)">
            <figure>
                <img v-if="connection.image.includes('https')" :src="connection.image" alt="" />
                <img v-else src="@/assets/images/no-image-view.png" alt="" />
            </figure>
            <p>{{ connection.title }}</p>
        </a>
    </div>
</template>



<script>
export default {
    name: 'SliderContent',
    props: {
        connection: Object,
        componentType: String,
        sliderType: String
    },
    methods: {
        navigateToDetails(connection) {
            if (connection.type == "tv" || (this.componentType == "tv" && this.sliderType)) {
                this.$router.push({
                    name: 'TvShowsDetails',
                    params: { id: connection.id, pageTitle: connection.title },
                });
            } else if (connection.type == "movie" || (this.componentType == "movie" && this.sliderType)) {
                this.$router.push({
                    name: 'MoviesDetails',
                    params: { id: connection.id, pageTitle: connection.title },
                });
            } else if (connection.type == "webtoons") {
                this.$router.push({
                    name: 'WebtoonsDetail',
                    params: { id: connection.id, pageTitle: connection.title },
                });
            } else if (this.componentType == "people") {
                if (this.connection.title_type == 'tv') {
                    this.$router.push({
                        name: 'TvShowsDetails',
                        params: { id: connection.id, pageTitle: connection.title },
                    });
                }
                else if (this.connection.title_type == 'movie') {
                    this.$router.push({
                        name: 'MoviesDetails',
                        params: { id: connection.id, pageTitle: connection.title },
                    });
                } else {
                    this.$router.push({
                        name: 'WebtoonsDetail',
                        params: { id: connection.id, pageTitle: connection.title },
                    });
                }

            }
        }
    }
}
</script>