import { useEffect, useState } from "react";
import BackgroundWeather from "../layout/backgroundWeather";
import SearchBar from "../components/SearchBar";
import WeatherDetails from "../components/WeatherDetails";
import ForecastList from "../components/ForecastList";
import { fetchWeather, fetchWeatherByLatLon, fetchForecast5 } from "../api/oneCallApi";
import type { WeatherApiResponse } from "../types/weather";
import { vietnamCities } from "../utils/vietnamCities";
import Box from "@mui/material/Box";
// Grid caused TS overload issues in this project; use Box flex layout instead
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const WeatherContainer = () => {
  // State khởi tạo rỗng, chỉ cập nhật khi có dữ liệu thực tế từ API
  const [weatherData, setWeatherData] = useState<WeatherApiResponse | null>(
    null
  );
  const [forecastData, setForecastData] = useState<any[]>([]);

  // Hàm xử lý tìm kiếm, gọi API thực tế
  const handleSearch = async (city: string) => {
    try {
      // Kiểm tra nếu city có trong mockdb thì lấy lat/lon, ưu tiên fetchWeatherByLatLon
      const cityObj = vietnamCities.find(
        (c: any) => c.name.toLowerCase() === city.toLowerCase()
      );
      let weather: WeatherApiResponse;
      let lat: number, lon: number;
      
      if (cityObj) {
        weather = await fetchWeatherByLatLon(cityObj.lat, cityObj.lon);
        lat = cityObj.lat;
        lon = cityObj.lon;
      } else {
        weather = await fetchWeather(city);
        lat = weather.coord.lat;
        lon = weather.coord.lon;
      }
      
      console.log(weather);
      setWeatherData(weather);
      
      // Gọi forecast API - lấy 15 timestamp (5 ngày x 3 timestamps mỗi ngày)
      const forecast = await fetchForecast5(lat, lon, 15);
      console.log("Forecast:", forecast);
      
      // Transform dữ liệu forecast cho ForecastList
      // Chọn 1 timestamp mỗi ngày (12:00 hoặc gần nhất)
      const dailyForecasts: any[] = [];
      const processedDates = new Set();
      
      forecast.list.forEach((item: any) => {
        const date = new Date(item.dt * 1000);
        const dateStr = date.toDateString();
        const hour = date.getHours();
        
        // Chỉ lấy 1 item mỗi ngày, ưu tiên giờ 12:00 hoặc gần nhất
        if (!processedDates.has(dateStr) && (hour >= 12 && hour <= 15)) {
          processedDates.add(dateStr);
          dailyForecasts.push({
            time: date.toLocaleDateString('vi-VN', { weekday: 'short' }),
            temp: Math.round(item.main.temp),
            main: item.weather[0].main
          });
        }
      });
      
      // Nếu không đủ 5 ngày thì lấy items đầu tiên
      if (dailyForecasts.length < 5) {
        dailyForecasts.length = 0;
        processedDates.clear();
        forecast.list.slice(0, 5).forEach((item: any) => {
          const date = new Date(item.dt * 1000);
          dailyForecasts.push({
            time: date.toLocaleDateString('vi-VN', { weekday: 'short' }),
            temp: Math.round(item.main.temp),
            main: item.weather[0].main
          });
        });
      }
      
      setForecastData(dailyForecasts);
    } catch (err) {
      alert("Không tìm thấy thành phố hoặc lỗi mạng!");
    }
  };

  return (
    <Box sx={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <BackgroundWeather weather={weatherData?.weather?.[0]?.main ?? "Clear"} />
      {/* Overlay tối để tăng độ tương phản */}
      <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.45)', zIndex: 0 }} />

      <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', zIndex: 2 }}>
        {/* Main content area */}
        <Box sx={{ display: 'flex', flex: 1 }}>
          {/* Left column */}
          <Box sx={{ flex: 1.5, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 6 }}>
            <Box sx={{ color: 'common.white' }}>
              {weatherData ? (
                <>
                  <Typography variant="h1" sx={{ fontSize: 72, fontWeight: 700, lineHeight: 1 }}>{Math.round(weatherData.main.temp)}°</Typography>
                  <Typography variant="h4" sx={{ mt: 1 }}>{weatherData.name}, {weatherData.sys.country}</Typography>
                  <Typography variant="body1" sx={{ mt: 1, color: 'text.secondary' }}>{new Date(weatherData.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(weatherData.dt * 1000).toLocaleDateString()}</Typography>
                  <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 2 }}>
                    <Box component="img" src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].main} sx={{ width: 60, height: 60 }} />
                    <Typography variant="h5">{weatherData.weather[0].main}</Typography>
                  </Stack>
                </>
              ) : (
                <Typography variant="h4" sx={{ opacity: 0.7 }}>Nhập tên thành phố để xem thời tiết...</Typography>
              )}
            </Box>
            
            {/* Forecast section at bottom */}
            {weatherData && forecastData.length > 0 && (
              <ForecastList forecast={forecastData} />
            )}
          </Box>

          {/* Right column */}
          <Box sx={{ flex: 1 }}>
            <Paper elevation={3} sx={{ 
              m: 4, 
              p: 3, 
              bgcolor: 'rgba(255, 255, 255, 0.1)', 
              backdropFilter: 'blur(10px)',
              color: 'white',
              height: 'calc(100% - 32px)', 
              display: 'flex', 
              flexDirection: 'column' 
            }}>
              <SearchBar onSearch={handleSearch} />
              {weatherData ? (
                <Box sx={{ mt: 3 }}>
                  <WeatherDetails
                    tempMax={weatherData.main.temp_max}
                    tempMin={weatherData.main.temp_min}
                    humidity={weatherData.main.humidity}
                    cloudy={weatherData.clouds.all}
                    wind={weatherData.wind.speed}
                    description={weatherData.weather[0].description}
                  />
                </Box>
              ) : (
                <Typography sx={{ color: 'rgba(255,255,255,0.7)', mt: 3 }}>Chưa có dữ liệu...</Typography>
              )}
            </Paper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default WeatherContainer;
