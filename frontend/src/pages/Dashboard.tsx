import React from 'react';
import StateRiskList from '..//components/StateRiskList';
import SmsAlert from '../components/SmsAlert';
export default function Dashboard(){
  return (
    <div style={{display:'grid', gridTemplateColumns:'1fr 320px', gap:16}}>
      <div className="card">
        <h3>State Risk Overview (Mocked)</h3>
        <StateRiskList />
      </div>
      <div className="card">
        <SmsAlert />
      </div>
    </div>
  );
}
