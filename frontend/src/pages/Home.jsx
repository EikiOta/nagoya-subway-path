// src/pages/Home.jsx
import { Box, Typography, Button, Container, Paper, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TrainIcon from '@mui/icons-material/Train';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

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
        
        <Paper sx={{ p: 4, mt: 4, width: '100%', maxWidth: 600, textAlign: 'left' }}>
          <Typography variant="body1" paragraph>
            名古屋市営地下鉄の定期券は独自のルールがあり、賢く利用すれば普段利用する駅以外も経由して節約できます。
          </Typography>
          
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            名古屋市営地下鉄の定期券ルール
          </Typography>
          
          <List dense>
            <ListItem>
              <ListItemIcon>
                <CheckCircleOutlineIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="一筆書きで描ける経路" 
                secondary="経路は一筆書きで描ける必要があります。経路が交差したり、駅が重複する場合は発売不可"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleOutlineIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="乗換回数は3回以内" 
                secondary="便利な経路を自由に選べますが、乗換は3回までに制限されています"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleOutlineIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="特定駅の制限" 
                secondary="乗換駅と判別駅（大曽根、金山、西高蔵、国際センター、吹上）の総数が5駅を超えると発売不可の場合あり"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleOutlineIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="料金は経路の長さで決定" 
                secondary="選択した経路の長さで料金が決まります（1区～5区）"
              />
            </ListItem>
          </List>
          
          <Typography variant="body1" paragraph sx={{ mt: 2 }}>
            このアプリでは、必ず通りたい駅と「できれば通りたい駅」を設定して、名古屋市営地下鉄の定期券ルールに沿った最適な経路を提案します。
          </Typography>
          
          <Typography variant="body1" paragraph sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            普段利用する駅だけでなく、よく行く繁華街や目的地も経由することで、定期券を最大限活用しましょう！
          </Typography>
          
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              onClick={() => navigate('/search')}
            >
              経路を探す
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Home;