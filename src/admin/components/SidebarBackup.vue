<template>
  <div class="admin-left">
    <ul>
      <li>
        <a href="javascript:void(0);" class="ad-link">
          <span><img src="@/assets/icons/ad-icon1.svg" alt="" /> Edit </span>
          <img
            class="arrw1"
            src="@/assets/icons/down-arrow-black2.svg"
            alt=""
          />
          <img class="arrw2" src="@/assets/icons/up-arrow-red.svg" alt="" />
        </a>
        <ul class="ad-dropdown-menu">
          <li class="active">
            <a href="javascript:void(0);">
              <span><img src="@/assets/icons/sub-icon4.svg" alt="" /></span>
              List
            </a>
          </li>
          <li>
            <a href="javascript:void(0);">
              <span><img src="@/assets/icons/sub-icon5.svg" alt="" /></span>
              Review
            </a>
          </li>
          <li>
            <a href="javascript:void(0);">
              <span><img src="@/assets/icons/sub-icon6.svg" alt="" /></span>
              Malling
            </a>
          </li>
          <li>
            <a href="javascript:void(0);">
              <span><img src="@/assets/icons/sub-icon7.svg" alt="" /></span>
              Awards
            </a>
          </li>
        </ul>
      </li>
      <li>
        <a href="javascript:void(0);" class="ad-link">
          <span><img src="@/assets/icons/ad-icon2.svg" alt="" /> News </span>
          <img
            class="arrw1"
            src="@/assets/icons/down-arrow-black2.svg"
            alt=""
          />
          <img class="arrw2" src="@/assets/icons/up-arrow-red.svg" alt="" />
        </a>
        <ul class="ad-dropdown-menu">
          <li class="active">
            <a @click="$router.push('/admin/news-manager')">
              <span><img src="@/assets/icons/sub-icon1.svg" alt="" /></span>
              News Manager
            </a>
          </li>
        </ul>
      </li>
      <li>
        <a href="javascript:void(0);" class="ad-link">
          <span
            ><img src="@/assets/icons/ad-icon3.svg" alt="" />Dictionary
          </span>
          <img
            class="arrw1"
            src="@/assets/icons/down-arrow-black2.svg"
            alt=""
          />
          <img class="arrw2" src="@/assets/icons/up-arrow-red.svg" alt="" />
        </a>
        <ul class="ad-dropdown-menu">
          <li class="active">
            <a @click="$router.push('/admin/tag-data')">
              <span><img src="@/assets/icons/sub-icon2.svg" alt="" /></span> Tag
              Data
            </a>
          </li>
          <li>
            <a @click="$router.push('/admin/agent-list')">
              <span><img src="@/assets/icons/sub-icon3.svg" alt="" /></span>
              Agency
            </a>
          </li>
        </ul>
      </li>
      <li>
        <a href="javascript:void(0);" class="ad-link">
          <span><img src="@/assets/icons/ad-icon4.svg" alt="" />Analytics</span>
          <img
            class="arrw1"
            src="@/assets/icons/down-arrow-black2.svg"
            alt=""
          />
          <img class="arrw2" src="@/assets/icons/up-arrow-red.svg" alt="" />
        </a>
        <ul class="ad-dropdown-menu">
          <li class="active">
            <a href="javascript:void(0);">
              <span><img src="@/assets/icons/sub-icon2.svg" alt="" /></span>
              Analytics1
            </a>
          </li>
          <li>
            <a href="javascript:void(0);">
              <span><img src="@/assets/icons/sub-icon3.svg" alt="" /></span>
              Analytics2
            </a>
          </li>
        </ul>
      </li>
      <li>
        <a href="javascript:void(0);" class="ad-link">
          <span
            ><img src="@/assets/icons/ad-icon5.svg" alt="" />Bulk Working
          </span>
          <img
            class="arrw1"
            src="@/assets/icons/down-arrow-black2.svg"
            alt=""
          />
          <img class="arrw2" src="@/assets/icons/up-arrow-red.svg" alt="" />
        </a>
        <ul class="ad-dropdown-menu">
          <li class="active">
            <a @click="$router.push('/admin/worklist')">
              <span><img src="@/assets/icons/sub-icon8.svg" alt="" /></span>
              Worklist
            </a>
          </li>
          <li>
            <a @click="$router.push('/admin/import-list')">
              <span><img src="@/assets/icons/sub-icon9.svg" alt="" /></span>
              Import
            </a>
          </li>
          <li>
            <a @click="$router.push('/admin/export-list')">
              <span><img src="@/assets/icons/sub-icon10.svg" alt="" /></span>
              Export
            </a>
          </li>
        </ul>
      </li>
      <li>
        <a href="javascript:void(0);" class="ad-link">
          <span
            ><img src="@/assets/icons/ad-icon6.svg" alt="" />Data Management
          </span>
          <img
            class="arrw1"
            src="@/assets/icons/down-arrow-black2.svg"
            alt=""
          />
          <img class="arrw2" src="@/assets/icons/up-arrow-red.svg" alt="" />
        </a>
        <ul class="ad-dropdown-menu">
          <li class="active">
            <a href="javascript:void(0);">
              <span><img src="@/assets/icons/sub-icon11.svg" alt="" /></span>
              Schema
            </a>
          </li>
          <li>
            <a @click="$router.push('/admin/priority')">
              <span><img src="@/assets/icons/sub-icon12.svg" alt="" /></span>
              Priority
            </a>
          </li>
          <li>
            <a href="javascript:void(0);">
              <span><img src="@/assets/icons/sub-icon13.svg" alt="" /></span>
              Data Item
            </a>
          </li>
        </ul>
      </li>
      <li>
        <a href="javascript:void(0);" class="ad-link">
          <span><img src="@/assets/icons/ad-icon7.svg" alt="" />Setting </span>
          <img
            class="arrw1"
            src="@/assets/icons/down-arrow-black2.svg"
            alt=""
          />
          <img class="arrw2" src="@/assets/icons/up-arrow-red.svg" alt="" />
        </a>
        <ul class="ad-dropdown-menu">
          <li class="active">
            <a href="javascript:void(0);">
              <span><img src="@/assets/icons/sub-icon14.svg" alt="" /></span>
              Front lists
            </a>
          </li>
          <li>
            <a href="javascript:void(0);">
              <span><img src="@/assets/icons/sub-icon15.svg" alt="" /></span>
              User Management
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  mounted() {
    var dropdown = document.getElementsByClassName("ad-link");
    var i;

    for (i = 0; i < dropdown.length; i++) {
      dropdown[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === "block") {
          dropdownContent.style.display = "none";
        } else {
          dropdownContent.style.display = "block";
        }
      });
    }
  },
};
</script>
