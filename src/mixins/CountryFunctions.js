export function removeCountry(item, countryBelowList, country, route) {
  let data = countryBelowList.find((f) => {
    return f.id == item.id || f.country_id == item.id;
  });
  if (data) {
    countryBelowList.splice(countryBelowList.indexOf(item), 1);
    if (route) {
      if (route.params.type == "internal") {
        let data2 = country.find((f) => {
          return f.country_id == item.country_id;
        });
        country.splice(country.indexOf(data2), 1);
      } else {
        country.splice(country.indexOf(item.id), 1);
      }
    } else {
      country.splice(country.indexOf(item.id), 1);
    }
  }
}

export function chooseCountry(
  event,
  countryList,
  countryBelowList,
  country,
  country_id,
  route
) {
  country_id[0] = event;
  let data = countryBelowList?.find((f) => {
    return f.id == event || f.country_id == event;
  });
  let country_name = countryList.find((item) => {
    return item.id == event;
  });
  if (!data && country_name) {
    countryBelowList.push({
      id: event,
      country_name: country_name.country_name,
    });
  }
  if (country.indexOf(event) === -1 && event != null) {
    if (route) {
      if (route.params.type == "internal") {
        country.push({
          country_id: event,
          id: "",
        });
      } else {
        country.push(event);
      }
    } else {
      country.push(Number(event));
    }
  }
}

export function shareFacebook(url, title, desc) {
  window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url), 'facebook-share-dialog', 'width=626,height=436'); return false;
}

export function shareTwitter(url, title, hashtags) {
  window.open('https://twitter.com/intent/tweet?url=' + encodeURIComponent(url) + '&text=' + title + '&hashtags=' + hashtags, 'twitter-share-dialog', 'width=626,height=436'); return false;
}
