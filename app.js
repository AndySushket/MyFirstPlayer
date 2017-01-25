 var MusicPlayer = function () {
     var player = this;
     var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
     var analyser = audioCtx.createAnalyser();
     var bufferLength = analyser.frequencyBinCount;
     var activeBufferLength = bufferLength / 0.666;
     var mouseDownEvent;
     this.gainNode = audioCtx.createGain();
     //     var audioTag = document.querySelector('audio');
     analyser.connect(this.gainNode);
     this.gainNode.connect(audioCtx.destination);
     var source = audioCtx.createBufferSource();
     source.connect(this.gainNode);
     //     audioCtx.crossOrigin = "anonymous";
     //     var source1 = audioCtx.createMediaElementSource(document.getElementById("player"));
     //     source1.connect(analyser);
     this.NumberOfSong = 0;
     this.list = ["src/Sivert Høyem - Into the Sea.mp3", "src/Sivert Høyem - Prisoner of the Road.mp3", "src/Sivert Høyem - Görlitzer Park.mp3" ,"src/Bloc Party - Different Drugs.mp3","src/Sivert Høyem - Running Out of Time.mp3","src/Puscifer - Momma Sed (Tandimonium Mix).mp3","src/Linkin Park - Pushing Me Away.mp3","src/Naughty Boy & Emeli Sande - Lifted (feat. Emeli Sande).mp3"];
     this.mainBlock = document.getElementById("mainBlock");
     this.audio = document.getElementById("player");
     this.value = 0;
     var audio = document.getElementById("player");
     this.volume = document.getElementById("volume-bar");
     this.currentVolume = document.getElementById("current-volume");
     this.currentTime = document.getElementById("currentTime");
     this.timeLine = document.getElementById("timeLine");
     this.shuffle=false;
     this.audio.src = player.list[this.NumberOfSong];
     this.mainBlock.buttons = {};
     this.mainBlock.buttons.items = [];
     this.init = function () {
             //            var field = $("#theInputField");
             var buttons = document.getElementById("buttons");
             player.mainBlock.appendChild(buttons);
             player.mainBlock.appendChild(player.audio);
             var copiedButtonsItems = player.mainBlock.buttons.items;
             player.mainBlock.buttons = buttons;
             //            console.log(player.mainBlock.buttons)
             player.mainBlock.buttons.items = copiedButtonsItems;
             for (var i = 0; i < player.mainBlock.buttons.items.length; ++i) {
                 var item = player.mainBlock.buttons.items[i];
                 item.init();
                 player.mainBlock.buttons.appendChild(item.view);
             }
         }
       
     this.timeLine.addEventListener('mouseup', function () {
                  setTime(player.timeLine.value);
         player.currentTime.style.width = (player.timeLine.value * 449) + "px";
//     
     });
//    
     this.volume.addEventListener('mousedown', function () {
         setVol(player.volume.value);
         mouseDownEvent = setInterval(function () {
             setVol(player.volume.value);
         }, 0);
     });
     this.volume.addEventListener('mouseup', function () {
         clearInterval(mouseDownEvent);
     });
     this.volume.addEventListener('mouseout', function () {
         clearInterval(mouseDownEvent);
     });

     function setVol(value) {
//         player.gainNode.gain.value = value;
         player.audio.volume = value;
         console.log(player.gainNode.gain.value);
         document.getElementById("current-volume").style.width = (119 * value) + "px";
     }

     function setTime(value) {
         player.value = value;
         var duration = player.audio.duration;
         var durationInProc = duration / 100;
         player.audio.currentTime = durationInProc * value * 100;
         var writeTime = player.currentTime;
         //         player.currentTime = value;
         //         console.log(player.currentTime);
         //         setInterval(function () {
         //             
         //              player.currentTime.style.width = value*449+"px";
         //             console.log( player.currentTime.style.width);
         //         }, 1000);
     }
     setInterval(function () {
         var duration = player.audio.duration;
         var Current = player.audio.currentTime;
         var Margin = Current / duration;
         player.currentTime.style.width = (Margin * 449) + "px";
         console.log(player.currentTime, Margin);
         if (Margin == 1) {
             if (player.NumberOfSong < player.list.length - 1) {
                 player.NumberOfSong++;
                 player.audio.src = player.list[player.NumberOfSong];
                 player.audio.play();
             }
         }
     }, 1000);
     
     
     player.list.forEach(function(item, i, arr){
         var div = document.createElement("div");
         var img = document.createElement("img");
         img.src="buttons/play.png";

         div.appendChild(img);
         div.className="song";
         div.innerHTML+=item;
         div.onclick=function(){
             console.log(i);
             player.audio.src=player.list[i];
             player.audio.play();
         }
//         var playlist=document.createElement("div");
         document.getElementById("playlist").appendChild(div);
//         console.log(playlist);
//         if(i==player.list.length-1){
//             (function(){
//                 document.getElementById("playlist").innerHTML=playlist;
//             })();
//         }
     });
//     (function(){
//                 document.getElementById("playlist").innerHTML=playlist;
//             })();
     setVol(0.5);
     
     this.addButtonsItem = function (item) {
         player.mainBlock.buttons.items.push(item);
     }
     
     this.Button = function (name, icon, func, icon2) {
             var button = this;
             this.name = name;
             
             this.icon = icon;
             this.func = func;
             this.view = document.createElement("button");
             this.view.className = "button";
             this.init = function () {
                 button.view.setAttribute('id', name);
                 if (icon) {
                     var img = document.createElement("img");
                     img.src = button.icon;
                     button.view.appendChild(img);
                 }
                 button.view.addEventListener('click', button.func);
                 //                 button.view.addEventListener('click', function () {
                 //                         if (icon2) {
                 //                             if (button.src == icon) {
                 //                                 button.src = icon2;
                 //                             }
                 //                             if (button.src == icon2) {
                 //                                 button.src = icon;
                 //                             }
                 //                         }
                 //                     })
                 //                button.view.on('click', function() { 
                 //                    if (button.active) {
                 //                        button.makeUnactive();
                 //                    }
                 //                    else {
                 //                        button.makeActive();
                 //                    }
                 //                    editor.addСounterHistory();
                 //                    editor.view.field.focus();
             };
         }
         //        this.init();
 };
 var MusicPlayer = new MusicPlayer();
 var play = new MusicPlayer.Button("play", "buttons/play.png", function () {
     if (window.HTMLAudioElement) {
         try {
             if (MusicPlayer.audio.paused) {
                 MusicPlayer.audio.play();
                 document.getElementById("play").firstChild.src = "buttons/pause.png";
                 //                    play.bu
                 //                        btn.textContent = "Pause";
             }
             else {
                 MusicPlayer.audio.pause();
                 document.getElementById("play").firstChild.src = "buttons/play.png";
                 //                        btn.textContent = "Play";
             }
         }
         catch (e) {
             // Fail silently but show in F12 developer tools console
             if (window.console && console.error("Error:" + e));
         }
     }
 }, "buttons/pause.png");
var shuffle = new MusicPlayer.Button("shuffle", "buttons/shuffle.png", function () { 
        if(MusicPlayer.shuffle==false){
            MusicPlayer.shuffle=true;
        }
        else MusicPlayer.shuffle==false
    
 }, false);
 MusicPlayer.addButtonsItem(play);
 var backward = new MusicPlayer.Button("forward", "buttons/backward.png", function () {
     // Check for audio element support.
     if (window.HTMLAudioElement) {
         try {
             //                    var oAudio = document.getElementById('myaudio');
             if (MusicPlayer.NumberOfSong > 0) {
                 MusicPlayer.NumberOfSong--;
                 MusicPlayer.audio.src = MusicPlayer.list[MusicPlayer.NumberOfSong];
                 MusicPlayer.audio.play();
             }
         }
         catch (e) {
             // Fail silently but show in F12 developer tools console
             if (window.console && console.error("Error:" + e));
         }
     }
 }, false);
 MusicPlayer.addButtonsItem(backward);
 var forward = new MusicPlayer.Button("forward", "buttons/forward.png", function () {
     // Check for audio element support.
     if (window.HTMLAudioElement) {
         try {
             //                    var oAudio = document.getElementById('myaudio');
             if (MusicPlayer.NumberOfSong < MusicPlayer.list.length - 1) {
                 MusicPlayer.NumberOfSong++;
                 console.log(MusicPlayer.NumberOfSong)
                 MusicPlayer.audio.src = MusicPlayer.list[MusicPlayer.NumberOfSong];
                 MusicPlayer.audio.play();
             }
         }
         catch (e) {
             // Fail silently but show in F12 developer tools console
             if (window.console && console.error("Error:" + e));
         }
     }
 }, false);
 MusicPlayer.addButtonsItem(forward);
 //    var currentTime=new MusicPlayer.Button("currentTime",false,function () {
 //         if (window.HTMLAudioElement) {
 //            try {
 //                //                    var oAudio = document.getElementById('myaudio');
 //                MusicPlayer.audio.currentTime;
 //            }
 //            catch (e) {
 //                // Fail silently but show in F12 developer tools console
 //                if (window.console && console.error("Error:" + e));
 //            }
 //        }
 //    },false,"div");
 //    MusicPlayer.addButtonsItem(currentTime);
 MusicPlayer.init();