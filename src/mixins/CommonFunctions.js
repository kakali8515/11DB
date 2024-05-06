// import moment from "moment";
// export function dateformat(value,toFormat='ll',fromFormat='ll') {
//   if (value){
//     return moment.utc(value,fromFormat).format(toFormat);
//   }
// }

import moment from "moment";
import "moment/locale/ko";
// date format
export function dateformat(value, toFormat = "ll", fromFormat = "ll") {
  const date = new Date(value);
  let language;
  if (localStorage.getItem("site_language")) {
    language = localStorage.getItem("site_language");
  } else if (localStorage.getItem("selectedLang")) {
    language = localStorage.getItem("selectedLang");
  }
  if (value) {
    if (language === "KO" || language === "ko") {
      moment.locale("ko"); // set Korean locale
    } else {
      moment.locale("en"); // set English locale (default)
    }
    // return moment(value, fromFormat).format(toFormat);
    return moment(date).format(toFormat);
  }
}

// second to HMS
export function secondsToHms(sec) {
  var hours = Math.floor(sec / 3600);
  hours >= 1 ? (sec = sec - hours * 3600) : (hours = "");
  var min = Math.floor(sec / 60);
  min >= 1 ? (sec = sec - min * 60) : (min = "00");
  sec < 1 ? (sec = "00") : void 0;

  min.toString().length == 1 ? (min = "0" + min) : void 0;
  sec.toString().length == 1 ? (sec = "0" + sec) : void 0;
  if (hours == "") {
    return min + ":" + sec;
  } else {
    return hours + ":" + min + ":" + sec;
  }
}

// getting thumbnail image youtube video
export function youtube_parser(video) {
  if (video.type == "youtube") {
    let yMatch =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    let match = video.link.match(yMatch);
    if (match) {
      return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
    }
  }
}
