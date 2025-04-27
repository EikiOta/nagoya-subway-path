// src/pages/Search.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Alert,
  Snackbar,
  Grid,
  Paper,
  Divider
} from '@mui/material';
import TicketForm from '../components/TicketForm';
import StationSelector from '../components/StationSelector';
import ViaStationsSelector from '../components/ViaStationsSelector';
import RouteCandidates from '../components/RouteCandidates';
import { useRouteContext } from '../context/RouteContext';

const Search = () => {
  const navigate = useNavigate();
  const { stations } = useRouteContext();
  const [error, setError] = useState(null);
  
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        定期券経路の検索
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mb: 1 }}>
            <Typography variant="body1" color="text.secondary" paragraph>
              名古屋市営地下鉄の定期券は「一筆書き」で描ける経路で乗換回数が3回以内なら自由に経路を選べます。
              よく行く場所を経由する定期券を作れば、さらにお得に利用できます。
            </Typography>
            <Typography variant="body2" color="text.secondary">
              まずは定期券の条件と必ず通る駅を入力し、次にできれば通りたい駅を追加して、最適な経路を探しましょう。
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TicketForm />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <StationSelector />
        </Grid>
      </Grid>
      
      {/* 出発駅と到着駅が選択されたら通りたい駅セレクターを表示 */}
      {stations.start && stations.end && (
        <ViaStationsSelector />
      )}
      
      {/* 出発駅と到着駅が選択されたら自動的にルート候補を表示 */}
      {stations.start && stations.end && <RouteCandidates />}
      
      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Search;