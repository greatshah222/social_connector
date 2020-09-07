const axios = require('axios');
const APIKEY = process.env.REACT_APP_MAP_TOKEN;
exports.convertAddresstoCoordinates = async (address) => {
  try {
    const res = await axios.get(
      ` https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
      )}.json?access_token=${APIKEY}`
    );
    if (!res.data || res.data.features.length === 0) {
      throw new Error('Could not find the location for the specified address');
    }
    const coordinates = res.data.features[0].center;
    return coordinates;
  } catch (error) {
    throw new Error('server error');
  }
};
