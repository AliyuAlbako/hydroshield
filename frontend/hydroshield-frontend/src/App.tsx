import React from "react";
import NigeriaMap from "./components/NigeriaMap";
import SubscribeForm from "./components/SubscribeForm";
import AdminPanel from "./components/AdminPanel";

export default function App(){
  return (
    <>
      <div className="header">
        <img src="/assets/nigeria-map.png" alt="flag" style={{width:48, height:32, borderRadius:4}} />
        <h2 style={{margin:0}}>HydroShield - Flood Early Warning</h2>
      </div>
      <div className="container">
        <div style={{display:"grid", gridTemplateColumns:"2fr 1fr", gap:16}}>
          <div className="card">
            <NigeriaMap />
          </div>
          <div style={{display:"flex", flexDirection:"column", gap:12}}>
            <div className="card"><SubscribeForm /></div>
            <div className="card"><AdminPanel /></div>
          </div>
        </div>
      </div>
    </>
  );
}
