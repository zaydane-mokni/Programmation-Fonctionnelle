
 export function creerRover(){
  const orientation  = ['N', 'E', 'S','O'];
  let randOrientation = orientation[Math.floor(Math.random() * orientation.length)];
  let x =  Math.floor(Math.random() * Math.floor(51));
  let y = Math.floor(Math.random() * Math.floor(51));
  return {"x":x , "y":y , "orientation":randOrientation};
}


function updateRoverOrientation (rover, commande){
    const orientations = ['N','E','S','O'];
    const commandMap = {d:1 , g: -1};
    const orientationActuelle = orientations.indexOf(rover.orientation);
    const updateIndex = ((orientationActuelle+commandMap[commande]) + 4) % 4 ;
    return {... rover , orientation: orientations[updateIndex]};
}


export function updateRoverPosition(rover, commande){
    const commandMap = {
      a: {x:{E:1 , O:-1 , N:0, S:0} , y:{E:0 , O:0 , N:1, S:-1}},
      r: {x:{E:-1 , O:1 , N:0, S:0} , y:{E:0 , O:0 , N:-1, S:1}},
    };
    const position = {
      cordx: deplacer(rover.x , rover.orientation ,51, commandMap[commande].x),
      cordy: deplacer(rover.y , rover.orientation ,51, commandMap[commande].y)
    };

    return {...rover , x:position.cordx , y:position.cordy}
}


export function deplacer(coord,orientation,mapSize,orientationMap){
  return (coord + orientationMap[orientation] + mapSize) % mapSize ;
}

export function updateRoverPositionAndOrientationOnce(rover,commande){
      if (commande ==='a' || commande ==='r'){

         return updateRoverPosition(rover, commande);
       }
      else
         return updateRoverOrientation(rover,commande);
}


export function updateRoverPositionAndOrientation(rover , commandeList  ) {

  return commandeList.reduce(function (rover, valeurCourante) {
          return  updateRoverPositionAndOrientationOnce(rover,valeurCourante)
  }, rover);
    //return updatedRover;
}



export function creerObstacle(){
 let x =  Math.floor(Math.random() * Math.floor(51));
 let y = Math.floor(Math.random() * Math.floor(51));
 return {"x":x , "y":y };
}


export function creerObstaclesList(){
  let max = Math.floor(Math.random()*(6 - 4 + 1))+4 ;
  let obstaclesList = [] ;
  for (let pas =0 ; pas < max ; pas++){
    obstaclesList.push(creerObstacle());
  }
  return obstaclesList;
}


export function detectObstacle(rover , obstacleList){
  console.log(obstacleList);
     return obstacleList.map(function(point,index) {
      if(rover !== undefined ) {
        if (rover.x === point.x && rover.y===point.y ){
            return point ;
        }
        else
            return false ;
      }
      }
  );

}
