/*-----------------------------------------------------------------------------------------------------                        
-                                           GLOBAL VARIABLES                  
-----------------------------------------------------------------------------------------------------*/

const clientId = '03d8e475016f40709515ff7168828110';
const clientSecret = 'a5e76637ec5544bb88cdc130e089668d';
var token = "";

var selectedGenre = "edm"; // needs to be replaced to clicked genre
var artistID = "";
var top10ArtistsNames = [];
var top10ArtistsImages = [];
var top10TrackImages = [];
var top10ArtistsPopularity = [];
var top10ArtistsGenre = [];
var top10ArtistsLink = [];
var top10trackImages = [];
var top10ArtistsID = [];
var modal10Tracks = [];
var ArtistLocation;
var modal10TracksUrl = [];
var top10TrackNames = [];
var top10TrackPop = [];
var top10TrackAlbumName = [];
var top10TrackReleaseDate = [];
var top10TrackImg = [];
var top10TrackByArtist = [];

/*-----------------------------------------------------------------------------------------------------                        
-                                           POPULATE HTML                    
-----------------------------------------------------------------------------------------------------*/

var artist1 = document.querySelector('#a1img');
var artist2 = document.querySelector('#a2img');
var artist3 = document.querySelector('#a3img');
var artist4 = document.querySelector('#a4img');
var artist5 = document.querySelector('#a5img');
var artist6 = document.querySelector('#a6img');
var artist7 = document.querySelector('#a7img');
var artist8 = document.querySelector('#a8img');
var artist9 = document.querySelector('#a9img');
var artist10 = document.querySelector('#a10img');
var track1 = document.querySelector('#t1img');
var track2 = document.querySelector('#t2img');
var track3 = document.querySelector('#t3img');
var track4 = document.querySelector('#t4img');
var track5 = document.querySelector('#t5img');
var track6 = document.querySelector('#t6img');
var track7 = document.querySelector('#t7img');
var track8 = document.querySelector('#t8img');
var track9 = document.querySelector('#t9img');
var track10 = document.querySelector('#t10img');

var artistArr = [artist1, artist2, artist3, artist4, artist5, artist6, artist7, artist8, artist9, artist10];
var trackArr = [track1, track2, track3, track4, track5, track6, track7, track8, track9, track10];

var imageCounter = 0;
var imageCounter2 = 0;

var allocateImage = function (img) {
    artistArr[i].src = img;
    imageCounter++;
}

var allocateImageTracks = function (img) {
    trackArr[i].src = img;
    imageCounter2++;
}

/*-----------------------------------------------------------------------------------------------------                        
-                                           JQUERY PREP                  
-----------------------------------------------------------------------------------------------------*/

$(document).ready(function(){
    $('.modal').modal();

    $('.button-collapse').sideNav({
      menuWidth: 300, // Default is 300
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true, // Choose whether you can drag to open on touch screens,
      onOpen: function(el) { /* Do Stuff*/ }, // A function to be called when sideNav is opened
      onClose: function(el) { /* Do Stuff*/ }, // A function to be called when sideNav is closed
    });
    $('.parallax').parallax();
    $('#demo-carousel').carousel();   
});


$('.genre-selection').each(function() {
    $(".genre-section").on("click", function assignGenre() {
        $('.tops').css("display", "block");
        selectedGenre = $(this).attr('id');
        _getArtists();
        _getTracks();
        imageCounter = 0;
        imageCounter2 = 0;
    });
})

/*-----------------------------------------------------------------------------------------------------                        
-                                           FETCH FUNCTIONS                   
-----------------------------------------------------------------------------------------------------*/

const _getToken = async () => {

    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded', 
            'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });
    const data = await result.json();
    token = data.access_token;
    }
    
const _getArtists = async () => {

    const result = await fetch('https://api.spotify.com/v1/search?q=genre:' + selectedGenre +'*&type=artist&market=US&limit=10', {
        method: 'GET',
        headers: {'Authorization' : 'Bearer ' + token},
        header: 'Content-Type : application/json' 
    });
    const data = await result.json();

    for (i=0; i<10; i++) {

        top10ArtistsNames[i] = data.artists.items[i].name;
        top10ArtistsImages[i] = data.artists.items[i].images[0].url;
        top10ArtistsPopularity[i] = data.artists.items[i].popularity;
        top10ArtistsGenre[i] = data.artists.items[i].genres[0];
        top10ArtistsLink[i] = data.artists.items[i].external_urls.spotify;
        top10ArtistsID[i] = data.artists.items[i].id;
        
    }
    for (i=0; i<10; i++) {
        allocateImage(top10ArtistsImages[i]);
    }
    return data.artists.items;
}

const _getTracks = async () => {
    const result = await fetch('https://api.spotify.com/v1/search?q=genre:' + selectedGenre + '*&type=track&market=US&limit=10', {
        methid: 'GET',
        headers: {'Authorization' : 'Bearer ' + token},
        header: 'Content-Type : application/json' 
    });
    const data = await result.json();
    for (i=0; i<10; i++) {
        top10trackImages[i] = data.tracks.items[i].album.images[0].url;
        top10TrackNames[i] = data.tracks.items[i].name;
        top10TrackPop[i] = data.tracks.items[i].popularity;
        top10TrackAlbumName[i] = data.tracks.items[i].album.name;
        top10TrackReleaseDate[i] = data.tracks.items[i].album.release_date;
        top10TrackImg[i] = data.tracks.items[i].album.images[0].url;
        top10TrackByArtist[i] = data.tracks.items[i].artists[0].name;
    
        allocateImageTracks(top10trackImages[i]);
    }
    return data.tracks.items;
}

const _getAlbums = async () => {
    const result = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums?market=US&limit=3', {
        methid: 'GET',
        headers: {'Authorization' : 'Bearer ' + token},
        header: 'Content-Type : application/json' 
    });
    const data = await result.json();
    return data;
}

const _getTopArtistTracks = async () => {
    const result = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/top-tracks?country=US', {
        methid: 'GET',
        headers: {'Authorization' : 'Bearer ' + token},
        header: 'Content-Type : application/json'
    });
    const data = await result.json();

    for (i = 0; i <10; i++) {
        modal10Tracks[i] = data.tracks[i].name;
        modal10TracksUrl[i] = data.tracks[i].external_urls.spotify;
    }
    
    return modal10Tracks;
}
_getToken();





/*-----------------------------------------------------------------------------------------------------                        
-                                           MODAL (JQUERY)          
-----------------------------------------------------------------------------------------------------*/

// Artists Carousel - Click Reaction

$('#artistscarrousel').each(function() {

    $(".artistcontainer").on("click", async function generateTrackList() {
        var selectedArtist = $(this).attr('id');
        var matches = selectedArtist.match(/(\d+)/);
        ArtistLocation = matches[0] - 1;
        
        artistID = top10ArtistsID[ArtistLocation];
        await _getTopArtistTracks();

        fillModal(ArtistLocation);

        $(".modal").css("visibility", "visible");
        
    });
})

// Tracks Carousel - Click Reaction

$('#trackscarrousel').each(function() {

    $(".trackcontainer").on("click", async function showTrackModal() {
        var selectedTrack = $(this).attr('id');
        var matches = selectedTrack.match(/(\d+)/);
        TrackLocation = matches[0] - 1;
        fillModal2(TrackLocation);
        $(".modal").css("visibility", "visible");
    });
})

$(".modal-close").on("click", function closeModal() {
    emptyModal();
    $(".modal").css("visibility", "hidden");
    
});

/*-----------------------------------------------------------------------------------------------------                        
-                                           MODAL (DATA MANIPULATION)       
-----------------------------------------------------------------------------------------------------*/

var fillModal = function(value) {

    var selectedItem = document.querySelector('#modal-1-content');    // LOCATES MODAL

    var divEl = document.createElement('div');     // CREATES MODAL HEADER
    divEl.className = 'modal-text modal-content';                // CLASSIFIES MODAL HEADER

    // APPENDS HEADER CONTENT TO MODAL
    
    var modalNameEl = document.createElement('h3');
    modalNameEl.className = '';

    var PopScore = top10ArtistsPopularity[value];
    var modalPopEl = document.createElement('div');
    modalPopEl.className = 'progress';

    var modalPopElTitle = document.createElement('h5');
    modalPopElTitle = 'Popularity Meter';

    var modalPopEl2 = document.createElement('div');
    modalPopEl2.className = 'determinate';
    modalPopEl2.style = 'width: ' + PopScore + '%';
    modalPopEl2.title = 'Popularity Meter';

    var modalTrackImg = document.createElement('img');
    modalTrackImg.src = top10ArtistsImages[value];

    modalNameEl.innerHTML = 'Artist:  ' + top10ArtistsNames[value];
    modalPopElTitle.innerHTML = 'Popularity Meter: ' + PopScore;
    
    divEl.append(modalNameEl);
    divEl.append(modalPopElTitle);
    modalPopEl.append(modalPopEl2);
    divEl.append(modalPopEl);
    divEl.append(modalTrackImg);
    
    
    selectedItem.appendChild(divEl);


    
    
  
    // APPENDS TRACK LIST TO MODAL
    var j = 1;
    for (i = 0; i < 10; i++) {

        var trackNameEl = document.createElement('h4');
        var modalLinkEl = document.createElement('a');

        var trackName = modal10Tracks[i];
        modalLinkEl.href = modal10TracksUrl[i];

        trackNameEl.innerHTML = 'Track ' + j + ':  ' + trackName;

        modalLinkEl.appendChild(trackNameEl);
        divEl.appendChild(modalLinkEl);
        j++;
        
    }   
}

var fillModal2 = function(value) {

    var selectedItem = document.querySelector('#modal-1-content');    // LOCATES MODAL

    var divEl = document.createElement('div');     // CREATES MODAL HEADER
    divEl.className = 'modal-text modal-content';                // CLASSIFIES MODAL HEADER

    // APPENDS HEADER CONTENT TO MODAL
    
    var modalNameEl = document.createElement('h3');
    modalNameEl.className = '';

    var PopScore = top10TrackPop[value];
    var modalPopEl = document.createElement('div');
    modalPopEl.className = 'progress';

    var modalPopElTitle = document.createElement('h5');
    modalPopElTitle = 'Popularity Meter:'
    
    var modalPopEl2 = document.createElement('div');
    modalPopEl2.className = 'determinate';
    modalPopEl2.style = 'width: ' + PopScore + '%';
    modalPopEl2.title = 'Popularity Meter';

    
    var modalSongEl = document.createElement('p');
    var modalAlbumNameEl = document.createElement('p');
    var modalTrackRelease = document.createElement('p');
    var modalTrackImg = document.createElement('img');
   

    modalNameEl.innerHTML = 'Track:  ' + top10TrackNames[value];
    modalSongEl.innerHTML = 'Artist:  ' + top10TrackByArtist[value];
    modalAlbumNameEl.innerHTML = 'Album:   ' + top10TrackAlbumName[value]; 
    modalTrackRelease.innerHTML =  'Release Date:   ' + top10TrackReleaseDate[value];
    modalTrackImg.src = top10TrackImg[value];
    

    divEl.append(modalNameEl);
    divEl.append(modalPopElTitle);
    modalPopEl.append(modalPopEl2);
    divEl.append(modalPopEl);
    divEl.append(modalTrackImg);
    divEl.append(modalSongEl);
    divEl.append(modalAlbumNameEl);
    divEl.append(modalTrackRelease);
    
    selectedItem.appendChild(divEl);

}

var emptyModal = function() {

    var selectedItem = document.querySelector('#modal-1-content');
    selectedItem.innerHTML = '';
}

/*-----------------------------------------------------------------------------------------------------                        
-                                           QR Code                
-----------------------------------------------------------------------------------------------------*/

//function createQrCode(selectedGenre) 
/* var spotifyUrl = "https://open.spotify.com/artist/06HL4z0CvFAxyc27GXpf02";
const qrCode = async (SpotifyUrl) => {
    const result = await fetch('http://api.qrserver.com/v1/create-qr-code/?data="' + spotifyUrl + '"!&size=100x100', {
        method: 'GET',
    });
    var imgSrc = result.url

    //document.getElementById("test").src = imgSrc;
    return imgSrc;

}
qrCode(spotifyUrl);


 */