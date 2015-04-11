(function() {

  'use strict';

  angular
    .module( 'blackjack' )
    .service( 'RoomService', RoomService );

  RoomService.$inject = [];

  function RoomService() {

    var self = this;
  
    ///////////// Properties
    self.numberOfPlayers = 1;
    self.playersData     = [];

    ///////////// Methods
    self.createPlayers = createPlayers;

    ///////////// Methods Declaration
    function Player( number ) {
      
      this.name  = 'Player #' + number;
      this.hand  = [];
      this.wager = 0;
      this.money = 1000;

    }

    function createPlayers( numberOfPlayers ) {
      
      self.playersData = [];

      if ( typeof numberOfPlayers === 'number' && numberOfPlayers === numberOfPlayers ) {

        var i = 1;

        for ( i; i <= numberOfPlayers; i += 1) {
          self.playersData.push( new Player( i ));
        }
        
      }

      return self.playersData;
    
    }

  }

}());
