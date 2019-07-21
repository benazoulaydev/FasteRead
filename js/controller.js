function   FasteRead($scope, $timeout, $sce) {


  var textADiv;
  $scope.nbMot=0;
  $scope.motActuel=$sce.trustAsHtml("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bonjour");
  $scope.textALire = "Walter Spanghero, né le 21 décembre 1943 à Payra-sur-l'Hers, est un joueur international français de rugby à XV, devenu dirigeant sportif et homme d'affaires. Walter Spanghero est considéré comme l'un des meilleurs joueurs français de sa génération et comme un grand joueur de l'histoire du rugby français. Il compte cinquante-et-une sélections en équipe de France, dont vingt-trois fois au poste de troisième ligne centre, cinq fois comme troisième ligne aile et vingt-trois fois au poste de deuxième ligne entre 1964 et 1973. Il marque quatre essais, il est désigné capitaine à onze reprises.";
  $scope.vitesse = 100;
  $scope.debitVitesse = 5;
  $scope.lire = false;
  // base 165 revient a 1 mot par seconde
  $scope.baseVitesse = 20;


 

  $scope.commenceLire = function()
  {
    $scope.lire = true;
    
    if(!((textADiv)&&(textADiv.length>0)))
    {
      $scope.supprDonnee();

    }
    
    boucle();

}



  $scope.arretLire = function()
  {
    $scope.lire = false;
  }


  $scope.supprDonnee = function()
  {
    $scope.nbMot=0;
    textADiv = $scope.textALire.split(" "); 
  }

  
  
 $scope.reset = function()
  {
	  
    $scope.lire = false;
    $scope.supprDonnee();

  }

  
  
  var boucle = function()
  {

    if(textADiv.length>$scope.nbMot)
    {

      var mot = textADiv[$scope.nbMot];
      var pointCentre = calculPointCentre(mot);
      
      $scope.motActuel = $sce.trustAsHtml(creeEspace(pointCentre)+couleurCentre(mot, pointCentre));
      
      $scope.nbMot++;
      if($scope.lire)
        $timeout(boucle, Math.floor((((mot.length+2)/2)*$scope.baseVitesse) + $scope.vitesse));
	
    }
    else
    {
      $scope.lire = false;
      $scope.nbMot = 0;
	 
    }
	}
	
  


  $scope.speedUp = function()
  {
    $scope.vitesse += $scope.debitVitesse;
  }

  $scope.speedDown = function()
  {

   $scope.vitesse = Math.max(0,$scope.vitesse-$scope.debitVitesse);
 }

 $scope.clearTextArea = function()
 {
  $scope.textALire="";
  textADiv = [];
  $scope.nbMot=0;
  $scope.motActuel=$sce.trustAsHtml("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bonjour");
  $scope.lire = false;
}




var calculPointCentre = function(mot)
{

  var pointCentre = 1;

  switch ( mot.length) {
    case 1:
    pointCentre = 1; 
    break;
    case 2:
    case 3:
    case 4:
    case 5:
    pointCentre = 2; 
    break;
    case 6:
    case 7:
    case 8:
    case 9:
    pointCentre = 3; 
    break;
    case 10:
    case 11:
    case 12:
    case 13:
    pointCentre = 4; 
    break;
	case 14:
    case 15:
    case 16:
    case 17:
    pointCentre = 5; 
	break;
    default:
    pointCentre = 9; 
  };

  return pointCentre;
}

var creeEspace = function(pointCentre)
{
  var espaces = 10;
  espaces = espaces - pointCentre;
  var esp = "";
  for(var i = 0;i<espaces;i++)
  {
    esp+="&nbsp;"
  }

  return esp;
}



var couleurCentre = function(mot, indice)
{
 
  if (mot.length <2)
    return '<span class="rouge">' + mot + '</span>'
  else
    return mot.substr(0,indice-1) + '<span class="rouge">' + mot.substr(indice-1,1) + '</span>' + mot.substr(indice,mot.length);

}

}
