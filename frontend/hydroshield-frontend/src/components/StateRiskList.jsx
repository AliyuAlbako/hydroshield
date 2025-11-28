import React from 'react';
import StateRiskCard from './StateRiskCard';
import { nigeriaStates } from '../data/states';
export default function StateRiskList(){
  return (
    <div>
      {nigeriaStates.map(s => <StateRiskCard key={s.name} name={s.name} risk={s.risk} />)}
    </div>
  );
}
