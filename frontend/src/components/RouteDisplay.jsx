// src/components/RouteDisplay.jsx
import { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Divider, 
  Stepper, 
  Step, 
  StepLabel, 
  StepContent,
  Chip,
  Card,
  CardContent,
  Grid,
  Tooltip,
  IconButton
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PaidIcon from '@mui/icons-material/Paid';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useRouteContext } from '../context/RouteContext';
import { getLineById } from '../data/lines';
import { faresByZone } from '../data/fares';

const RouteDisplay = () => {
  const { selectedRoute, ticketInfo } = useRouteContext();
  const [fare, setFare] = useState(0);
  
  useEffect(() => {
    if (selectedRoute && ticketInfo) {
      // 料金計算
      const calculatedFare = faresByZone[ticketInfo.duration][ticketInfo.type][selectedRoute.zones];
      setFare(calculatedFare);
    }
  }, [selectedRoute, ticketInfo]);
  
  if (!selectedRoute) {
    return (
      <Typography variant="body1" color="text.secondary" align="center">
        経路情報がありません。ルートを選択してください。
      </Typography>
    );
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
    'discount_adult': '割引通勤',
    'discount_student': '割引通学'
  };
  
  // 乗換駅を判定する関数
  const isTransferStation = (index) => {
    return index > 0 && index < selectedRoute.route.length - 1 && 
      selectedRoute.route[index].lineId !== selectedRoute.route[index - 1].lineId;
  };
  
  return (
    <Box>
      <Card variant="outlined" sx={{ mb: 3, backgroundColor: 'primary.50' }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1, sm: 0 } }}>
                <PaidIcon color="primary" sx={{ mr: 1 }} />
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block">
                    {durationText[ticketInfo.duration]}定期 ({typeText[ticketInfo.type]})
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {fare.toLocaleString()}円
                  </Typography>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1, sm: 0 } }}>
                <AccessTimeIcon color="primary" sx={{ mr: 1 }} />
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block">
                    所要時間
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    約{selectedRoute.duration}分
                  </Typography>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TransferWithinAStationIcon color="primary" sx={{ mr: 1 }} />
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block">
                    乗換回数
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {selectedRoute.transfers}回
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      
      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
        経路詳細
      </Typography>
      
      <Stepper orientation="vertical">
        {selectedRoute.route.map((station, index) => {
          const isTransfer = isTransferStation(index);
          const line = getLineById(station.lineId);
          
          return (
            <Step key={index} active={true}>
              <StepLabel 
                StepIconProps={{ 
                  icon: index + 1,
                  sx: { 
                    color: line.color,
                    borderColor: line.color
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                  <Typography variant="subtitle1" sx={{ 
                    fontWeight: isTransfer ? 'bold' : 'normal',
                    color: isTransfer ? 'primary.main' : 'inherit'
                  }}>
                    {station.name}
                  </Typography>
                  
                  {isTransfer && (
                    <Chip 
                      label="乗換駅" 
                      size="small" 
                      color="secondary" 
                      sx={{ ml: 1 }} 
                    />
                  )}
                  
                  <Chip 
                    label={line.name} 
                    size="small"
                    sx={{ 
                      ml: 1,
                      backgroundColor: line.color,
                      color: 'white',
                      fontWeight: 'bold'
                    }} 
                  />
                </Box>
              </StepLabel>
              
              {index < selectedRoute.route.length - 1 && (
                <StepContent>
                  <Box sx={{ 
                    py: 1.5,
                    borderLeft: `2px solid ${line.color}`, 
                    ml: 1 
                  }} />
                </StepContent>
              )}
            </Step>
          );
        })}
      </Stepper>
      
      <Typography variant="body2" color="text.secondary" sx={{ mt: 3, fontStyle: 'italic' }}>
        ※この経路は「一筆書き」で描ける経路で、乗換回数は{selectedRoute.transfers}回です。
        定期券購入時にこの経路を指定することで、経路上の全ての駅を自由に利用できます。
      </Typography>
    </Box>
  );
};

export default RouteDisplay;