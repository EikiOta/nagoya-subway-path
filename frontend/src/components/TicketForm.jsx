// src/components/TicketForm.jsx
import { 
    Box, 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem, 
    Typography,
    Paper,
    Tooltip,
    IconButton,
    Grid,
    Divider
  } from '@mui/material';
  import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
  import { useRouteContext } from '../context/RouteContext';
  
  const TicketForm = () => {
    const { ticketInfo, updateTicketInfo } = useRouteContext();
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      updateTicketInfo({ [name]: value });
    };
    
    return (
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 0, flexGrow: 1 }}>
            定期券の条件
          </Typography>
          <Tooltip title="期間と種別を選択してください。料金は区間数によって自動計算されます。">
            <IconButton size="small">
              <HelpOutlineIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        
        <Divider sx={{ mb: 2 }} />
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="duration-label">期間</InputLabel>
              <Select
                labelId="duration-label"
                id="duration"
                name="duration"
                value={ticketInfo.duration}
                label="期間"
                onChange={handleChange}
              >
                <MenuItem value="1month">1ヶ月定期</MenuItem>
                <MenuItem value="3month">3ヶ月定期</MenuItem>
                <MenuItem value="6month">6ヶ月定期</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="type-label">種別</InputLabel>
              <Select
                labelId="type-label"
                id="type"
                name="type"
                value={ticketInfo.type}
                label="種別"
                onChange={handleChange}
              >
                <MenuItem value="adult">通勤（大人）</MenuItem>
                <MenuItem value="university">通学（大学生）</MenuItem>
                <MenuItem value="student">通学（高校生・中学生）</MenuItem>
                <MenuItem value="child">通学（小学生以下）</MenuItem>
                <MenuItem value="discount_adult">割引通勤（障害者等）</MenuItem>
                <MenuItem value="discount_student">割引通学（障害者等）</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2, fontSize: '0.85rem' }}>
          ※料金は選択した経路の区間数によって決まります。区間は通りたい駅を設定後に選択できます。
        </Typography>
      </Paper>
    );
  };
  
  export default TicketForm;