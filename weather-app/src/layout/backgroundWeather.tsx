import { weatherAssets } from "../utils/weatherAssets";
import Box from "@mui/material/Box";

const BackgroundWeather = ({ weather }: { weather: string }) => {
  const asset = weatherAssets[weather] || weatherAssets["Clear"];
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage: `url(${asset.bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "blur(3px)",
        zIndex: -1,
      }}
    />
  );
};

export default BackgroundWeather;
