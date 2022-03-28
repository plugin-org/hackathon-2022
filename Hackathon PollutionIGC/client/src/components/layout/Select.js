import React from 'react';
import $ from "jquery";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { popul } from '../../actions';

var states = {
    'india':['Andhra pradesh','Telangana','Tamilnadu'],
    'usa':['Arkansas','Georgia','Hawaii'],
    'australia':['Queensland','Tasmania','Victoria'],
}

var cities = {
    'Andhra pradesh':['Vijayawada','Tirupathi','Ongole'],
    'Telangana':['Hyderabad','Khammam','Warangal'],
    'Tamilnadu':['Chennai','Coimbatore','Madurai'],
    'Arkansas':['Little Rock','Fort Smith','Fayetteville'],
    'Georgia':['Atlanta','Columbus','Augusta'],
    'Hawaii':['Honolulu','Waipahu','Kapolei'],
    'Queensland':['Brisbane','Toowoomba','Logan'],
    'Tasmania':['Hobart','Launceston','Devonport'],
    'Victoria':['Melbourne','Geelong','Ballarat']
}

var locations = {
    'Vijayawada':['Bandar Road','Auto Nagar','Governorpet'],
    'Tirupathi':['Balaji Colony','Dwaraka Nagar','Gandhipuram Colony'],
    'Ongole':['Kothapatnam Beach','Vodarevu Beach','Chennakesava Swamy Temple'],
    'Hyderabad':['Hitech City','Kondapur','Madhapur'],
    'Khammam':['Parnashala','Khanapuram','Ballepalle'],
    'Warangal':['Khila','Bhadrakhali Temple','Koti Linga Temple'],
    'Chennai':['Teynampet','Gopalapuram','Mylapore'],
    'Coimbatore':['Gandhipuram','VOC Park','Coimbatore Airport'],
    'Madurai':['Kochadai','Ellis Nagar','Mattuthavani'],
    'Little Rock':['Mabelvale','Chenal Valley','Riverdale'],
    'Fort Smith':['Southside','Massard','University of Arkansas'],
    'Fayetteville':['Arran Hills','Eastover','Westover'],
    'Atlanta':['Summerhill','Buckhead','Westview'],
    'Columbus':['Cooper creek park','Manchester','Bexley'],
    'Augusta':['National Hills','Country Club Hills','Central Business District'],
    'Honolulu':['Ala Moana','Kaimuki','Waikiki'],
    'Waipahu':['Waikele','Gentry','Kunia'],
    'Kapolei':['Ewa Villages','Nimitz Beach','Kapolei High School'],
    'Brisbane':['South Bank','Fortitude Valley', 'Forest Lake'],
    'Toowoomba':['Rangeville','Mount Lofty','Westbrook'],
    'Logan':['Bahrs Scrub','Bannockburn','Carbrook'],
    'Hobart':['Blackmans Bay','Bonnet Hill','Howden'],
    'Launceston':['Norwood','Trevallyn','Riverside'],
    'Devonport':['Forthside','Eugenana','Rannoch'],
    'Melbourne':['Carlton','Docklands','Parkville'],
    'Geelong':['Geelong','Armstrong Creek','Barwon Heads'],
    'Barwon Heads':['Belmont','Connewarre','Grovedale']
}

var coords = { 
    'Bandar Road' : [16.4971, 80.6561],
    'Auto Nagar' :  [16.5153, 80.6762],
    'Governorpet' : [16.5110, 80.6216],
    'Balaji Colony' : [13.6310,79.4078],
    'Dwaraka Nagar' : [13.6513, 79.4084],
    'Gandhipuram Colony' : [13.6162, 79.4032],
    'Kothapatnam Beach' : [15.435928960881999, 80.17778573842111],
    'Vodarevu Beach' : [15.799673116875107, 80.41456143139175],
    'Chennakesava Swamy Temple' : [15.502163535725572, 80.0452106296404],
    'Hitech City' : [17.456634553284054, 78.37858469200083],
    'Kondapur' : [17.469874189760368, 78.35583486439586],
    'Madhapur' : [17.449254573405703, 78.38872741796224],
    'Parnashala' : [17.941979495021965, 80.9054497087723],
    'Khanapuram' : [17.264807204955694, 80.1674658677906],
    'Ballepalle' : [17.268504518855423, 80.1911562363211],
    'Khila' : [17.95639027305761, 79.61465999396191],
    'Bhadrakhali Temple' : [17.995535578212827, 79.58294014228505],
    'Koti Linga Temple' : [17.985731542315314, 79.62969145271951],
    'Teynampet' : [13.05040130306484, 80.25308446967412],
    'Gopalapuram' : [13.053078916431264, 80.2588399932461],
    'Mylapore' : [13.048175963117437, 80.26810439038506],
    'Gandhipuram' : [11.018595105090247, 76.96745030831006],
    'VOC Park' : [11.012506721358521, 76.97121168951185],
    'Coimbatore Airport' : [11.033078125207684, 77.03926796451366],
    'Kochadai' : [9.943216247682745, 78.08105801196017],
    'Ellis Nagar' : [9.918797595401806, 78.10350559106338],
    'Mattuthavani' : [9.94455343585779, 78.15610721639631],
    'Mabelvale' : [34.65658441522111, -92.3883442594824],
    'Chenal Valley' : [34.80258116012352, -92.44116538562199],
    'Riverdale' : [34.769284702270646, -92.31406023530225],
    'Southside' : [35.35122422543554, -94.38751343253165],
    'Massard' : [35.33571919950455, -94.34097078954659],
    'University of Arkansas' : [35.384796795526555, -94.37384328807698],
    'Arran Hills' : [35.03691887215959, -78.98637513630699],
    'Eastover' : [35.11083092742749, -78.78227168619259],
    'Westover' : [35.08465442272083, -78.99023334969486],
    'Summerhill' : [33.736986656006394, -84.38402845099756],
    'Buckhead' : [33.83767538978253, -84.40594249811659],
    'Westview' : [33.742898354449586, -84.43649683409573],
    'Cooper creek park' : [32.51529145332979, -84.91186484285278],
    'Manchester' : [32.89645302049735, -84.61546861709446],
    'Bexley Road' : [33.25416516244746, -84.77228598691147],
    'National Hills' : [33.539896635876346, -82.0217769687827],
    'Country Club Hills' : [33.48901682236713, -82.01916627438422],
    'Central Business District' : [33.48008524625384, -81.97053021663757],
    'Ala Moana' : [21.3067033603142, -157.84012064022073],
    'Kaimuki' : [21.293658659192563, -157.79974588912026],
    'Waikiki' : [21.289378272036224, -157.8310459399014],
    'Waikele' : [21.38538301075838, -158.01392446416477],
    'Gentry' : [21.3399166416128, -158.02745449017945],
    'Kunia' : [21.427277014130347, -158.05416750614202],
    'Ewa Villages' : [21.340851420754547, -158.03763530028047],
    'Nimitz Beach' : [21.301354094717595, -158.0670769012259],
    'Kapolei High School' : [21.329115232401552, -158.0683652008917],
    'South Bank' : [-27.463801257421277, 153.01931384689598],
    'Fortitude Valley' : [-27.454458593243267, 153.0333537517018],
    'Forest Lake' : [-27.624289856174368, 152.96703905607774],
    'Rangeville' : [-27.583076699596482, 151.98431094800833],
    'Mount Lofty' : [-27.547733474144792, 151.9696720485592],
    'Westbrook' : [-27.581575948094137, 151.86533287909626],
    'Bahrs Scrub' : [-27.73047877797027, 153.16299134615025],
    'Bannockburn' : [-27.76425039278161, 153.19040370525195],
    'Carbrook' : [-27.6570277211581, 153.25787006324566],
    'Blackmans Bay' : [-43.00546601038482, 147.31889272582984],
    'Bonnet Hill' : [-42.96603740688482, 147.33341904370857],
    'Howden' : [-43.02673954804906, 147.29299696969744],
    'Norwood' : [-41.45444847623021, 147.17676532634383],
    'Trevallyn' : [-41.441575643138876, 147.08841966913695],
    'Riverside' : [-41.407800202350494, 147.09841100387135],
    'Forthside' : [-41.21411734259251, 146.2854310255738],
    'Eugenana' : [-41.232947583571196, 146.31394506667948],
    'Rannoch' : [-41.18204720517845, 146.38390033754675],
    'Carlton' : [-37.80076576182864, 144.9662884841076],
    'Docklands' : [-37.81947676574578, 144.94733657188047],
    'Parkville' : [-37.77843708448934, 144.94347619889652],
    'Geelong' : [-38.145142079838166, 144.3596938345625],
    'Armstrong Creek' : [-38.238142632501415, 144.35530697887754],
    'Barwon Heads' : [-38.274123825228145, 144.4870348498028],
    'Belmont' : [-38.17559235480295, 144.34388801342723],
    'Connewarre' : [-38.27460573985759, 144.46085766916593],
    'Grovedale': [-38.206610854601465, 144.3399603627835]
}

function selCon(event){
   // console.log(event.target.value);
    var selectValue = event.target.value;
    var x = document.getElementById("myDIV");
    x.innerHTML= selectValue;
    $('#states').empty();
    $('#cities').empty();
    $('#locations').empty();
    $('#states').append("<option disabled selected>Select State</option>");
    for ( var i = 0; i < states[selectValue].length; i++) {
        $('#states').append("<option value='" + states[selectValue][i] + "'>" + states[selectValue][i] + "</option>");
    }
}

function selState(event){
    // console.log(event.target.value);
    var selectValue = event.target.value;
    $('#cities').empty();
    $('#locations').empty();
    $('#cities').append("<option disabled selected>Select City</option>");
    for ( var i = 0; i < cities[selectValue].length; i++) {
        $('#cities').append("<option value='" + cities[selectValue][i] + "'>" + cities[selectValue][i] + "</option>");
    }
}

function selCity(event){
    // console.log(event.target.value);
    var selectValue = event.target.value;
    $('#locations').empty();
    $('#locations').append("<option disabled selected>Select Location</option>");
    for ( var i = 0; i < locations[selectValue].length; i++) {
        $('#locations').append("<option value='" + locations[selectValue][i] + "'>" + locations[selectValue][i] + "</option>");
    }
}

function Select() {

    var x = document.getElementById("myDIV").innerHTML;
    const dispatch = useDispatch();

    function selLoc(event){
        var selectValue = event.target.value;
        var selCoords = coords[selectValue];
        if ( selectValue === 'Bandar Road' || selectValue === 'Auto Nagar'||selectValue==='Governorpet'){
            axios.get('http://3.138.189.39:5001/data').then(response => {
                var mongoData = JSON.parse(response.data);
                if(selectValue === 'Bandar Road'){
                    var selectedData = mongoData["bandar_road"];
                }else if(selectValue === 'Auto Nagar'){
                    selectedData = mongoData["Auto Nagar"];
                }else if(selectValue==='Governorpet'){
                    selectedData = mongoData["governorpet"];
                }
                var newAqi   = selectedData['data']['data']['indexes']['ind_cpcb']['aqi'];
                var newCo    = selectedData['data']['data']['pollutants']['co']['concentration']['value'];
                newCo = newCo/1000;
                newCo = newCo.toFixed(2);
                var newNo2   = selectedData['data']['data']['pollutants']['no2']['concentration']['value'];
                var newO3    = selectedData['data']['data']['pollutants']['o3']['concentration']['value'];
                var newPm10  = selectedData['data']['data']['pollutants']['pm10']['concentration']['value'];
                var newPm25  = selectedData['data']['data']['pollutants']['pm25']['concentration']['value'];
                var newSo2   = selectedData['data']['data']['pollutants']['so2']['concentration']['value'];            
                var healthRec_active  = selectedData['data']['data']['health_recommendations']['active'];
                var healthRec_child   = selectedData['data']['data']['health_recommendations']['children'];
                var healthRec_elderly = selectedData['data']['data']['health_recommendations']['elderly'];
                var healthRec_gen     = selectedData['data']['data']['health_recommendations']['general_population'];
                var healthRec_heart   = selectedData['data']['data']['health_recommendations']['heart_diseases'];
                var healthRec_lung    = selectedData['data']['data']['health_recommendations']['lung_diseases'];
                var healthRec_preg    = selectedData['data']['data']['health_recommendations']['pregnant_women'];
                var effects_Co     = selectedData['data']['data']['pollutants']['co']['sources_and_effects']['effects'];
                var effects_No2    = selectedData['data']['data']['pollutants']['no2']['sources_and_effects']['effects'];
                var effects_O3     = selectedData['data']['data']['pollutants']['o3']['sources_and_effects']['effects'];
                var effects_Pm10   = selectedData['data']['data']['pollutants']['pm10']['sources_and_effects']['effects'];
                var effects_Pm25   = selectedData['data']['data']['pollutants']['pm25']['sources_and_effects']['effects'];
                var effects_So2    = selectedData['data']['data']['pollutants']['so2']['sources_and_effects']['effects'];
                var sources__Co    = selectedData['data']['data']['pollutants']['co']['sources_and_effects']['sources'];
                var sources__No2   = selectedData['data']['data']['pollutants']['no2']['sources_and_effects']['sources'];
                var sources__O3    = selectedData['data']['data']['pollutants']['o3']['sources_and_effects']['sources'];
                var sources__Pm10  = selectedData['data']['data']['pollutants']['pm10']['sources_and_effects']['sources'];
                var sources__Pm25  = selectedData['data']['data']['pollutants']['pm25']['sources_and_effects']['sources'];
                var sources__So2   = selectedData['data']['data']['pollutants']['so2']['sources_and_effects']['sources'];
                var newUpdate = [newAqi,newCo,newNo2,newO3,newPm10,newPm25,newSo2,healthRec_active,healthRec_child,healthRec_elderly,healthRec_gen,healthRec_heart,healthRec_lung,healthRec_preg,
                    effects_Co,effects_No2,effects_O3,effects_Pm10,effects_Pm25,effects_So2,
                    sources__Co,sources__No2,sources__O3,sources__Pm10,sources__Pm25,sources__So2,selCoords[0],selCoords[1],selectValue,x
                ]
                dispatch(popul(newUpdate));
            })
        }else{
        axios.get('https://api.breezometer.com/air-quality/v2/current-conditions?lat='+selCoords[0]+'&lon='+selCoords[1]+'&key=6232ce775c9345cfa552d05f56168120&features=breezometer_aqi,local_aqi,health_recommendations,sources_and_effects,dominant_pollutant_concentrations,pollutants_concentrations,pollutants_aqi_information').then(response => {
            console.log(response.data);
            var locData = response.data;
            var x = document.getElementById("myDIV").innerHTML;
            if(x==='india'){
                var board = 'ind_cpcb';
            }else if(x==='usa'){
                board = 'usa_epa';
            }else if(x==='australia'){
                board = 'aus_combined';
            }
            var newAqi   = locData['data']['indexes'][board]['aqi'];
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
            var newUpdate = [newAqi,newCo,newNo2,newO3,newPm10,newPm25,newSo2,healthRec_active,healthRec_child,healthRec_elderly,healthRec_gen,healthRec_heart,healthRec_lung,healthRec_preg,
                effects_Co,effects_No2,effects_O3,effects_Pm10,effects_Pm25,effects_So2,
                sources__Co,sources__No2,sources__O3,sources__Pm10,sources__Pm25,sources__So2,selCoords[0],selCoords[1],selectValue,x
            ]
            dispatch(popul(newUpdate));
        });   
        }  
    }

    return (
        <div id="container">
            <div className="row p-4">
                <h6>Please Select a location</h6>
                <div className="col-12 col-md-3 text-start">
                    <label className='mb-1'> Country</label>
                    <select id='country' className="form-select" onChange={selCon} placeholder="Country">
                        <option disabled selected>Select Country</option>
                        <option value={"india"}>India</option>
                        <option value={"usa"}>USA</option>
                        <option value={"australia"}>Australia</option>
                    </select>
                </div>
                <div className="col-12 col-md-3 text-start">
                    <label className='mb-1'> State</label>
                    <select id='states' className="form-select" onChange={selState} placeholder="State" >
                        <option disabled selected>Select State</option>
                    </select>
                </div>
                <div className="col-12 col-md-3 text-start">
                    <label className='mb-1'> City</label>
                    <select id='cities' className="form-select" onChange={selCity} placeholder="City">
                        <option disabled selected>Select City</option>
                    </select>
                </div>
                <div className="col-12 col-md-3 text-start">
                    <label className='mb-1'> Location</label>
                    <select id='locations' className="form-select" onChange={selLoc} placeholder="Location">
                        <option disabled selected>Select Location</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default Select;