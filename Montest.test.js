it('mon premier test', () =>{
  const a= true;
  const b = true ;
  expect(a).toEqual(b);
}
);

it('Create Task Test', () =>{
const titre= "titre";
const description="description" ;
const tache = creerTache(titre,description);
expect(tache).toEqual({titre:"titre" , description:"description"})

}
);

function creerTache(titre,description){
  return {titre: titre , description:description};
}

it('Add Task to TaskList Test',()=>{
  const titre= "titre";
  const description="description" ;
  let tasklist = [];
  const tache = creerTache(titre,description);
  const resultat = ajouterTache(tache,tasklist);
  expect(VerifierList(resultat,tache)).toEqual(true)

}
);

function ajouterTache(tache,tasklist){
  tasklist.push(tache);
  return tasklist;
}

function VerifierList(tasklist,tache){
  return tasklist.includes(tache);
}


it('Delete Task From TaskList Test' , ()=> {
  const titre= "titre";
  const description="description" ;
  let tasklist = [];
  const tache = creerTache(titre,description);
  resultat = ajouterTache(tache,tasklist);
  const tasklistDelete = supprimerTache(tache,resultat);
  expect(VerifierList(tasklistDelete,tache)).toEqual(false)
}
);


function supprimerTache(tache,tasklist){
    tasklistfilter = tasklist.filter(function(task){
      return ((task.titre != tache.titre) && (task.description != tache.description))

    });

      return tasklistfilter;

  //tasklist.forEach(function(i,index){
    //if ( JSON.stringify(i) === JSON.stringify(tache) )
        // delete tasklist[index];
  //});
        //return tasklist;
}


it('Display TaskList Test' , ()=> {
  const titre= "titre";
  const description="description" ;
  let tasklist = [];
  const tache = creerTache(titre,description);
  const resultat = ajouterTache(tache,tasklist);
  expect(listToString(resultat)).toEqual("titre description")

}
);

function listToString(tasklist){
  let chaine="" ;
  tasklist.forEach(function(i,index){
      chaine += (i.titre) ;
      chaine += (" " + i.description) ;
  });
    return chaine;
}

it('Edit Task Test' , ()=> {
  let tasklist= [{titre:"titre",description:"description"}];
  let modiflist = [{titre:"titreTest",description:"description"}];
  const titre = "titre";
  const newTitre = "titreTest";
  resultat = modifierList(tasklist,titre,newTitre);
  expect(resultat).toEqual(modiflist);
}
);

function modifierList(tasklist,titre, newTitre){
  return tasklist.map(function(task) {
    if (task.titre === titre){
       task.titre = newTitre;
        return task ;
    }

});

}
