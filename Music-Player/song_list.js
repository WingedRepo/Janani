//song list
let All_song = [
    {
      name: "Binaural Beats 1",
      path: "music/bb1.mp3",
      img: "images/bb1.jfif",
      singer: "To Relax"
    },
    {
      name: "Alpha Waves",
      path: "music/bb1.mp3",
      img: "images/alpha.jpg",
      singer: "To Increase Brain Activity"
    },
    {
      name: "Gamma Brainwaves",
      path: "music/bb1.mp3",
      img: "images/gamma_brainwaves.jpg",
      singer: "To Boost Brain Activity"
    },
    {
      name: "Gamma Waves",
      path: "music/bb1.mp3",
      img: "images/gamma1.jpg",
      singer: "Increase Focus"
    },
    {
      name: "White Noise",
      path: "music/bb1.mp3",
      img: "images/white_noise.png",
      singer: "Improve Sleep"
    },
    {
     name: "Binaural Waves",
     path: "music/bb1.mp3",
     img: "images/binaural_sleep.jfif",
     singer: "Helps to Sleep"
    }
 ];
 /*you can add more song & images from you computer*/
 
 
 /*tracks*/
 let tracks = document.querySelector('.tracks');
 
 //creating a list or generating Html
 for (let i = 0; i < All_song.length; i++) {
 
   let Html = ` <div class="song">
       <div class="img">
       <img src="${All_song[i].img}"/>
       </div>
       <div class="more">
       <audio src="${All_song[i].path}" id="music"></audio>
       <div class="song_info">
          <p id="title">${All_song[i].name}</p>
          <p>${All_song[i].singer}</p>
       </div>
       <button id="play_btn"><i class="fa fa-angle-right" aria-hidden="true"></i></button>
       </div>
     </div>`;
 
   tracks.insertAdjacentHTML("beforeend", Html);
 };
 