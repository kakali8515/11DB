<template>
    <div class="search-left">
        <ul>
            <li v-for="(menu,index) in searchMenuList.menu_list" :key="index"
                :class="this.search.state.searchSideMenu.search_type.toLowerCase() == menu.menu_name.toLowerCase() ? 'active' : ''"
                @click="test">
                <a href="#">{{menu.menu_name}} </a>
                <span>{{menu.result_count}}</span>
            </li>
        </ul>
    </div>
</template>


<script>
export default {
    name: 'SearchLeftPanel',
    props: ['menuList'],
    inject: ["search"],
    data() {
        return {
            searchMenuList: this.search.state.searchSideMenu
        }
    },
    watch: {
        "search.state.searchSideMenu": function (n, o) {
            if (n && n != o) {
                this.searchMenuList = this.search.state.searchSideMenu
            }
        },
    },
    methods:{
        test(){

        }
    },
}
</script>