import axios from "axios";
import { publicIpv4 } from "public-ip";

const cache = {};
const TTL = 60000; // 1 min

const getUserLocation = async (req, res, next) => {
  try {
    const ipAddress = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    if (cache[ipAddress] && Date.now() - cache[ipAddress].timestamp < TTL) {
      req.location = { ...cache[ipAddress].data };
      cache[ipAddress].timestamp = Date.now();
      return next();
    }
    const publicIpResponse = await axios.get("https://api.ipify.org");

    const response = await axios.get(`https://ipinfo.io/${publicIpResponse.data}?token=${process.env.IP_INFO_TOKEN}`);

    req.location = { ...response.data };

    cache[ipAddress] = { data: response.data, timestamp: Date.now() };

    next();
  } catch (error) {
    console.error(error.message);
    next();
  } finally {
    // console.log(cache);
  }
};

export default getUserLocation;
