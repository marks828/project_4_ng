var bets = [
  {id:1, bet: "Zeke over $63", amount:1},
  {id:2, bet:"Cousins throws for 5000 yds",amount:1}
]


angular
  .module("betApp", ["ui.router", "ngResource"])
  .factory("BetsFactory", ["$resource", BetsFactoryFunction])
  .config(["$stateProvider", Router])
  .controller("betsCtrl", ["BetsFactory", betsController])
  .controller("betShowCtrl", ["$stateParams", betShowController])


function BetsFactoryFunction($resource){
  return $resource("http://localhost:3000/bets/:id?")
}

function betsController (BetsFactory){
  this.bets = BetsFactory.query()
}

function betShowController($stateParams){

}



function Router($stateProvider){
  console.log("router working");
  $stateProvider
  .state("betIndex", {
    url:"/bets",
    controller:"betsCtrl",
    controllerAs:"vm",
    templateUrl:"js/ng-views/bets.html"
  })
  .state("betShow", {
    url:"/bets/:id",
    controller:"betShowCtrl",
    controllerAs:"vm",
    templateUrl:"js/ng-views/show.html"
  })
}
