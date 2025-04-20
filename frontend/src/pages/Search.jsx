// src/pages/Search.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Alert,
  Snackbar
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TicketForm from '../components/TicketForm';
import StationSelector from '../components/StationSelector';
import RouteDisplay from '../components/RouteDisplay';
import { useRouteContext } from '../context/RouteContext';

const Search = () => {
  const navigate = useNavigate();
  const { stations, searchRoute } = useRouteContext();
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);
  
  const handleSearch = () => {
    // 入力チェック
    if (!stations.start || !stations.end) {
      setError('出発駅と到着駅を選択してください');
      return;
    }
    
    // 乗換回数チェック
    if (stations.via && stations.via.length > 3) {
      setError('乗換回数は3回以内にしてください');
      return;
    }
    
    // 経路検索
    searchRoute();
    setShowResults(true);
    
    // 履歴に追加（実際のURLナビゲーションは行わない）
    // navigate('/result');
  };
  
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        定期券経路の検索
      </Typography>
      
      <TicketForm />
      <StationSelector />
      
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
        <Button 
          variant="contained" 
          color="primary" 
          size="large"
          startIcon={<SearchIcon />}
          onClick={handleSearch}
          disabled={!stations.start || !stations.end}
        >
          経路を検索
        </Button>
      </Box>
      
      {showResults && <RouteDisplay />}
      
      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={() => setError(null)}
      >
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Search;