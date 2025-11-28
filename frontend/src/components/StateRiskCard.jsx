import React from 'react';
export default function StateRiskCard({name, risk}){
  const color = risk === 'High' ? '#e53935' : risk === 'Medium' ? '#fb8c00' : '#43a047';
  return (
    <div style={{padding:12, borderRadius:8, border:'1px solid #eee', marginBottom:10}}>
      <h4 style={{margin:0}}>{name}</h4>
      <p style={{margin:'6px 0', color}}><strong>{risk}</strong></p>
    </div>
  );
}
