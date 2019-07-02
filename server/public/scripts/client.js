$(document).ready(onReady);

function onReady() {
    console.log('Yay jquery!');
    
    
    // TODO - Setup Form


    //TODO - get all music from server
    getAllMusic();
}

function getAllMusic() {

    //Make ajax GET request to server
    $.ajax({
        method: 'GET',
        url: '/music'
    }).then(function(response){
        console.log('back from server', response);
    }).catch( function(error){
        console.log('error with getting music', error);
        alert('Sorry, could not get music. Try again later.');
    })
}

