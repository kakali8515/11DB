// only character
export function isChar(evt) {
  evt = evt ? evt : window.event;
  var charCode = evt.which ? evt.which : evt.keyCode;
  var hasNumber = /\d/;
  if (
    !(charCode >= 65 && charCode <= 90) &&
    !(charCode >= 97 && charCode <= 122) &&
    charCode != 32 &&
    charCode != 0
  ) {
    evt.preventDefault();
    return false;
  } else if (hasNumber.test(evt.target.value)) {
    evt.preventDefault();
    return false;
  }
  else {
    return true;
  }
}

// only character with ','
export function isCharWithComma(evt) {
  evt = evt ? evt : window.event;
  var charCode = evt.which ? evt.which : evt.keyCode;
  if (
    !(
      (charCode >= 65 && charCode <= 90) ||
      (charCode >= 97 && charCode <= 122) ||
      charCode == 44 || charCode == 32
    )
  ) {
    evt.preventDefault();
  } else {
    return true;
  }
}

//only character wit comma and number
export function isCharWithCommaNumber(evt) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?~]/;
  if(specialChars.test(evt.key)){
    evt.preventDefault();
  } else{
    return true;
  }
}

// only decimal number
export function isNumberDecimal(evt) {
  evt = evt ? evt : window.event;
  var charCode = evt.which ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
    evt.preventDefault();
  } else {
    return true;
  }
}

// number input with '+'
export function isPhoneNumber(evt) {
  evt = evt ? evt : window.event;
  var charCode = evt.which ? evt.which : evt.keyCode;
  if (charCode != 43 && charCode > 31 && (charCode < 48 || charCode > 57)) {
    evt.preventDefault();
  } else {
    return true;
  }
}

// only integer number input
export function isIntegerNumber(evt) {
  evt = evt ? evt : window.event;
  var charCode = evt.which ? evt.which : evt.keyCode;
  if (charCode < 48 || charCode > 57) {
    evt.preventDefault();
  } else {
    return true;
  }
}

// only number and alphabet
export function isNumChar(evt) {
  evt = evt ? evt : window.event;
  var charCode = evt.which ? evt.which : evt.keyCode;
  if (
    !(
      (charCode > 64 && charCode < 91) ||
      (charCode > 96 && charCode < 123) ||
      charCode == 8 ||
      charCode == 32 ||
      (charCode >= 48 && charCode <= 57)
    )
  ) {
    evt.preventDefault();
  } else if (charCode == 32) {
    evt.preventDefault();
  } else {
    return true;
  }
}

// only special char and alphabet
export function isCharWithSpeailChar(evt) {
  evt = evt ? evt : window.event;
  var charCode = evt.which ? evt.which : evt.keyCode;
  if (!(charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46)) {
    evt.preventDefault();
  } else {
    return true;
  }
}

export function isValidUrl(urlString) {
  var urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
    "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // validate fragment locator
  return !!urlPattern.test(urlString);
}

// validate email
export function isValidEmail(emailString) {
  var emailPattern = new RegExp(
    "^[a-z0-9][a-z0-9-_.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9]).[a-z0-9]{2,10}(?:.[a-z]{2,10})?$",
    "i"
  );
  return !!emailPattern.test(emailString);
}

// match youtube url
export function matchYoutubeUrl(url) {
  let p =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  let matches = url.match(p);
  if (matches) {
    return matches[1];
  }
  return false;
}

// match vimeo url
export function validateVimeoURL(url) {
  let p = /^(http\:\/\/|https\:\/\/)?(www\.)?(vimeo\.com\/)([0-9]+)$/;
  let matches = url.match(p);
  if (matches) {
    return matches[4];
  }
  return false;
}

// convert number into floationg number
export function convertFloat(n) {
  return Number(n) === n && n % 1 !== 0;
}

// convert minutes to hours
export function convertMinToHour(min) {
  var hours = Math.floor(min / 60);
  hours >= 1 ? (min = min - hours * 60) : (hours = "");
  min < 1 ? (min = "00") : void 0;

  min.toString().length == 1 ? (min = "0" + min) : void 0;

  if (hours == "") {
    return min + "m";
  } else {
    return hours + "h " + min + "m";
  }
}
