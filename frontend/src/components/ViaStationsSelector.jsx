// src/components/ViaStationsSelector.jsx
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
  Slider,
  Grid,
  FormHelperText
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useRouteContext } from '../context/RouteContext';
import { stations } from '../data/stations';
import { lines } from '../data/lines';

const ViaStationsSelector = () => {
  const { 
    stations: routeStations, 
    updateStations, 
    ticketInfo, 
    updateTicketInfo, 
    routeCandidates, 
    minRequiredZones 
  } = useRouteContext();
  
  const [showWarning, setShowWarning] = useState(false);
  
  // 経由駅が3つ以上になった場合に警告を表示
  useEffect(() => {
    if (routeStations.via && routeStations.via.length >= 3) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }
  }, [routeStations.via]);
  
  const handleStationChange = (value) => {
    if (value) {
      const viaStations = [...(routeStations.via || [])];
      viaStations.push(value);
      updateStations({ via: viaStations });
    }
  };
  
  const handleRemoveVia = (index) => {
    const newVia = [...routeStations.via];
    newVia.splice(index, 1);
    updateStations({ via: newVia });
  };
  
  const handleZoneChange = (event, newValue) => {
    updateTicketInfo({ zones: newValue });
  };
  
  // 区間を表示する関数
  const getZoneLabel = (value) => {
    return `${value}区間`;
  };
  
  // 使用可能な区間選択の範囲を計算
  const minZone = minRequiredZones || 1;
  const maxZone = 5;
  
  if (!routeStations.start || !routeStations.end) {
    return null;
  }
  
  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 0, flexGrow: 1 }}>
          できれば通りたい駅と区間
        </Typography>
        <Tooltip title="節約するために、普段よく行く場所や繁華街などを経由点として追加すると便利です。区間は料金に直結します。">
          <IconButton size="small">
            <HelpOutlineIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      
      <Divider sx={{ mb: 2 }} />
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              通りたい駅を追加（任意）
            </Typography>
            
            {showWarning && (
              <Alert severity="warning" sx={{ mb: 2 }}>
                乗換回数は3回以内にする必要があります。経由駅が多すぎると発売できない場合があります。
              </Alert>
            )}
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2, minHeight: '40px' }}>
              {routeStations.via && routeStations.via.length > 0 ? (
                routeStations.via.map((station, index) => (
                  <Chip
                    key={index}
                    label={station.name}
                    color="primary"
                    variant="outlined"
                    deleteIcon={<DeleteIcon />}
                    onDelete={() => handleRemoveVia(index)}
                    sx={{ m: 0.5 }}
                  />
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  通りたい駅を選択してください（任意）
                </Typography>
              )}
            </Box>
            
            <FormControl fullWidth size="small">
              <InputLabel id="via-station-label">通りたい駅を追加</InputLabel>
              <Select
                labelId="via-station-label"
                id="via-station"
                value=""
                label="通りたい駅を追加"
                onChange={(e) => {
                  if (e.target.value) {
                    const selectedStation = stations.find(s => s.id === e.target.value);
                    handleStationChange(selectedStation);
                    e.target.value = '';
                  }
                }}
                disabled={routeStations.via && routeStations.via.length >= 3}
              >
                {stations
                  .filter(station => 
                    station.id !== routeStations.start?.id && 
                    station.id !== routeStations.end?.id &&
                    (!routeStations.via || !routeStations.via.some(via => via.id === station.id))
                  )
                  .map(station => (
                    <MenuItem key={station.id} value={station.id}>
                      <Box component="span" sx={{ 
                        width: 12, 
                        height: 12, 
                        borderRadius: '50%', 
                        backgroundColor: lines.find(l => l.id === station.lineId)?.color || '#ccc', 
                        display: 'inline-block',
                        mr: 1 
                      }} />
                      {station.name}
                    </MenuItem>
                  ))
                }
              </Select>
              <FormHelperText>
                よく利用する施設や場所がある駅を追加すると便利です
              </FormHelperText>
            </FormControl>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={5}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              許容する区間数を選択
            </Typography>
            
            <Box sx={{ px: 3, pt: 1 }}>
              <Slider
                value={ticketInfo.zones}
                onChange={handleZoneChange}
                step={1}
                min={minZone}
                max={maxZone}
                valueLabelDisplay="on"
                valueLabelFormat={getZoneLabel}
                marks={[
                  { value: minZone, label: `${minZone}区（最小）` },
                  { value: maxZone, label: '5区（最大）' }
                ]}
                color="primary"
                disabled={!routeStations.start || !routeStations.end}
              />
            </Box>
            
            <Box sx={{ mt: 2, bgcolor: 'info.50', p: 1.5, borderRadius: 1 }}>
              <Typography variant="body2" color="info.main">
                始点・終点間の最短経路は最低でも{minZone}区間です。区間数が増えると料金も高くなりますが、より多くの駅を経由できます。
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ViaStationsSelector;