import React from 'react';

import './App.css';
import {useState} from 'react';
import {Stage, Layer, RegularPolygon, Circle,Image } from 'react-konva';
import {creerRover, updateRoverPositionAndOrientation, creerObstaclesList} from './back.js' ;
import useImage from 'use-image';

const LionImage = () => {
  const [image] = useImage('https://konvajs.org/assets/lion.png');
  return <Image image={image} />;
};


const Obsctacle = () => {
  const [obstaclesList,setobstaclesList] = useState(creerObstaclesList());
  //const obstaclesList = creerObstaclesList();
  return obstaclesList.map(function(point, index) {
    return <Circle key={index}
        x={point.x*10}
        y={point.y*10}
        width={15}
        height={15}
        fill="black"
  />

  });
};

function App(props) {
  const orientation = {'N':0 , 'E':90 , 'S':180 , 'O':270 } ;
  const [rover,setRover] = useState(creerRover());
  const [commandeArray, setcommandeArray ] = useState();
  console.log();
  return (
    <div className="App" >
      <input
          type="text"
          onChange={(change) => {setcommandeArray((change.target.value)) }}
      />

      <br></br> <br></br>

      <button onClick={() => {
        setRover(updateRoverPositionAndOrientation(rover,Array.from(commandeArray)));
        }
      } className="btn" >
          Move
      </button>


    <br></br> <br></br>
  <div className="rover">

    <Stage
      className = "canvas"
      width = {1000}
      height={window.innerHeight}
    >
  <Layer

  >
    <RegularPolygon
            rotation = {orientation[rover.orientation]}
            x={rover.x*10}
            y={rover.y*10}
            sides={3}
            width={70}
            height={70}
            fill="black"
    />
    <Obsctacle/>
    </Layer>
    </Stage>

</div>
</div>

  );
}

export default App;

/*
<div className="App">
  <input
      type="text"
      onChange={(change) => setGreeting (change.target.value)}
  />
  <p> {greeting} FGES </p>
</div>
*/
