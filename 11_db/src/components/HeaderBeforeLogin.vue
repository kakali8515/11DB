<template>
    <header>
        <div class="container">
            <div class="header-main">
                <div class="left-side">
                    <a href="javascript:void(0);">
                        <img src="@/assets/images/red-logo.svg" alt="logo-red">
                    </a>
                </div>
                <div class="right-side">
                    <div class="menu-links" :class="{ 'menuopen': ismenuOpen }">
                        <ul class="main-menu">
                            <li class="menu-item" 
                            v-for="(item, index) of menuData" 
                            :key="index"
                            >
                                <a href="javascript:void(0);"  class="head-link toggle">{{item.label}}</a>
                                <ul class="sub-menu dropdown-menu">
                                    <li v-for="(submenu, index) in item.subMenu" :key="index"><a href="javascript:void(0);">{{submenu.label}}</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div class="menu-details">
                        <div class="add-more">
                            <a href="javascript:void(0);" class="toggle">
                                <img src="@/assets/icons/white-plus.svg" alt="plus" class="white-image">
                                <img src="@/assets/icons/black-plus.svg" alt="plus" class="red-image">
                            </a>
                            <div class="link dropdown-menu fl">
                                <a href="javascript:void(0);">Add New Movie</a>
                                <a href="javascript:void(0);">Add New TV Show</a>
                                <a href="javascript:void(0);">Add New Webtoon</a>
                                <a href="javascript:void(0);">Add New People</a>
                            </div>
                        </div>
                        <div class="search">
                            <a href="javascript:void(0);" class="toggle">
                                <img src="@/assets/icons/white-search.svg" alt="search" class="white-image">
                                <img src="@/assets/icons/black-search.svg" alt="search" class="red-image">
                            </a>
                            <div class="link dropdown-search dropdown-menu">
                                <div class="container">
                                    <form action="#" class="search-form">
                                        <input type="search" placeholder="Search for a movie,tv show,person..."
                                            v-on:click.stop="doThis">
                                        <a href="#"><img src="@/assets/icons/red-close.svg" alt="close"></a>
                                    </form>
                                    <ul>
                                        <li><a href="javascript:void(0);"><span>Tom</span> & Jerry</a></li>
                                        <li><a href="javascript:void(0);"><span>Tom</span>as</a></li>
                                        <li><a href="javascript:void(0);"><span>Tomas</span>as Ledin</a></li>
                                        <li><a href="javascript:void(0);"><span>Tom</span>as Ledin : Just Do!</a></li>
                                        <li><a href="javascript:void(0);"><span>Tom</span>as Arane</a></li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="dropdown-lang">
                            <a href="javascript:void(0);" class="drop-text toggle">ENG
                                <img src="@/assets/icons/down-arrow-white.svg" alt="search" class="white-image">
                                <img src="@/assets/icons/down-arrow-black.svg" alt="search" class="red-image">
                            </a>
                            <div class="link link-lang dropdown-menu">
                                <a href="javascript:void(0);">ENG</a>
                                <a href="javascript:void(0);">KOR</a>
                            </div>
                        </div>
                        <div class="dropdown-profile">
                            <a class="login-link" href="javascript:void(0);">Login</a>
                        </div>
                        <a href="#" class="mob-menu" v-on:click="menuOpen"><img src="../assets/icons/mobile-menu.svg" alt="menu"></a>
                    </div>
                </div>

            </div>
        </div>
    </header>
</template>
<script>

export default {
    name: "HeaderBeforeLogin",
    data() {
        return {
            ismenuOpen: false,
            menuData: [
                {
                    label: 'Movies',
                    label_ko: '영화 산업',
                    name: 'Movies',
                    access_type: 'read',
                    subMenu: [
                        {
                            label: 'Popular',
                            label_ko: '인기 있는',
                            name: 'Popular',
                            access_type: 'none',
                        },
                        {
                            label: 'Newest',
                            label_ko: '최신',
                            name: 'Newest',
                            access_type: 'none',
                        },
                        {
                            label: 'Upcoming',
                            label_ko: '다가오는',
                            name: 'Upcoming',
                            access_type: 'none',
                        },
                        {
                            label: 'Top Rated',
                            label_ko: '최고 등급',
                            name: 'TopRated',
                            access_type: 'none',
                        }
                    ]
                },
                {
                    label: 'TV Shows',
                    label_ko: 'TV 프로그램',
                    name: 'TVShows',
                    access_type: 'read',
                    subMenu: [
                        {
                            label: 'Popular',
                            label_ko: '인기 있는',
                            name: 'Popular',
                            access_type: 'none',
                        },
                        {
                            label: 'Newest',
                            label_ko: '최신',
                            name: 'Newest',
                            access_type: 'none',
                        },
                        {
                            label: 'Upcoming',
                            label_ko: '다가오는',
                            name: 'Upcoming',
                            access_type: 'none',
                        },
                        {
                            label: 'Top Rated',
                            label_ko: '최고 등급',
                            name: 'TopRated',
                            access_type: 'none',
                        }
                    ]
                },
                {
                    label: 'Webtoons',
                    label_ko: '웹툰',
                    name: 'Webtoons',
                    access_type: 'read',
                    subMenu: [
                        {
                            label: 'Popular',
                            label_ko: '인기 있는',
                            name: 'Popular',
                            access_type: 'none',
                        },
                        {
                            label: 'Newest',
                            label_ko: '최신',
                            name: 'Newest',
                            access_type: 'none',
                        },
                        {
                            label: 'Upcoming',
                            label_ko: '다가오는',
                            name: 'Upcoming',
                            access_type: 'none',
                        },
                        {
                            label: 'Top Rated',
                            label_ko: '최고 등급',
                            name: 'TopRated',
                            access_type: 'none',
                        }
                    ]
                },
                {
                    label: 'Videos',
                    label_ko: '비디오',
                    name: 'Videos',
                    access_type: 'read',
                    subMenu: [
                        {
                            label: 'Trailer',
                            label_ko: '트레일러',
                            name: 'Trailer',
                            access_type: 'none',
                        },
                        {
                            label: 'Popular',
                            label_ko: '인기 있는',
                            name: 'Popular',
                            access_type: 'none',
                        },
                        {
                            label: 'Newest',
                            label_ko: '최신',
                            name: 'Newest',
                            access_type: 'none',
                        }
                    ]
                },
                {
                    label: 'People',
                    label_ko: '사람들',
                    name: 'People',
                    access_type: 'read',
                    subMenu: [
                        {
                            label: 'Popular',
                            label_ko: '인기 있는',
                            name: 'Popular',
                            access_type: 'none',
                        }
                    ]
                },
                {
                    label: 'Awards',
                    label_ko: '수상',
                    name: 'Awards',
                    access_type: 'read',
                    subMenu: [
                        {
                            label: 'All Events',
                            label_ko: '모든 이벤트',
                            name: 'AllEvents',
                            access_type: 'none',
                        }
                    ]
                },
            ]
            
        };
    },
    methods: {
        menuOpen: function() {
            this.ismenuOpen = !this.ismenuOpen;
        },
        
    },
    mounted() {
        var elements = document.getElementsByClassName('toggle')
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            element.addEventListener("click", myFunction);
        }
        

        function myFunction() {
            var parent = this.parentElement;
            var hide_box = parent.querySelector('.dropdown-menu')
            var list = hide_box.classList

            if (list.contains('show')) {
                list.remove('show')
            } 
            else {
                for (let i = 0; i < elements.length; i++) {
                    elements[i].parentElement.querySelector('.dropdown-menu').classList.remove('show')
                }
                list.add('show')
            }
        }
        
    }

};



</script>