import React from 'react';
import Dropdown from './Select';
import Card from './Card';
import { useSelector } from 'react-redux';
import Map from './Map';
import Accordion from './Accordion';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { popul } from '../../actions';

function Landing() {
    
    const dispatch = useDispatch();

    var gauge_levels = [[0,50,100,250,350,430,600],[0,0.9,1.7,8.7,14.8,29.5,35],[0,21,43,96,149,213,250],[0,25.5,51,86,106,382,420],[0,50,100,250,350,430,500],[0,30,60,90,120,250,350],[0,15,31,145,307,610,710]]
    const myState = useSelector((state)=>state.fillThePage);
    var country = myState[29];
    if(country==="india"||country==="australia"){
        gauge_levels = [[0,50,100,250,350,430,600],[0,0.9,1.7,8.7,14.8,29.7,40],[0,21,43,96,149,213,250],[0,25,51,86,106,381,450],[0,50,100,250,350,430,500],[0,30,60,90,120,250,350],[0,15,31,145,307,610,710]]
    }else{ // if(country==="usa")
        gauge_levels = [[0,50,100,250,350,430,600],[0,4.3,9.5,12.1,15.6,30.5,35],[0,53,101,362,649,1250,1300],[0,61,77,97,117,332,400],[0,55,155,255,355,425,450],[0,12,35,55,150,250,300],[0,36,76,185,303,603,650]]
    }

    var options = {
        enableHighAccuracy: false,
        timeout: 50,
        maximumAge: 0
    };
    
    function success(pos) {
        var selectValue = "Current Location";
        var selCoords = [pos.coords.latitude,pos.coords.longitude];
        console.log(selCoords);
        axios.get('https://api.breezometer.com/air-quality/v2/current-conditions?lat='+selCoords[0]+'&lon='+selCoords[1]+'&key=6232ce775c9345cfa552d05f56168120&features=breezometer_aqi,local_aqi,health_recommendations,sources_and_effects,dominant_pollutant_concentrations,pollutants_concentrations,pollutants_aqi_information').then(response => {
            var locData = response.data;
            console.log(locData);
            var x = 'India';
            var newAqi   = locData['data']['indexes']['ind_cpcb']['aqi'];
            var newCo    = locData['data']['pollutants']['co']['concentration']['value'];
            newCo = newCo/1000;
            newCo = newCo.toFixed(2);
            var newNo2   = locData['data']['pollutants']['no2']['concentration']['value'];
            var newO3    = locData['data']['pollutants']['o3']['concentration']['value'];
            var newPm10  = locData['data']['pollutants']['pm10']['concentration']['value'];
            var newPm25  = locData['data']['pollutants']['pm25']['concentration']['value'];
            var newSo2   = locData['data']['pollutants']['so2']['concentration']['value'];            
            var healthRec_active  = locData['data']['health_recommendations']['active'];
            var healthRec_child   = locData['data']['health_recommendations']['children'];
            var healthRec_elderly = locData['data']['health_recommendations']['elderly'];
            var healthRec_gen     = locData['data']['health_recommendations']['general_population'];
            var healthRec_heart   = locData['data']['health_recommendations']['heart_diseases'];
            var healthRec_lung    = locData['data']['health_recommendations']['lung_diseases'];
            var healthRec_preg    = locData['data']['health_recommendations']['pregnant_women'];
            var effects_Co     = locData['data']['pollutants']['co']['sources_and_effects']['effects'];
            var effects_No2    = locData['data']['pollutants']['no2']['sources_and_effects']['effects'];
            var effects_O3     = locData['data']['pollutants']['o3']['sources_and_effects']['effects'];
            var effects_Pm10   = locData['data']['pollutants']['pm10']['sources_and_effects']['effects'];
            var effects_Pm25   = locData['data']['pollutants']['pm25']['sources_and_effects']['effects'];
            var effects_So2    = locData['data']['pollutants']['so2']['sources_and_effects']['effects'];
            var sources__Co    = locData['data']['pollutants']['co']['sources_and_effects']['sources'];
            var sources__No2   = locData['data']['pollutants']['no2']['sources_and_effects']['sources'];
            var sources__O3    = locData['data']['pollutants']['o3']['sources_and_effects']['sources'];
            var sources__Pm10  = locData['data']['pollutants']['pm10']['sources_and_effects']['sources'];
            var sources__Pm25  = locData['data']['pollutants']['pm25']['sources_and_effects']['sources'];
            var sources__So2   = locData['data']['pollutants']['so2']['sources_and_effects']['sources'];
            var newUpdate = [newAqi,newCo,newNo2,newO3,newPm10,newPm25,newSo2,healthRec_active,
                healthRec_child,healthRec_elderly,healthRec_gen,healthRec_heart,healthRec_lung,healthRec_preg,
                effects_Co,effects_No2,effects_O3,effects_Pm10,effects_Pm25,effects_So2,
                sources__Co,sources__No2,sources__O3,sources__Pm10,sources__Pm25,sources__So2,
                selCoords[0],selCoords[1],selectValue,x
            ]
            dispatch(popul(newUpdate));
        });
    }
    
    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    
    function getLocation(){
       navigator.geolocation.getCurrentPosition(success, error, options);
    }

    //navigator.geolocation.getCurrentPosition(success, error, options);

  return (
    <div className="container-fluid mt-5 p-5" onLoad={getLocation}>
    <div className="d-sm-flex justify-content-between align-items-center mb-4">
        <h3 className="text-dark mb-0">Dashboard</h3>
        <span style={{position:"absolute",right:"3rem" }}>
            <button className='btn btn-dark mb-2' onClick={getLocation}>
                <i className ="fa-solid fa-location-crosshairs"></i>
            </button>
        </span>
    </div>
    <div className="card shadow-small border-start-primary py-2 mb-4">
        <form>
            <Dropdown />
        </form>
    </div>
    <div className="d-sm-flex justify-content-between align-items-center mb-4">
        <h3 className="text-dark mb-0">{myState[28]} Pollution Details</h3>
    </div>
    <div className="row">
        <div className="col-lg-7 col-xl-8">
            <div className="card shadow-small mb-4">
                <div className="card-body">
                    <div className="chart-area">
                        <Map lat={myState[26]} long={myState[27]}/>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-lg-5 col-xl-4">
            <Card name={"AQI"} units={"AQI"} value={myState[0]} levels={gauge_levels[0]}/>
        </div>
    </div>
    <div className="d-sm-flex justify-content-between align-items-center mb-4">
        <h3 className="text-dark mb-0">Pollutants</h3>
    </div>
    <div className="row">
        <div className="col-md-6 col-xl-3 mb-4">
            <Card name={"CO"} units={"ppm"} value={myState[1]} levels={gauge_levels[1]}/>
        </div>
        <div className="col-md-6 col-xl-3 mb-4">
            <Card name={"NO2"} units={"ppb"} value={myState[2]} levels={gauge_levels[2]}/>
        </div>
        <div className="col-md-6 col-xl-3 mb-4">
            <Card name={"O3"} units={"ppb"} value={myState[3]} levels={gauge_levels[3]}/>
        </div>
        <div className="col-md-6 col-xl-3 mb-4">
            <Card name={"PM 10"} units={"ug/m3"} value={myState[4]} levels={gauge_levels[4]}/>
        </div>
        <div className="col-md-6 col-xl-3 mb-4">
            <Card name={"PM 2.5"} units={"ug/m3"} value={myState[5]} levels={gauge_levels[5]}/>
        </div>
        <div className="col-md-6 col-xl-3 mb-4">
            <Card name={"SO2"} units={"ppb"} value={myState[6]} levels={gauge_levels[6]}/>
        </div>
        <div className="col-md-12 col-xl-6 mb-4">
            <div className="card shadow-small border-start-warning">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h6 className="text-primary fw-bold m-0">Health Recommendations</h6>
                </div>
                <div className="card-body">
                    <div id="gauge3" className="gauge-container three">
                        <h6>Active People: </h6>
                        <p>{myState[7]}</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="col">
            <div className="card shadow-small border-start-warning">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h6 className="text-primary fw-bold m-0">Health Recommendations</h6>
                </div>
                <div className="card-body">
                    <div id="gauge3" className="gauge-container three">
                        <h6>Children: </h6>
                        <p>{myState[8]}</p>
                        <h6>Elderly: </h6>
                        <p>{myState[9]}</p>
                        <h6>General: </h6>
                        <p>{myState[10]}</p>
                        <h6>Heart Patients: </h6>
                        <p>{myState[11]}</p>
                        <h6>Lung Patients: </h6>
                        <p>{myState[12]}</p>
                        <h6>Pregnant: </h6>
                        <p>{myState[13]}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="row">
        <div className="col-md-6 mt-4">
            <div className="card shadow-small border-start-warning">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h6 className="text-primary fw-bold m-0">Effects of pollutants</h6>
                </div>
                <div className="card-body">
                    <div id="gauge3" className="gauge-container three">
                        <h6>Carbon Monoxide (CO): </h6>
                        <p>{myState[14]}</p>
                        <h6>Nitrogen Dioxide (NO2): </h6>
                        <p>{myState[15]}</p>
                        <h6>Ozone (O3): </h6>
                        <p>{myState[16]}</p>
                        <h6>Inhalable Particulate Matter (PM10): </h6>
                        <p>{myState[17]}</p>
                        <h6>Fine Particulate Matter (PM 2.5): </h6>
                        <p>{myState[18]}</p>
                        <h6>SO2: </h6>
                        <p>{myState[19]}</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-md-6 mt-4">
            <div className="card shadow-small border-start-warning">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h6 className="text-primary fw-bold m-0">Sources of pollutants</h6>
                </div>
                <div className="card-body">
                    <div id="gauge3" className="gauge-container three">
                        <h6>Carbon Monoxide (CO): </h6>
                        <p>{myState[20]}</p>
                        <h6>Nitrogen Dioxide (NO2): </h6>
                        <p>{myState[21]}</p>
                        <h6>Ozone (O3): </h6>
                        <p>{myState[22]}</p>
                        <h6>Inhalable Particulate Matter (PM10): </h6>
                        <p>{myState[23]}</p>
                        <h6>Fine Particulate Matter (PM 2.5): </h6>
                        <p>{myState[24]}</p>
                        <h6>SO2: </h6>
                        <p>{myState[25]}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Accordion />
</div>

  )
}

export default Landing;