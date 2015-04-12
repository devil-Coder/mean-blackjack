(function() {

  'use strict';

  angular
    .module( 'blackjack' )
    .service( 'DealerService', DealerService );

  DealerService.$inject = [
    'RoomService'
  ];

  function DealerService( RoomService ) {
  
    var self = this;

    ///////////// Properties
    self.message        = 'Your turn!';
    self.currentGambler = 0;
    self.currentPlayer  = 0;
    self.readyToGo      = false;
    self.deck           = [];

    ///////////// Methods
    self.createDeck     = createDeck;

    ///////////// Functions Declaration
    function createDeck() {
    
      var typeOfCards = [ 
        'A',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        'J',
        'Q',
        'K'
      ];
      var typeOfSuits = [
        '♣',
        '♥',
        '♠',
        '♦'
      ];

      typeOfCards
        .forEach( function( card ) {
        
          typeOfSuits
            .forEach( function( suit ) {
           
              if ( card === 'A' ) {
              
                self
                  .deck
                  .push({
                    name  : card,
                    suit  : suit,
                    value : [ 1, 11 ]
                  });

              } else if ( card === 'J' || card === 'Q' || card === 'K' ) {
              
                self
                  .deck
                  .push({
                    name  : card,
                    suit  : suit,
                    value : [ 10 ]
                  });
              
              } else {
              
                self
                  .deck
                  .push({
                    name  : card,
                    suit  : suit,
                    value : [ Number( card, 10 ) ]
                  });
              
              }
            
            });
        
        });
    
      return self.deck;

    }
  
  }

}());
