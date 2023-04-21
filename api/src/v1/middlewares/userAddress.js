import axios from "axios";
// import {publicIp, publicIpv4, publicIpv6} from 'public-ip';
import { publicIpv4 } from "public-ip";

const getUserLocation = async (req, res, next) => {
  try {
    const ipAddress = await publicIpv4();
    const response = await axios.get(`https://ipinfo.io/${ipAddress}?token=${process.env.IP_INFO_TOKEN}`);

    req.location = { ...response.data };

    next();
  } catch (error) {
    console.error(error.message);
    next();
  }
};

export default getUserLocation;
