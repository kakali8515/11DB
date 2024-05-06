<template>
  <div class="tab-outr small four w-auto" id="comment-data">
    <TabWrapper @selectedTab="selectedTab" :activeTab="selectTab">
      <Tabs title="communityCard.comments">
        <div class="share-otr">
          <div class="share-input-innr">
            <input type="text" maxlength="18000" class="form-control" :placeholder="$t('communityCard.sharewhatsnew')"
              v-model="message_text" />
            <span>
              <input type="file" class="form-control file-upload-button" v-on:change="selectMessageImage" />
              <img class="upload-img" v-if="message_url" :src="message_url" :alt="message_url" />
              <img v-else src="@/assets/icons/share-icon.svg" alt="" />
            </span>
          </div>
          <input type="submit" class="btn solid orange-btn" :value="$t('button.send')" :disabled="message_text == ''"
            :class="message_text == '' ? 'isDisabled' : ''" @click="sendMessage" />
        </div>
        <div class="checkbox-inn">
          <label class="checkbox-input">
            {{ $t("movies.spoiler") }}
            <input type="checkbox" v-model="is_message_spoiler" />
            <span class="checkmark"></span>
          </label>
        </div>
        <div class="user-review-box" v-if="newCommunityResult.length > 0">
          <ul class="outr-list" @scroll="handleScroll">
            <li v-for="(community, i) in newCommunityResult" :key="i">
              <div class="user-comment-list">
                <div :class="['user-review-icon', community.user_image ? '' : 'no-add-image']">
                  <figure v-if="community.user_image">
                    <img :src="community.user_image" alt="" />
                  </figure>
                  <figure v-else>
                    <img src="@/assets/icons/user-icon.svg" alt="" class="dark-th" />
                    <img src="@/assets/icons/user-icon-gray.svg" alt="" class="light-th" />
                  </figure>
                </div>
                <div class="user-review-txt">
                  <div class="user-review-top">
                    <h4>{{ community.user_name }}</h4>
                    <ul>
                      <li>
                        {{ dateformat(community.message_date) }}
                      </li>
                      <li>
                        {{ getDateformat(community.message_date, "time") }}
                      </li>
                    </ul>
                  </div>
                  <div v-if="community.is_spoiler == 'y'">
                    <a class="spoiler-btn" :class="{ show: community.is_RevealHideSpoiler }"
                      @click="revealHideSpoilerCommunity(community)" :aria-pressed="community.is_RevealHideSpoiler ? 'true' : 'false'
                        ">
                      <em class="reveal">{{ $t("movies.revealSpoiler") }} </em>
                      <em class="hide">{{ $t("movies.hideSpoiler") }} </em>
                      <span class="down-arrow"><img src="@/assets/icons/down-arrow-blue.svg" alt="" /></span>
                      <span class="up-arrow"><img src="@/assets/icons/up-arrow-blue.svg" alt="" /></span>
                    </a>

                    <div class="spoiler-box comment-img-area" :class="{ show: community.is_RevealHideSpoiler }">
                      <p v-if="community.message.length > 650 && !community.readMore">
                        {{ community.message.substring(0, 650) + "..." }}
                        <span class="community-text cursor-pointer" @click="getReadMore(community)">{{
                          $t("display.ReadMore") }}</span>
                      </p>
                      <p v-if="community.readMore || community.message.length < 650">{{ community.message }}
                        <span class="community-text cursor-pointer" v-if="community.readMore"
                          @click="getReadMore(community)">{{
                            $t("display.Hide") }}</span>
                      </p>
                      <img v-if="community.attachment_image" :src="community.attachment_image"
                        :alt="community.attachment_image"
                        @click="isImageModal = true, imageView = community.attachment_image" class="cursor-pointer" />
                    </div>
                  </div>

                  <div class="comment-img-area" v-if="community.is_spoiler == 'n'">
                    <p v-if="community.message.length > 650 && !community.readMore">
                      {{ community.message.substring(0, 650) + "..." }}
                      <span class="community-text cursor-pointer" @click="getReadMore(community)">{{
                        $t("display.ReadMore") }}</span>
                    </p>
                    <p v-if="community.readMore || community.message.length < 650">{{ community.message }}
                      <span class="community-text cursor-pointer" v-if="community.readMore"
                        @click="getReadMore(community)">{{
                          $t("display.Hide") }}</span>
                    </p>
                    <img v-if="community.attachment_image" :src="community.attachment_image"
                      :alt="community.attachment_image"
                      @click="isImageModal = true, imageView = community.attachment_image" class="cursor-pointer" />
                  </div>

                  <ul class="review-list mt-16-in">
                    <li>
                      <a v-if="community.is_liked == 'y'" @click="communityLike(community)" class="like"><img
                          src="@/assets/icons/like-icon-red.svg" alt="" />
                        {{ community.number_of_like }}</a>
                      <a v-else @click="communityLike(community)"><img src="@/assets/icons/like-icon-blk2.svg" alt=""
                          class="light-th" />
                        <img src="@/assets/icons/like-white.svg" alt="" class="dark-th" />
                        {{ community.number_of_like }}</a>
                    </li>
                    <li>
                      <a @click="displayReplySection(community)"><img src="@/assets/icons/list-icon3.svg" class="dark-th"
                          alt="" />
                        <img src="@/assets/icons/chat-icon-blk.svg" class="light-th" alt="" />
                        {{ $t("general.reply") }} ({{ community.reply.length }})</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="right-align-list" v-if="community.is_ReplyShow">
                <ul class="review-innr-list">
                  <li v-for="(reply, i) in community.reply" :key="i">
                    <div class="user-comment-list">
                      <div :class="['user-review-icon', reply.user_image ? '' : 'no-add-image']">
                        <figure v-if="reply.user_image">
                          <img :src="reply.user_image" alt="" />
                        </figure>
                        <figure v-else>
                          <img src="@/assets/icons/user-icon.svg" alt="" class="dark-th" />
                          <img src="@/assets/icons/user-icon-gray.svg" alt="" class="light-th" />
                        </figure>
                      </div>
                      <div class="user-review-txt">
                        <div class="user-review-top">
                          <h4>{{ reply.user_name }}</h4>
                          <ul>
                            <li>
                              {{ dateformat(reply.reply_date) }}
                            </li>
                            <li>
                              {{ getDateformat(reply.reply_date, "time") }}
                            </li>
                          </ul>
                        </div>
                        <div v-if="reply.is_spoiler == 'y'">
                          <a class="spoiler-btn" :class="{ show: reply.is_RevealHideSpoiler }"
                            @click="displayReplyDetails(reply)">
                            <em class="reveal">{{ $t("movies.revealSpoiler") }}
                            </em>
                            <em class="hide">{{ $t("movies.hideSpoiler") }}
                            </em>
                            <span class="down-arrow"><img src="@/assets/icons/down-arrow-blue.svg" alt="" /></span>
                            <span class="up-arrow"><img src="@/assets/icons/up-arrow-blue.svg" alt="" /></span>
                          </a>
                          <div class="spoiler-box comment-img-area" :class="{ show: reply.is_RevealHideSpoiler }">
                            <p v-if="reply.reply_message.length > 600 && !reply.readMore">
                              {{ reply.reply_message.substring(0, 600) + "..." }}
                              <span class="community-text cursor-pointer" @click="getReplyReadMore(reply)">{{
                                $t("display.ReadMore") }}</span>
                            </p>
                            <p v-if="reply.readMore || reply.reply_message.length < 600">{{ reply.reply_message }}
                              <span class="community-text cursor-pointer" v-if="reply.readMore"
                                @click="getReplyReadMore(reply)">{{
                                  $t("display.Hide") }}</span>
                            </p>
                            <img v-if="reply.attachment_image" :src="reply.attachment_image" :alt="reply.attachment_image"
                              @click="isImageModal = true, imageView = reply.attachment_image" class="cursor-pointer" />
                          </div>
                        </div>

                        <div class="comment-img-area" v-if="reply.is_spoiler == 'n'">
                          <p v-if="reply.reply_message.length > 600 && !reply.readMore">
                            {{ reply.reply_message.substring(0, 600) + "..." }}
                            <span class="community-text cursor-pointer" @click="getReplyReadMore(reply)">{{
                              $t("display.ReadMore") }}</span>
                          </p>
                          <p v-if="reply.readMore || reply.reply_message.length < 600">{{ reply.reply_message }}
                            <span class="community-text cursor-pointer" v-if="reply.readMore"
                              @click="getReplyReadMore(reply)">{{
                                $t("display.Hide") }}</span>
                          </p>
                          <img v-if="reply.attachment_image" :src="reply.attachment_image" :alt="reply.attachment_image"
                            @click="isImageModal = true, imageView = reply.attachment_image" class="cursor-pointer" />
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
                <div class="share-otr">
                  <div class="share-input-innr">
                    <input type="text" maxlength="18000" class="form-control reply-text"
                      :placeholder="$t('communityCard.sharewhatsnew')" :id="'reply-text' + community.id"
                      @keyup="replyTyping($event, community)" />
                    <span>
                      <input type="file" class="form-control file-upload-button"
                        v-on:change="selectMessageReplyImage($event, community)" />
                      <img src="@/assets/icons/share-icon.svg" :id="'message_reply_image' + community.id" />
                      <!-- <img v-else src="@/assets/icons/share-icon.svg" alt=""/> -->
                    </span>
                  </div>
                  <input type="submit" class="btn solid orange-btn isDisabled" :value="$t('button.send')"
                    @click="sendReply(community)" :id="'comments_send_button' + community.id" disabled />
                </div>
                <div class="checkbox-inn">
                  <label class="checkbox-input">
                    {{ $t("movies.spoiler") }}
                    <input type="checkbox" :id="'is_reply_spoiler' + community.id" />
                    <span class="checkmark"></span>
                  </label>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="no-data-wrapper mr-bottom-0" v-else>
          <p>{{ $t("searchResults.noData") }}</p>
        </div>
      </Tabs>
      <Tabs title="communityCard.trivia">
        <div class="share-otr">
          <div class="share-input-innr">
            <input type="text" maxlength="18000" class="form-control" :placeholder="$t('communityCard.sharewhatsnew')"
              v-model="message_text" />
            <span>
              <input type="file" class="form-control file-upload-button" v-on:change="selectMessageImage" />
              <img class="upload-img" v-if="message_url" :src="message_url" :alt="message_url" />
              <img v-else src="@/assets/icons/share-icon.svg" alt="" />
            </span>
          </div>
          <input type="submit" class="btn solid orange-btn" :value="$t('button.send')" :disabled="message_text == ''"
            :class="message_text == '' ? 'isDisabled' : ''" @click="sendMessage" />
        </div>
        <div class="checkbox-inn">
          <label class="checkbox-input">
            {{ $t("movies.spoiler") }}
            <input type="checkbox" v-model="is_message_spoiler" />
            <span class="checkmark"></span>
          </label>
        </div>
        <div class="user-review-box" v-if="newCommunityResult.length > 0">
          <ul class="outr-list" @scroll="handleScroll">
            <li v-for="(community, i) in newCommunityResult" :key="i">
              <div class="user-comment-list">
                <div :class="['user-review-icon', community.user_image ? '' : 'no-add-image']">
                  <figure v-if="community.user_image">
                    <img :src="community.user_image" alt="" />
                  </figure>
                  <figure v-else>
                    <img src="@/assets/icons/user-icon.svg" alt="" class="dark-th" />
                    <img src="@/assets/icons/user-icon-gray.svg" alt="" class="light-th" />
                  </figure>
                </div>
                <div class="user-review-txt">
                  <div class="user-review-top">
                    <h4>{{ community.user_name }}</h4>
                    <ul>
                      <li>
                        {{ dateformat(community.message_date) }}
                      </li>
                      <li>
                        {{ getDateformat(community.message_date, "time") }}
                      </li>
                    </ul>
                  </div>
                  <div v-if="community.is_spoiler == 'y'">
                    <a class="spoiler-btn" :class="{ show: community.is_RevealHideSpoiler }"
                      @click="revealHideSpoilerCommunity(community)" :aria-pressed="community.is_RevealHideSpoiler ? 'true' : 'false'
                        ">
                      <em class="reveal">{{ $t("movies.revealSpoiler") }}</em>
                      <em class="hide">{{ $t("movies.hideSpoiler") }}</em>
                      <span class="down-arrow"><img src="@/assets/icons/down-arrow-blue.svg" alt="" /></span>
                      <span class="up-arrow"><img src="@/assets/icons/up-arrow-blue.svg" alt="" /></span>
                    </a>

                    <div class="spoiler-box comment-img-area" :class="{ show: community.is_RevealHideSpoiler }">
                      <p v-if="community.message.length > 650 && !community.readMore">
                        {{ community.message.substring(0, 650) + "..." }}
                        <span class="community-text cursor-pointer" @click="getReadMore(community)">{{
                          $t("display.ReadMore") }}</span>
                      </p>
                      <p v-if="community.readMore || community.message.length < 650">{{ community.message }}
                        <span class="community-text cursor-pointer" v-if="community.readMore"
                          @click="getReadMore(community)">{{
                            $t("display.Hide") }}</span>
                      </p>
                      <img v-if="community.attachment_image" :src="community.attachment_image"
                        :alt="community.attachment_image"
                        @click="isImageModal = true, imageView = community.attachment_image" class="cursor-pointer" />
                    </div>
                  </div>

                  <div class="comment-img-area" v-if="community.is_spoiler == 'n'">
                    <p v-if="community.message.length > 650 && !community.readMore">
                      {{ community.message.substring(0, 650) + "..." }}
                      <span class="community-text cursor-pointer" @click="getReadMore(community)">{{
                        $t("display.ReadMore") }}</span>
                    </p>
                    <p v-if="community.readMore || community.message.length < 650">{{ community.message }}
                      <span class="community-text cursor-pointer" v-if="community.readMore"
                        @click="getReadMore(community)">{{
                          $t("display.Hide") }}</span>
                    </p>
                    <img v-if="community.attachment_image" :src="community.attachment_image"
                      :alt="community.attachment_image"
                      @click="isImageModal = true, imageView = community.attachment_image" class="cursor-pointer" />
                  </div>

                  <ul class="review-list mt-16-in">
                    <li>
                      <a v-if="community.is_liked == 'y'" @click="communityLike(community)" class="like"><img
                          src="@/assets/icons/like-icon-red.svg" alt="" />
                        {{ community.number_of_like }}</a>
                      <a v-else @click="communityLike(community)"><img src="@/assets/icons/like-icon-blk2.svg" alt=""
                          class="light-th" />
                        <img src="@/assets/icons/like-white.svg" alt="" class="dark-th" />
                        {{ community.number_of_like }}</a>
                    </li>
                    <li>
                      <a @click="displayReplySection(community)"><img src="@/assets/icons/list-icon3.svg" class="dark-th"
                          alt="" />
                        <img src="@/assets/icons/chat-icon-blk.svg" class="light-th" alt="" />
                        {{ $t("general.reply") }} ({{ community.reply.length }})</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="right-align-list" v-if="community.is_ReplyShow">
                <ul class="review-innr-list">
                  <li v-for="(reply, i) in community.reply" :key="i">
                    <div class="user-comment-list">
                      <div :class="['user-review-icon', reply.user_image ? '' : 'no-add-image']">
                        <figure v-if="reply.user_image">
                          <img :src="reply.user_image" alt="" />
                        </figure>
                        <figure v-else>
                          <img src="@/assets/icons/user-icon.svg" alt="" class="dark-th" />
                          <img src="@/assets/icons/user-icon-gray.svg" alt="" class="light-th" />
                        </figure>
                      </div>
                      <div class="user-review-txt">
                        <div class="user-review-top">
                          <h4>{{ reply.user_name }}</h4>
                          <ul>
                            <li>
                              {{ dateformat(reply.reply_date) }}
                            </li>
                            <li>
                              {{ getDateformat(reply.reply_date, "time") }}
                            </li>
                          </ul>
                        </div>
                        <div v-if="reply.is_spoiler == 'y'">
                          <a class="spoiler-btn" :class="{ show: reply.is_RevealHideSpoiler }"
                            @click="displayReplyDetails(reply)">
                            <em class="reveal">{{
                              $t("movies.revealSpoiler")
                            }}</em>
                            <em class="hide">{{ $t("movies.hideSpoiler") }}
                            </em>
                            <span class="down-arrow"><img src="@/assets/icons/down-arrow-blue.svg" alt="" /></span>
                            <span class="up-arrow"><img src="@/assets/icons/up-arrow-blue.svg" alt="" /></span>
                          </a>
                          <div class="spoiler-box comment-img-area" :class="{ show: reply.is_RevealHideSpoiler }">
                            <p v-if="reply.reply_message.length > 600 && !reply.readMore">
                              {{ reply.reply_message.substring(0, 600) + "..." }}
                              <span class="community-text cursor-pointer" @click="getReplyReadMore(reply)">{{
                                $t("display.ReadMore") }}</span>
                            </p>
                            <p v-if="reply.readMore || reply.reply_message.length < 600">{{ reply.reply_message }}
                              <span class="community-text cursor-pointer" v-if="reply.readMore"
                                @click="getReplyReadMore(reply)">{{
                                  $t("display.Hide") }}</span>
                            </p>
                            <img v-if="reply.attachment_image" :src="reply.attachment_image" :alt="reply.attachment_image"
                              @click="isImageModal = true, imageView = reply.attachment_image" class="cursor-pointer" />
                          </div>
                        </div>

                        <div class="comment-img-area" v-if="reply.is_spoiler == 'n'">
                          <p v-if="reply.reply_message.length > 600 && !reply.readMore">
                            {{ reply.reply_message.substring(0, 600) + "..." }}
                            <span class="community-text cursor-pointer" @click="getReplyReadMore(reply)">{{
                              $t("display.ReadMore") }}</span>
                          </p>
                          <p v-if="reply.readMore || reply.reply_message.length < 600">{{ reply.reply_message }}
                            <span class="community-text cursor-pointer" v-if="reply.readMore"
                              @click="getReplyReadMore(reply)">{{
                                $t("display.Hide") }}</span>
                          </p>
                          <img v-if="reply.attachment_image" :src="reply.attachment_image" :alt="reply.attachment_image"
                            @click="isImageModal = true, imageView = reply.attachment_image" class="cursor-pointer" />
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
                <div class="share-otr">
                  <div class="share-input-innr">
                    <input type="text" maxlength="18000" class="form-control reply-text"
                      :placeholder="$t('communityCard.sharewhatsnew')" :id="'trivia-reply-text' + community.id"
                      @keyup="replyTyping($event, community)" />
                    <span>
                      <input type="file" class="form-control file-upload-button"
                        v-on:change="selectMessageReplyImage($event, community)" />
                      <img src="@/assets/icons/share-icon.svg" :id="'trivia_message_reply_image' + community.id" />
                      <!-- <img v-else src="@/assets/icons/share-icon.svg" alt=""
            /> -->
                    </span>
                  </div>
                  <input type="submit" class="btn solid orange-btn isDisabled" :value="$t('button.send')"
                    @click="sendReply(community)" :id="'trivia_send_button' + community.id" disabled />
                </div>
                <div class="checkbox-inn">
                  <label class="checkbox-input">
                    {{ $t("movies.spoiler") }}
                    <input type="checkbox" :id="'trivia_is_reply_spoiler' + community.id" />
                    <span class="checkmark"></span>
                  </label>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="no-data-wrapper mr-bottom-0" v-else>
          <p>{{ $t("searchResults.noData") }}</p>
        </div>
      </Tabs>
      <Tabs title="communityCard.famousLines">
        <div class="share-otr">
          <div class="share-input-innr famous-input-innr">
            <input type="text" maxlength="18000" class="form-control" :placeholder="$t('communityCard.sharewhatsnew')"
              v-model="message_text" />
            <!-- <span><img src="@/assets/icons/share-icon.svg" alt="" /></span> -->
          </div>
          <input type="submit" class="btn solid orange-btn" :value="$t('button.send')"
            :disabled="message_text == '' || !current_famouse_id" :class="message_text == '' || !current_famouse_id ? 'isDisabled' : ''
              " @click="sendMessage" />
        </div>
        <div class="cast-dropdown">
          <SearchDropdown @dropdownValue="getCurrentFamousId" :search_type="current_famouse_id"
            :searchTitleListItem="famousLine" searchtitle="name" searchvalue="id" :labelItem="title_type == 'webtoons' ? $t('adminAward.character') : `${$t('movies.cast')}${famous_line_type == 'people'
              ? $t('communityCard.Actor')
              : $t('communityCard.Filmography')
              }`" />
        </div>
        <div class="user-review-box fm-line" v-if="newCommunityResult.length > 0">
          <ul class="outr-list" @scroll="handleScroll">
            <li v-for="(communityFamous, i) in newCommunityResult" :key="i">
              <div class="user-comment-list">
                <div class="user-review-icon line-img">
                  <span><img v-if="type == 'people' && communityFamous.title_image" :src="communityFamous.title_image"
                      alt="" />
                    <img class="cursor-pointer"
                      @click="communityFamous.people_id ? $router.push(`/people/details/${communityFamous.people_id}`) : isCharacterModal = true, characterInfo = communityFamous"
                      v-else-if="type != 'people' && communityFamous.people_image" :src="communityFamous.people_image"
                      alt="" />
                    <img v-else src="@/assets/images/no-image-view.png" alt="" />
                  </span>
                </div>
                <div class="user-review-txt line-txt">
                  <div class="user-review-top">
                    <h4 v-if="type == 'people'">
                      {{ communityFamous.title_name }}
                      <span>{{ communityFamous.character_name }}</span>
                    </h4>
                    <h4 class="cursor-pointer" v-else
                      @click="communityFamous.people_id ? $router.push(`/people/details/${communityFamous.people_id}`) : isCharacterModal = true, characterInfo = communityFamous">
                      {{ title_type != 'webtoons' ? communityFamous.people_name : communityFamous.people_character }}
                      <span>{{ title_type != 'webtoons' ? communityFamous.people_character : '' }}</span>
                    </h4>
                    <ul>
                      <li>
                        {{
                          dateformat(communityFamous.message_date)
                        }}
                      </li>
                      <li>
                        {{
                          getDateformat(communityFamous.message_date, "time")
                        }}
                      </li>
                    </ul>
                  </div>
                  <!-- <p>{{ communityFamous.message }}</p> -->
                  <p v-if="communityFamous.message.length > 650 && !communityFamous.readMore">
                    {{ communityFamous.message.substring(0, 650) + "..." }}
                    <span class="community-text cursor-pointer" @click="getReadMore(communityFamous)">{{
                      $t("display.ReadMore") }}</span>
                  </p>
                  <p v-if="communityFamous.readMore || communityFamous.message.length < 650">{{ communityFamous.message }}
                    <span class="community-text cursor-pointer" v-if="communityFamous.readMore"
                      @click="getReadMore(communityFamous)">{{
                        $t("display.Hide") }}</span>
                  </p>
                  <div class="community-btm-otr">
                    <div class="community-btm-img">
                      <span>
                        <img v-if="communityFamous.user_image" :src="communityFamous.user_image"
                          :alt="communityFamous.user_image" />
                        <figure v-else>
                          <img src="@/assets/icons/user-icon.svg" alt="" class="dark-th" />
                          <img src="@/assets/icons/user-icon-gray.svg" alt="" class="light-th" />
                        </figure>
                      </span>
                      <h6>{{ communityFamous.user_name }}</h6>
                    </div>
                    <ul class="review-list">
                      <li>
                        <a v-if="communityFamous.is_liked == 'y'" @click="communityLike(communityFamous)"
                          class="like"><img src="@/assets/icons/like-icon-red.svg" alt="" />
                          {{ communityFamous.number_of_like }}</a>
                        <a v-else @click="communityLike(communityFamous)"><img src="@/assets/icons/like-icon-blk2.svg"
                            alt="" class="light-th" />
                          <img src="@/assets/icons/like-white.svg" alt="" class="dark-th" />
                          {{ communityFamous.number_of_like }}</a>
                      </li>
                      <li>
                        <a @click="displayReplySection(communityFamous)">
                          <img src="@/assets/icons/list-icon3.svg" class="dark-th" alt="" />
                          <img src="@/assets/icons/chat-icon-blk.svg" class="light-th" alt="" />
                          {{ $t("general.reply") }} ({{ communityFamous.reply.length }})</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="right-align-list" v-if="communityFamous.is_ReplyShow">
                <ul class="review-innr-list">
                  <li v-for="(famousReply, i) in communityFamous.reply" :key="i">
                    <div class="user-comment-list">
                      <div :class="['user-review-icon', famousReply.user_image ? '' : 'no-add-image']">
                        <figure v-if="famousReply.user_image">
                          <img :src="famousReply.user_image" alt="" />
                        </figure>
                        <figure v-else>
                          <img src="@/assets/icons/user-icon.svg" alt="" class="dark-th" />
                          <img src="@/assets/icons/user-icon-gray.svg" alt="" class="light-th" />
                        </figure>
                      </div>
                      <div class="user-review-txt">
                        <div class="user-review-top">
                          <h4>{{ famousReply.user_name }}</h4>
                          <ul>
                            <li>
                              {{
                                dateformat(famousReply.reply_date)
                              }}
                            </li>
                            <li>
                              {{
                                getDateformat(famousReply.reply_date, "time")
                              }}
                            </li>
                          </ul>
                        </div>
                        <p v-if="famousReply.reply_message.length > 600 && !famousReply.readMore">
                          {{ famousReply.reply_message.substring(0, 600) + "..." }}
                          <span class="community-text cursor-pointer" @click="getReplyReadMore(famousReply)">{{
                            $t("display.ReadMore") }}</span>
                        </p>
                        <p v-if="famousReply.readMore || famousReply.reply_message.length < 600">{{
                          famousReply.reply_message }}
                          <span class="community-text cursor-pointer" v-if="famousReply.readMore"
                            @click="getReplyReadMore(famousReply)">{{
                              $t("display.Hide") }}</span>
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
                <div class="share-otr">
                  <div class="share-input-innr famous-input-innr">
                    <input type="text" maxlength="18000" class="form-control reply-text"
                      :placeholder="$t('communityCard.sharewhatsnew')" :id="'famous-reply-text' + communityFamous.id"
                      @keyup="replyTyping($event, communityFamous)" />
                    <!-- <span>
                      <input
                        type="file"
                        class="form-control file-upload-button"
                        v-on:change="selectMessageImage" />
                      <img src="@/assets/icons/share-icon.svg" alt=""
                    /></span> -->
                  </div>
                  <input type="submit" class="btn solid orange-btn isDisabled" :value="$t('button.send')"
                    @click="sendReply(communityFamous)" :id="'famous_send_button' + communityFamous.id" disabled />
                </div>
                <div class="checkbox-inn">
                  <!-- <label class="checkbox-input">
                    Spoiler
                    <input type="checkbox" id="is_reply_spoiler" />
                    <span class="checkmark"></span>
                  </label> -->
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="no-data-wrapper mr-bottom-0" v-else>
          <p>{{ $t("searchResults.noData") }}</p>
        </div>
      </Tabs>
      <Tabs title="communityCard.goofs">
        <div class="share-otr">
          <div class="share-input-innr">
            <input type="text" maxlength="18000" class="form-control" :placeholder="$t('communityCard.sharewhatsnew')"
              v-model="message_text" />
            <span>
              <input type="file" class="form-control file-upload-button" v-on:change="selectMessageImage" />
              <img class="upload-img" v-if="message_url" :src="message_url" :alt="message_url" />
              <img v-else src="@/assets/icons/share-icon.svg" alt="" />
            </span>
          </div>
          <input type="submit" class="btn solid orange-btn" :value="$t('button.send')" :disabled="message_text == ''"
            :class="message_text == '' ? 'isDisabled' : ''" @click="sendMessage" />
        </div>
        <div class="checkbox-inn">
          <label class="checkbox-input">
            {{ $t("movies.spoiler") }}
            <input type="checkbox" v-model="is_message_spoiler" />
            <span class="checkmark"></span>
          </label>
        </div>
        <div class="user-review-box" v-if="newCommunityResult.length > 0">
          <ul class="outr-list" @scroll="handleScroll">
            <li v-for="(community, i) in newCommunityResult" :key="i">
              <div class="user-comment-list">
                <div :class="['user-review-icon', community.user_image ? '' : 'no-add-image']">
                  <figure v-if="community.user_image">
                    <img :src="community.user_image" alt="" />
                  </figure>
                  <figure v-else>
                    <img src="@/assets/icons/user-icon.svg" alt="" class="dark-th" />
                    <img src="@/assets/icons/user-icon-gray.svg" alt="" class="light-th" />
                  </figure>
                </div>
                <div class="user-review-txt">
                  <div class="user-review-top">
                    <h4>{{ community.user_name }}</h4>
                    <ul>
                      <li>
                        {{ dateformat(community.message_date) }}
                      </li>
                      <li>
                        {{ getDateformat(community.message_date, "time") }}
                      </li>
                    </ul>
                  </div>
                  <div v-if="community.is_spoiler == 'y'">
                    <a class="spoiler-btn" :class="{ show: community.is_RevealHideSpoiler }"
                      @click="revealHideSpoilerCommunity(community)" :aria-pressed="community.is_RevealHideSpoiler ? 'true' : 'false'
                        ">
                      <em class="reveal"> {{ $t("movies.revealSpoiler") }}</em>
                      <em class="hide">{{ $t("movies.hideSpoiler") }} </em>
                      <span class="down-arrow"><img src="@/assets/icons/down-arrow-blue.svg" alt="" /></span>
                      <span class="up-arrow"><img src="@/assets/icons/up-arrow-blue.svg" alt="" /></span>
                    </a>

                    <div class="spoiler-box comment-img-area" :class="{ show: community.is_RevealHideSpoiler }">
                      <p>
                      <p v-if="community.message.length > 650 && !community.readMore">
                        {{ community.message.substring(0, 650) + "..." }}
                        <span class="community-text cursor-pointer" @click="getReadMore(community)">{{
                          $t("display.ReadMore") }}</span>
                      </p>
                      <p v-if="community.readMore || community.message.length < 650">{{ community.message }}
                        <span class="community-text cursor-pointer" v-if="community.readMore"
                          @click="getReadMore(community)">{{
                            $t("display.Hide") }}</span>
                      </p>
                      </p>
                      <img v-if="community.attachment_image" :src="community.attachment_image"
                        :alt="community.attachment_image"
                        @click="isImageModal = true, imageView = community.attachment_image" class="cursor-pointer" />
                    </div>
                  </div>

                  <div class="comment-img-area" v-if="community.is_spoiler == 'n'">
                    <p>
                    <p v-if="community.message.length > 650 && !community.readMore">
                      {{ community.message.substring(0, 650) + "..." }}
                      <span class="community-text cursor-pointer" @click="getReadMore(community)">{{
                        $t("display.ReadMore") }}</span>
                    </p>
                    <p v-if="community.readMore || community.message.length < 650">{{ community.message }}
                      <span class="community-text cursor-pointer" v-if="community.readMore"
                        @click="getReadMore(community)">{{
                          $t("display.Hide") }}</span>
                    </p>
                    </p>
                    <img v-if="community.attachment_image" :src="community.attachment_image"
                      :alt="community.attachment_image"
                      @click="isImageModal = true, imageView = community.attachment_image" class="cursor-pointer" />
                  </div>

                  <ul class="review-list mt-16-in">
                    <li>
                      <a v-if="community.is_liked == 'y'" @click="communityLike(community)" class="like"><img
                          src="@/assets/icons/like-icon-red.svg" alt="" />
                        {{ community.number_of_like }}</a>
                      <a v-else @click="communityLike(community)"><img src="@/assets/icons/like-icon-blk2.svg" alt=""
                          class="light-th" />
                        <img src="@/assets/icons/like-white.svg" alt="" class="dark-th" />
                        {{ community.number_of_like }}</a>
                    </li>
                    <li>
                      <a @click="displayReplySection(community)"><img src="@/assets/icons/list-icon3.svg" class="dark-th"
                          alt="" />
                        <img src="@/assets/icons/chat-icon-blk.svg" class="light-th" alt="" />
                        {{ $t("general.reply") }} ({{ community.reply.length }})</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="right-align-list" v-if="community.is_ReplyShow">
                <ul class="review-innr-list">
                  <li v-for="(reply, i) in community.reply" :key="i">
                    <div class="user-comment-list">
                      <div :class="['user-review-icon', reply.user_image ? '' : 'no-add-image']">
                        <figure v-if="reply.user_image">
                          <img :src="reply.user_image" alt="" />
                        </figure>
                        <figure v-else>
                          <img src="@/assets/icons/user-icon.svg" alt="" class="dark-th" />
                          <img src="@/assets/icons/user-icon-gray.svg" alt="" class="light-th" />
                        </figure>
                      </div>
                      <div class="user-review-txt">
                        <div class="user-review-top">
                          <h4>{{ reply.user_name }}</h4>
                          <ul>
                            <li>
                              {{ dateformat(reply.reply_date) }}
                            </li>
                            <li>
                              {{ getDateformat(reply.reply_date, "time") }}
                            </li>
                          </ul>
                        </div>
                        <div v-if="reply.is_spoiler == 'y'">
                          <a class="spoiler-btn" :class="{ show: reply.is_RevealHideSpoiler }"
                            @click="displayReplyDetails(reply)">
                            <em class="reveal">{{ $t("movies.revealSpoiler") }}..
                            </em>
                            <em class="hide">{{ $t("movies.hideSpoiler") }}
                            </em>
                            <span class="down-arrow"><img src="@/assets/icons/down-arrow-blue.svg" alt="" /></span>
                            <span class="up-arrow"><img src="@/assets/icons/up-arrow-blue.svg" alt="" /></span>
                          </a>
                          <div class="spoiler-box comment-img-area" :class="{ show: reply.is_RevealHideSpoiler }">
                            <p v-if="reply.reply_message.length > 600 && !reply.readMore">
                              {{ reply.reply_message.substring(0, 600) + "..." }}
                              <span class="community-text cursor-pointer" @click="getReplyReadMore(reply)">{{
                                $t("display.ReadMore") }}</span>
                            </p>
                            <p v-if="reply.readMore || reply.reply_message.length < 600">{{ reply.reply_message }}
                              <span class="community-text cursor-pointer" v-if="reply.readMore"
                                @click="getReplyReadMore(reply)">{{
                                  $t("display.Hide") }}</span>
                            </p>
                            <img v-if="reply.attachment_image" :src="reply.attachment_image" :alt="reply.attachment_image"
                              @click="isImageModal = true, imageView = reply.attachment_image" class="cursor-pointer" />
                          </div>
                        </div>

                        <div class="comment-img-area" v-if="reply.is_spoiler == 'n'">
                          <p v-if="reply.reply_message.length > 600 && !reply.readMore">
                            {{ reply.reply_message.substring(0, 600) + "..." }}
                            <span class="community-text cursor-pointer" @click="getReplyReadMore(reply)">{{
                              $t("display.ReadMore") }}</span>
                          </p>
                          <p v-if="reply.readMore || reply.reply_message.length < 600">{{ reply.reply_message }}
                            <span class="community-text cursor-pointer" v-if="reply.readMore"
                              @click="getReplyReadMore(reply)">{{
                                $t("display.Hide") }}</span>
                          </p>
                          <img v-if="reply.attachment_image" :src="reply.attachment_image" :alt="reply.attachment_image"
                            @click="isImageModal = true, imageView = reply.attachment_image" class="cursor-pointer" />
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
                <div class="share-otr">
                  <div class="share-input-innr">
                    <input type="text" maxlength="18000" class="form-control"
                      :placeholder="$t('communityCard.sharewhatsnew')" :id="'goofs-reply-text' + community.id"
                      @keyup="replyTyping($event, community)" />
                    <span>
                      <input type="file" class="form-control file-upload-button"
                        v-on:change="selectMessageReplyImage($event, community)" />
                      <img src="@/assets/icons/share-icon.svg" :id="'goofs_reply_image' + community.id" />
                    </span>
                  </div>
                  <input type="submit" class="btn solid orange-btn isDisabled" :value="$t('button.send')"
                    @click="sendReply(community)" :id="'goofs_send_button' + community.id" disabled />
                </div>
                <div class="checkbox-inn">
                  <label class="checkbox-input">
                    {{ $t("movies.spoiler") }}
                    <input type="checkbox" :id="'goofs_is_reply_spoiler' + community.id" />
                    <span class="checkmark"></span>
                  </label>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="no-data-wrapper mr-bottom-0" v-else>
          <p>{{ $t("searchResults.noData") }}</p>
        </div>
      </Tabs>
    </TabWrapper>

    <!-- show image -->
    <div class="new-cast-modal add-img-modal new-media-modal" v-show="isImageModal">
      <PopUpModal :isModal="isImageModal">
        <template v-slot:header>
          <h1>{{ $t("myPage.imageCard.imagePreview") }}</h1>
          <button @click="isImageModal = false">
            <img src="@/assets/icons/modal-cross-icon.svg" alt="" />
          </button>
        </template>
        <template v-slot:body>
          <div class="modal-img-area">
            <img :src="imageView" :alt="imageView" />
          </div>
        </template>
      </PopUpModal>
    </div>

    <!-- character modal -->
    <div class="new-cast-modal">
      <PopUpModal :isModal="isCharacterModal">
        <template v-slot:header>
          <h1>{{ $t("adminAward.character") + " " + $t("credit.information") }}</h1>
          <button @click="isCharacterModal = false">
            <img src="@/assets/icons/modal-cross-icon.svg" alt="" />
          </button>
        </template>
        <template v-slot:body>
          <div class="cast-details">
            <div class="cast-left-profile">
              <img v-if="characterInfo?.people_image.includes('https')" :src="characterInfo?.people_image" alt=""
                class="cast-img" />
              <img v-else src="@/assets/images/no-image-view.png" class="cast-img" />
            </div>

            <div class="right">
              <div class="form-grp">
                <label for="">{{ $t("credit.characterName") }}</label>
                <input type="text" :value="characterInfo?.people_character" readonly />
              </div>
              <div class="form-grp">
                <label for="">{{ $t("addNewWebtoonForm.charDesc") }}</label>
                <textarea class="form-control" readonly>{{ characterInfo?.description }}</textarea>
              </div>
            </div>
          </div>
        </template>
      </PopUpModal>
    </div>

  </div>
</template>

<script>
import TabWrapper from "@/components/TabWrapper.vue";
import Tabs from "@/components/Tabs.vue";
import PopUpModal from "@/components/Modals/PopUpModal.vue";
import CommunityService from "@/services/CommunityService";
import Toast from "@/alert/alert.js";
import { dateformat } from "@/mixins/CommonFunctions.js";
export default {
  name: "CommunityCard",
  inject: ["common"],
  components: {
    Tabs,
    TabWrapper,
    PopUpModal
  },
  props: {
    type: String,
    famous_line_type: String,
    season_id: Number,
    title_type: String
  },
  created() {
    this.CommunityService = new CommunityService();
  },

  data() {
    return {
      routeId: this.$route.params.id,
      famousLine: [],
      page: 1,
      limit: 10,
      community_type: "comment",
      community_list: [],
      message_text: "",
      is_message_spoiler: "",
      message_image: "",
      message_url: "",
      message_reply_url: "",
      reply_text: "",
      is_reply_spoiler: "",
      showReply: false,
      currentCommunityId: 0,
      number_of_like: 0,
      current_famouse_id: null,
      currentCommunity: {},
      imgBaseUrl: import.meta.env.VITE_SITE_BASE_URL,
      newCommunityResult: [],
      totalRecords: 0,
      isSendMessage: false,
      selectTab: 'communityCard.comments',
      isTabChanged: false,
      isImageModal: false,
      imageView: '',
      isCharacterModal: false,
      characterInfo: ''
    };
  },
  watch: {
    season_id: function (newVal, oldVal) {
      if (newVal && newVal != oldVal) {
        this.community_type = "comment";
        this.community_list = [];
        this.newCommunityResult = [];
        this.getCommunityList();
      }
    },
    "common.state.SelectedLang": function (newVal, oldVal) {
      if (newVal && oldVal && newVal != oldVal) {
        this.getFamousLineList();
      }
    },
  },
  mounted() {
    this.getFamousLineList();
    if (this.$route.params.itemActive) {
      this.community_type = this.$route.params.itemActive;
      if (this.$route.params.itemActive == 'goofs') {
        this.selectTab = 'communityCard.goofs'
      }
      if (this.$route.params.itemActive == 'trivia') {
        this.selectTab = 'communityCard.trivia'
      }
      if (this.$route.params.itemActive == 'famous_line') {
        this.selectTab = 'communityCard.famousLines'
      }
      if (this.$route.params.itemActive == 'comment') {
        this.selectTab = 'communityCard.comments'
      }
      let timeOut;
      if (this.$route.params.list_type == 'people') {
        timeOut = 1500;
      } else {
        timeOut = 2000;
      }
      setTimeout(() => {
        const errorElement = document.querySelector("#comment-data");
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, timeOut);
    }
    this.getCommunityList();
  },
  methods: {
    dateformat,
    handleScroll(el) {
      if (
        el?.srcElement?.offsetHeight + el?.srcElement?.scrollTop + 1 >=
        el?.srcElement?.scrollHeight &&
        this.totalRecords > this.newCommunityResult.length
      ) {
        this.page = ++this.page;
        setTimeout(() => {
          this.getCommunityList();
        }, 100);
      }
    },
    // date format
    getDateformat(value, type) {
      if (type == "time") {
        return new Date(value).toLocaleTimeString([], {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        });
      }
    },

    // When clicked on tab then...
    selectedTab(tab) {
      this.selectTab = tab;
      this.isTabChanged = true;
      if (tab == "communityCard.trivia") {
        this.community_type = "trivia";
        this.community_list = [];
        this.newCommunityResult = [];
        this.getCommunityList();
      }
      if (tab == "communityCard.famousLines") {
        this.community_type = "famous_line";
        this.community_list = [];
        this.newCommunityResult = [];
        this.getCommunityList();
      }
      if (tab == "communityCard.goofs") {
        this.community_type = "goofs";
        this.community_list = [];
        this.newCommunityResult = [];
        this.getCommunityList();
      }
      if (tab == "communityCard.comments") {
        this.community_type = "comment";
        this.community_list = [];
        this.newCommunityResult = [];
        this.getCommunityList();
      }

      this.message_image = "";
      this.message_text = "";
      this.is_message_spoiler = "";
    },

    // community list list
    getCommunityList() {
      let credential = {
        commentable_id: this.routeId,
        page: this.page,
        limit: this.limit,
        community_type: this.community_type,
        commentable_type: this.type,
        season_id: this.season_id,
      };
      this.CommunityService.getCommunityList(credential)
        .then((res) => {
          if (res.status == 200) {
            this.community_list = res.data.results;
            this.totalRecords = res.data.total_records;
            for (let i = 0; i <= this.community_list.length - 1; i++) {
              this.community_list[i].is_RevealHideSpoiler = false;
              this.community_list[i].readMore = false;
              for (
                let j = 0;
                j <= this.community_list[i].reply.length - 1;
                j++
              ) {
                this.community_list[i].reply[j].is_RevealHideSpoiler = false;
                this.community_list[i].reply[j].is_Reply_text = false;
                this.community_list[i].reply[j].readMore = false;
              }
              if (
                this.currentCommunity &&
                this.currentCommunity.id == this.community_list[i].id
              ) {
                if (this.currentCommunity.is_ReplyShow == true) {
                  this.community_list[i].is_ReplyShow = true;
                } else {
                  this.community_list[i].is_ReplyShow = false;
                }
                this.community_list[i].is_RevealHideSpoiler = true;
              } else {
                this.community_list[i].is_RevealHideSpoiler = false;
              }
            }

            this.community_list.forEach((item, i) => {
              const existingItem = this.newCommunityResult.some(
                (displayedItem) => displayedItem.id === item.id
              );
              if (!existingItem) {
                if (this.isSendMessage) {
                  this.newCommunityResult.unshift(item);
                } else {
                  this.newCommunityResult.push(item);
                }
              } else {
                this.newCommunityResult[i].is_RevealHideSpoiler = false;
                for (
                  let j = 0;
                  j <= this.community_list[i].reply.length - 1;
                  j++
                ) {
                  this.newCommunityResult[i].reply =
                    this.community_list[i].reply;
                  this.newCommunityResult[i].reply[
                    j
                  ].is_RevealHideSpoiler = false;
                  this.newCommunityResult[i].reply[j].is_Reply_text = false;
                }
                if (
                  this.currentCommunity &&
                  this.currentCommunity.id == this.newCommunityResult[i].id
                ) {
                  if (this.currentCommunity.is_ReplyShow == true) {
                    this.newCommunityResult[i].is_ReplyShow = true;
                  } else {
                    this.newCommunityResult[i].is_ReplyShow = false;
                  }
                  this.newCommunityResult[i].is_RevealHideSpoiler = true;
                } else {
                  this.newCommunityResult[i].is_RevealHideSpoiler = false;
                }
              }
            });
            this.isSendMessage = false;
            if (this.community_type == "comment" && this.newCommunityResult.length == 0 && this.isTabChanged == false) {
              this.selectTab = 'communityCard.trivia';
              this.community_type = "trivia";
              this.getCommunityList();
            } else if (this.community_type == "trivia" && this.newCommunityResult.length == 0 && this.isTabChanged == false) {
              this.selectTab = 'communityCard.famousLines';
              this.community_type = "famous_line";
              this.getCommunityList();
            } else if (this.community_type == "famous_line" && this.newCommunityResult.length == 0 && this.isTabChanged == false) {
              this.selectTab = 'communityCard.goofs';
              this.community_type = "goofs";
              this.getCommunityList();
            } else if (this.community_type == "goofs" && this.newCommunityResult.length == 0 && this.isTabChanged == false) {
              this.selectTab = 'communityCard.comments'
              this.community_type = "comment";
            }
          }
        })
        .catch((err) => {
          return;
        });
    },

    // famous line list
    getFamousLineList() {
      this.CommunityService.getFamousLineList(
        this.routeId,
        this.famous_line_type
      )
        .then((res) => {
          if (res.status == 200) {
            this.famousLine = res.data.results;
          }
        })
        .catch((err) => {
          return;
        });
    },
    getCurrentFamousId(event) {
      this.current_famouse_id = event;
    },
    // send message
    sendMessage() {
      let formData = new FormData();
      if (this.message_image) {
        formData.append("image", this.message_image);
      }
      if (this.community_type == "famous_line") {
        formData.append("famouse_id", this.current_famouse_id);
      }
      formData.append("commentable_id", this.routeId);
      formData.append("season_id", this.season_id);
      formData.append("commentable_type", this.type);
      formData.append("tab_type", this.community_type);
      formData.append("message_text", this.message_text);
      formData.append("spoiler", this.is_message_spoiler == true ? "y" : "n");

      this.CommunityService.sendMessage(formData)
        .then((res) => {
          if (res.status == 200) {
            this.isSendMessage = true;
            this.getCommunityList();
            Toast.fire({ title: this.$t("Error.success") });
            this.message_text = "";
            this.message_url = "";
            this.is_message_spoiler = "";
            this.message_image = "";
            const inputs = document.querySelectorAll('.file-upload-button');
            inputs.forEach(input => {
              input.value = '';
            });
          }
        })
        .catch((err) => {
          return;
        });
    },
    // send reply
    sendReply(community) {
      if (this.community_type == "comment") {
        this.reply_text = document.querySelector(
          "#reply-text" + community.id
        ).value;
        this.is_reply_spoiler = document.querySelector(
          "#is_reply_spoiler" + community.id
        );
      } else if (this.community_type == "trivia") {
        this.reply_text = document.querySelector(
          "#trivia-reply-text" + community.id
        ).value;
        this.is_reply_spoiler = document.querySelector(
          "#trivia_is_reply_spoiler" + community.id
        );
      } else if (this.community_type == "goofs") {
        this.reply_text = document.querySelector(
          "#goofs-reply-text" + community.id
        ).value;
        this.is_reply_spoiler = document.querySelector(
          "#goofs_is_reply_spoiler" + community.id
        );
      } else if ((this.community_type = "famous_line")) {
        this.reply_text = document.querySelector(
          "#famous-reply-text" + community.id
        ).value;
      }

      let formData = new FormData();

      if (this.message_image) {
        formData.append("image", this.message_image);
      }
      formData.append("commentable_id", this.routeId);
      formData.append("community_id", community.id);
      formData.append("commentable_type", this.type);
      formData.append("tab_type", this.community_type);
      formData.append("reply_text", this.reply_text);
      formData.append(
        "spoiler",
        this.is_reply_spoiler.checked == true ? "y" : "n"
      );

      this.CommunityService.sendReply(formData)
        .then((res) => {
          if (res.status == 200) {
            this.message_image = "";
            const inputs = document.querySelectorAll('.file-upload-button');
            inputs.forEach(input => {
              input.value = '';
            });
            this.getCommunityList();
            this.currentCommunity = community;
            Toast.fire({ title: this.$t("Error.success") });
            document.querySelector("#reply-text" + community.id).value = "";
            document.querySelector("#trivia-reply-text" + community.id).value =
              "";
            document.querySelector("#famous-reply-text" + community.id).value =
              "";
            document.querySelector("#goofs-reply-text" + community.id).value =
              "";
            document.querySelector(
              "#is_reply_spoiler" + community.id
            ).checked = false;
            document.querySelector(
              "#trivia_is_reply_spoiler" + community.id
            ).checked = false;
            document.querySelector(
              "#goofs_is_reply_spoiler" + community.id
            ).checked = false;

            document.querySelector("#message_reply_image" + community.id).src = new URL("../assets/icons/share-icon.svg", import.meta.url)

            document.querySelector("#goofs_reply_image" + community.id).src = new URL("../assets/icons/share-icon.svg", import.meta.url)
            document.querySelector(
              "#trivia_message_reply_image" + community.id
            ).src = new URL("../assets/icons/share-icon.svg", import.meta.url);

            document.querySelector(
              "#comments_send_button" + community.id
            ).disabled = true;
            document
              .querySelector("#comments_send_button" + community.id)
              .classList.add("isDisabled");
            document.querySelector(
              "#trivia_send_button" + community.id
            ).disabled = true;
            document
              .querySelector("#trivia_send_button" + community.id)
              .classList.add("isDisabled");
            document.querySelector(
              "#famous_send_button" + community.id
            ).disabled = true;
            document
              .querySelector("#famous_send_button" + community.id)
              .classList.add("isDisabled");
            document.querySelector(
              "#goofs_send_button" + community.id
            ).disabled = true;
            document
              .querySelector("#goofs_send_button" + community.id)
              .classList.add("isDisabled");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //show hide spoiler
    revealHideSpoilerCommunity(community) {
      community.is_RevealHideSpoiler = !community.is_RevealHideSpoiler;
    },

    getReadMore(community) {
      community.readMore = !community.readMore;
    },
    getReplyReadMore(reply) {
      reply.readMore = !reply.readMore;
    },
    //show hide spoiler abour reply
    displayReplyDetails(reply) {
      reply.is_RevealHideSpoiler = !reply.is_RevealHideSpoiler;
    },
    //display reply section
    displayReplySection(community) {
      community.is_ReplyShow = !community.is_ReplyShow;
    },
    // select message image
    selectMessageImage(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.message_image = files[0];
      let fileSize = e.target.files[0].size;
      let allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
      if (!allowedExtensions.exec(this.message_image.name)) {
        const inputs = document.querySelectorAll('.file-upload-button');
        inputs.forEach(input => {
          input.value = '';
        });
        this.message_url = "";
        Toast.fire({ title: this.$t("Error.onlyJpg") });
        return false;
      } else if (fileSize > 1024 * 1024 * 25) {
        this.message_url = "";
        const inputs = document.querySelectorAll('.file-upload-button');
        inputs.forEach(input => {
          input.value = '';
        });
        return false;
      } else if (allowedExtensions.exec(this.message_image.name)) {
        this.message_url = URL.createObjectURL(e.target.files[0]);
      }
    },
    //select reply image
    selectMessageReplyImage(e, community) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.message_image = files[0];
      let fileSize = e.target.files[0].size;
      let allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
      if (!allowedExtensions.exec(this.message_image.name)) {
        if (this.community_type == "comment") {
          document.querySelector("#message_reply_image" + community.id).src =
            new URL("../assets/icons/share-icon.svg", import.meta.url);
        } else if (this.community_type == "trivia") {
          document.querySelector(
            "#trivia_message_reply_image" + community.id
          ).src = new URL("../assets/icons/share-icon.svg", import.meta.url);
        } else if (this.community_type == "goofs") {
          document.querySelector("#goofs_reply_image" + community.id).src = new URL("../assets/icons/share-icon.svg", import.meta.url);
        }
        const inputs = document.querySelectorAll('.file-upload-button');
        inputs.forEach(input => {
          input.value = '';
        });
        Toast.fire({ title: this.$t("Error.onlyJpg") });
        return false;
      } else if (fileSize > 1024 * 1024 * 25) {
        if (this.community_type == "comment") {
          document.querySelector("#message_reply_image" + community.id).src =
            new URL("../assets/icons/share-icon.svg", import.meta.url);
        } else if (this.community_type == "trivia") {
          document.querySelector(
            "#trivia_message_reply_image" + community.id
          ).src = new URL("../assets/icons/share-icon.svg", import.meta.url);
        } else if (this.community_type == "goofs") {
          document.querySelector("#goofs_reply_image" + community.id).src = new URL("../assets/icons/share-icon.svg", import.meta.url);
        }
        const inputs = document.querySelectorAll('.file-upload-button');
        inputs.forEach(input => {
          input.value = '';
        });
        return false;
      } else if (allowedExtensions.exec(this.message_image.name)) {
        if (this.community_type == "comment") {
          document.querySelector("#message_reply_image" + community.id).src =
            URL.createObjectURL(e.target.files[0]);
        } else if (this.community_type == "trivia") {
          document.querySelector(
            "#trivia_message_reply_image" + community.id
          ).src = URL.createObjectURL(e.target.files[0]);
        } else if (this.community_type == "goofs") {
          document.querySelector("#goofs_reply_image" + community.id).src =
            URL.createObjectURL(e.target.files[0]);
        }
      }
    },
    communityLike(community) {
      this.CommunityService.getCommunityLikes(community.id)
        .then((response) => {
          if (response.status == 200) {
            if (response.data.message == this.$t("communityCard.liked")) {
              community.number_of_like = community.number_of_like + 1;
              community.is_liked = "y";
            } else if (
              response.data.message == this.$t("communityCard.unliked")
            ) {
              community.number_of_like = community.number_of_like - 1;
              community.is_liked = "n";
            }
            this.currentCommunity = community;
            // this.getCommunityList();
          }
        })
        .catch((err) => {
          return;
        });
    },
    replyTyping(e, community) {
      if (this.community_type == "comment") {
        if (e.target.value) {
          document.querySelector(
            "#comments_send_button" + community.id
          ).disabled = false;
          document
            .querySelector("#comments_send_button" + community.id)
            .classList.remove("isDisabled");
        } else {
          document.querySelector(
            "#comments_send_button" + community.id
          ).disabled = true;
          document
            .querySelector("#comments_send_button" + community.id)
            .classList.add("isDisabled");
        }
      } else if (this.community_type == "trivia") {
        if (e.target.value) {
          document.querySelector(
            "#trivia_send_button" + community.id
          ).disabled = false;
          document
            .querySelector("#trivia_send_button" + community.id)
            .classList.remove("isDisabled");
        } else {
          document.querySelector(
            "#trivia_send_button" + community.id
          ).disabled = true;
          document
            .querySelector("#trivia_send_button" + community.id)
            .classList.add("isDisabled");
        }
      } else if (this.community_type == "famous_line") {
        if (e.target.value) {
          document.querySelector(
            "#famous_send_button" + community.id
          ).disabled = false;
          document
            .querySelector("#famous_send_button" + community.id)
            .classList.remove("isDisabled");
        } else {
          document.querySelector(
            "#famous_send_button" + community.id
          ).disabled = true;
          document
            .querySelector("#famous_send_button" + community.id)
            .classList.add("isDisabled");
        }
      } else if (this.community_type == "goofs") {
        if (e.target.value) {
          document.querySelector(
            "#goofs_send_button" + community.id
          ).disabled = false;
          document
            .querySelector("#goofs_send_button" + community.id)
            .classList.remove("isDisabled");
        } else {
          document.querySelector(
            "#goofs_send_button" + community.id
          ).disabled = true;
          document
            .querySelector("#goofs_send_button" + community.id)
            .classList.add("isDisabled");
        }
      }
    },
  },
};
</script>
<style>
.red {
  color: red !important;
}

.grey {
  color: aqua !important;
}
</style>
