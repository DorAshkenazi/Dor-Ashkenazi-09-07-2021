import { rootUrl, APIKey } from '../models/AccuWeather';

export const getForecast = async (key: number, isMetric: boolean) => {
  let url = `${rootUrl}forecasts/v1/daily/5day/${key}?apikey=${APIKey}&metric=${isMetric}`;
  const response = await fetch(url);
  const body = await response.json();
  return body;
};

export default getForecast;