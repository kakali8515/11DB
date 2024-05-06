<template>
  <div class="credit-from-details">
    <div :class="[itemType == 'tv'
      ? 'page-heading-area with-dropdown edit-drop-outer'
      : 'page-heading-area', $route.params.type == 'internal' ? 'tmtb-heading' : 'tmtb-heading'
    ]">
      <div class="heading-dropdown tmtb-fill-outer">
        <h2>{{ $t("credit.credit") }}</h2>
        <template v-if="itemType == 'tv'">
          <SearchDropdown @dropdownValue="getSeasonId" :search_type="selectSeason" :searchTitleListItem="seasonData"
            :searchtitle="seasonData.length > 0
              ? (item) => `${$t('credit.season')} ${item.season_no}`
              : ''
              " return-object :clearable="false" />
        </template>

      </div>
      <div class="media-tmtb-outer">
        <div class="form-group number-id" v-if="$route.params.type == 'internal'">
          <!-- <label>{{ $t("addNewMoviesForm.TMDBID") }}</label> -->
          <div class="tmtb-fill">
            <input type="text" v-model="tmdb_id" class="form-control" :placeholder="$t('addNewMoviesForm.TMDBID')"
              @keypress="isIntegerNumber($event)" readonly />
            <span class="refreshBtn" @click="tmdbRefreshClick" :class="isEdit ? 'pointer-events-none' : ''"><svg
                width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1 1V6H1.58152M16.9381 8C16.446 4.05369 13.0796 1 9 1C5.64262 1 2.76829 3.06817 1.58152 6M1.58152 6H6M17 17V12H16.4185M16.4185 12C15.2317 14.9318 12.3574 17 9 17C4.92038 17 1.55399 13.9463 1.06189 10M16.4185 12H12"
                  stroke="white" />
              </svg>
            </span>
          </div>

        </div>
        <div class="media-save-btn" v-if="itemType == 'movie'" :class="routeId != '' || $route.params.type == 'internal' ? '' : 'isDisabled'
          ">
          <a class="saveBtn" :class="routeId != '' || $route.params.type == 'internal'
            ? ''
            : 'pointer-events-none'
            " @click="isEdit == true ? isEditBtn() : addCreditDetails()">{{ isEdit ? $t("button.edit") :
    $t("button.save") }}</a>
        </div>
        <div class="media-save-btn" v-if="itemType == 'tv'" :class="(saveIdList.season_id != '' && routeId != '') ||
          ($route.params.type == 'internal' &&
            (saveIdList.season_id != '' || exist_season_id || season_id))
          ? ''
          : 'isDisabled'
          ">
          <a class="saveBtn" :class="(saveIdList.season_id != '' && routeId != '') ||
            ($route.params.type == 'internal' &&
              (saveIdList.season_id != '' || exist_season_id || season_id))
            ? ''
            : 'pointer-events-none'
            " @click="isEdit == true ? isEditBtn() : addCreditDetails()">{{ isEdit ? $t("button.edit") :
    $t("button.save") }}</a>
        </div>
      </div>

    </div>

    <div class="credit-tabber-area">
      <TabWrapper @selectedTab="getTabName">
        <Tabs title="addNewPeople.cast">
          <div class="credit-cast-area">
            <div class="login-wrap">
              <div class="box" v-click-outside="() => (shows = false)">
                <div class="form-group search-area">
                  <input type="text" v-model="search_text" class="form-control" @keyup.enter="getCreditList"
                    :placeholder="$t('button.search')" @change="resetCastList" />
                  <span class="searchBtn" @click="getCreditList">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M7.60039 2.67979C4.94942 2.67979 2.80039 4.82882 2.80039 7.47979C2.80039 10.1308 4.94942 12.2798 7.60039 12.2798C10.2514 12.2798 12.4004 10.1308 12.4004 7.47979C12.4004 4.82882 10.2514 2.67979 7.60039 2.67979ZM0.400391 7.47979C0.400391 3.50334 3.62394 0.279785 7.60039 0.279785C11.5768 0.279785 14.8004 3.50334 14.8004 7.47979C14.8004 9.03478 14.3074 10.4746 13.4693 11.6516L19.2489 17.4313C19.7175 17.8999 19.7175 18.6597 19.2489 19.1283C18.7803 19.5969 18.0205 19.5969 17.5519 19.1283L11.7722 13.3487C10.5953 14.1868 9.15539 14.6798 7.60039 14.6798C3.62394 14.6798 0.400391 11.4562 0.400391 7.47979Z"
                        fill="white" />
                    </svg>
                  </span>
                </div>
                <div class="search-wrap-area search-scrollable" v-show="shows" @scroll="onScroll($event, 'cast')">
                  <ul v-if="creditList.length > 0">
                    <li v-for="(item, index) in creditList" :key="index" :class="isEdit ? 'isDisabled' : ''">
                      <div class="tags-img">
                        <img v-if="item.people_poster" :src="item.people_poster" alt="" />
                        <img v-else src="@/assets/images/no-image-view.png" />
                      </div>
                      <span>{{ item.people_name }} (<span @click="gotoPeoplePage(item.people_id)"
                          class="credit-people-id">{{ item.people_id }}</span>)</span>
                      <a :class="isEdit ? 'pointer-events-none' : ''" @click="
                        AddInfoModal(
                          item,
                          $t('addNewPeople.mediadetails.addButton'),
                          'add'
                        )
                        ">{{ $t("addNewPeople.mediadetails.add+") }}</a>
                    </li>
                  </ul>
                  <ul v-else>
                    <li :class="isEdit ? 'isDisabled' : ''">
                      <span>{{ $t("credit.notfound") }}</span>
                      <a :class="isEdit ? 'pointer-events-none' : ''" @click="createInfoModal">{{ $t("credit.create")
                      }}+</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="credit-list-area">
              <template v-if="cast_details.length > 0">
                <draggable :disabled="isEdit" v-model="cast_details" item-key="id" :animation="300" :forceFallback="true"
                  :scroll-sensitivity="200">
                  <template #item="{ element }">
                    <div class="single-credit-list" v-show="element.action_type != 'd'">
                      <div class="divrow">
                        <span class="icons">
                          <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 12H18V10H0V12ZM0 7H18V5H0V7ZM0 0V2H18V0H0Z" fill="white" />
                          </svg>
                        </span>
                        <div class="thumbimg">
                          <img v-if="element.poster" :src="element.poster" />
                          <img v-else src="@/assets/images/no-image-view.png" />
                        </div>
                      </div>

                      <div class="inner-pt-area cursor-pointer">
                        <div class="divrow name-wrap">
                          <h3>{{ element.cast_name }}</h3>
                        </div>
                        <div class="divrow center">
                          <p :title="element.character_name">
                            {{ element.character_name }}
                          </p>
                        </div>
                        <div class="divrow center">
                          <p>{{ element.job }}</p>
                        </div>
                      </div>
                      <div class="end-part">
                        <div class="divrow center">
                          <span class="gustBtn" v-if="element.is_guest == '1'">{{ $t("credit.guest") }}</span>
                        </div>
                        <div class="divrow actions" :class="isEdit ? 'isDisabled' : ''">
                          <a @click="
                            AddInfoModal(element, $t('button.edit'), 'edit')
                            " :class="isEdit ? 'pointer-events-none' : ''">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M11.688 1.4033C12.4914 0.59994 13.7939 0.59994 14.5973 1.4033C15.4006 2.20667 15.4006 3.50918 14.5973 4.31254L13.7817 5.12809L10.8725 2.21885L11.688 1.4033Z"
                                fill="white" />
                              <path d="M9.41788 3.67347L0.799805 12.2915V15.2008H3.70904L12.3271 6.58271L9.41788 3.67347Z"
                                fill="white" />
                            </svg>
                          </a>
                          <a @click="removeInfoModal(element)" :class="isEdit ? 'pointer-events-none' : ''">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M13.2997 0.70875C12.9097 0.31875 12.2797 0.31875 11.8897 0.70875L6.99973 5.58875L2.10973 0.69875C1.71973 0.30875 1.08973 0.30875 0.699727 0.69875C0.309727 1.08875 0.309727 1.71875 0.699727 2.10875L5.58973 6.99875L0.699727 11.8887C0.309727 12.2787 0.309727 12.9087 0.699727 13.2987C1.08973 13.6887 1.71973 13.6887 2.10973 13.2987L6.99973 8.40875L11.8897 13.2987C12.2797 13.6887 12.9097 13.6887 13.2997 13.2987C13.6897 12.9087 13.6897 12.2787 13.2997 11.8887L8.40973 6.99875L13.2997 2.10875C13.6797 1.72875 13.6797 1.08875 13.2997 0.70875Z"
                                fill="white" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </template>
                </draggable>
              </template>
              <div class="no-data-wrapper" v-else>
                <p>{{ $t("searchResults.noData") }}</p>
              </div>
            </div>
          </div>
        </Tabs>

        <Tabs title="addNewPeople.crew">
          <div class="credit-crew-area">
            <div class="login-wrap">
              <div class="box" v-click-outside="() => (shows1 = false)">
                <div class="form-group search-area">
                  <input type="text" v-model="search_crew_text" class="form-control" @keyup.enter="getCreditCrewList"
                    :placeholder="$t('button.search')" @change="resetCrewList" />
                  <span class="searchBtn" @click="getCreditCrewList">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M7.60039 2.67979C4.94942 2.67979 2.80039 4.82882 2.80039 7.47979C2.80039 10.1308 4.94942 12.2798 7.60039 12.2798C10.2514 12.2798 12.4004 10.1308 12.4004 7.47979C12.4004 4.82882 10.2514 2.67979 7.60039 2.67979ZM0.400391 7.47979C0.400391 3.50334 3.62394 0.279785 7.60039 0.279785C11.5768 0.279785 14.8004 3.50334 14.8004 7.47979C14.8004 9.03478 14.3074 10.4746 13.4693 11.6516L19.2489 17.4313C19.7175 17.8999 19.7175 18.6597 19.2489 19.1283C18.7803 19.5969 18.0205 19.5969 17.5519 19.1283L11.7722 13.3487C10.5953 14.1868 9.15539 14.6798 7.60039 14.6798C3.62394 14.6798 0.400391 11.4562 0.400391 7.47979Z"
                        fill="white" />
                    </svg>
                  </span>
                </div>

                <div class="search-wrap-area search-scrollable" v-show="shows1" @scroll="onScroll($event, 'crew')">
                  <ul id="crewListUL" v-if="crewList.length > 0">
                    <li v-for="(item, index) in crewList" :key="index" :class="isEdit ? 'isDisabled' : ''">
                      <div class="tags-img">
                        <img v-if="item.people_poster" :src="item.people_poster" alt="" />
                        <img v-else src="@/assets/images/no-image-view.png" />
                      </div>
                      <span>{{ item.people_name }} (<span @click="gotoPeoplePage(item.people_id)"
                          class="credit-people-id">{{ item.people_id
                          }}</span>)</span>
                      <a :class="isEdit ? 'pointer-events-none' : ''" @click="
                        AddCrewInfoModal(
                          item,
                          $t('addNewPeople.mediadetails.addButton'),
                          'add'
                        )
                        ">{{ $t("addNewPeople.mediadetails.add+") }}</a>
                    </li>
                  </ul>
                  <ul v-else>
                    <li :class="isEdit ? 'isDisabled' : ''">
                      <span>{{ $t("credit.notfound") }}</span>
                      <a :class="isEdit ? 'pointer-events-none' : ''" @click="createCrewInfoModal">{{ $t("credit.create")
                      }} +</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="credit-list-area">
              <template v-if="crew_details?.length > 0">
                <draggable :disabled="isEdit" v-model="crew_details" item-key="id" :animation="300" :forceFallback="true"
                  :scroll-sensitivity="200">
                  <template #item="{ element }">
                    <div class="single-credit-list" v-show="element.action_type != 'd'">
                      <div class="divrow">
                        <span class="icons">
                          <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 12H18V10H0V12ZM0 7H18V5H0V7ZM0 0V2H18V0H0Z" fill="white" />
                          </svg>
                        </span>
                        <div class="thumbimg">
                          <img :src="element.poster" v-if="element.poster" />
                          <img v-else src="@/assets/images/no-image-view.png" />
                        </div>
                      </div>
                      <div class="inner-pt-area cursor-pointer">
                        <div class="divrow name-wrap">
                          <h3>{{ element.cast_name }}</h3>
                        </div>
                        <div class="divrow center">
                          <p></p>
                        </div>
                        <div class="divrow center">
                          <p>{{ element.job }}</p>
                        </div>
                      </div>
                      <div class="end-part">
                        <div class="divrow center"></div>
                        <div class="divrow actions" :class="isEdit ? 'isDisabled' : ''">
                          <a :class="isEdit ? 'pointer-events-none' : ''" @click="
                            AddCrewInfoModal(
                              element,
                              $t('button.edit'),
                              'edit'
                            )
                            ">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M11.688 1.4033C12.4914 0.59994 13.7939 0.59994 14.5973 1.4033C15.4006 2.20667 15.4006 3.50918 14.5973 4.31254L13.7817 5.12809L10.8725 2.21885L11.688 1.4033Z"
                                fill="white" />
                              <path d="M9.41788 3.67347L0.799805 12.2915V15.2008H3.70904L12.3271 6.58271L9.41788 3.67347Z"
                                fill="white" />
                            </svg>
                          </a>
                          <a @click="removeCrewInfoModal(element)" :class="isEdit ? 'pointer-events-none' : ''">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M13.2997 0.70875C12.9097 0.31875 12.2797 0.31875 11.8897 0.70875L6.99973 5.58875L2.10973 0.69875C1.71973 0.30875 1.08973 0.30875 0.699727 0.69875C0.309727 1.08875 0.309727 1.71875 0.699727 2.10875L5.58973 6.99875L0.699727 11.8887C0.309727 12.2787 0.309727 12.9087 0.699727 13.2987C1.08973 13.6887 1.71973 13.6887 2.10973 13.2987L6.99973 8.40875L11.8897 13.2987C12.2797 13.6887 12.9097 13.6887 13.2997 13.2987C13.6897 12.9087 13.6897 12.2787 13.2997 11.8887L8.40973 6.99875L13.2997 2.10875C13.6797 1.72875 13.6797 1.08875 13.2997 0.70875Z"
                                fill="white" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </template>
                </draggable>
              </template>
              <div class="no-data-wrapper" v-else>
                <p>{{ $t("searchResults.noData") }}</p>
              </div>
            </div>
          </div>
        </Tabs>
      </TabWrapper>
    </div>
  </div>

  <div class="new-cast-modal">
    <!-- add info modal -->
    <PopUpModal :isModal="isAddInfoModal">
      <template v-slot:header>
        <h1>{{ addType }} {{ $t("credit.information") }}</h1>
        <!-- <button @click="isAddInfoModal = false">
          <img src="@/assets/icons/modal-cross-icon.svg" alt="" />
        </button> -->
      </template>
      <template v-slot:body>
        <div class="cast-details">
          <div class="cast-left-profile">
            <img v-if="people.people_poster || people.poster" :src="people.people_poster || people.poster" alt=""
              class="cast-img" />
            <img v-else src="@/assets/images/no-image-view.png" class="cast-img" />
          </div>

          <div class="right">
            <div class="form-grp">
              <label for="">{{ $t("credit.jobTitle") }}</label>
              <SearchDropdown @dropdownValue="getJobId" :search_type="job" :searchTitleListItem="jobTitleList"
                searchtitle="department_name" searchvalue="department_value" :labelItem="$t('credit.selectJobTitle')"
                :clearable="false" />
            </div>
            <div class="form-grp">
              <label for="">{{ $t("credit.characterName") }}</label>
              <input type="text" v-model="character_name" :placeholder="$t('credit.enterCharacterName')"
                maxlength="150" />
            </div>
            <div class="form-grp">
              <label for="">{{ $t("credit.guest") }}</label>
              <div class="radio-grp">
                <label for="yes">
                  <div class="check-circle">
                    <input type="radio" name="each-radio-movie" v-model="is_guest" id="yes" value="1"
                      @click="isGuestClick" />
                    <div class="radio-circle">
                      <div class="inner-circle"></div>
                    </div>
                    <span>{{ $t("addNewMoviesForm.yes") }}</span>
                  </div>
                </label>
                <label for="no">
                  <div class="check-circle">
                    <input type="radio" name="each-radio-movie" v-model="is_guest" id="no" value="0"
                      @click="isGuestClick" />
                    <div class="radio-circle">
                      <div class="inner-circle"></div>
                    </div>
                    <span>{{ $t("addNewMoviesForm.no") }}</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div class="button-group">
          <button class="black-outline-btn" :disabled="character_name == '' || job == null || is_guest.toString() == ''
            " :class="character_name == '' || job == null || is_guest.toString() == ''
    ? 'isDisabled'
    : ''
    " @click="addCastInformation">
            {{ $t("button.save") }}
          </button>
          <button class="red-fill-btn" @click="closeModal">
            {{ $t("button.cancel") }}
          </button>
        </div>
      </template>
    </PopUpModal>

    <!-- create info modal -->
    <PopUpModal :isModal="isCreateInfoModal">
      <template v-slot:header>
        <h1>{{ $t("credit.createInformation") }}</h1>
        <!-- <button @click="isCreateInfoModal = false">
          <img src="@/assets/icons/modal-cross-icon.svg" alt="" />
        </button> -->
      </template>
      <template v-slot:body>
        <div class="cast-details">
          <div class="img-picker">
            <input type="file" v-on:change="onFileChange" id="img-picker-1" accept="image/*" />
            <label for="img-picker-1"><img src="@/assets/images/no-image-view.png" alt="" class="cast-img" v-if="!url" />
              <img :src="url" alt="" class="cast-img" v-if="url" /></label>
          </div>
          <div class="right">
            <div class="form-grp">
              <label for="">{{ $t("credit.castName") }}</label>
              <input type="text" v-model="cast_name" :placeholder="$t('credit.enterCastName')" maxlength="150" />
            </div>
            <div class="form-grp">
              <label for="">{{ $t("credit.jobTitle") }}</label>
              <SearchDropdown @dropdownValue="getJobId" :search_type="job" :searchTitleListItem="jobTitleList"
                searchtitle="department_name" searchvalue="department_value" :labelItem="$t('credit.selectJobTitle')"
                :clearable="false" />
            </div>
            <div class="form-grp">
              <label for="">{{ $t("credit.characterName") }}</label>
              <input v-model="character_name" type="text" name="" id="" maxlength="150"
                :placeholder="$t('credit.characterName')" />
            </div>
            <div class="form-grp">
              <label for="">{{ $t("credit.guest") }}</label>
              <div class="radio-grp">
                <label for="yes">
                  <div class="check-circle">
                    <input type="radio" name="each-radio-movie" id="yes" v-model="is_guest" value="1" />
                    <div class="radio-circle">
                      <div class="inner-circle"></div>
                    </div>
                    <span>{{ $t("addNewMoviesForm.yes") }}</span>
                  </div>
                </label>
                <label for="no">
                  <div class="check-circle">
                    <input type="radio" name="each-radio-movie" id="no" v-model="is_guest" value="0" />
                    <div class="radio-circle">
                      <div class="inner-circle"></div>
                    </div>
                    <span>{{ $t("addNewMoviesForm.no") }}</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div class="button-group">
          <button class="black-outline-btn" :disabled="character_name == '' ||
            job == null ||
            is_guest == '' ||
            cast_name == '' ||
            url == '' ||
            isCreateNewCast
            " :class="character_name == '' ||
    job == null ||
    is_guest == '' ||
    cast_name == '' ||
    url == '' ||
    isCreateNewCast
    ? 'isDisabled'
    : ''
    " @click="createCastInfo">
            {{ $t("button.save") }}
          </button>
          <button class="red-fill-btn" @click="closeModal">
            {{ $t("button.cancel") }}
          </button>
        </div>
      </template>
    </PopUpModal>

    <!--add crew info modal -->
    <PopUpModal :isModal="isCrewInfoModal">
      <template v-slot:header>
        <h1>{{ addType }} {{ $t("credit.information") }}</h1>
        <!-- <button @click="isCrewInfoModal = false">
          <img src="@/assets/icons/modal-cross-icon.svg" alt="" />
        </button> -->
      </template>
      <template v-slot:body>
        <div class="cast-details">
          <div class="cast-left-profile">
            <img v-if="people.people_poster || people.poster" :src="people.people_poster || people.poster" alt=""
              class="cast-img" />
            <img v-else src="@/assets/images/no-image-view.png" class="cast-img" />
          </div>

          <div class="right">
            <div class="form-grp">
              <label for="">{{ $t("credit.jobTitle") }}</label>
              <SearchDropdown @dropdownValue="getJobId" :search_type="job" :searchTitleListItem="jobTitleList"
                searchtitle="department_name" searchvalue="department_value" :labelItem="$t('credit.selectJobTitle')"
                :clearable="false" />
            </div>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div class="button-group">
          <button class="black-outline-btn" :disabled="job == null" :class="job == null ? 'isDisabled' : ''"
            @click="addCrewInformation">
            {{ $t("button.save") }}
          </button>
          <button class="red-fill-btn" @click="closeModal">
            {{ $t("button.cancel") }}
          </button>
        </div>
      </template>
    </PopUpModal>

    <!-- crew create info modal -->
    <PopUpModal :isModal="isCrewCreateInfoModal">
      <template v-slot:header>
        <h1>{{ $t("credit.createInformation") }}</h1>
        <!-- <button @click="isCrewCreateInfoModal = false">
          <img src="@/assets/icons/modal-cross-icon.svg" alt="" />
        </button> -->
      </template>
      <template v-slot:body>
        <div class="cast-details">
          <div class="img-picker">
            <input type="file" v-on:change="onFileChange" id="img-picker-1" accept="image/*" />
            <label for="img-picker-1"><img v-if="!url" src="@/assets/images/no-image-view.png" alt="" class="cast-img" />
              <img :src="url" alt="" class="cast-img" v-if="url" /></label>
          </div>
          <div class="right">
            <div class="form-grp">
              <label for="">{{ $t("credit.jobTitle") }}</label>
              <SearchDropdown @dropdownValue="getJobId" :search_type="job" :searchTitleListItem="jobTitleList"
                searchtitle="department_name" searchvalue="department_value" :labelItem="$t('credit.selectJobTitle')"
                :clearable="false" />
            </div>
            <div class="form-grp">
              <label for="">{{ $t("credit.crewName") }}</label>
              <input type="text" name="" id="" :placeholder="$t('credit.enterCrewName')" v-model="cast_name"
                maxlength="150" />
            </div>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div class="button-group">
          <button class="black-outline-btn" :disabled="job == null || cast_name == '' || url == '' || isCreateNewCrew
            " :class="job == null || cast_name == '' || url == '' || isCreateNewCrew
    ? 'isDisabled'
    : ''
    " @click="createCrewInfo">
            {{ $t("button.save") }}
          </button>
          <button class="red-fill-btn" @click="closeModal">
            {{ $t("button.cancel") }}
          </button>
        </div>
      </template>
    </PopUpModal>
  </div>

  <!-- submit modal -->
  <div class="new-cast-modal center-popup-modal">
    <PopUpModal :isModal="isSubmit">
      <template v-slot:header>
        <h1 class="text-center" v-html="$t('addNewMoviesForm.youShouldSubmitToSendTheAdd')"></h1>
      </template>
      <template v-slot:body> </template>
      <template v-slot:footer>
        <div class="button-group">
          <button class="black-outline-btn" @click="submitCreditDetails">
            {{ $t("button.ok") }}
          </button>
          <button class="red-fill-btn" @click="isSubmit = false">
            {{ $t("button.cancel") }}
          </button>
        </div>
      </template>
    </PopUpModal>
  </div>
</template>

<script setup>
import Tabs from "@/components/Tabs.vue";
import TabWrapper from "@/components/TabWrapper.vue";
import AddNewMovieService from "@/services/AddNewMovieService";
import EditMovieService from "@/services/EditMovieService";
import AddNewTVService from "@/services/AddNewTVService";
import EditTVService from "@/services/EditTVService";
import { ref } from "@vue/reactivity";
import { onMounted, watch } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import PopUpModal from "@/components/Modals/PopUpModal.vue";
import Toast from "@/alert/alert.js";
import { isIntegerNumber } from "@/mixins/CommonValidation.js";
import i18n from "@/config/i18n";
const { t } = i18n.global;
import draggable from "vuedraggable";

const props = defineProps({
  site_language: String,
  itemType: String,
  saveIdList: Object
})
const emit = defineEmits(['selectedId', 'isEditOn'])
const route = useRoute();
const router = useRouter();
const routeId = ref(route.params.id);
const title_id =
  route.params.type == "internal" ? route.params.external_id : "";
const addNewMovieService = new AddNewMovieService();
const editMovieService = new EditMovieService();
const addNewTVService = new AddNewTVService();
const editTVService = new EditTVService();
const search_text = ref("");
const creditList = ref([]);
const search_crew_text = ref("");
const crewList = ref([]);
const jobTitleList = ref([]);
const draft_credit_id = ref("");
const cast_details = ref([]);
const people_id = ref("");
const isAddInfoModal = ref(false);
const job = ref(null);
const character_name = ref("");
const is_guest = ref("");
const people = ref([]);
const castRequestList = ref([]);
const crewRequestList = ref([]);
const cast_name = ref("");
const shows = ref(false);
const shows1 = ref(false);
const crew_details = ref([]);
const isCrewInfoModal = ref(false);
const isCreateInfoModal = ref(false);
const isCrewCreateInfoModal = ref(false);
const file = ref("");
const url = ref("");
const seasonData = ref([]);
const type = ref(props.itemType == "tv" ? "tv" : "movie");
const isSubmit = ref(false);
const season_id = ref("");
const draft_request_id = ref(routeId);
const isCreateNewCast = ref(false);
const isCreateNewCrew = ref(false);
const addType = ref("");
const guestClick = ref(false);
const isGuestValue = ref("");
const error = ref({});
const specialChars = ref(/[`!@#$%^&*()_+\-=\[\]{};':"\\|.,<>\/?~]/);
const exist_season_id = ref("");
const crewType = ref("");
const castType = ref("");
const isEdit = ref(false);
const selectSeason = ref("");
const crewPage = ref(1);
const castPage = ref(1);
const crewLimit = ref(20);
const castLimit = ref(20);
const tmdb_id = ref(localStorage.getItem("tmdb_id") ? localStorage.getItem("tmdb_id") : "");
const istmDBIdClick = ref(false);
const tmdbClickCast = ref([]);
const tmdbClickCrew = ref([]);
// on language change
watch(
  () => props.site_language,
  function (n, o) {
    if (n && n != o) {
      const draft_ids = JSON.parse(
        localStorage.getItem("draft_ids") || "[]"
      );

      if (draft_ids[0]) {
        draft_request_id.value = draft_ids[0]?.primaryDetails[type.value] && draft_ids[0]?.primaryDetails[type.value][
          props.site_language
        ]?.draft_request_id
          ? draft_ids[0]?.primaryDetails[type.value][props.site_language]
            ?.draft_request_id
          : "";
        routeId.value = draft_ids[0]?.primaryDetails[type.value] && draft_ids[0]?.primaryDetails[type.value][
          props.site_language
        ]?.draft_request_id
          ? draft_ids[0]?.primaryDetails[type.value][props.site_language]
            ?.draft_request_id
          : "";
      } else {
        draft_request_id.value = draft_request_id.value;
        routeId.value = routeId.value;
      }
      cast_details.value = [];
      crew_details.value = [];
      if (props.itemType == "tv") {
        seasonList();
      }
      creditJobTitleList();
      setTimeout(() => {
        creditCastRequestList();
        creditCrewRequestList();
      }, 1000);
    }
  }
);
const onScroll = (el, type) => {
  let bottomOfWindow =
    el.target.offsetHeight + 150 + el.target.scrollTop >=
    el.target.scrollHeight;
  if (type == "cast") {
    if (
      bottomOfWindow &&
      creditList.value.length >= castPage.value * castLimit.value
    ) {
      castPage.value = castPage.value + 1;
      getCreditList();
    }
  }
  if (type == "crew") {
    if (
      bottomOfWindow &&
      crewList.value.length >= crewPage.value * crewLimit.value
    ) {
      crewPage.value = crewPage.value + 1;
      getCreditCrewList();
    }
  }
};

onMounted(() => {
  if (route.params.type == "internal") {
    isEdit.value = true;
  }
  creditJobTitleList();
  const draft_ids = JSON.parse(localStorage.getItem("draft_ids") || "[]");
  if (draft_ids[0]) {
    if (!draft_ids[0]?.primaryDetails[type.value]) {
      localStorage.removeItem("site_language");
      localStorage.removeItem("draft_ids");
      localStorage.removeItem("saveIdList");
    }
    draft_request_id.value = draft_ids[0]?.primaryDetails[type.value] && draft_ids[0]?.primaryDetails[type.value][
      props.site_language
    ]?.draft_request_id
      ? draft_ids[0]?.primaryDetails[type.value][props.site_language]
        ?.draft_request_id
      : "";
    routeId.value = draft_ids[0]?.primaryDetails[type.value] && draft_ids[0]?.primaryDetails[type.value][
      props.site_language
    ]?.draft_request_id
      ? draft_ids[0]?.primaryDetails[type.value][props.site_language]
        ?.draft_request_id
      : "";
    draft_credit_id.value = draft_ids[0]?.primaryDetails[type.value] && draft_ids[0]?.primaryDetails[type.value][
      props.site_language
    ]?.draft_credit_id
      ? draft_ids[0]?.primaryDetails[type.value][props.site_language]
        ?.draft_credit_id
      : draft_credit_id.value;
  } else {
    draft_request_id.value = draft_request_id.value;
    routeId.value = routeId.value;
    draft_credit_id.value = draft_credit_id.value;
  }
  if (props.itemType == "tv") {
    seasonList();
  }
  setTimeout(() => {
    creditCastRequestList();
    creditCrewRequestList();
  }, 1000);
});

// season list

const seasonList = () => {
  let getTVSeasonList;

  if (route.params.type == "internal") {
    getTVSeasonList = editTVService.getEditSeasonList(
      title_id,
      routeId.value,
      props.site_language
    );
  } else {
    getTVSeasonList = addNewTVService.getSeasonList(
      routeId.value,
      props.site_language
    );
  }
  getTVSeasonList
    .then((res) => {
      if (res.status == 200) {
        seasonData.value = res.data.results;
        selectSeason.value = res.data.results[0];
        season_id.value = res.data.results[0].draft_season_id;
        exist_season_id.value = res.data.results[0].season_id
          ? res.data.results[0].season_id
          : "";
      } else {
        seasonData.value = [];
        selectSeason.value = "";
        season_id.value = "";
        exist_season_id.value = "";
        cast_details.value = [];
        crew_details.value = [];
      }
    })
    .catch((err) => {
      return;
    });
};

const getSeasonId = (e) => {
  istmDBIdClick.value = false;
  selectSeason.value = e;
  season_id.value = e.draft_season_id ? e.draft_season_id : "";
  exist_season_id.value = e.season_id ? e.season_id : "";
  cast_details.value = [];
  crew_details.value = [];
  creditCastRequestList();
  creditCrewRequestList();
};

const tmdbRefreshClick = () => {
  if (props.itemType == "tv") {
    tmdbClickCast.value = cast_details.value;
    tmdbClickCrew.value = crew_details.value
    tmdbClickCast.value.map((i) => {
      i.action_type = "d";
    });
    tmdbClickCrew.value.map((i) => {
      i.action_type = "d";
    });
  }
  cast_details.value = [];
  crew_details.value = [];
  istmDBIdClick.value = true;
  creditCastRequestList();
  creditCrewRequestList();
}

// cast request list
const creditCastRequestList = () => {
  let creditCastList;
  if (route.params.type == "internal") {
    if (istmDBIdClick.value) {
      creditCastList = editMovieService.creditTmdbRequestList(
        title_id,
        type.value,
        props.site_language,
        "cast",
        exist_season_id.value,
        selectSeason.value.season_no,
        tmdb_id.value
      );

    } else {
      creditCastList = editMovieService.creditRequestList(
        title_id,
        draft_request_id.value || routeId.value,
        type.value,
        props.site_language,
        "cast",
        exist_season_id.value,
        season_id.value
      );
    }

  } else if (routeId.value) {
    creditCastList = addNewMovieService.creditRequestList(
      draft_request_id.value || routeId.value,
      props.site_language,
      type.value,
      "cast",
      season_id.value
    );
  }
  creditCastList
    .then((res) => {
      if (res.status == 200) {
        castRequestList.value = res.data.cast_details || res.data.result;
        draft_credit_id.value = res.data.draft_credit_id ? res.data.draft_credit_id : draft_credit_id.value;
        if (routeId.value) {
          tmdb_id.value = localStorage.getItem("tmdb_id") ? localStorage.getItem("tmdb_id") : tmdb_id.value;
        } else {
          tmdb_id.value = res.data.tmdb_id ? res.data.tmdb_id : tmdb_id.value;
        }

        for (let i = 0; i < castRequestList.value.length; i++) {
          castRequestList.value[i]["exist_id"] =
            castRequestList.value[i].id;
          castRequestList.value[i]["id"] = i + 1;

          cast_details.value.push({
            exist_id: castRequestList.value[i].exist_id
              ? castRequestList.value[i].exist_id
              : "",
            id: i + 1,
            people_id: castRequestList.value[i].people_id,
            character_name: castRequestList.value[i].character_name,
            job: castRequestList.value[i].job,
            is_guest: castRequestList.value[i].is_guest
              ? castRequestList.value[i].is_guest
              : 0,
            cast_name: castRequestList.value[i].cast_name,
            poster: castRequestList.value[i].poster,
            action_type: istmDBIdClick.value && props.itemType == "tv" ? "a" : "e",
            tmdb_id: castRequestList.value[i].tmdb_id
              ? castRequestList.value[i].tmdb_id
              : "",
          });
        }
      }
    })
    .catch((err) => {
      return;
    });
};

// crew request list
const creditCrewRequestList = () => {
  let creditCrewList;
  if (route.params.type == "internal") {
    if (istmDBIdClick.value) {
      creditCrewList = editMovieService.creditTmdbRequestList(
        title_id,
        type.value,
        props.site_language,
        "crew",
        exist_season_id.value,
        selectSeason.value.season_no,
        tmdb_id.value
      );

    } else {
      creditCrewList = editMovieService.creditRequestList(
        title_id,
        draft_request_id.value || routeId.value,
        type.value,
        props.site_language,
        "crew",
        exist_season_id.value,
        season_id.value
      );
    }
  } else if (routeId.value) {
    creditCrewList = addNewMovieService.creditRequestList(
      draft_request_id.value || routeId.value,
      props.site_language,
      type.value,
      "crew",
      season_id.value
    );
  }
  creditCrewList
    .then((res) => {
      if (res.status == 200) {
        emit("selectedId", {
          ...JSON.parse(localStorage.getItem("saveIdList") || "{}"),
          request_id: res.data.draft_request_id,
          credit_request_id: res.data.draft_credit_id ? res.data.draft_credit_id : draft_credit_id.value,
        });
        crewRequestList.value = res.data.crew_details || res.data.result;
        draft_credit_id.value = res.data.draft_credit_id ? res.data.draft_credit_id : draft_credit_id.value;
        for (let j = 0; j < crewRequestList.value.length; j++) {
          crewRequestList.value[j]["exist_id"] =
            crewRequestList.value[j].id;
          crewRequestList.value[j]["id"] = j + 1;
          crew_details.value.push({
            id: j + 1,
            people_id: crewRequestList.value[j].people_id,
            job: crewRequestList.value[j].job,
            cast_name: crewRequestList.value[j].cast_name,
            poster: crewRequestList.value[j].poster,
            action_type: istmDBIdClick.value && props.itemType == "tv" ? "a" : "e",
            tmdb_id: crewRequestList.value[j].tmdb_id
              ? crewRequestList.value[j].tmdb_id
              : "",
            exist_id: crewRequestList.value[j].exist_id
              ? crewRequestList.value[j].exist_id
              : "",
          });
        }
      }
      // console.log("crew_details", crew_details.value);
    })
    .catch((err) => {
      return;
    });
};

// cast search list
const getCreditList = () => {
  addNewMovieService
    .creditPeopleSearchList(
      props.site_language,
      search_text.value,
      castPage.value,
      castLimit.value
    )
    .then((res) => {
      if (res.status == 200) {
        if (castPage.value == 1) creditList.value = [];
        creditList.value = [...creditList.value, ...res.data.results];
        shows.value = true;
      } else {
        creditList.value = [];
      }
    })
    .catch((err) => {
      return;
    });
};

// crew search list
const getCreditCrewList = () => {
  addNewMovieService
    .creditPeopleSearchList(
      props.site_language,
      search_crew_text.value,
      crewPage.value,
      crewLimit.value
    )
    .then((res) => {
      if (res.status == 200) {
        crewList.value = [];
        shows1.value = true;
        crewList.value = [...crewList.value, ...res.data.results];
      } else {
        crewList.value = [];
      }
    })
    .catch((err) => {
      return;
    });
};

// job title list
const creditJobTitleList = () => {
  addNewMovieService
    .creditJobTitleList(props.site_language)
    .then((res) => {
      if (res.status == 200) {
        jobTitleList.value = res.data.results;
        jobTitleList.value.forEach((item) => {
          item["department_value"] = item.department_name;
        });
      }
    })
    .catch((err) => {
      return;
    });
};

const getJobId = (value) => {
  job.value = value;
};

const AddInfoModal = (item, type, cast) => {
  isAddInfoModal.value = true;
  character_name.value = item.character_name ? item.character_name : "";
  job.value = item.job ? item.job : null;
  is_guest.value =
    item.is_guest == 1 || item.is_guest == 0 ? item.is_guest : "";
  people_id.value = item.people_id;
  people.value = item;
  addType.value = type;
  castType.value = cast;
  const storedTheme = localStorage.getItem("theme-colour");
  const body = document.body;
  if (storedTheme === "theme-dark") {
    body.classList.add("dark-modal-open");
  }
};

const AddCrewInfoModal = (item, type, crew) => {
  isCrewInfoModal.value = true;
  people_id.value = item.people_id;
  people.value = item;
  job.value = item.job ? item.job : null;
  addType.value = type;
  crewType.value = crew;
  const storedTheme = localStorage.getItem("theme-colour");
  const body = document.body;
  if (storedTheme === "theme-dark") {
    body.classList.add("dark-modal-open");
  }
};

//remove cast info
const removeInfoModal = (item) => {
  people.value = item;
  let castDetailsData = cast_details.value.find((item) => {
    return item.id == people.value.id;
  });
  if (castDetailsData) {
    if (props.itemType == "tv") {
      if (castDetailsData.action_type == "a") {
        cast_details.value.splice(
          cast_details.value.indexOf(castDetailsData),
          1
        );
      } else {
        castDetailsData.action_type = "d";
      }
    } else {
      cast_details.value.splice(
        cast_details.value.indexOf(castDetailsData),
        1
      );
    }
  }
  // console.log(cast_details.value);
};

// add cast info
const addCastInformation = () => {
  if (
    character_name.value == "" ||
    job.value == "" ||
    is_guest.value.toString() == ""
  ) {
    return true;
  }

  // save list
  let castDetailsData = cast_details.value.find((item) => {
    return item.people_id == people_id.value && item.id == people.value.id;
  });

  if (castDetailsData) {
    let castDetailsData2 = cast_details.value.find((item) => {
      return (
        item.people_id == people_id.value &&
        item.job == job.value &&
        item.character_name == character_name.value
      );
    });

    if (!castDetailsData2) {
      castDetailsData.job = job.value;
      castDetailsData.character_name = character_name.value;
      castDetailsData.is_guest = is_guest.value;

      castDetailsData.action_type == "a"
        ? (castDetailsData.action_type = "a")
        : (castDetailsData.action_type = "e");
    } else {
      if (props.itemType == "tv") {
        if (castDetailsData2.id !== people.value.id) {
          guestClick.value = false;
        }
        if (castDetailsData2 && guestClick.value) {
          castDetailsData.is_guest = is_guest.value;
        } else {
          if (castDetailsData.action_type == "a") {
            cast_details.value.splice(
              cast_details.value.indexOf(castDetailsData),
              1
            );
          } else {
            if (castType.value == "add") {
              castDetailsData.action_type = "d";
            }
          }
        }
      } else {
        if (castDetailsData2.id !== people.value.id) {
          guestClick.value = false;
        }
        if (castDetailsData2 && guestClick.value) {
          castDetailsData.is_guest = is_guest.value;
        } else {
          if (castType.value == "add") {
            cast_details.value.splice(
              cast_details.value.indexOf(castDetailsData),
              1
            );
          }
        }
      }
    }
  } else {
    let castDetailsData2 = cast_details.value.find((item) => {
      return (
        item.people_id == people_id.value &&
        item.job == job.value &&
        item.character_name == character_name.value
      );
    });
    if (!castDetailsData2) {
      cast_details.value.push({
        people_id: people_id.value,
        cast_name: people.value.people_name || people.value.cast_name,
        poster: people.value.people_poster || people.value.poster,
        character_name: character_name.value,
        job: job.value,
        is_guest: is_guest.value,
        id: cast_details.value.length + 1,
        action_type: "a",
      });
    } else {
      castDetailsData2.job = job.value;
      castDetailsData2.character_name = character_name.value;
      castDetailsData2.is_guest = is_guest.value;
      castDetailsData2.action_type == "a"
        ? (castDetailsData2.action_type = "a")
        : (castDetailsData2.action_type = "e");
    }
  }

  isAddInfoModal.value = false;
  shows.value = false;
  character_name.value = "";
  job.value = null;
  is_guest.value = "";
  people_id.value = "";
  search_text.value = "";
  creditList.value = [];
  guestClick.value = false;
  const body = document.body;
  body.classList.remove("dark-modal-open");
};

//remove crew info
const removeCrewInfoModal = (item) => {
  people.value = item;
  let crewDetailsData = crew_details.value.find((item) => {
    return item.id == people.value.id;
  });
  if (crewDetailsData) {
    if (props.itemType == "tv") {
      if (crewDetailsData.action_type == "a") {
        crew_details.value.splice(
          crew_details.value.indexOf(crewDetailsData),
          1
        );
      } else {
        crewDetailsData.action_type = "d";
      }
    } else {
      crew_details.value.splice(
        crew_details.value.indexOf(crewDetailsData),
        1
      );
    }
  }
};

// add crew info
const addCrewInformation = () => {
  if (job.value == null) {
    return true;
  }

  let crewDetailsData = crew_details.value.find((item) => {
    return item.people_id == people_id.value && item.id == people.value.id;
  });

  if (crewDetailsData) {
    let crewDetailsData2 = crew_details.value.find((item) => {
      return item.people_id == people_id.value && item.job == job.value;
    });
    if (!crewDetailsData2) {
      crewDetailsData.job = job.value;
      crewDetailsData.action_type == "a"
        ? (crewDetailsData.action_type = "a")
        : (crewDetailsData.action_type = "e");
    } else {
      if (props.itemType == "tv") {
        if (crewDetailsData.action_type == "a") {
          crew_details.value.splice(
            crew_details.value.indexOf(crewDetailsData),
            1
          );
        } else {
          if (crewType.value == "add") {
            crewDetailsData.action_type = "d";
          }
        }
      } else {
        if (crewType.value == "add") {
          crew_details.value.splice(
            crew_details.value.indexOf(crewDetailsData),
            1
          );
        }
      }
    }
  } else {
    let crewDetailsData2 = crew_details.value.find((item) => {
      return item.people_id == people_id.value && item.job == job.value;
    });

    if (!crewDetailsData2) {
      crew_details.value.push({
        people_id: people_id.value,
        job: job.value,
        id: crew_details.value.length + 1,
        action_type: "a",
        poster: people.value.people_poster || people.value.poster,
        cast_name: people.value.people_name || people.value.cast_name,
      });
    } else {
      crewDetailsData2.job = job.value;
      crewDetailsData2.action_type == "a"
        ? (crewDetailsData2.action_type = "a")
        : (crewDetailsData2.action_type = "e");
    }
  }

  isCrewInfoModal.value = false;
  shows1.value = false;
  character_name.value = "";
  job.value = null;
  is_guest.value = "";
  people_id.value = "";
  search_crew_text.value = "";
  crewList.value = [];
  const body = document.body;
  body.classList.remove("dark-modal-open");
};

const submitCreditDetails = () => {
  saveCreditDetails();
};

const addCreditDetails = () => {
  isSubmit.value = true;
};

const isEditBtn = () => {
  isEdit.value = false;
  emit("isEditOn", false);
};

// add details
const saveCreditDetails = () => {
  let cast = [];
  let crew = [];
  let castmergedArray = [...cast_details.value, ...tmdbClickCast.value];
  let crewmergedArray = [...crew_details.value, ...tmdbClickCrew.value];
  if (route.params.type == "internal") {
    Array.from(castmergedArray).forEach((item, i) => {
      cast.push({
        action_type: item.action_type,
        character_name: item.character_name,
        people_id: item.people_id,
        job: item.job,
        is_guest: item.is_guest,
        cast_name: item.cast_name,
        poster: item.poster,
        temp_id: item.id,
        tmdb_id: item.tmdb_id ? item.tmdb_id : null,
        id: item.exist_id ? item.exist_id : "",
        order: i,
      });
    });

    Array.from(crewmergedArray).forEach((item, i) => {
      crew.push({
        action_type: item.action_type,
        people_id: item.people_id,
        job: item.job,
        cast_name: item.cast_name,
        poster: item.poster,
        temp_id: item.id,
        tmdb_id: item.tmdb_id ? item.tmdb_id : null,
        id: item.exist_id ? item.exist_id : "",
        order: i,
      });
    });
  } else {
    Array.from(cast_details.value).forEach((item, i) => {
      cast.push({
        action_type: item.action_type,
        character_name: item.character_name,
        people_id: item.people_id,
        job: item.job,
        is_guest: item.is_guest,
        cast_name: item.cast_name,
        poster: item.poster,
        temp_id: item.id,
        tmdb_id: item.tmdb_id ? item.tmdb_id : null,
        order: i,
      });
    });

    Array.from(crew_details.value).forEach((item, i) => {
      crew.push({
        action_type: item.action_type,
        people_id: item.people_id,
        job: item.job,
        cast_name: item.cast_name,
        poster: item.poster,
        temp_id: item.id,
        tmdb_id: item.tmdb_id ? item.tmdb_id : null,
        order: i,
      });
    });
  }

  const draft_ids = JSON.parse(localStorage.getItem("draft_ids") || "[]");
  if (draft_ids[0] && route.params.type == "internal") {
    draft_request_id.value = draft_ids[0]?.primaryDetails[type.value][
      props.site_language
    ]?.draft_request_id
      ? draft_ids[0]?.primaryDetails[type.value][props.site_language]
        ?.draft_request_id
      : draft_ids[0]?.primaryDetails[type.value].draft_relation_id
        ? draft_ids[0]?.primaryDetails[type.value].draft_relation_id
        : "";
  }

  // console.log("crew", crew_details.value);
  let credentials = {
    draft_request_id: draft_request_id.value || routeId.value,
    draft_credit_id: draft_credit_id.value,
    title_type: props.itemType == "tv" ? "tv" : "movie",
    site_language: props.site_language,
    cast_details: cast,
    crew_details: crew,
    season_id: season_id.value || "",
  };
  let saveCreditDetails;
  if (route.params.type == "internal") {
    credentials.title_id = title_id;
    if (props.itemType == "tv") {
      credentials["season_id"] = exist_season_id.value;
      credentials["draft_season_id"] = season_id.value;
    }
    saveCreditDetails = editMovieService.editCreditDetails(credentials);
  } else {
    saveCreditDetails = addNewMovieService.addCreditDetails(credentials);
  }
  saveCreditDetails
    .then((res) => {
      if (res.status == 200) {
        draft_credit_id.value = res.data.data[0].draft_credit_id;
        props.saveIdList.credit_request_id =
          res.data.data[0].draft_credit_id;
        emit("selectedId", props.saveIdList);
        localStorage.setItem(
          "saveIdList",
          JSON.stringify(props.saveIdList)
        );
        cast_details.value = [];
        crew_details.value = [];
        isSubmit.value = false;
        cast = [];
        crew = [];
        if (route.params.type == "internal") {
          istmDBIdClick.value = false;
          isEdit.value = true;
          emit("isEditOn", true);
          const draft_ids = JSON.parse(
            localStorage.getItem("draft_ids") || "[]"
          );

          if (draft_ids[0]) {
            const res_option_type =
              draft_ids[0].primaryDetails[props.itemType][
                props.site_language
              ]?.draft_request_id;

            if (!res_option_type) {
              draft_ids[0].primaryDetails[props.itemType][
                props.site_language
              ] = res.data.data[0];
            }
          } else {
            const put_primary_details = {
              primaryDetails: {
                [props.itemType]: {
                  [props.site_language]: {
                    draft_request_id: res.data.data[0].draft_request_id,
                    draft_credit_id: res.data.data[0].draft_credit_id,
                  },
                  draft_relation_id: res.data.data[0].draft_request_id,
                },
              },
            };
            draft_ids.push(put_primary_details);
          }
          // Saving
          localStorage.setItem("draft_ids", JSON.stringify(draft_ids));
          localStorage.setItem("tmdb_id", tmdb_id.value);

          if (props.itemType == "movie") {
            router.push({
              name: "AddNewMovieForm",
              params: {
                external_id: title_id,
                type: "internal",
                id: res.data.data[0].draft_request_id,
                itemActive: "credit",
                activeIndex: "2",
              },
            });
          } else {
            router.push({
              name: "AddNewTVDetails",
              params: {
                external_id: title_id,
                type: "internal",
                id: res.data.data[0].draft_request_id,
                itemActive: "credit",
                activeIndex: "4",
              },
            });
          }
        }
        creditCastRequestList();
        creditCrewRequestList();
        Toast.fire({ title: t("Error.success") });
      } else {
        isSubmit.value = false;
        Toast.fire({ title: res.response.data.error });
      }
    })
    .catch((err) => {
      isSubmit.value = false;
      Toast.fire({ title: err.response.data.error });
      console.log(err);
    });
};

const onFileChange = (e) => {
  let files = e.target.files || e.dataTransfer.files;
  if (!files.length) return;
  file.value = files[0];
  let fileSize = e.target.files[0].size;
  let allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
  if (!allowedExtensions.exec(file.value.name)) {
    Toast.fire({ title: t("Error.onlyJpg") });
    url.value = "";
    document.querySelector("#img-picker-1").value = "";
    return false;
  } else if (fileSize > 1024 * 1024 * 25) {
    Toast.fire({ title: t("Error.uploadFileSize") });
    url.value = "";
    document.querySelector("#img-picker-1").value = "";
    return false;
  } else if (allowedExtensions.exec(file.value.name)) {
    let fileName = file.value.name;
    url.value = URL.createObjectURL(e.target.files[0]);
  }
};

// create cast info
const createCastInfo = () => {
  //validation
  if (
    character_name.value == "" ||
    job.value == null ||
    is_guest.value == "" ||
    cast_name.value == "" ||
    file.value == ""
  ) {
    return true;
  }
  isCreateNewCast.value = true;
  let formData = new FormData();
  if (route.params.type == "internal") {
    formData.append("title_id", title_id);
  }
  formData.append(
    "draft_request_id",
    draft_request_id.value || routeId.value
      ? draft_request_id.value || routeId.value
      : ""
  );
  formData.append("site_language", props.site_language);
  formData.append("image", file.value);
  formData.append("credit_type", "cast");
  formData.append("cast_name", cast_name.value);
  formData.append("job_title", job.value);
  formData.append("character_name", character_name.value);
  formData.append("is_guest", is_guest.value);

  let createCastCredit;
  if (route.params.type == "internal") {
    // formData.append("title_id", title_id);
    createCastCredit = editMovieService.createNewCredit(formData, title_id);
  } else {
    createCastCredit = addNewMovieService.createNewCredit(formData);
  }
  createCastCredit
    .then((res) => {
      if (res.status == 200) {
        // console.log(res.data.credit_details);
        isCreateNewCast.value = false;

        cast_details.value.push({
          people_id: "",
          character_name: character_name.value,
          job: job.value,
          is_guest: is_guest.value,
          cast_name: res.data.credit_details.cast_name,
          poster: res.data.credit_details.image_location,
          id: cast_details.value.length + 1,
          action_type: "a",
        });

        isCreateInfoModal.value = false;
        shows.value = false;
        character_name.value = "";
        job.value = null;
        is_guest.value = "";
        people_id.value = "";
        cast_name.value = "";
        search_text.value = "";
        creditList.value = [];
        guestClick.value = false;
        const body = document.body;
        body.classList.remove("dark-modal-open");
      } else {
        isCreateNewCast.value = false;
        Toast.fire({ title: res.response.data.error });
      }
    })
    .catch((err) => {
      return;
    });
};

// create crew info
const createCrewInfo = () => {
  if (job.value == null || cast_name.value == "" || file.value == "") {
    return true;
  }
  isCreateNewCrew.value = true;
  let formData = new FormData();
  if (route.params.type == "internal") {
    formData.append("title_id", title_id);
  }
  formData.append(
    "draft_request_id",
    draft_request_id.value || routeId.value
      ? draft_request_id.value || routeId.value
      : ""
  );
  formData.append("site_language", props.site_language);
  formData.append("credit_type", "crew");
  formData.append("cast_name", cast_name.value);
  formData.append("job_title", job.value);
  formData.append("image", file.value);

  let createCrewCredit;
  if (route.params.type == "internal") {
    // formData.append("title_id", title_id);
    createCrewCredit = editMovieService.createNewCredit(formData, title_id);
  } else {
    createCrewCredit = addNewMovieService.createNewCredit(formData);
  }
  createCrewCredit
    .then((res) => {
      if (res.status == 200) {
        isCreateNewCrew.value = false;

        crew_details.value.push({
          people_id: "",
          job: job.value,
          cast_name: res.data.credit_details.cast_name,
          poster: res.data.credit_details.image_location,
          id: crew_details.value.length + 1,
          action_type: "a",
        });

        isCrewCreateInfoModal.value = false;
        shows1.value = false;
        character_name.value = "";
        job.value = null;
        is_guest.value = "";
        cast_name.value = "";
        people_id.value = "";
        search_crew_text.value = "";
        crewList.value = [];
        const body = document.body;
        body.classList.remove("dark-modal-open");
      } else {
        isCreateNewCrew.value = false;
        Toast.fire({ title: res.response.data.error });
      }
    })
    .catch((err) => {
      return;
    });
};

//tab change
const getTabName = (tab) => {
  if (tab == "addNewPeople.cast") {
    search_crew_text.value = "";
    search_text.value = "";
    creditList.value = [];
    shows.value = false;
  }
  if (tab == "addNewPeople.crew") {
    search_crew_text.value = "";
    search_text.value = "";
    crewList.value = [];
    shows1.value = false;
  }
};

const isGuestClick = () => {
  guestClick.value = true;
  setTimeout(() => {
    isGuestValue.value = is_guest.value;
  }, 500);
};

const closeModal = () => {
  isAddInfoModal.value = false;
  job.value = null;
  character_name.value = "";
  is_guest.value = "";
  guestClick.value = false;
  isCreateInfoModal.value = false;
  url.value = "";
  cast_name.value = "";
  isCrewInfoModal.value = false;
  isCrewCreateInfoModal.value = false;
  const body = document.body;
  body.classList.remove("dark-modal-open");
};

const createInfoModal = () => {
  isCreateInfoModal.value = true;
  url.value = "";
  const body = document.body;
  body.classList.add("dark-modal-open");
};

const createCrewInfoModal = () => {
  isCrewCreateInfoModal.value = true;
  url.value = "";
  const body = document.body;
  body.classList.add("dark-modal-open");
};

const resetCastList = () => {
  castPage.value = 1;
};
const resetCrewList = () => {
  crewPage.value = 1;
};

const gotoPeoplePage = (id) => {
  const link = document.createElement("a");
  link.href = `/people/details/${id}`;
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
};

</script>

<style lang="scss" scoped>
.error-url {
  color: red !important;
}

.tv-no-data {
  min-height: 160px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.img-icon {
  input {
    height: 68px;
    width: 68px;
    position: absolute;
    text-indent: -999px;
    cursor: pointer;
  }
}

.with-dropdown {
  margin: 0 0 30px 0;
  justify-content: flex-start !important;

  h2 {
    margin: 0 20px 0 0 !important;
  }

  select {
    width: 214px;
    height: 44px;
    border: 1px solid #a4a4a4;
    border-radius: 4px;
    background-color: transparent;
    background: url(@//assets/icons/arrow-down2.svg) right 12px center no-repeat;
    color: #fff;
    font-weight: 500;
    font-size: 14px;
    line-height: 140%;
    padding: 0 12px;
  }
}
</style>
