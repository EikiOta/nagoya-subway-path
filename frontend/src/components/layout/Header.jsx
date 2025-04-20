// src/components/layout/Header.jsx
import { AppBar, Toolbar, Typography, Box, useTheme } from '@mui/material';
import TrainIcon from '@mui/icons-material/Train';
import { Link } from 'react-router-dom';

const Header = () => {
  const theme = useTheme();
  
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Box display="flex" alignItems="center" component={Link} to="/" sx={{ textDecoration: 'none', color: 'white' }}>
          <TrainIcon sx={{ mr: 1 }} />
          <Typography variant="h6" component="div">
            名古屋地下鉄定期券経路探索
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;