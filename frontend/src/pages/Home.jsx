// src/pages/Home.jsx
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TrainIcon from '@mui/icons-material/Train';

const Home = () => {
  const navigate = useNavigate();
  
  return (
    <Container maxWidth="md">
      <Box sx={{ 
        mt: 8, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <TrainIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
        
        <Typography variant="h3" component="h1" gutterBottom>
          名古屋市営地下鉄
        </Typography>
        
        <Typography variant="h4" component="h2" gutterBottom>
          定期券最適経路探索
        </Typography>
        
        <Paper sx={{ p: 4, mt: 4, width: '100%', maxWidth: 600 }}>
          <Typography variant="body1" paragraph>
            名古屋市営地下鉄の特殊な定期券ルール（一筆書きで乗換3回以内、経路が交差しない）を考慮した最適な経路を提案するサービスです。
          </Typography>
          
          <Typography variant="body1" paragraph>
            出発駅と到着駅を選び、経由したい駅を設定して、あなたに最適な定期券の経路を見つけましょう。
          </Typography>
          
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            onClick={() => navigate('/search')}
            sx={{ mt: 2 }}
          >
            経路を探す
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default Home;