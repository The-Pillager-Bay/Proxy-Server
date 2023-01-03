$( document ).ready( function() {
    var now = new Date()
    var date = new Date(2022, 12, 31);
    var diff = ( ( date.getTime() - now.getTime() ) / 1000 );
    clock = $( '.itbegins' ).FlipClock( diff, { clockFace: 'DailyCounter', countdown: true } );
} );
