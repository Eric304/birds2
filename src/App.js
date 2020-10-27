import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function Bird({bird}) {
  return(
    <div className="bird">
      <div className="birdName">{bird.name}</div>
      <div>{bird._id}</div>
      <div><img src={bird.imgUrl} alt="Photo" ></img></div>

    </div>
  );
}

function App() {

  const [birds,setBirds]=useState([]);
  const [body,setBody]=useState({name: "", isAlive: true});

useEffect(()=>{
  axios.get("http://localhost:5000/birds").then((res)=>{
    console.log(res);
    setBirds(res.data)
  })
},[]);


const handleCreate = (e) => {
  const newBody = body;
  const name = e.target.name;
  let value = e.target.value;

  if (name === "colors") {
    value= e.target.value.split(",");
  } 
  if (name=== "isAlive") {
    value= e.target.value==="true"
  }
  if (name==="sizeInInches") {
    value=parseInt(e.target.value);
  } 

  console.log(e.target.name,e.target.value);
  newBody[name] = value;
  setBody(newBody); 
  
};


const createBird = ()=>{
  axios.post("http://localhost:5000/birds", body).then((res)=>{
    axios.get("http://localhost:5000/birds").then((res)=>{
      setBirds(res.data)
      
    })
  })
  window.location.replace('')
};

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="Titulo"> Catálogo de Pájaros</h1>
        <div className="Mostrar">{
          birds.map(bird=>{
            return <Bird key={bird._id} bird={bird} />
          })
        }
        </div>
        <div className="Crear">
          <div className="Creartitulo">Crear nuevo bird:</div> 
          <div>
            <label>Name: </label>
            <input type= "text" name="name" onChange={handleCreate}></input>
          </div>
          <div>
            <label>Birth Day: </label>
            <input type= "date" name="birthDate" onChange={handleCreate}></input>
          </div>
          <div>
            <label>Colors Ejm. rojo,azul: </label>
            <input type= "text" name="colors" onChange={handleCreate}></input>
          </div>
          <div>
            <label>IsAlive: </label>
            <select name="isAlive" onChange={handleCreate} >
              <option value= "true"> True </option>
              <option value= "false"> False </option>
               </select>
          </div>
          <div>
            <label>Size in inches : </label>
            <input type= "number" name="sizeInInches" onChange={handleCreate} min={2} max={8}></input>
          </div>
          <div>
            <label>Coloca una Url de una Image : </label>
            <input type= "text" name="imgUrl" onChange={handleCreate}></input>
          </div>
          <div className="boton">
            <button className="Boton" onClick={createBird}>CREATE</button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
