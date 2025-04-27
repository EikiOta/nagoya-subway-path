// src/data/lines.js
export const lines = [
    { id: "H", name: "東山線", color: "#FF0000" },
    { id: "S", name: "桜通線", color: "#CC66CC" },
    { id: "T", name: "鶴舞線", color: "#00AA00" },
    { id: "M", name: "名城線", color: "#FFCC00" },
    { id: "E", name: "名港線", color: "#0099FF" },
    { id: "K", name: "上飯田線", color: "#FF66CC" }
  ];
  
  export const getLineById = (lineId) => {
    return lines.find(line => line.id === lineId);
  };