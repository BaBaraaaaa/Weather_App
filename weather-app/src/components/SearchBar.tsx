import React, { useState } from "react";
import { vietnamCities } from "../utils/vietnamCities";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";

interface SearchBarProps {
  onSearch: (city: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestions = vietnamCities.filter(city =>
    city.name.toLowerCase().includes(input.toLowerCase()) && input.trim() !== ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
      setInput("");
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (cityName: string) => {
    setInput(cityName);
    onSearch(cityName);
    setShowSuggestions(false);
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          type="text"
          placeholder="Nhập tên thành phố..."
          value={input}
          onChange={e => {
            setInput(e.target.value);
            setShowSuggestions(true);
          }}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
          onFocus={() => setShowSuggestions(true)}
          variant="outlined"
          size="small"
          fullWidth
          autoComplete="off"
          InputProps={{
            sx: {
              color: 'white',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.3)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.5)',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.7)',
              },
              '& input::placeholder': {
                color: 'rgba(255, 255, 255, 0.7)',
                opacity: 1,
              },
            },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  type="submit"
                  sx={{ color: 'rgba(255, 255, 255, 0.8)', '&:hover': { color: 'white' } }}
                  edge="end"
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      {showSuggestions && suggestions.length > 0 && (
        <Paper
          elevation={3}
          sx={{
            position: "absolute",
            top: 44,
            left: 0,
            right: 0,
            zIndex: 10,
            maxHeight: 180,
            overflow: "auto",
            bgcolor: "rgba(30, 30, 30, 0.95)",
            backdropFilter: "blur(10px)",
            color: "white",
            border: "1px solid rgba(255, 255, 255, 0.1)"
          }}
        >
          <List dense>
            {suggestions.map((city, index) => (
              <ListItem 
                key={city.name} 
                disablePadding
                sx={{
                  borderBottom: index < suggestions.length - 1 ? '1px solid rgba(255, 255, 255, 0.15)' : 'none'
                }}
              >
                <ListItemButton 
                  onMouseDown={() => handleSuggestionClick(city.name)}
                  sx={{ 
                    color: "white",
                    py: 1.5,
                    '&:hover': { 
                      backgroundColor: 'rgba(255, 255, 255, 0.15)' 
                    } 
                  }}
                >
                  <ListItemText 
                    primary={city.name}
                    primaryTypographyProps={{
                      sx: { fontWeight: 500 }
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default SearchBar;
