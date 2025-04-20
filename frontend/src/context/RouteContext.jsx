// src/context/RouteContext.jsx
import { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { calculateZones } from '../data/fares';
import { getStationById, connections } from '../data/stations';

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
  
  // 複数の候補ルートを保持
  const [routeCandidates, setRouteCandidates] = useState([]);
  
  // 選択されたルート
  const [selectedRoute, setSelectedRoute] = useState(null);
  
  // 最短経路の区間数
  const [minRequiredZones, setMinRequiredZones] = useState(1);
  
  // 駅が変更されたら区間の最小値も更新
  useEffect(() => {
    if (stations.start && stations.end) {
      // 最短経路の区間数を計算（実際の実装では計算方法が異なります）
      // 簡易的な計算として、始点と終点が同じ路線なら1区間、異なれば2区間とする
      const minZones = stations.start.lineId === stations.end.lineId ? 1 : 2;
      setMinRequiredZones(minZones);
      
      // 区間数が最小値より小さい場合は最小値に更新
      if (ticketInfo.zones < minZones) {
        setTicketInfo(prev => ({ ...prev, zones: minZones }));
      }
    }
  }, [stations.start, stations.end]);
  
  // チケット情報を更新
  const updateTicketInfo = (newInfo) => {
    setTicketInfo({ ...ticketInfo, ...newInfo });
  };
  
  // 駅を更新
  const updateStations = (newStations) => {
    setStations({ ...stations, ...newStations });
  };
  
  // 簡易的な経路探索アルゴリズム（実際にはより複雑なものが必要）
  const findPaths = (start, end, viaPoints = [], maxZones = 5) => {
    if (!start || !end) return [];
    
    // ダミーパス（デモ用）
    // 実際の実装では、グラフアルゴリズムを使用して最短経路やすべての経路を見つける必要があります
    
    // 直接経路
    const directPath = {
      route: [start, end],
      transfers: start.lineId !== end.lineId ? 1 : 0,
      duration: 15,
      zones: minRequiredZones
    };
    
    // 候補リスト
    const candidates = [directPath];
    
    // 許容区間数による候補生成
    for (let zones = minRequiredZones; zones <= maxZones; zones++) {
      // 区間数に応じた経路候補を生成
      // 実際の実装では、この部分はグラフ探索アルゴリズムになります
      
      if (zones > minRequiredZones) {
        // 追加の区間を使用した経路（より多くの駅を経由）
        const extraPath = {
          route: [start, ...(zones > 2 ? [getStationById('T10')] : []), end],
          transfers: zones > 2 ? 2 : 1,
          duration: 15 + (zones * 3),
          zones: zones
        };
        candidates.push(extraPath);
      }
      
      // 経由駅が指定されている場合
      if (viaPoints && viaPoints.length > 0) {
        // 通りたい駅をできるだけ含む経路を生成
        const includeableViaPoints = viaPoints.slice(0, zones - minRequiredZones);
        
        if (includeableViaPoints.length > 0) {
          candidates.push({
            route: [start, ...includeableViaPoints, end],
            transfers: Math.min(includeableViaPoints.length + (start.lineId !== end.lineId ? 1 : 0), 3),
            duration: 15 + (includeableViaPoints.length * 5),
            zones: minRequiredZones + includeableViaPoints.length
          });
        }
      }
    }
    
    return candidates;
  };
  
  // 経路探索（複数候補を返す）
  const searchRoutes = useCallback(() => {
    if (!stations.start || !stations.end) {
      setRouteCandidates([]);
      setSelectedRoute(null);
      return [];
    }
    
    const paths = findPaths(stations.start, stations.end, stations.via, ticketInfo.zones);
    
    // 区間数でフィルター
    const filteredPaths = paths.filter(path => path.zones <= ticketInfo.zones);
    
    // 各経路に一意のIDを追加
    const candidatesWithIds = filteredPaths.map(path => ({
      ...path,
      id: `route-${Math.random().toString(36).substr(2, 9)}`
    }));
    
    // 区間数で昇順ソート（最安を最初に）
    candidatesWithIds.sort((a, b) => a.zones - b.zones);
    
    setRouteCandidates(candidatesWithIds);
    
    // 最初の候補を選択
    if (candidatesWithIds.length > 0) {
      setSelectedRoute(candidatesWithIds[0]);
    }
    
    return candidatesWithIds;
  }, [stations.start, stations.end, stations.via, ticketInfo.zones, minRequiredZones]);
  
  // 候補ルートを選択
  const selectRoute = (routeId) => {
    const route = routeCandidates.find(r => r.id === routeId);
    if (route) {
      setSelectedRoute(route);
    }
  };
  
  // 経路検索時に通りたい駅が何個含まれているかをカウント
  const countIncludedViaStations = (route) => {
    if (!route || !stations.via || stations.via.length === 0) return 0;
    
    const routeStationIds = route.route.map(station => station.id);
    const includedCount = stations.via.filter(via => 
      routeStationIds.includes(via.id)
    ).length;
    
    return includedCount;
  };
  
  const value = {
    ticketInfo,
    stations,
    routeCandidates,
    selectedRoute,
    minRequiredZones,
    updateTicketInfo,
    updateStations,
    searchRoutes,
    selectRoute,
    countIncludedViaStations
  };
  
  return (
    <RouteContext.Provider value={value}>
      {children}
    </RouteContext.Provider>
  );
};