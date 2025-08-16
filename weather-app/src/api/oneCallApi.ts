
import axios from "axios";

export const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

// Lấy thời tiết hiện tại theo tên thành phố, chỉ trả về các trường quan trọng
export async function fetchWeather(city: string) {
  const url = `${BASE_URL}/weather`;
  const params = {
    q: city,
    appid: API_KEY,
    units: "metric",
    lang: "vi",
  };
  const res = await axios.get(url, { params });
  return res.data;
}
// Lấy thời tiết hiện tại theo lat/lon
export async function fetchWeatherByLatLon(lat: number, lon: number) {
  const url = `${BASE_URL}/weather`;
  const params = {
    lat,
    lon,
    appid: API_KEY,
    units: "metric",
    lang: "vi",
  };
  const res = await axios.get(url, { params });
  return res.data;
}

// Lấy dự báo 5 ngày với dữ liệu mỗi 3 giờ theo lat/lon
export async function fetchForecast5(lat: number, lon: number, cnt?: number) {
  const url = `${BASE_URL}forecast`;
  const params: any = {
    lat,
    lon,
    appid: API_KEY,
    units: "metric",
    lang: "vi",
  };
  if (cnt) {
    params.cnt = cnt; // số timestamp muốn lấy
  }
  const res = await axios.get(url, { params });
  return res.data;
}