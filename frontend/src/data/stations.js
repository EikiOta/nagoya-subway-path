// src/data/stations.js
// 駅データ: id, 名前, 路線ID
export const stations = [
    // 東山線
    { id: "H01", name: "高畑", lineId: "H" },
    { id: "H02", name: "八田", lineId: "H" },
    { id: "H03", name: "岩塚", lineId: "H" },
    { id: "H04", name: "中村公園", lineId: "H" },
    { id: "H05", name: "中村日赤", lineId: "H" },
    { id: "H06", name: "本陣", lineId: "H" },
    { id: "H07", name: "亀島", lineId: "H" },
    { id: "H08", name: "名古屋", lineId: "H" },
    { id: "H09", name: "伏見", lineId: "H" },
    { id: "H10", name: "栄", lineId: "H" },
    { id: "H11", name: "新栄町", lineId: "H" },
    { id: "H12", name: "千種", lineId: "H" },
    { id: "H13", name: "今池", lineId: "H" },
    { id: "H14", name: "池下", lineId: "H" },
    { id: "H15", name: "覚王山", lineId: "H" },
    { id: "H16", name: "本山", lineId: "H" },
    { id: "H17", name: "東山公園", lineId: "H" },
    { id: "H18", name: "星ヶ丘", lineId: "H" },
    { id: "H19", name: "一社", lineId: "H" },
    { id: "H20", name: "上社", lineId: "H" },
    { id: "H21", name: "本郷", lineId: "H" },
    { id: "H22", name: "藤が丘", lineId: "H" },
    
    // 桜通線
    { id: "S01", name: "太閤通", lineId: "S" },
    { id: "S02", name: "名古屋", lineId: "S" },
    { id: "S03", name: "国際センター", lineId: "S" },
    { id: "S04", name: "丸の内", lineId: "S" },
    { id: "S05", name: "久屋大通", lineId: "S" },
    { id: "S06", name: "高岳", lineId: "S" },
    { id: "S07", name: "車道", lineId: "S" },
    { id: "S08", name: "今池", lineId: "S" },
    { id: "S09", name: "吹上", lineId: "S" },
    { id: "S10", name: "御器所", lineId: "S" },
    { id: "S11", name: "桜山", lineId: "S" },
    { id: "S12", name: "瑞穂区役所", lineId: "S" },
    { id: "S13", name: "瑞穂運動場西", lineId: "S" },
    { id: "S14", name: "新瑞橋", lineId: "S" },
    { id: "S15", name: "桜本町", lineId: "S" },
    { id: "S16", name: "鶴里", lineId: "S" },
    { id: "S17", name: "野並", lineId: "S" },
    { id: "S18", name: "鳴子北", lineId: "S" },
    { id: "S19", name: "相生山", lineId: "S" },
    { id: "S20", name: "神沢", lineId: "S" },
    { id: "S21", name: "徳重", lineId: "S" },
    
    // 鶴舞線
    { id: "T01", name: "上小田井", lineId: "T" },
    { id: "T02", name: "庄内緑地公園", lineId: "T" },
    { id: "T03", name: "庄内通", lineId: "T" },
    { id: "T04", name: "浄心", lineId: "T" },
    { id: "T05", name: "浅間町", lineId: "T" },
    { id: "T06", name: "丸の内", lineId: "T" },
    { id: "T07", name: "伏見", lineId: "T" },
    { id: "T08", name: "大須観音", lineId: "T" },
    { id: "T09", name: "上前津", lineId: "T" },
    { id: "T10", name: "鶴舞", lineId: "T" },
    { id: "T11", name: "荒畑", lineId: "T" },
    { id: "T12", name: "御器所", lineId: "T" },
    { id: "T13", name: "川名", lineId: "T" },
    { id: "T14", name: "いりなか", lineId: "T" },
    { id: "T15", name: "八事", lineId: "T" },
    { id: "T16", name: "塩釜口", lineId: "T" },
    { id: "T17", name: "植田", lineId: "T" },
    { id: "T18", name: "原", lineId: "T" },
    { id: "T19", name: "平針", lineId: "T" },
    { id: "T20", name: "赤池", lineId: "T" },
    
    // 名城線
    { id: "M01", name: "金山", lineId: "M" },
    { id: "M02", name: "東別院", lineId: "M" },
    { id: "M03", name: "上前津", lineId: "M" },
    { id: "M04", name: "矢場町", lineId: "M" },
    { id: "M05", name: "栄", lineId: "M" },
    { id: "M06", name: "久屋大通", lineId: "M" },
    { id: "M07", name: "名古屋城", lineId: "M" },
    { id: "M08", name: "名城公園", lineId: "M" },
    { id: "M09", name: "黒川", lineId: "M" },
    { id: "M10", name: "志賀本通", lineId: "M" },
    { id: "M11", name: "平安通", lineId: "M" },
    { id: "M12", name: "大曽根", lineId: "M" },
    { id: "M13", name: "ナゴヤドーム前矢田", lineId: "M" },
    { id: "M14", name: "砂田橋", lineId: "M" },
    { id: "M15", name: "茶屋ヶ坂", lineId: "M" },
    { id: "M16", name: "自由ヶ丘", lineId: "M" },
    { id: "M17", name: "本山", lineId: "M" },
    { id: "M18", name: "名古屋大学", lineId: "M" },
    { id: "M19", name: "八事日赤", lineId: "M" },
    { id: "M20", name: "八事", lineId: "M" },
    { id: "M21", name: "総合リハビリセンター", lineId: "M" },
    { id: "M22", name: "瑞穂運動場東", lineId: "M" },
    { id: "M23", name: "新瑞橋", lineId: "M" },
    { id: "M24", name: "妙音通", lineId: "M" },
    { id: "M25", name: "堀田", lineId: "M" },
    { id: "M26", name: "熱田神宮伝馬町", lineId: "M" },
    { id: "M27", name: "熱田神宮西", lineId: "M" },
    { id: "M28", name: "西高蔵", lineId: "M" },
  
    // 名港線
    { id: "E01", name: "金山", lineId: "E" },
    { id: "E02", name: "日比野", lineId: "E" },
    { id: "E03", name: "六番町", lineId: "E" },
    { id: "E04", name: "東海通", lineId: "E" },
    { id: "E05", name: "港区役所", lineId: "E" },
    { id: "E06", name: "築地口", lineId: "E" },
    { id: "E07", name: "名古屋港", lineId: "E" },
  
    // 上飯田線
    { id: "K01", name: "上飯田", lineId: "K" },
    { id: "K02", name: "平安通", lineId: "K" }
  ];
  
  // 駅間の接続情報
  export const connections = [
    // 東山線
    { from: "H01", to: "H02", time: 2 },
    { from: "H02", to: "H03", time: 2 },
    { from: "H03", to: "H04", time: 2 },
    { from: "H04", to: "H05", time: 1 },
    { from: "H05", to: "H06", time: 2 },
    { from: "H06", to: "H07", time: 1 },
    { from: "H07", to: "H08", time: 2 },
    { from: "H08", to: "H09", time: 2 },
    { from: "H09", to: "H10", time: 2 },
    { from: "H10", to: "H11", time: 1 },
    { from: "H11", to: "H12", time: 2 },
    { from: "H12", to: "H13", time: 2 },
    { from: "H13", to: "H14", time: 2 },
    { from: "H14", to: "H15", time: 2 },
    { from: "H15", to: "H16", time: 1 },
    { from: "H16", to: "H17", time: 2 },
    { from: "H17", to: "H18", time: 2 },
    { from: "H18", to: "H19", time: 2 },
    { from: "H19", to: "H20", time: 1 },
    { from: "H20", to: "H21", time: 2 },
    { from: "H21", to: "H22", time: 2 },
    
    // 桜通線
    { from: "S01", to: "S02", time: 2 },
    { from: "S02", to: "S03", time: 2 },
    { from: "S03", to: "S04", time: 2 },
    { from: "S04", to: "S05", time: 2 },
    { from: "S05", to: "S06", time: 2 },
    { from: "S06", to: "S07", time: 2 },
    { from: "S07", to: "S08", time: 2 },
    { from: "S08", to: "S09", time: 2 },
    { from: "S09", to: "S10", time: 2 },
    { from: "S10", to: "S11", time: 2 },
    { from: "S11", to: "S12", time: 2 },
    { from: "S12", to: "S13", time: 2 },
    { from: "S13", to: "S14", time: 2 },
    { from: "S14", to: "S15", time: 2 },
    { from: "S15", to: "S16", time: 2 },
    { from: "S16", to: "S17", time: 2 },
    { from: "S17", to: "S18", time: 2 },
    { from: "S18", to: "S19", time: 2 },
    { from: "S19", to: "S20", time: 2 },
    { from: "S20", to: "S21", time: 2 },
    
    // 鶴舞線
    { from: "T01", to: "T02", time: 3 },
    { from: "T02", to: "T03", time: 2 },
    { from: "T03", to: "T04", time: 2 },
    { from: "T04", to: "T05", time: 2 },
    { from: "T05", to: "T06", time: 2 },
    { from: "T06", to: "T07", time: 2 },
    { from: "T07", to: "T08", time: 2 },
    { from: "T08", to: "T09", time: 2 },
    { from: "T09", to: "T10", time: 2 },
    { from: "T10", to: "T11", time: 2 },
    { from: "T11", to: "T12", time: 2 },
    { from: "T12", to: "T13", time: 2 },
    { from: "T13", to: "T14", time: 2 },
    { from: "T14", to: "T15", time: 2 },
    { from: "T15", to: "T16", time: 2 },
    { from: "T16", to: "T17", time: 2 },
    { from: "T17", to: "T18", time: 2 },
    { from: "T18", to: "T19", time: 2 },
    { from: "T19", to: "T20", time: 3 },
    
    // 名城線
    { from: "M01", to: "M02", time: 2 },
    { from: "M02", to: "M03", time: 2 },
    { from: "M03", to: "M04", time: 2 },
    { from: "M04", to: "M05", time: 2 },
    { from: "M05", to: "M06", time: 1 },
    { from: "M06", to: "M07", time: 2 },
    { from: "M07", to: "M08", time: 2 },
    { from: "M08", to: "M09", time: 2 },
    { from: "M09", to: "M10", time: 2 },
    { from: "M10", to: "M11", time: 2 },
    { from: "M11", to: "M12", time: 2 },
    { from: "M12", to: "M13", time: 2 },
    { from: "M13", to: "M14", time: 2 },
    { from: "M14", to: "M15", time: 2 },
    { from: "M15", to: "M16", time: 2 },
    { from: "M16", to: "M17", time: 2 },
    { from: "M17", to: "M18", time: 2 },
    { from: "M18", to: "M19", time: 2 },
    { from: "M19", to: "M20", time: 1 },
    { from: "M20", to: "M21", time: 2 },
    { from: "M21", to: "M22", time: 2 },
    { from: "M22", to: "M23", time: 2 },
    { from: "M23", to: "M24", time: 2 },
    { from: "M24", to: "M25", time: 2 },
    { from: "M25", to: "M26", time: 2 },
    { from: "M26", to: "M27", time: 2 },
    { from: "M27", to: "M28", time: 2 },
    { from: "M28", to: "M01", time: 2 },
    
    // 名港線
    { from: "E01", to: "E02", time: 2 },
    { from: "E02", to: "E03", time: 2 },
    { from: "E03", to: "E04", time: 2 },
    { from: "E04", to: "E05", time: 2 },
    { from: "E05", to: "E06", time: 2 },
    { from: "E06", to: "E07", time: 2 },
    
    // 上飯田線
    { from: "K01", to: "K02", time: 2 },
    
    // 乗り換え駅の接続
    { from: "H08", to: "S02", time: 4, transfer: true }, // 名古屋駅
    { from: "H09", to: "T07", time: 3, transfer: true }, // 伏見駅
    { from: "H10", to: "M05", time: 3, transfer: true }, // 栄駅
    { from: "H13", to: "S08", time: 4, transfer: true }, // 今池駅
    { from: "H16", to: "M17", time: 3, transfer: true }, // 本山駅
    { from: "S04", to: "T06", time: 3, transfer: true }, // 丸の内駅
    { from: "S05", to: "M06", time: 3, transfer: true }, // 久屋大通駅
    { from: "S10", to: "T12", time: 3, transfer: true }, // 御器所駅
    { from: "S14", to: "M23", time: 3, transfer: true }, // 新瑞橋駅
    { from: "T09", to: "M03", time: 3, transfer: true }, // 上前津駅
    { from: "T15", to: "M20", time: 3, transfer: true }, // 八事駅
    { from: "M01", to: "E01", time: 3, transfer: true }, // 金山駅
    { from: "M11", to: "K02", time: 3, transfer: true }  // 平安通駅
  ];
  
  // 駅IDから駅情報を取得する関数
  export const getStationById = (stationId) => {
    return stations.find(station => station.id === stationId);
  };
  
  // 路線IDから駅一覧を取得する関数
  export const getStationsByLine = (lineId) => {
    return stations.filter(station => station.lineId === lineId);
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