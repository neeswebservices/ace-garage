import phoneNumber from "google-libphonenumber";

const phoneUtil = phoneNumber.PhoneNumberUtil.getInstance();

export function isValidPhoneNumber(phoneNumber, countryCode = "NP") {
  try {
    const parsedNumber = phoneUtil.parseAndKeepRawInput(phoneNumber, countryCode);
    return phoneUtil.isValidNumber(parsedNumber);
  } catch (err) {
    return false;
  }
}
