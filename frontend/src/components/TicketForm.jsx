// src/components/TicketForm.jsx
import { 
    Box, 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem, 
    Typography,
    Paper
  } from '@mui/material';
  import { useRouteContext } from '../context/RouteContext';
  
  const TicketForm = () => {
    const { ticketInfo, updateTicketInfo } = useRouteContext();
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      updateTicketInfo({ [name]: value });
    };
    
    return (
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          定期券の条件
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
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
              <MenuItem value="1month">1ヶ月</MenuItem>
              <MenuItem value="3month">3ヶ月</MenuItem>
              <MenuItem value="6month">6ヶ月</MenuItem>
            </Select>
          </FormControl>
          
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
              <MenuItem value="discount_adult">割引通勤</MenuItem>
              <MenuItem value="discount_student">割引通学</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl fullWidth margin="normal">
            <InputLabel id="zones-label">料金区間</InputLabel>
            <Select
              labelId="zones-label"
              id="zones"
              name="zones"
              value={ticketInfo.zones}
              label="料金区間"
              onChange={handleChange}
            >
              <MenuItem value={1}>1区</MenuItem>
              <MenuItem value={2}>2区</MenuItem>
              <MenuItem value={3}>3区</MenuItem>
              <MenuItem value={4}>4区</MenuItem>
              <MenuItem value={5}>5区</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>
    );
  };
  
  export default TicketForm;