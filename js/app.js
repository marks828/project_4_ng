
angular
  .module("betApp", ["ui.router", "ngResource"])
  .factory("BetsFactory", ["$resource", BetsFactoryFunction])
  .config(["$stateProvider", Router])
  .controller("betsCtrl", ["BetsFactory", "$state", betsController])
  .controller("betShowCtrl", ["BetsFactory", "$stateParams", "$state", betShowController])


function BetsFactoryFunction($resource){
  return $resource("http://localhost:3000/bets/:id", {}, {
    update: {method: "PUT"}
  })
}

function betsController (BetsFactory, $state){
  this.bets = BetsFactory.query()
  console.log("this.bets");
  this.bet = new BetsFactory()
  this.create = function(){
    this.bet.$save()
    $state.go("betIndex")
  }
}
function betShowController(BetsFactory, $stateParams, $state){
  this.bet = BetsFactory.get({id: $stateParams.id})
  console.log(this.bet);
  this.update = function(){
    this.bet.$update({id: $stateParams.id})
    $state.go("betShow")
  }
  this.destroy = function(){
    this.bet.$delete({id: $stateParams.id})
    $state.go("betIndex")
  }
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
