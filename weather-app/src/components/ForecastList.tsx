import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";

interface ForecastItem {
  time: string;
  temp: number;
  main: string;
}

interface ForecastListProps {
  forecast: ForecastItem[];
}

const ForecastList: React.FC<ForecastListProps> = ({ forecast }) => {
  return (
    <Box sx={{ color: "#fff", mt: 4 }}>
      <Typography variant="overline" sx={{ fontWeight: 600, letterSpacing: 1, display: "block", mb: 1.5 }}>
        Today's Weather Forecast...
      </Typography>
      <Stack direction="row" spacing={2} sx={{ overflowX: "auto", pb: 1 }}>
        {forecast.map((item, idx) => (
          <Card 
            key={idx} 
            sx={{ 
              minWidth: 120,
              background: "rgba(255,255,255,0.15)", 
              backdropFilter: "blur(6px)",
              color: "white",
              textAlign: "center"
            }}
          >
            <CardContent sx={{ py: 2, "&:last-child": { pb: 2 } }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {item.time}
              </Typography>
              <Typography variant="h6" sx={{ mb: 1 }}>
                {item.temp}°
              </Typography>
              <Typography variant="caption">
                {item.main}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default ForecastList;
