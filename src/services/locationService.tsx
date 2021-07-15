import { rootUrl, APIKey } from "../models/AccuWeather";

export const getLocationByGeoposition = async (): Promise<any> => {
  return new Promise((resolve, reject) => {
    const success = async (position: any) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      let url = `${rootUrl}locations/v1/cities/geoposition/search?apikey=${APIKey}&q=${lat},${lon}`;
      const response = await fetch(url);
      const body = await response.json();
      return resolve(body);
    };
    const error = () => {
      return reject(null);
    };
    navigator.geolocation.getCurrentPosition(success, error);
  });
};

export default getLocationByGeoposition;
