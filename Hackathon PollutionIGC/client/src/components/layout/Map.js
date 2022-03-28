import React from 'react'

function Map(props){
    var lat = props.lat;
    var long = props.long;
    var frame = "https://www.google.com/maps/embed/v1/place?key=AIzaSyCZ4YsHJ-UaXOd2W95mXMNhrH2SJXNzUPU&q="+lat+","+long+"";
  return (
    <div>
      <iframe title="myFrame" 
        src={frame}
        width="100%" height="235" style={{border:"0"}} allowFullScreen="" loading="lazy"></iframe>
    </div>
  )
}

export default Map


//https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&types=food&name=harbour&key=AIzaSyCZ4YsHJ-UaXOd2W95mXMNhrH2SJXNzUPU
//https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&types=food&name=harbour&key=YOUR_API_KEY

//https://maps.google.com/maps?q=17.456634553284054,78.37858469200083&hl=en&z=14&amp;output=embed
//https://maps.google.com/maps?q=17.456634553284054,78.37858469200083&hl=en&z=14&amp;output=embed
//https://www.google.com/maps/embed/v1/place?key=AIzaSyDFqryU23xFyexky71B_pw8Yi5AADxDoik&q=Eiffel+Tower,Paris+France&center=37.4218,-122.0840