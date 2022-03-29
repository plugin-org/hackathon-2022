import React from 'react';//
import Gauge from "react-gaugejs";

function Gauge1(props){
    var initial = 0;
    var goodMax = props.levels[1];
    var satisfactoryMax = props.levels[2]
    var moderateMax = props.levels[3]
    var poorMax = props.levels[4];
    var verypoorMax = props.levels[5];
    var severeMax = props.levels[6];
    
    return (
        <div>
        <div d-flex justify-content-center>
            <Gauge
                value={props.value}
                minValue={0}
                maxValue={severeMax}
                animationSpeed={88}
                options = {{
                    angle: -0.2, // The span of the gauge arc
                    lineWidth: 0.15, // The line thickness
                    radiusScale: 1, // Relative radius
                    pointer: {
                        length: 0.5, // // Relative to gauge radius
                        strokeWidth: 0.02, // The thickness
                        color: '#000000' // Fill color
                    },
                    limitMax: false,     // If false, max value increases automatically if value > maxValue
                    limitMin: false,     // If true, the min value of the gauge will be fixed
                    colorStart: '#6FADCF',   // Colors
                    colorStop: '#8FC0DA',    // just experiment with them
                    strokeColor: '#E0E0E0',  // to see which ones work best for you
                    generateGradient: true,
                    highDpiSupport: true,     // High resolution support
                    staticZones: [
                        //[0,50,100,250,350,430,600]
                        // var initial = 0; #688123
                        // var goodMax = props.levels[1]; #a6ce39
                        // var satisfactoryMax = props.levels[2] #fff101
                        // var moderateMax = props.levels[3] #f68f1e
                        // var poorMax = props.levels[4]; #ff1f1f
                        // var verypoorMax = props.levels[5]; #88181b
                        // var severeMax = props.levels[6]; #
                        {strokeStyle: "#688123", min: initial, max: goodMax}, // good
                        {strokeStyle: "#a6ce39", min: goodMax, max: satisfactoryMax}, // satisfactory
                        {strokeStyle: "#fff101", min: satisfactoryMax, max: moderateMax}, // moderate
                        {strokeStyle: "#f68f1e", min: moderateMax, max: poorMax}, // poor from 100 to 130
                        {strokeStyle: "#ff1f1f", min: poorMax, max: verypoorMax}, // verypoor
                        {strokeStyle: "#88181b", min: verypoorMax, max: severeMax} // severe
                    ],
                    staticLabels: {
                        font: "10px sans-serif",  // Specifies font
                        labels: [0, goodMax, satisfactoryMax, moderateMax, poorMax, verypoorMax, severeMax],  // Print labels at these values
                        color: "#000000",  // Optional: Label text color
                        fractionDigits: 0  // Optional: Numerical precision. 0=round off.
                    },
                }}
                //textChangeHandler={props.value}
                className='gauge-canvas'
                style={{height: '10rem',width:'20rem'}}
            />
        </div>
        <h3 className='d-flex justify-content-center'>{props.value} {props.units}</h3>
        </div>
    )
}

export default Gauge1;