$(document).ready(onReady);

function onReady() {
    console.log('Yay jquery!');
    
    
    // TODO - Setup Form
    $('#submit').on('click', handleSubmit);

    //TODO - get all music from server
    getAllMusic();
}

function getAllMusic() {
    $('#music').empty();
    //Make ajax GET request to server
    $.ajax({
        method: 'GET',
        url: '/music'
    }).then(function(response){
        console.log('back from server', response);
        for(let currentItem of response){
            $('#music').append(`<tr><td>${currentItem.track}</td><td>${currentItem.artist}</td>
            <td>${currentItem.published}</td><td>${currentItem.rank}</td></tr>`)
        }
    }).catch( function(error){
        console.log('error with getting music', error);
        alert('Sorry, could not get music. Try again later.');
    })
}

function handleSubmit() {
    let newTrack = $('#track-in').val();
    let newArtist = $('#artist-in').val();
    let newRank = $('#rank-in').val();
    let newPublished = $('#publish-in').val();

    let newObject = {
        rank: newRank,
        track: newTrack,
        artist: newArtist,
        published: newPublished
    }

    
    $.ajax({
        method: 'POST',
        url: '/music',
        data: newObject
    })
    .then(function(response){
        getAllMusic();
        $('#track-in').val('');
        $('#artist-in').val('');
        $('#rank-in').val('');
        $('#publish-in').val('');
    })
    .catch( (error) => {
        console.log(error);
    })
}

