// src/pages/Search.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Alert,
  Snackbar,
  Grid,
  Paper,
  Divider
} from '@mui/material';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import TicketForm from '../components/TicketForm';
import StationSelector from '../components/StationSelector';
import ViaStationsSelector from '../components/ViaStationsSelector';
import RouteCandidates from '../components/RouteCandidates';
import RouteDisplay from '../components/RouteDisplay';
import { useRouteContext } from '../context/RouteContext';

const Search = () => {
  const navigate = useNavigate();
  const { stations, selectedRoute } = useRouteContext();
  const [error, setError] = useState(null);
  const [showFinalResult, setShowFinalResult] = useState(false);
  
  const handleViewDetail = () => {
    if (!selectedRoute) {
      setError('ルートを選択してください');
      return;
    }
    
    setShowFinalResult(true);
    
    // 実際のアプリケーションでは、結果ページに遷移
    // navigate('/result');
  };
  
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
      
      {/* ルート候補が表示された後に「この定期券で申し込む」ボタンを表示 */}
      {stations.start && stations.end && selectedRoute && !showFinalResult && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            startIcon={<ConfirmationNumberIcon />}
            onClick={handleViewDetail}
          >
            この定期券で申し込む
          </Button>
        </Box>
      )}
      
      {/* 「この定期券で申し込む」をクリックしたら詳細結果を表示 */}
      {showFinalResult && (
        <Paper sx={{ p: 3, mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            選択した定期券経路
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <RouteDisplay />
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button 
              variant="outlined" 
              onClick={() => setShowFinalResult(false)}
              sx={{ mr: 2 }}
            >
              ルート選択に戻る
            </Button>
            
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => navigate('/result')}
            >
              申込手続きへ進む
            </Button>
          </Box>
        </Paper>
      )}
      
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