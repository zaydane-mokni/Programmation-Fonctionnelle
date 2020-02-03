
it('creer un rover avec orientation', () =>{
    const orientation  = ['N', 'E', 'S','O'];
    let x = creerRover().x;
    let y = creerRover().y;
    let orientationValue = creerRover().orientation ;
    let test = [(x<=50 && x>=0) , (y<=50 && y>=0) ,orientation.includes(orientationValue)]
      expect(test).toEqual([true,true,true]);
  }
);


 export function creerRover(){
  const orientation  = ['N', 'E', 'S','O'];
  let randOrientation = orientation[Math.floor(Math.random() * orientation.length)];
  let x =  Math.floor(Math.random() * Math.floor(51));
  let y = Math.floor(Math.random() * Math.floor(51));
  return {"x":x , "y":y , "orientation":randOrientation};
}


it(' changer orientaton de Rover N to O tourner a gauche ', () => {
    const orientation ='N';
    const rover =  creerRover();
    rover.orientation = 'N';
    const updateRover = updateRoverOrientation(rover ,'g')
    expect(updateRover.orientation).toEqual('O');
    }
);


function updateRoverOrientation (rover, commande){
    const orientations = ['N','E','S','O'];
    const commandMap = {d:1 , g: -1};
    const orientationActuelle = orientations.indexOf(rover.orientation);
    const updateIndex = ((orientationActuelle+commandMap[commande]) + 4) % 4 ;
    return {... rover , orientation: orientations[updateIndex]};
}


it('changer position Rover avancer [ orienté en N , y=10 -> y=11]', () =>{
        const rover = creerRover();
        rover.y = 10;
        rover.orientation = 'N';
        const updateRover = updateRoverPosition(rover,'a')
        expect(updateRover.y).toEqual(11);

    }
);


it('changer position Rover avancer [ orienté en E , x=50 -> x=0]', () =>{
        const rover = creerRover();
        rover.x = 50;
        rover.orientation = 'E';
        const updateRover = updateRoverPosition(rover,'a')
        expect(updateRover.x).toEqual(0);

    }
);


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


it('changer Rover Position et Orientation', () =>{
      const rover = creerRover();
      rover.x = 10;
      rover.y = 2 ;
      rover.orientation ='N';
      const commandeList = ['a' , 'a' , 'd' , 'r','g','g','a' ] ;
      const updateRover = updateRoverPositionAndOrientation(rover,commandeList);
      const expectRover = {"x":8 , "y":4 , "orientation":'O'};
      //console.log( 'x :' + updateRover.x + ' y: ' + updateRover.y + ' orientation : ' + updateRover.orientation) ;

      expect(updateRover).toEqual(expectRover);

    }
);


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



export function updateRoverPositionAndOrientation(rover , commandeList) {

  commandeList.map(function(commande) {
      if (commande==='a' || commande==='r'){
         rover = updateRoverPosition(rover, commande);
      }
      else {
         rover = updateRoverOrientation(rover,commande);
      }

    });
      return rover ;
}



it('Creer Obstacle', () =>{
    let x = creerObstacle().x;
    let y = creerObstacle().y;
    let test = [(x<=50 && x>=0) , (y<=50 && y>=0)]
      expect(test).toEqual([true,true]);
  }
);


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


it('Creer une liste des obstacle non vide, avec nbr obstacle entre 4 et 6', () =>{
      obstaclesList = creerObstaclesList();
      expect(obstaclesList.length).toEqual(4 || 5 || 6);
  }
);



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
