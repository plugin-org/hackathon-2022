import React from 'react';
import Gauge1 from './Gauge';

function card(props) {
  return (
    <div className="card shadow-small border-start-warning">
        <div className="card-header d-flex justify-content-between align-items-center">
            <h6 className="text-primary fw-bold m-0">{props.name}</h6>
        </div>
        <div className="card-body d-flex justify-content-center">
            <Gauge1 value={props.value} units={props.units} levels={props.levels}/>
        </div>
    </div>
  )
}

export default card