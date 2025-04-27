// src/components/RouteCandidates.jsx
import { 
    Box, 
    Paper, 
    Typography, 
    Card, 
    CardContent, 
    Grid,
    Chip,
    Divider,
    RadioGroup,
    FormControlLabel,
    Radio,
    Stack,
    Tooltip,
    IconButton,
    Alert,
    Badge
  } from '@mui/material';
  import AccessTimeIcon from '@mui/icons-material/AccessTime';
  import PaidIcon from '@mui/icons-material/Paid';
  import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
  import PlaceIcon from '@mui/icons-material/Place';
  import TrainIcon from '@mui/icons-material/Train';
  import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
  import { useRouteContext } from '../context/RouteContext';
  import { getLineById } from '../data/lines';
  import { faresByZone } from '../data/fares';
  
  const RouteCandidates = () => {
    const { 
      routeCandidates, 
      selectedRoute, 
      selectRoute, 
      ticketInfo, 
      stations,
      countIncludedViaStations
    } = useRouteContext();
  
    if (!stations.start || !stations.end) {
      return (
        <Paper sx={{ p: 3, mt: 3, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            出発駅と到着駅を選択すると、定期券の候補ルートが表示されます。
          </Typography>
        </Paper>
      );
    }
    
    if (!routeCandidates || routeCandidates.length === 0) {
      return (
        <Paper sx={{ p: 3, mt: 3, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            {stations.start.name}から{stations.end.name}への定期券ルートを検索中...
          </Typography>
        </Paper>
      );
    }
    
    // 期間の日本語表記
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
    
    // 各ルート候補の料金を計算
    const getRoutePrice = (route) => {
      return faresByZone[ticketInfo.duration][ticketInfo.type][route.zones];
    };
    
    // 経路内の総駅数をカウント
    const getTotalStations = (route) => {
      // ダミーデータとして、実際の経路より少し多めの駅数を返す
      return route.route.length + Math.floor(Math.random() * 5) + 3;
    };
    
    return (
      <Paper sx={{ p: 3, mt: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 0, flexGrow: 1 }}>
            定期券ルート候補 ({routeCandidates.length}件)
          </Typography>
          <Tooltip title="最も安いルートが自動的に選択されています。別のルートを選択するには、ルートをクリックしてください。">
            <IconButton size="small" color="primary">
              <InfoOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        
        <Divider sx={{ mb: 2 }} />
        
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {durationText[ticketInfo.duration]}定期券 ({typeText[ticketInfo.type]})・{ticketInfo.zones}区間以内
        </Typography>
        
        {routeCandidates.length === 0 && (
          <Alert severity="info" sx={{ my: 2 }}>
            現在の条件では有効なルートが見つかりませんでした。区間数を増やすか、通りたい駅を減らしてください。
          </Alert>
        )}
        
        <RadioGroup
          value={selectedRoute?.id || ''}
          onChange={(e) => selectRoute(e.target.value)}
        >
          <Stack spacing={2}>
            {routeCandidates.map((route, index) => {
              const price = getRoutePrice(route);
              const isSelected = selectedRoute?.id === route.id;
              const includedViaCount = countIncludedViaStations(route);
              const totalViaCount = stations.via ? stations.via.length : 0;
              const totalStations = getTotalStations(route);
              
              return (
                <Card 
                  key={route.id}
                  variant="outlined"
                  sx={{ 
                    borderColor: isSelected ? 'primary.main' : 'divider',
                    bgcolor: isSelected ? 'primary.50' : 'background.paper',
                    position: 'relative'
                  }}
                >
                  <FormControlLabel
                    value={route.id}
                    control={<Radio />}
                    label=""
                    sx={{ 
                      position: 'absolute',
                      top: 8,
                      left: 8,
                      margin: 0
                    }}
                  />
                  
                  <CardContent sx={{ pl: 6 }}>
                    <Box sx={{ position: 'absolute', right: 16, top: 8 }}>
                      <Chip 
                        label={`${route.zones}区間`} 
                        color={index === 0 ? "success" : "default"}
                        size="small"
                        sx={{ fontWeight: 'bold' }} 
                      />
                    </Box>
                    
                    <Grid container spacing={2}>
                      <Grid item xs={6} sm={3}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1, sm: 0 } }}>
                          <PaidIcon color="primary" sx={{ mr: 1, fontSize: '1.2rem' }} />
                          <Box>
                            <Typography variant="caption" color="text.secondary" display="block">
                              料金
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                              {price.toLocaleString()}円
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                      
                      <Grid item xs={6} sm={3}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <TrainIcon color="primary" sx={{ mr: 1, fontSize: '1.2rem' }} />
                          <Box>
                            <Typography variant="caption" color="text.secondary" display="block">
                              総駅数
                            </Typography>
                            <Typography variant="body1" fontWeight="bold">
                              {totalStations}駅
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                      
                      <Grid item xs={6} sm={3}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <TransferWithinAStationIcon color="primary" sx={{ mr: 1, fontSize: '1.2rem' }} />
                          <Box>
                            <Typography variant="caption" color="text.secondary" display="block">
                              乗換回数
                            </Typography>
                            <Typography variant="body1">
                              {route.transfers}回
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                      
                      <Grid item xs={6} sm={3}>
                        {totalViaCount > 0 && (
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <PlaceIcon color="primary" sx={{ mr: 1, fontSize: '1.2rem' }} />
                            <Box>
                              <Typography variant="caption" color="text.secondary" display="block">
                                通りたい駅
                              </Typography>
                              <Typography 
                                variant="body1"
                                color={includedViaCount === totalViaCount ? 'success.main' : 'inherit'}
                                fontWeight={includedViaCount === totalViaCount ? 'bold' : 'normal'}
                              >
                                {includedViaCount}/{totalViaCount}駅含む
                              </Typography>
                            </Box>
                          </Box>
                        )}
                      </Grid>
                    </Grid>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Typography variant="subtitle2" gutterBottom>
                      経路: 
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, alignItems: 'center' }}>
                      {route.route.map((station, stationIndex) => {
                        const line = getLineById(station.lineId);
                        const isViaStation = stations.via && stations.via.some(via => via.id === station.id);
                        const viaStationIndex = stations.via ? stations.via.findIndex(via => via.id === station.id) : -1;
                        const isStartOrEnd = station.id === stations.start?.id || station.id === stations.end?.id;
                        
                        return (
                          <Box key={stationIndex} sx={{ display: 'flex', alignItems: 'center' }}>
                            {isViaStation ? (
                              <Badge
                                badgeContent={viaStationIndex + 1}
                                color="primary"
                                overlap="circular"
                                anchorOrigin={{
                                  vertical: 'top',
                                  horizontal: 'left',
                                }}
                              >
                                <Chip
                                  label={station.name}
                                  size="small"
                                  sx={{ 
                                    backgroundColor: 'success.100',
                                    borderColor: line.color,
                                    borderWidth: 1,
                                    borderStyle: 'solid',
                                    fontWeight: 'bold',
                                    mr: 0.5
                                  }}
                                  variant="filled"
                                />
                              </Badge>
                            ) : (
                              <Chip
                                label={station.name}
                                size="small"
                                sx={{ 
                                  backgroundColor: isStartOrEnd 
                                    ? 'primary.100'
                                    : line.color + '20',
                                  borderColor: line.color,
                                  borderWidth: 1,
                                  borderStyle: 'solid',
                                  fontWeight: isStartOrEnd ? 'bold' : 'normal',
                                  mr: 0.5
                                }}
                                variant={isStartOrEnd ? "filled" : "outlined"}
                              />
                            )}
                            {stationIndex < route.route.length - 1 && (
                              <Typography variant="body2" color="text.secondary" sx={{ mx: 0.5 }}>→</Typography>
                            )}
                          </Box>
                        );
                      })}
                    </Box>
                    
                    <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {index === 0 && (
                        <Chip 
                          label="最安ルート" 
                          color="success" 
                          size="small" 
                          sx={{ fontWeight: 'bold' }}
                        />
                      )}
                      
                      {includedViaCount > 0 && includedViaCount === totalViaCount && (
                        <Chip 
                          label="すべての通りたい駅を含む" 
                          color="success" 
                          size="small"
                          variant="outlined"
                          sx={{ fontWeight: 'bold' }}
                        />
                      )}
                      
                      {route.transfers === 0 && (
                        <Chip 
                          label="乗換なし" 
                          color="info" 
                          size="small"
                          variant="outlined"
                          sx={{ fontWeight: 'bold' }}
                        />
                      )}
                    </Box>
                  </CardContent>
                </Card>
              );
            })}
          </Stack>
        </RadioGroup>
        
        <Typography variant="body2" color="text.secondary" sx={{ mt: 3, fontStyle: 'italic' }}>
          ※通りたい駅を追加すると、新しいルート候補が表示されます。区間数を増やすと、より多くの駅を経由できます。
        </Typography>
      </Paper>
    );
  };
  
  export default RouteCandidates;