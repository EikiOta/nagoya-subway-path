// src/components/layout/Footer.jsx
import { Box, Typography, Container, Link as MuiLink } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 3, mt: 'auto' }}>
      <Container maxWidth="md">
        <Typography variant="body2" color="text.secondary" align="center">
          {'© '}
          {new Date().getFullYear()}
          {' 名古屋地下鉄定期券経路探索 | '}
          <MuiLink color="inherit" href="https://github.com/yourusername/project-repo">
            GitHub
          </MuiLink>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;