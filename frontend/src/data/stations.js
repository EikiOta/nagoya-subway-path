// src/data/stations.js
// 駅データ: id, 名前, 路線ID, 座標（表示用）
export const stations = [
    // 東山線
    { id: "T01", name: "高畑", lineId: "T", pos: { x: 10, y: 50 } },
    { id: "T02", name: "八田", lineId: "T", pos: { x: 20, y: 50 } },
    { id: "T03", name: "岩塚", lineId: "T", pos: { x: 30, y: 50 } },
    { id: "T04", name: "中村公園", lineId: "T", pos: { x: 40, y: 50 } },
    { id: "T05", name: "中村日赤", lineId: "T", pos: { x: 50, y: 50 } },
    { id: "T06", name: "本陣", lineId: "T", pos: { x: 60, y: 50 } },
    { id: "T07", name: "亀島", lineId: "T", pos: { x: 70, y: 50 } },
    { id: "T08", name: "名古屋", lineId: "T", pos: { x: 80, y: 50 } },
    { id: "T09", name: "伏見", lineId: "T", pos: { x: 90, y: 50 } },
    { id: "T10", name: "栄", lineId: "T", pos: { x: 100, y: 50 } },
    { id: "T11", name: "新栄町", lineId: "T", pos: { x: 110, y: 50 } },
    { id: "T12", name: "千種", lineId: "T", pos: { x: 120, y: 50 } },
    { id: "T13", name: "今池", lineId: "T", pos: { x: 130, y: 50 } },
    { id: "T14", name: "池下", lineId: "T", pos: { x: 140, y: 45 } },
    { id: "T15", name: "覚王山", lineId: "T", pos: { x: 150, y: 40 } },
    { id: "T16", name: "本山", lineId: "T", pos: { x: 160, y: 35 } },
    { id: "T17", name: "東山公園", lineId: "T", pos: { x: 170, y: 30 } },
    { id: "T18", name: "星ヶ丘", lineId: "T", pos: { x: 180, y: 25 } },
    { id: "T19", name: "一社", lineId: "T", pos: { x: 190, y: 20 } },
    { id: "T20", name: "上社", lineId: "T", pos: { x: 200, y: 15 } },
    { id: "T21", name: "本郷", lineId: "T", pos: { x: 210, y: 10 } },
    { id: "T22", name: "藤が丘", lineId: "T", pos: { x: 220, y: 5 } },
    
    // 名城線
    { id: "M01", name: "金山", lineId: "M", pos: { x: 85, y: 70 } },
    { id: "M02", name: "東別院", lineId: "M", pos: { x: 80, y: 80 } },
    { id: "M03", name: "上前津", lineId: "M", pos: { x: 90, y: 85 } },
    { id: "M04", name: "矢場町", lineId: "M", pos: { x: 100, y: 80 } },
    { id: "M05", name: "栄", lineId: "M", pos: { x: 100, y: 50 } }, // 東山線と接続
    { id: "M06", name: "久屋大通", lineId: "M", pos: { x: 100, y: 40 } },
    { id: "M07", name: "名古屋城", lineId: "M", pos: { x: 90, y: 30 } },
    { id: "M08", name: "市役所", lineId: "M", pos: { x: 80, y: 30 } },
    { id: "M09", name: "名古屋", lineId: "M", pos: { x: 80, y: 50 } }, // 東山線と接続
    { id: "M10", name: "国際センター", lineId: "M", pos: { x: 70, y: 40 } },
    { id: "M11", name: "丸の内", lineId: "M", pos: { x: 60, y: 40 } },
    
    // 鶴舞線
    { id: "C01", name: "上小田井", lineId: "C", pos: { x: 20, y: 20 } },
    { id: "C02", name: "庄内通", lineId: "C", pos: { x: 30, y: 30 } },
    { id: "C03", name: "浄心", lineId: "C", pos: { x: 40, y: 40 } },
    { id: "C04", name: "丸の内", lineId: "C", pos: { x: 60, y: 40 } }, // 名城線と接続
    { id: "C05", name: "伏見", lineId: "C", pos: { x: 90, y: 50 } }, // 東山線と接続
    { id: "C06", name: "大須観音", lineId: "C", pos: { x: 90, y: 75 } },
    { id: "C07", name: "上前津", lineId: "C", pos: { x: 90, y: 85 } }, // 名城線と接続
    { id: "C08", name: "鶴舞", lineId: "C", pos: { x: 100, y: 95 } },
    { id: "C09", name: "荒畑", lineId: "C", pos: { x: 110, y: 100 } },
    { id: "C10", name: "御器所", lineId: "C", pos: { x: 120, y: 105 } },
    { id: "C11", name: "今池", lineId: "C", pos: { x: 130, y: 50 } }, // 東山線と接続
  ];
  
  // 駅間の接続情報
  export const connections = [
    // 東山線
    { from: "T01", to: "T02", time: 2 },
    { from: "T02", to: "T03", time: 2 },
    { from: "T03", to: "T04", time: 2 },
    { from: "T04", to: "T05", time: 1 },
    { from: "T05", to: "T06", time: 2 },
    { from: "T06", to: "T07", time: 1 },
    { from: "T07", to: "T08", time: 2 },
    { from: "T08", to: "T09", time: 2 },
    { from: "T09", to: "T10", time: 2 },
    { from: "T10", to: "T11", time: 1 },
    { from: "T11", to: "T12", time: 2 },
    { from: "T12", to: "T13", time: 2 },
    { from: "T13", to: "T14", time: 2 },
    { from: "T14", to: "T15", time: 2 },
    { from: "T15", to: "T16", time: 1 },
    { from: "T16", to: "T17", time: 2 },
    { from: "T17", to: "T18", time: 2 },
    { from: "T18", to: "T19", time: 2 },
    { from: "T19", to: "T20", time: 1 },
    { from: "T20", to: "T21", time: 2 },
    { from: "T21", to: "T22", time: 2 },
    
    // 名城線
    { from: "M01", to: "M02", time: 2 },
    { from: "M02", to: "M03", time: 2 },
    { from: "M03", to: "M04", time: 2 },
    { from: "M04", to: "M05", time: 2 },
    { from: "M05", to: "M06", time: 1 },
    { from: "M06", to: "M07", time: 2 },
    { from: "M07", to: "M08", time: 1 },
    { from: "M08", to: "M09", time: 2 },
    { from: "M09", to: "M10", time: 2 },
    { from: "M10", to: "M11", time: 1 },
    
    // 鶴舞線
    { from: "C01", to: "C02", time: 3 },
    { from: "C02", to: "C03", time: 2 },
    { from: "C03", to: "C04", time: 3 },
    { from: "C04", to: "C05", time: 2 },
    { from: "C05", to: "C06", time: 2 },
    { from: "C06", to: "C07", time: 1 },
    { from: "C07", to: "C08", time: 2 },
    { from: "C08", to: "C09", time: 2 },
    { from: "C09", to: "C10", time: 2 },
    { from: "C10", to: "C11", time: 3 },
    
    // 相互接続（乗り換え）
    { from: "T08", to: "M09", time: 4, transfer: true },
    { from: "T09", to: "C05", time: 3, transfer: true },
    { from: "T10", to: "M05", time: 3, transfer: true },
    { from: "T13", to: "C11", time: 4, transfer: true },
    { from: "M03", to: "C07", time: 3, transfer: true },
    { from: "M11", to: "C04", time: 3, transfer: true },
  ];
  
  // 路線IDから駅一覧を取得する関数
  export const getStationsByLine = (lineId) => {
    return stations.filter(station => station.lineId === lineId);
  };
  
  // 駅IDから駅情報を取得する関数
  export const getStationById = (stationId) => {
    return stations.find(station => station.id === stationId);
  };
  
  // 接続可能な駅を取得する関数
  export const getConnectedStations = (stationId) => {
    const connected = connections
      .filter(conn => conn.from === stationId)
      .map(conn => {
        const station = getStationById(conn.to);
        return {
          ...station,
          time: conn.time,
          transfer: conn.transfer || false
        };
      });
    
    // 双方向のため、逆方向の接続も追加
    const reverseConnected = connections
      .filter(conn => conn.to === stationId)
      .map(conn => {
        const station = getStationById(conn.from);
        return {
          ...station,
          time: conn.time,
          transfer: conn.transfer || false
        };
      });
    
    return [...connected, ...reverseConnected];
  };