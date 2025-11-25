import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import api from "../api";

export default function NigeriaMap() {
  const [geojson, setGeojson] = useState(null);
  const geoRef = useRef();

  useEffect(() => {
    // load geojson from backend (states with risk attached)
    api.get("/states")
      .then(res => setGeojson(res.data))
      .catch(err => {
        console.error("Failed to load /states", err);
        // fallback: try local fetch (if you copied geojson to public)
        fetch("/src/data/nigeria-states.json").then(r => r.json()).then(setGeojson).catch(e => console.error(e));
      });
  }, []);

  const getColor = (risk) => {
    if (!risk) return "#43a047";
    const r = String(risk).toLowerCase();
    if (r.startsWith("h")) return "#e53935";
    if (r.startsWith("m")) return "#fb8c00";
    return "#43a047";
  };

  const style = (feature) => {
    const risk = feature.properties.risk_level;
    return { fillColor: getColor(risk), color: "#ffffff", weight: 1, fillOpacity: 0.7 };
  };

  const onEachFeature = (feature, layer) => {
    const name = feature.properties.name || feature.properties.shapeName || feature.properties.NAME_1;
    const risk = feature.properties.risk_level || "Low";
    const rainfall = feature.properties.rainfall_mm || "";
    layer.bindPopup(`<b>${name}</b><br/>Risk: ${risk}<br/>Rainfall: ${rainfall}`);
    layer.on({
      mouseover: (e) => {
        e.target.setStyle({ weight: 3, fillOpacity: 0.9 });
        e.target.bringToFront();
      },
      mouseout: (e) => {
        if (geoRef.current && geoRef.current.resetStyle) geoRef.current.resetStyle(e.target);
      }
    });
  };

  return (
    <div style={{ height: "70vh", position:"relative" }}>
      <div className="legend">
        <div><strong>Legend</strong></div>
        <div style={{display:"flex", gap:8, alignItems:"center"}}><div style={{width:14,height:14,background:"#e53935"}}></div><div>High</div></div>
        <div style={{display:"flex", gap:8, alignItems:"center"}}><div style={{width:14,height:14,background:"#fb8c00"}}></div><div>Medium</div></div>
        <div style={{display:"flex", gap:8, alignItems:"center"}}><div style={{width:14,height:14,background:"#43a047"}}></div><div>Low</div></div>
      </div>

      <MapContainer center={[9.082, 8.6753]} zoom={6} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {geojson && <GeoJSON data={geojson} style={style} onEachFeature={onEachFeature} ref={geoRef} />}
      </MapContainer>
    </div>
  );
}
