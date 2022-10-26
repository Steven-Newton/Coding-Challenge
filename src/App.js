import React, { useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import marcadores from "./marcadores.json"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//learning challenge, hecho otro project, para resolver problemas con versiones y con un Api_key nuevo, ya que no funcionaba la proporcionada
/*
As a student, I want to see a map of Mexico City
As a student, I want to see a map that has all the stores represented as markers/pins on the map.
As a student, I want to be able to click on a store and add it to a list of 'My Favorite Stores'
  */
/*
utilize el api geocoding para transformar las direciones a coordenadas  
cree un json con los marcadores para no tener que llamar a geocoding cada vez ya que cobra cada vez que se llama
y en dado caso de que se tuvieran que usar promesas,al ser tantas llamadas el useState+useEffect hacia que tardara mucho en cargar 

function MarkerStart(address,name){
  fetch("https://maps.googleapis.com/maps/api/geocode/json?address="+address+'&key='+"AIzaSyAxNsRUwcy-97ib8O-c7Ot0Ctx3Vxk0WIk")
  .then(response => response.json())   
    .then(data => {       
      if (data.results.length>0) {
    let latlng =  data.results[0].geometry.location
    let marcInfo =    {position:{latlng},nombre:name}     
        console.log(JSON.stringify(marcInfo))
    }})
}*/


function App() {

  const [select, setSelect] = useState("selecciona tienda");
  const [list, setlist] = useState([])
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAxNsRUwcy-97ib8O-c7Ot0Ctx3Vxk0WIk"
  })
  return isLoaded ? (
    <Container>
      <Row><Col className="contact-content debug-border"  >
        <h1>Mexico City Stores </h1>
        <GoogleMap
          mapContainerStyle={{
            width: '400px',
            height: '400px'
          }}
          center={{
            lat: 19.4357,
            lng: -99.1318
          }}
          zoom={10} >
          {
            marcadores.map((m) => {
              return <Marker key={m.nombre} position={m.position.latlng} clickable={true} onClick={() => { setSelect(m.nombre)}} />
            })
          }

        </GoogleMap>
        <h2>{select}</h2>
        <button onClick={() =>{ if((select!="selecciona tienda"))
        {setlist(list.concat(<li>{select}</li>))}}} >"Agregar a favoritos"</button>

      </Col >
        <Col >
          <h1>Lista de Favoritos</h1>
            <ul> 
          {list.map((l) => {
            <li>{l}</li>
            {console.log(JSON.stringify(l))}
          })}
          </ul>

          {list}
        </Col>
      </Row>
      
    </Container >

  ) : <><h1>Mapa Cargando</h1></>
}

export default React.memo(App)