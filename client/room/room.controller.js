(function() {

  'use strict';

  angular
    .module( 'blackjack' )
    .controller( 'RoomController', RoomController );

  RoomController.$inject = [
    'RoomService',
    'DealerService',
    '$state',
    'toastr',
    '$scope'
  ];

  function RoomController( RoomService, DealerService, $state, toastr, $scope ) {

    var vm = this;
  
    ///////////// Properties
    vm.totalPlayers   = RoomService.numberOfPlayers;
    vm.playersData    = [];
    vm.dealerData     = DealerService.dealerData;
    vm.currentGambler = {};
    vm.currentPlayer  = {};
    vm.readyToGo      = DealerService.readyToGo;
    vm.deck           = [];

    ///////////// Public Methods
    vm.quit           = quit;
    vm.setWager       = setWager;
    vm.playerAction   = playerAction;

    ///////////// Private Methods
    var _init         = _init;

    ///////////// Methods Declaration
    function _init() {

      var players       = RoomService.createPlayers( RoomService.numberOfPlayers );
      vm.playersData    = DealerService.distributeCards( players );
      vm.currentGambler = vm.playersData[ DealerService.currentGambler ];

    }

    function quit() {

      RoomService.numberOfPlayers  = 1;
      DealerService.currentGambler = 0;
      vm.currentGambler            = {};
      vm.currentPlayer             = {};
      vm.readyToGo                 = false;
      vm.wager                     = '';

      $state
        .go( 'home' );
    }

    function setWager( id, wager ) {
      
      var player = vm.playersData[ id - 1 ];

      if ( !wager ) {
        toastr
          .warning( 'Choose your wager!', 'Dealer says:' );
      } else if ( player.money - wager < 0 ) {
        toastr
          .warning( 'You do not have enough money!', 'Dealer says:' );
      } else if ( Number( wager, 10 ) !== Number( wager, 10 ) ) {
        toastr
          .info( 'Only numbers are allowed!', 'Dealer says:' );
      } else {
        
        player.wager                 = wager;
        player.money                 -= wager;
        vm.playersData[ id - 1 ]     = player;
        DealerService.currentGambler = id;

        if ( id < vm.playersData.length ) {
          
          vm.currentGambler = vm.playersData[ id ];

        } else {
          
          DealerService.currentGambler = 0;
          vm.currentGambler            = {};
          vm.readyToGo                 = true;
          vm.currentPlayer             = vm.playersData[ 0 ];

        }
      }

      vm.wager = '';
    
    }

    function playerAction( player, action ) {
      DealerService.dealerAI( player, action );
    }

    ///////////// $broadcast events
    $scope
      .$on( 'next-player', function() {

        DealerService.currentPlayer += 1;

        if ( DealerService.currentPlayer < vm.playersData.length ) {
          vm.currentPlayer = vm.playersData[ DealerService.currentPlayer ];
        } else {
          console.log( 'Pay the players' );
        }

      });

    ///////////// Start
    _init();
  
  }

}());
