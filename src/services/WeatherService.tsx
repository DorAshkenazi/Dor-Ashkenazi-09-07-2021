import { rootUrl, APIKey } from "../models/AccuWeather";

export const getWeather = async (cityKey: number) => {
  let url = `${rootUrl}currentconditions/v1/${cityKey}?apikey=${APIKey}`;
  const response = await fetch(url);
  const body = await response.json();
  return body;
};

export default getWeather;
