// src/pages/Result.jsx
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Paper,
  Grid
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { useRouteContext } from '../context/RouteContext';
import RouteDisplay from '../components/RouteDisplay';

const Result = () => {
  const navigate = useNavigate();
  const { result, ticketInfo, stations } = useRouteContext();
  
  const handleBack = () => {
    navigate('/search');
  };
  
  const handleSave = () => {
    // 保存機能は実装しない（デモ用）
    alert('保存機能はデモのため実装されていません');
  };
  
  if (!result) {
    // 結果がない場合は検索ページにリダイレクト
    setTimeout(() => navigate('/search'), 100);
    return null;
  }
  
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        検索結果
      </Typography>
      
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          検索条件
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2" color="text.secondary">
              期間
            </Typography>
            <Typography variant="body1">
              {ticketInfo.duration === '1month' ? '1ヶ月' : 
               ticketInfo.duration === '3month' ? '3ヶ月' : '6ヶ月'}
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="body2" color="text.secondary">
              種別
            </Typography>
            <Typography variant="body1">
              {ticketInfo.type === 'adult' ? '通勤（大人）' : 
               ticketInfo.type === 'university' ? '通学（大学生）' : 
               ticketInfo.type === 'student' ? '通学（高校生・中学生）' : 
               ticketInfo.type === 'child' ? '通学（小学生以下）' : 
               ticketInfo.type === 'discount_adult' ? '割引通勤' : '割引通学'}
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="body2" color="text.secondary">
              区間
            </Typography>
            <Typography variant="body1">
              {ticketInfo.zones}区間
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              出発駅
            </Typography>
            <Typography variant="body1">
              {stations.start?.name}
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              到着駅
            </Typography>
            <Typography variant="body1">
              {stations.end?.name}
            </Typography>
          </Grid>
          
          {stations.via && stations.via.length > 0 && (
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                経由駅
              </Typography>
              <Typography variant="body1">
                {stations.via.map(station => station.name).join(' → ')}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Paper>
      
      <RouteDisplay />
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button 
          variant="outlined" 
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
        >
          検索に戻る
        </Button>
        
        <Button 
          variant="contained" 
          color="primary"
          startIcon={<SaveAltIcon />}
          onClick={handleSave}
        >
          結果を保存
        </Button>
      </Box>
    </Container>
  );
};

export default Result;