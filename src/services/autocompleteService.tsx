import { rootUrl, APIKey } from "../models/AccuWeather";

export const handleGetOptions = async (cityNameQuery: string) => {
  let url = `${rootUrl}locations/v1/cities/autocomplete?apikey=${APIKey}&q=${cityNameQuery}`;
  const response = await fetch(url);
  const body = await response.json();
  return body;
};

export default handleGetOptions;