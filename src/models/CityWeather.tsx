export default interface CityWeather {
  text: string;
  icon: number;
  temp: {
    metric: number,
    imperial: number
  }
}
