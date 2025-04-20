// src/components/StationSelector.jsx
import { useState, useEffect } from 'react';
import { 
  Box, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Typography, 
  Button, 
  Chip,
  Paper,
  IconButton,
  Stack
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { useRouteContext } from '../context/RouteContext';
import { stations, getStationsByLine } from '../data/stations';
import { lines } from '../data/lines';

const StationSelector = () => {
  const { stations: routeStations, updateStations } = useRouteContext();
  const [stationsByLine, setStationsByLine] = useState({});
  const [selectedLine, setSelectedLine] = useState('');
  
  useEffect(() => {
    // 路線ごとの駅リストを作成
    const stationMap = {};
    lines.forEach(line => {
      stationMap[line.id] = getStationsByLine(line.id);
    });
    setStationsByLine(stationMap);
  }, []);
  
  const handleStationChange = (type, value) => {
    if (type === 'start' || type === 'end') {
      updateStations({ [type]: value });
    } else if (type === 'via') {
      updateStations({ via: [...(routeStations.via || []), value] });
    }
  };
  
  const handleRemoveVia = (index) => {
    const newVia = [...routeStations.via];
    newVia.splice(index, 1);
    updateStations({ via: newVia });
  };
  
  const handleSwapStations = () => {
    updateStations({
      start: routeStations.end,
      end: routeStations.start
    });
  };
  
  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        駅の選択
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="line-label">路線選択</InputLabel>
          <Select
            labelId="line-label"
            id="line"
            value={selectedLine}
            label="路線選択"
            onChange={(e) => setSelectedLine(e.target.value)}
          >
            {lines.map(line => (
              <MenuItem key={line.id} value={line.id}>
                <Box component="span" sx={{ 
                  width: 16, 
                  height: 16, 
                  borderRadius: '50%', 
                  backgroundColor: line.color, 
                  display: 'inline-block',
                  mr: 1 
                }} />
                {line.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 2, mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel id="start-station-label">出発駅</InputLabel>
          <Select
            labelId="start-station-label"
            id="start-station"
            value={routeStations.start?.id || ''}
            label="出発駅"
            onChange={(e) => {
              const selectedStation = stations.find(s => s.id === e.target.value);
              handleStationChange('start', selectedStation);
            }}
          >
            {stations.map(station => (
              <MenuItem key={station.id} value={station.id}>
                {station.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <IconButton onClick={handleSwapStations} sx={{ mx: 1 }}>
          <SwapVertIcon />
        </IconButton>
        
        <FormControl fullWidth>
          <InputLabel id="end-station-label">到着駅</InputLabel>
          <Select
            labelId="end-station-label"
            id="end-station"
            value={routeStations.end?.id || ''}
            label="到着駅"
            onChange={(e) => {
              const selectedStation = stations.find(s => s.id === e.target.value);
              handleStationChange('end', selectedStation);
            }}
          >
            {stations.map(station => (
              <MenuItem key={station.id} value={station.id}>
                {station.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      
      <Box>
        <Typography variant="subtitle1" gutterBottom>
          経由駅
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          {routeStations.via && routeStations.via.map((station, index) => (
            <Chip
              key={index}
              label={station.name}
              onDelete={() => handleRemoveVia(index)}
              deleteIcon={<DeleteIcon />}
            />
          ))}
          {(!routeStations.via || routeStations.via.length === 0) && (
            <Typography variant="body2" color="text.secondary">
              経由駅は指定されていません
            </Typography>
          )}
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="via-station-label">経由駅を追加</InputLabel>
            <Select
              labelId="via-station-label"
              id="via-station"
              value=""
              label="経由駅を追加"
              onChange={(e) => {
                if (e.target.value) {
                  const selectedStation = stations.find(s => s.id === e.target.value);
                  handleStationChange('via', selectedStation);
                  e.target.value = '';
                }
              }}
            >
              {stations.map(station => (
                <MenuItem key={station.id} value={station.id}>
                  {station.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <Button 
            variant="outlined" 
            startIcon={<AddIcon />}
            disabled={!selectedLine}
            onClick={() => {
              // これは単にUIのためのボタンなので、Select の onChange で処理する
            }}
          >
            追加
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default StationSelector;