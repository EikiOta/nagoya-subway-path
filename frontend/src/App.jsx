// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline, Box, ThemeProvider, createTheme } from '@mui/material';
import { RouteProvider } from './context/RouteContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Search from './pages/Search';
import Result from './pages/Result';

// テーマ設定
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    success: {
      main: '#2e7d32',
      light: '#4caf50',
      // カスタムカラー追加
      100: '#e8f5e9'
    },
    primary: {
      main: '#1976d2',
      // カスタムカラー追加
      50: '#e3f2fd',
      100: '#bbdefb'
    },
    info: {
      main: '#0288d1',
      light: '#03a9f4',
      50: '#e1f5fe'
    }
  },
  typography: {
    fontFamily: [
      'Roboto',
      '"Hiragino Kaku Gothic ProN"',
      '"Hiragino Sans"',
      'Meiryo',
      'sans-serif',
    ].join(','),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouteProvider>
        <BrowserRouter>
          <CssBaseline />
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            minHeight: '100vh'
          }}>
            <Header />
            <Box component="main" sx={{ flexGrow: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/result" element={<Result />} />
              </Routes>
            </Box>
            <Footer />
          </Box>
        </BrowserRouter>
      </RouteProvider>
    </ThemeProvider>
  );
}

export default App;