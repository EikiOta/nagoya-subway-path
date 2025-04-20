// src/data/lines.js
export const lines = [
    { id: "T", name: "東山線", color: "#FF0000" },
    { id: "M", name: "名城線", color: "#FFCC00" },
    { id: "C", name: "鶴舞線", color: "#00AA00" },
    { id: "S", name: "桜通線", color: "#CC66CC" },
    { id: "H", name: "名港線", color: "#0099FF" },
    { id: "K", name: "河和線", color: "#FF66CC" }
  ];
  
  export const getLineById = (lineId) => {
    return lines.find(line => line.id === lineId);
  };