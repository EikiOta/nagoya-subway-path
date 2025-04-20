// src/context/RouteContext.jsx
import { createContext, useState, useContext } from 'react';

const RouteContext = createContext();

export const useRouteContext = () => useContext(RouteContext);

export const RouteProvider = ({ children }) => {
  const [ticketInfo, setTicketInfo] = useState({
    duration: '1month',
    type: 'adult',
    zones: 1,
  });
  
  const [stations, setStations] = useState({
    start: null,
    end: null,
    via: [],
  });
  
  const [result, setResult] = useState(null);
  
  // チケット情報を更新
  const updateTicketInfo = (newInfo) => {
    setTicketInfo({ ...ticketInfo, ...newInfo });
  };
  
  // 駅を更新
  const updateStations = (newStations) => {
    setStations({ ...stations, ...newStations });
  };
  
  // 経路検索（ここではダミーの実装）
  const searchRoute = () => {
    // 実際のアルゴリズムは実装しない
    // 仮の結果を返す
    const dummyResult = {
      route: [stations.start, ...(stations.via || []), stations.end],
      fare: 7110,
      transfers: stations.via.length,
      duration: 25,
      zones: 1,
    };
    
    setResult(dummyResult);
    return dummyResult;
  };
  
  const value = {
    ticketInfo,
    stations,
    result,
    updateTicketInfo,
    updateStations,
    searchRoute,
  };
  
  return (
    <RouteContext.Provider value={value}>
      {children}
    </RouteContext.Provider>
  );
};