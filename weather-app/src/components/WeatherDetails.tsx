import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

interface WeatherDetailsProps {
  tempMax: number;
  tempMin: number;
  humidity: number;
  cloudy: number;
  wind: number;
  description: string;
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ tempMax, tempMin, humidity, cloudy, wind, description }) => {
  return (
    <Box sx={{ color: "#fff", mt: 4 }}>
      <Typography variant="overline" sx={{ fontWeight: 600, letterSpacing: 1, display: "block", mb: 1.5 }}>
        WEATHER DETAILS...
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, textTransform: "uppercase" }}>
        {description}
      </Typography>
      <Stack spacing={1}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>Temp max</Typography>
          <Typography>{tempMax}° 🌡️</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>Temp min</Typography>
          <Typography>{tempMin}° 🥶</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>Humidity</Typography>
          <Typography>{humidity}% 💧</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>Cloudy</Typography>
          <Typography>{cloudy}% ☁️</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>Wind</Typography>
          <Typography>{wind} km/h 💨</Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default WeatherDetails;
