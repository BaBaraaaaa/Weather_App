import React from "react";
import { weatherAssets } from "../utils/weatherAssets";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
interface WeatherCardProps {
  city: string;
  temp: number; // nhiệt độ (°C)
  description: string; // mô tả: "light rain"
  main: string; // nhóm thời tiết: "Clear", "Rain", "Snow"...
}
const WeatherCard = ({ city, temp, description, main }: WeatherCardProps) => {
  console.log({ city, temp });
  const icon = weatherAssets[main]?.icon;
  return (
    <Card
      sx={{
        background: "rgba(255,255,255,0.15)",
        backdropFilter: "blur(6px)",
        borderRadius: 3,
        textAlign: "center",
        width: 220,
        color: "white",
      }}
    >
      <CardContent>
        <Typography variant="h5" component="h2" sx={{ mb: 1 }}>
          {city}
        </Typography>
        {icon && (
          <Box
            component="img"
            src={icon}
            alt={main}
            sx={{ width: 80, height: 80 }}
          />
        )}
        <Typography variant="h2" component="h1" sx={{ fontSize: 48, my: 1.25 }}>
          {Math.round(temp)}°C
        </Typography>
        <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
