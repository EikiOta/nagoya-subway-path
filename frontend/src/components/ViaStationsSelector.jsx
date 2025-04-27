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
  FormHelperText,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Avatar,
  Card,
  CardContent,
  useTheme,
  useMediaQuery
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
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
  
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
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
      // 選択順で優先度を付ける（配列インデックスが小さいほど優先度高）
      viaStations.push({
        ...value,
        priority: viaStations.length + 1 // 1始まりの優先度
      });
      updateStations({ via: viaStations });
    }
  };
  
  const handleRemoveVia = (index) => {
    const newVia = [...routeStations.via];
    newVia.splice(index, 1);
    
    // 削除後、優先度を振り直す
    const updatedVia = newVia.map((station, idx) => ({
      ...station,
      priority: idx + 1
    }));
    
    updateStations({ via: updatedVia });
  };
  
  const handleZoneChange = (event, newValue) => {
    updateTicketInfo({ zones: newValue });
  };
  
  const handleMovePriority = (index, direction) => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === routeStations.via.length - 1)
    ) {
      return; // 既に最上位または最下位
    }
    
    const newVia = [...routeStations.via];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // 対象のアイテムを交換
    [newVia[index], newVia[targetIndex]] = [newVia[targetIndex], newVia[index]];
    
    // 優先度を振り直す
    const updatedVia = newVia.map((station, idx) => ({
      ...station,
      priority: idx + 1
    }));
    
    updateStations({ via: updatedVia });
  };
  
  // 区間を表示する関数
  const getZoneLabel = (value) => {
    return `${value}区間`;
  };
  
  // 使用可能な区間選択の範囲を計算
  const minZone = minRequiredZones || 1;
  const maxZone = 5;
  
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
  
  if (!routeStations.start || !routeStations.end) {
    return null;
  }
  
  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 0, flexGrow: 1 }}>
          できれば通りたい駅
        </Typography>
        <Tooltip title="節約するために、普段よく行く場所や繁華街などを経由点として追加すると便利です。上にある駅ほど優先度が高くなります。">
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
              通りたい駅を優先度順に追加（任意）
            </Typography>
            
            {showWarning && (
              <Alert severity="warning" sx={{ mb: 2 }}>
                乗換回数は3回以内にする必要があります。通りたい駅が多すぎると経路が見つからない場合があります。
              </Alert>
            )}
            
            {routeStations.via && routeStations.via.length > 0 ? (
              <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent sx={{ py: 1 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    優先度が高い順（上にあるほど優先）
                  </Typography>
                  
                  <List dense disablePadding>
                    {routeStations.via.map((station, index) => {
                      const line = lines.find(l => l.id === station.lineId);
                      
                      return (
                        <ListItem
                          key={`${station.id}-${index}`}
                          sx={{ 
                            borderBottom: index < routeStations.via.length - 1 ? '1px solid #eee' : 'none',
                            pl: 1,
                            '&:hover': {
                              bgcolor: 'rgba(0, 0, 0, 0.03)'
                            }
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <Avatar
                              sx={{
                                width: 24,
                                height: 24,
                                fontSize: '0.75rem',
                                bgcolor: index === 0 ? 'primary.main' : 
                                        index === 1 ? 'primary.light' : 'grey.400',
                                color: 'white'
                              }}
                            >
                              {index + 1}
                            </Avatar>
                          </ListItemIcon>
                          <ListItemText 
                            primary={station.name}
                            secondary={line?.name}
                            primaryTypographyProps={{
                              variant: 'body1',
                              fontWeight: index === 0 ? 'bold' : 'normal'
                            }}
                          />
                          <ListItemSecondaryAction>
                            <IconButton 
                              edge="end" 
                              aria-label="上に移動" 
                              size="small" 
                              onClick={() => handleMovePriority(index, 'up')}
                              disabled={index === 0}
                              sx={{ mr: 0.5 }}
                            >
                              <ArrowUpwardIcon fontSize="small" />
                            </IconButton>
                            <IconButton 
                              edge="end" 
                              aria-label="下に移動" 
                              size="small"
                              onClick={() => handleMovePriority(index, 'down')}
                              disabled={index === routeStations.via.length - 1}
                              sx={{ mr: 0.5 }}
                            >
                              <ArrowDownwardIcon fontSize="small" />
                            </IconButton>
                            <IconButton 
                              edge="end" 
                              aria-label="削除" 
                              size="small"
                              onClick={() => handleRemoveVia(index)}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      );
                    })}
                  </List>
                </CardContent>
              </Card>
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                通りたい駅を選択してください（任意）
              </Typography>
            )}
            
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
                {...selectProps}
              >
                {stations
                  .filter(station => 
                    station.id !== routeStations.start?.id && 
                    station.id !== routeStations.end?.id &&
                    (!routeStations.via || !routeStations.via.some(via => via.id === station.id))
                  )
                  .map(station => (
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