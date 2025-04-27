// src/components/StationSelector.jsx
import { useState, useEffect } from 'react';
import { 
  Box, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Typography, 
  Chip,
  Paper,
  IconButton,
  Divider,
  Tooltip,
  Alert,
  useTheme,
  useMediaQuery
} from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useRouteContext } from '../context/RouteContext';
import { stations } from '../data/stations';
import { lines } from '../data/lines';

const StationSelector = () => {
  const { stations: routeStations, updateStations, searchRoutes } = useRouteContext();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  
  // 駅選択時に自動的にルート検索を実行
  useEffect(() => {
    if (routeStations.start && routeStations.end) {
      searchRoutes();
    }
  }, [routeStations.start, routeStations.end, routeStations.via, searchRoutes]);
  
  const handleStationChange = (type, value) => {
    if (type === 'start' || type === 'end') {
      updateStations({ [type]: value });
    }
  };
  
  const handleSwapStations = () => {
    updateStations({
      start: routeStations.end,
      end: routeStations.start
    });
  };
  
  // ドロップダウンのスタイル設定
  const selectProps = {
    MenuProps: {
      PaperProps: {
        style: {
          maxHeight: 300,
          width: isSmallScreen ? 'auto' : 350,
        },
      },
    },
  };
  
  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 0, flexGrow: 1 }}>
          必ず通る駅（始点・終点）
        </Typography>
        <Tooltip title="名古屋市営地下鉄の定期券は「一筆書き」で描ける経路で乗換が3回以内である必要があります。経路が交差したり駅が重複する場合は発売できません。">
          <IconButton size="small">
            <HelpOutlineIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      
      <Divider sx={{ mb: 2 }} />
      
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="start-station-label" required>出発駅</InputLabel>
          <Select
            labelId="start-station-label"
            id="start-station"
            value={routeStations.start?.id || ''}
            label="出発駅 *"
            onChange={(e) => {
              const selectedStation = stations.find(s => s.id === e.target.value);
              handleStationChange('start', selectedStation);
            }}
            sx={{ minWidth: { md: 200 } }}
            {...selectProps}
          >
            {stations.map(station => (
              <MenuItem key={station.id} value={station.id}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box component="span" sx={{ 
                    width: 12, 
                    height: 12, 
                    borderRadius: '50%', 
                    backgroundColor: lines.find(l => l.id === station.lineId)?.color || '#ccc', 
                    display: 'inline-block',
                    mr: 1 
                  }} />
                  <Typography noWrap>{station.name}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    {lines.find(l => l.id === station.lineId)?.name || ''}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <IconButton 
          onClick={handleSwapStations} 
          sx={{ mx: 1 }}
          disabled={!routeStations.start || !routeStations.end}
          title="出発駅と到着駅を入れ替え"
        >
          <SwapVertIcon />
        </IconButton>
        
        <FormControl fullWidth>
          <InputLabel id="end-station-label" required>到着駅</InputLabel>
          <Select
            labelId="end-station-label"
            id="end-station"
            value={routeStations.end?.id || ''}
            label="到着駅 *"
            onChange={(e) => {
              const selectedStation = stations.find(s => s.id === e.target.value);
              handleStationChange('end', selectedStation);
            }}
            sx={{ minWidth: { md: 200 } }}
            {...selectProps}
          >
            {stations.map(station => (
              <MenuItem key={station.id} value={station.id}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box component="span" sx={{ 
                    width: 12, 
                    height: 12, 
                    borderRadius: '50%', 
                    backgroundColor: lines.find(l => l.id === station.lineId)?.color || '#ccc', 
                    display: 'inline-block',
                    mr: 1 
                  }} />
                  <Typography noWrap>{station.name}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    {lines.find(l => l.id === station.lineId)?.name || ''}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Paper>
  );
};

export default StationSelector;