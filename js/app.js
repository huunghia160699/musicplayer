fetch('http://localhost:3000/toptrendingsong')
.then(Response => {return Response.json()})
.then(songs => {
    const $ = document.querySelector.bind(document)
    const $$ = document.querySelectorAll.bind(document)
    const img = $('.track_img img')
    const title = $('.track_info span:first-of-type')
    const artist = $('.track_info span:last-of-type')
    const audio = $('#audio')
    const source = $('source')
    const trackExpandBtn = $('.track_expand_btn')
    const expandContain = $('.expand_contain')

    const mainPlayBtn = $('.main_play_btn')
    const volumeBtn = $('.volume_btn div')
    const smallBtn = $$('.small_btn div')
    const randomBtn = $('.random_btn')
    const repeatBtn = $('.repeat_btn')
    const favIcon = $$('.expand_box span i')
    const favBtn = $$('.expand_box span')
    const prevBtn = $('.prev_btn div')
    const nextBtn = $('.next_btn div')
    const virtualizer = $('.virtualizer')
    
    const listBodyBox = $('.list_body_box')


    const mainPlayIcon = mainPlayBtn.querySelectorAll('i')
    const volumeIcon = volumeBtn.querySelectorAll('i')
    const progressed = $('#progressed')
    const progressBar = $('#player_progress-bar')
    const isTouch = 'mousedown'
    const newItems = [0]
    const randomArray = [0]
    const currentIndexArray = [0]
    const timeCount = $('.time_count');
    const timeTotal = $('.time_total')
    const trendingSongList = $('.trending_songs')
    let newIndex
    
    const app = {

        currentIndex: 0,
        isPlaying: false, isRandom: false, isRepeat: false,
        render: function() {
            const topTrendingSong = songs.map((song, index) => {
                return `
                <section class="flex-space_between ${index === this.currentIndex ? 'active' : ''}" data-index='${index}'>
                    <div class="order_nb">${song.STT}</div>
                    <div class="trending_songs_img">
                    <img src="${song.songImgPath}" alt="">
                    </div>
                    <div class="song_info">
                        <span>${song.songName}</span>
                        <span>${song.artistName}</span>
                    </div>
                    <span class="song_view">${song.durationTime}</span>
        
                </section>
                `
            })
            const newSong = songs.map(song => {
                return `
                <div class="list_body_box">
                    <div class="list_body_item_img" style="background-image: url(${song.songImgPath});">
                        <i class="fa-regular fa-circle-play"></i>
                    </div>
                    <div class="list_body_item_info">
                        <span class="list_body_item_song_name">${song.songName}</span>
                        <span class="list_body_item_song_artist">${song.artistName}</span>
                    </div>
                    
                    </div>
                `  
            })
            trendingSongList.innerHTML = topTrendingSong.join('')
            document.querySelector('.list_body').innerHTML = newSong.join('')
        },
        getCurrentSong: function() {
            Object.defineProperty(this, 'currentSong', {
                get: function(){
                    return songs[this.currentIndex ]
                }
            })
        },
        loadCurrentSong: function() {
            
            title.textContent = this.currentSong.songName
            img.src = this.currentSong.songImgPath
            artist.textContent = this.currentSong.artistName
            audio.src = this.currentSong.songPath
        },
        playSong: function() {
            this.render()
            setTimeout(() => {
                audio.play()
            },500)
        },
        pauseSong: function() {
            audio.pause()
            // this.isPlaying = false

        },
        randomNumber: function() {
            
            loop:{
                    var item = Math.floor(Math.random() * songs.length);
                    if(newItems.length === songs.length){
                        newItems.length = 0
                        break loop
                    } else {
                        for(let i = 0; i <= newItems.length; i++){
                            if(newItems[i] === item){
                                break loop;
                            }
                        }
                        newItems.push(item)
                        var randomItem = item
                    }
                    return randomItem
                
            }
        },
        playRepeatOne: function() {
            if(repeatBtn.classList.contains('repeat_one')){
                this.playSong()
            } else {
                this.nextSong()

            }
        },
        playRepeatAll: function() {
            if(repeatBtn.classList.contains('active')) {
                this.currentIndex = 0
            } else {
                return
            }
        },
        playRandomSong: function() {
            do{
                newIndex = this.randomNumber();
            } while(newIndex === undefined)
            randomArray.push(newIndex)
            if(randomArray.length > songs.length){
                return
            } else {
                this.currentIndex = newIndex
                this.loadCurrentSong()
                this.playSong()
                console.log('test');
            }

        },
        nextSong: function() {
            if(this.currentIndex >= songs.length - 1){
                this.playRepeatAll()
            } else {
                this.currentIndex++
                this.loadCurrentSong()
                if(this.isPlaying){
                    this.isPlaying = !this.isPlaying
                    mainPlayBtn.classList.toggle('active', this.isPlaying)
                } else {
                    this.isPlaying = !this.isPlaying
                    mainPlayBtn.classList.toggle('active', this.isPlaying)
                }
                this.playSong()
            }
        },
        previousSong: function() {
            this.currentIndex--
            if(this.currentIndex < 0){
                this.currentIndex = songs.length - 1
            }
            this.loadCurrentSong()
            this.playSong()
        },
        toHHMMSS: function (time) {
            var totalSec = parseInt(audio.duration, 10);
            var hours   = Math.floor(totalSec / 3600);
            var minutes = Math.floor((totalSec - (hours * 3600)) / 60);
            var seconds = totalSec - (hours * 3600) - (minutes * 60);
    
            if (hours   < 10) {hours   = "0"+hours; }
            if (minutes < 10) {minutes = "0"+minutes;}
            if (seconds < 10) {seconds = "0"+seconds;}
            
            var time = minutes+':'+seconds;
            return time;
        },
        handleEvents: function() {
            const _this = this

            trendingSongList.onclick = function(e){
                const songTarget = e.target.closest('.trending_songs section:not(.active)')
                if(songTarget || e.target.closest('.song_view'))
                    if(songTarget){
                        _this.currentIndex = Number(songTarget.dataset.index)
                        _this.loadCurrentSong()
                        _this.render()
                        _this.playSong()
                    }
            }   

            volumeBtn.addEventListener('click', function() {
                for(var i = 0; i < 2;i++){
                    volumeIcon[i].classList.toggle('active')
                }
            
            });
            mainPlayBtn.onclick = function(){
                if(_this.isPlaying){
                    _this.pauseSong()
                } else {
                    _this.playSong()
                }
                
                
                // progress.oninput = function(e) {
                //     const seekTime = audio.duration * progress.value / 100
                //     audio.currentTime = seekTime
                // }
                
            }
            progressBar.onclick = function(e) {
                audio.currentTime = (audio.duration/100 * (e.offsetX*100/progressBar.offsetWidth))
            }
            audio.ontimeupdate = function() {
                const progressPercent = audio.currentTime / audio.duration * 100
                progressed.style.width = (100 - progressPercent) + "%"
                
            }
            audio.onplay = function() {
                _this.isPlaying = true
                mainPlayBtn.classList.toggle('active', _this.isPlaying)
                virtualizer.classList.toggle('active', _this.isPlaying)
            }
            audio.onpause = function() {
                _this.isPlaying = false
                mainPlayBtn.classList.toggle('active', _this.isPlaying)
                virtualizer.classList.toggle('active', _this.isPlaying)
            }
            randomBtn.onclick = function() {
                _this.isRandom = !_this.isRandom
                randomBtn.classList.toggle('active', _this.isRandom)
            }
            repeatBtn.onclick = function() {
                if(repeatBtn.classList.contains('repeat_one')){
                    repeatBtn.classList.remove('repeat_one')
                    repeatBtn.classList.remove('active')
                } else if(repeatBtn.classList.contains('active')) {
                    repeatBtn.classList.add('repeat_one')
                } else {
                    repeatBtn.classList.add('active')
                }
            }
            nextBtn.onclick = function() {
                if(_this.isRandom){
                    _this.playRandomSong()
                } else {
                    _this.nextSong()
                }
                progressed.style.width = 100 +"%"
                
            }
            prevBtn.onclick = function() {
                if(_this.isRandom){
                    _this.playRandomSong()
                } else {
                    _this.previousSong()
                }
            }
            audio.onended = function() {
                _this.playRepeatOne()
            }
            
            // audio.addEventListener('loadedmetadata', function(){
            //     timeTotal.textContent  = _this.toHHMMSS(audio.duration);
            //   });
            // audio.addEventListener('canplaythrough', function(e){
            //     timeTotal.textContent = _this.toHHMMSS(audio.duration);
            // });
            // audio.addEventListener("timeupdate", function() {
            //     var s = parseInt(audio.currentTime % 60);
            //     var m = parseInt((audio.currentTime / 60) % 60);
            //     if (s < 10) {
            //         timeCount.innerText = m + ':0' + s;
            //     }
            //     else {
            //         timeCount.innerText = m + ':' + s;
            //     }
            // }, false);
            
            
            // trackExpandBtn.addEventListener('click', function() {
            //     expandContain.classList.toggle('active')
            // })


        },
        dragEvent :function() {
            // Make the DIV element draggable:
            dragElement(document.getElementById("progressed-dot"));

            function dragElement(dot) {
            var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            if (document.getElementById(dot.id + "progressed-dot")) {
                // if present, the header is where you move the DIV from:
                document.getElementById(dot.id + "progressed-dot").onmousedown = dragMouseDown;
            } else {
                // otherwise, move the DIV from anywhere inside the DIV:
                dot.onmousedown = dragMouseDown;
            }

            function dragMouseDown(e) {
                e = e || window.event;
                e.preventDefault();
                // get the mouse cursor position at startup:
                pos3 = e.clientX;
                document.onmouseup = closeDragElement;
                // call a function whenever the cursor moves:
                document.onmousemove = elementDrag;
            }

            function elementDrag(e) {
                e = e || window.event;
                e.preventDefault();
                // calculate the new cursor position:
                pos1 = pos3 - e.clientX;
                pos3 = e.clientX;
                // set the element's new position:
                // dot.style.left = (dot.offsetLeft - pos1) + "px";
                // console.log(e.clientX);
                var progressX = e.clientX/progressed.offsetWidth*100
                console.log(progressX);
                console.log( (100 - progressX) + "%");
                

            }

            function closeDragElement() {
                // stop moving when mouse button is released:
                document.onmouseup = null;
                document.onmousemove = null;
            }
            }
        },
        
        start: function() {
            // this.dragEvent()
            this.handleEvents()
            this.render()
            this.getCurrentSong()
            this.loadCurrentSong()
        }

    }
    app.start()
   
})
   
