import countries from "countries-list";

function getPhoneCode(countryCodeOrName) {
  let country;

  // Check if countryCodeOrName is country code
  if (countries.countries[countryCodeOrName]) {
    country = countries.countries[countryCodeOrName];
  } else {
    // Otherwise, it should be country name
    for (let key in countries.countries) {
      if (countries.countries[key].name === countryCodeOrName) {
        country = countries.countries[key];
        break;
      }
    }
  }

  if (!country) {
    throw new Error("Invalid country code or name.");
  }

  return `+${country.phone}`;
}

export default getPhoneCode;
