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
  Chip
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PaidIcon from '@mui/icons-material/Paid';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import { useRouteContext } from '../context/RouteContext';
import { getLineById } from '../data/lines';
import { faresByZone } from '../data/fares';

const RouteDisplay = () => {
  const { result, ticketInfo } = useRouteContext();
  
  if (!result) {
    return (
      <Paper sx={{ p: 3, mt: 3, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          経路情報がありません。駅を選択して検索してください。
        </Typography>
      </Paper>
    );
  }
  
  const fare = faresByZone[ticketInfo.duration][ticketInfo.type][ticketInfo.zones];
  
  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        検索結果
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <PaidIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="subtitle1">
            料金: {fare.toLocaleString()}円
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <AccessTimeIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="subtitle1">
            所要時間: 約{result.duration}分
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <TransferWithinAStationIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="subtitle1">
            乗換回数: {result.transfers}回
          </Typography>
        </Box>
      </Box>
      
      <Divider sx={{ mb: 2 }} />
      
      <Stepper orientation="vertical">
        {result.route.map((station, index) => {
          const isTransfer = index > 0 && index < result.route.length - 1;
          const line = getLineById(station.lineId);
          
          return (
            <Step key={index} active={true}>
              <StepLabel StepIconProps={{ 
                icon: index + 1,
                sx: { color: line.color }
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="subtitle1">{station.name}</Typography>
                  {isTransfer && (
                    <Chip 
                      label="乗換駅" 
                      size="small" 
                      color="secondary" 
                      sx={{ ml: 1 }} 
                    />
                  )}
                </Box>
              </StepLabel>
              {index < result.route.length - 1 && (
                <StepContent>
                  <Box sx={{ 
                    height: 50, 
                    borderLeft: `2px solid ${line.color}`, 
                    ml: 1 
                  }} />
                </StepContent>
              )}
            </Step>
          );
        })}
      </Stepper>
    </Paper>
  );
};

export default RouteDisplay;