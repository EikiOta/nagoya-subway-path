// src/pages/Result.jsx
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Paper,
  Grid,
  Card,
  CardContent,
  Divider,
  Chip
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import { useRouteContext } from '../context/RouteContext';
import RouteDisplay from '../components/RouteDisplay';
import { getLineById } from '../data/lines';
import { faresByZone } from '../data/fares';

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
  
  const handlePrint = () => {
    window.print();
  };
  
  const handleShare = () => {
    // 共有機能は実装しない（デモ用）
    alert('共有機能はデモのため実装されていません');
  };
  
  if (!result) {
    // 結果がない場合は検索ページにリダイレクト
    setTimeout(() => navigate('/search'), 100);
    return null;
  }
  
  // 定期券の期間の日本語表記
  const durationText = {
    '1month': '1ヶ月',
    '3month': '3ヶ月',
    '6month': '6ヶ月'
  };
  
  // 種別の日本語表記
  const typeText = {
    'adult': '通勤（大人）',
    'university': '通学（大学生）',
    'student': '通学（高校生・中学生）',
    'child': '通学（小学生以下）',
    'discount_adult': '割引通勤（障害者等）',
    'discount_student': '割引通学（障害者等）'
  };
  
  // 定期券料金
  const fare = faresByZone[ticketInfo.duration][ticketInfo.type][ticketInfo.zones];
  
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        定期券最適経路
      </Typography>
      
      <Card sx={{ mb: 4, overflow: 'visible' }}>
        <CardContent sx={{ backgroundColor: 'primary.light', color: 'white', position: 'relative' }}>
          <Box sx={{ position: 'absolute', right: 16, top: -20 }}>
            <Chip 
              label={`${ticketInfo.zones}区間`} 
              color="secondary" 
              sx={{ fontWeight: 'bold', fontSize: '1.1rem' }} 
            />
          </Box>
          
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
            {stations.start?.name} → {stations.end?.name}
          </Typography>
          
          <Typography variant="subtitle1">
            {durationText[ticketInfo.duration]}定期 ({typeText[ticketInfo.type]})
          </Typography>
        </CardContent>
        
        <CardContent>
          <Grid container spacing={3} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="body2" color="text.secondary">
                定期券料金
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {fare.toLocaleString()}円
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="body2" color="text.secondary">
                区間
              </Typography>
              <Typography variant="h6">
                {ticketInfo.zones}区間
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="body2" color="text.secondary">
                所要時間
              </Typography>
              <Typography variant="h6">
                約{result.duration}分
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="body2" color="text.secondary">
                乗換回数
              </Typography>
              <Typography variant="h6">
                {result.transfers}回
              </Typography>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 2 }} />
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                経由駅
              </Typography>
              {stations.via && stations.via.length > 0 ? (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                  {stations.via.map((station, index) => {
                    const line = getLineById(station.lineId);
                    return (
                      <Chip 
                        key={index}
                        label={station.name}
                        size="small"
                        sx={{ 
                          backgroundColor: line.color + '20',
                          borderColor: line.color,
                          borderWidth: 1,
                          borderStyle: 'solid'
                        }}
                      />
                    );
                  })}
                </Box>
              ) : (
                <Typography variant="body1">
                  経由駅なし
                </Typography>
              )}
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                有効期間の例
              </Typography>
              <Typography variant="body1">
                {durationText[ticketInfo.duration]}定期券：
                {ticketInfo.duration === '1month' ? '2025年5月1日～5月31日' : 
                 ticketInfo.duration === '3month' ? '2025年5月1日～7月31日' : 
                 '2025年5月1日～10月31日'}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      
      <RouteDisplay />
      
      <Paper sx={{ p: 3, mt: 4, backgroundColor: '#f8f8f8' }}>
        <Typography variant="h6" gutterBottom>
          名古屋市営地下鉄 定期券購入時の注意事項
        </Typography>
        
        <Typography variant="body2" paragraph>
          • 定期券購入時は、この経路を券売機または駅窓口でお伝えください。
        </Typography>
        
        <Typography variant="body2" paragraph>
          • 定期券は「一筆書き」で描ける経路で、乗換が3回以内である必要があります。
        </Typography>
        
        <Typography variant="body2" paragraph>
          • 経路上の全ての駅を自由に利用できますが、経路を外れた利用はできません。
        </Typography>
        
        <Typography variant="body2" paragraph>
          • 定期券の有効期間は購入日または指定日から1ヶ月・3ヶ月・6ヶ月です。
        </Typography>
      </Paper>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, mt: 4 }}>
        <Button 
          variant="outlined" 
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
        >
          検索に戻る
        </Button>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="outlined"
            startIcon={<PrintIcon />}
            onClick={handlePrint}
          >
            印刷
          </Button>
          
          <Button 
            variant="outlined"
            startIcon={<ShareIcon />}
            onClick={handleShare}
          >
            共有
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
      </Box>
    </Container>
  );
};

export default Result;