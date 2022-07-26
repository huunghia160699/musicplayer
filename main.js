const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const img = $('.img img')
const title = $('.title span:first-of-type')
const artist = $('.title span:last-of-type')
const playerTitle = $('.player_left_info span:first-of-type')
const playerArtist = $('.player_left_info span:last-of-type')
const audio = $('#audio')
const totalSong = $('.total_song')
const mainPlayBtn = $('.main_play_btn')
const randomBtn = $('.random_btn')
const repeatBtn = $('.repeat_btn')
const prevBtn = $('#prev_btn')
const nextBtn = $('#next_btn')
const progressed = $('#progressed')
const progressBar = $('#player_progress_bar')
const songImg = $('.img img')
const isTouch = 'mousedown'
const newItems = [0]
const randomArray = [0]
const currentIndexArray = [0]
const timeCount = $('.time_count');
const timeTotal = $('.time_total')
const songList = $('.list')
let newIndex
const app = {
    songs: [

        {
            name: "yêu đơn phương là gì?",
            artist: 'h0n',
            path: './mp3/Yêu Đơn Phương Là Gì Lofi.mp3',
            img: 'https://i.ytimg.com/vi/Ynr3n3dFACA/maxresdefault.jpg'
        },
        {
            name: 'ghé qua',
            artist: 'bạn có tài mà',
            path: './mp3/ghequa.mp3',
            img: './img/artist/ghequa.png'
        },
        {
            name: 'anh thương em nhất mà',
            artist: 'lã x log x tib',
            path: './mp3/anhthuongemnhatma.mp3',
            img: 'https://i.scdn.co/image/ab67616d0000b2738298bcce652558aa15783154'
        },
        {
            name: 'dừng thương',
            artist: 'datKaa',
            path: './mp3/dungthuong.mp3',
            img: 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/9/a/e/4/9ae496d0b92cf2ca93359d3b6a508a63.jpg'
        },
        {
            name: 'mãi mãi không phải anh',
            artist: 'thanh bình',
            path: './mp3/maimaikhongphaianh.mp3',
            img: 'https://i.ytimg.com/vi/q5Kw-Yw0_E8/maxresdefault.jpg'
        },
        {
            name: 'chạy về khóc với anh',
            artist: 'ERIK',
            path: './mp3/chayvekhocvoianh.mp3',
            img: 'https://dj24h.com/wp-content/uploads/2022/03/chay-ve-khoc-voi-anh.jpg'
        },
        {
            name: 'em ổn không',
            artist: 'trịnh thiên ân x viruss',
            path: './mp3/emonkhong.mp3',
            img: 'https://i.ytimg.com/vi/vYLYQY5dMiw/maxresdefault.jpg'
        },
        {
            name: 'chỉ muốn bên em thật gần',
            artist: 'YLing',
            path: './mp3/chimuonbenemthatgan.mp3',
            img: 'https://i.ytimg.com/vi/w2j_RyfUVEI/maxresdefault.jpg'
        },
        {
            name: 'sao em vô tình',
            artist: 'jack',
            path: './mp3/saoemvotinh.mp3',
            img: 'https://i.ytimg.com/vi/sdEU-t3uEM4/maxresdefault.jpg'
        },
        {
            name: 'nụ cười em là nắng',
            artist: 'green',
            path: './mp3/nucuoiemlanang.mp3',
            img: 'https://i.ytimg.com/vi/p_NxCLBxbrw/maxresdefault.jpg'
        },

    ],
    currentIndex: 0,
    isPlaying: false, isRandom: false, isRepeat: false,
    render: function () {
        const listItemSong = this.songs.map((song, index) => {
            return `
                <section class="list_item ${index === this.currentIndex ? 'active' : ''}" data-index='${index}'>
                <div class="item_box">
                    <span class="number">${index + 1}</span>
                    <span class="material-symbols-outlined play_btn" >play_arrow</span>
                    <div class="virtualizer">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>

                <div class="song_btn">
                </div>
                
                        <span class="song_name">${song.name}<span class="artist_name">${song.artist}</span></span>
                        <span class="song_duration"></span>
                </section>
                `
        })
        totalSong.innerHTML = this.songs.length
        songList.innerHTML = listItemSong.join('')
    },
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },
    loadCurrentSong: function () {
        img.src = this.currentSong.img
        title.textContent = this.currentSong.name
        artist.textContent = this.currentSong.artist
        audio.src = this.currentSong.path
    },
    playSong: function () {
        this.render()
        songImg.classList.toggle('active', this.isPlaying)

        setTimeout(() => {
            audio.play()
        }, 500)
    },
    pauseSong: function () {
        audio.pause()
        this.isPlaying = false

    },
    randomNumber: function () {

        loop: {
            var item = Math.floor(Math.random() * this.songs.length);
            if (newItems.length === this.songs.length) {
                newItems.length = 0
                break loop
            } else {
                for (let i = 0; i <= newItems.length; i++) {
                    if (newItems[i] === item) {
                        break loop;
                    }
                }
                newItems.push(item)
                var randomItem = item
            }
            return randomItem

        }
    },
    playRepeatOne: function () {
        if (this.isRepeat === 'repeatOne') {
            this.playSong()
        } else {
            this.nextSong()

        }
    },
    playRepeatAll: function () {
        if (this.isRepeat === 'repeatOne') {
            this.currentIndex = 0
            this.loadCurrentSong()
            this.playSong()
        } else {
            return
        }
    },
    playRandomSong: function () {
        do {
            newIndex = this.randomNumber();
        } while (newIndex === undefined)
        randomArray.push(newIndex)
        if (randomArray.length > this.songs.length) {
            if (this.isRepeat == 'repeatAll') {
                randomArray.length = 0
                this.currentIndex = 0
                this.loadCurrentSong()
                if (this.isPlaying) {
                    this.isPlaying = !this.isPlaying
                    mainPlayBtn.classList.toggle('active', this.isPlaying)
                }
                this.playSong()
            } else {
                this.nextSong()
            }
        } else {
            this.currentIndex = newIndex
            this.loadCurrentSong()
            if (this.isPlaying) {
                this.isPlaying = !this.isPlaying
                mainPlayBtn.classList.toggle('active', this.isPlaying)
            }
            this.playSong()
        }

    },
    // scrollToActiveSong: function () {
    //     setTimeout(() => {
    //         $('.list_item.active').scrollIntoView(true)
    //         console.log('test');
    //     },300)
    // },
    nextSong: function () {
        if (this.currentIndex >= this.songs.length - 1) {
            // this.playRepeatAll()
            this.currentIndex = 0
    } else {
            this.currentIndex++
        }
        this.loadCurrentSong()
        if (this.isPlaying) {
            this.isPlaying = !this.isPlaying
            mainPlayBtn.classList.toggle('active', this.isPlaying)
        songImg.classList.toggle('active', this.isPlaying)

        }
        // this.scrollToActiveSong()
        this.playSong()
    },
    previousSong: function () {
        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
        if (this.isPlaying) {
            this.isPlaying = !this.isPlaying
            mainPlayBtn.classList.toggle('active', this.isPlaying)
        }
        this.playSong()
    },
    toHHMMSS: function (time) {
        var totalSec = parseInt(audio.duration, 10);
        var hours = Math.floor(totalSec / 3600);
        var minutes = Math.floor((totalSec - (hours * 3600)) / 60);
        var seconds = totalSec - (hours * 3600) - (minutes * 60);

        if (hours < 10) { hours = "0" + hours; }
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }

        var time = minutes + ':' + seconds;
        return time;
    },
    virtualizerRun: function() {
        const songListItem = $$('.list_item')
        songListItem.forEach(e => {
            const virtualizer = e.querySelector('.virtualizer')
            const playBtn = e.querySelector('.play_btn')
            if(this.isPlaying){
                if(e.classList.contains('active')){
                    virtualizer.style.opacity = '1'
                    playBtn.style.opacity = '0'
                }
            } else {
                if(e.classList.contains('active')){
                    playBtn.style.opacity = '1'
                    virtualizer.style.opacity = '0'
                }
            }
            
        })
    },
    handleEvents: function () {
        const _this = this
        
        songList.onclick = function(e){
            const songTarget = e.target.closest('.list section:not(.active)')
            if(songTarget || e.target.closest('.list_item')){
                    _this.currentIndex = Number(songTarget.dataset.index)
                    _this.loadCurrentSong()
                    _this.render()
                    if (this.isPlaying) {
                        this.isPlaying = !this.isPlaying
                        mainPlayBtn.classList.toggle('active', this.isPlaying)
                    }
                    _this.playSong()
                }
        }   

        // volumeBtn.addEventListener('click', function() {
        //     for(var i = 0; i < 2;i++){
        //         volumeIcon[i].classList.toggle('active')
        //     }

        // });
        mainPlayBtn.onclick = function () {
            if (_this.isPlaying) {
                _this.pauseSong()
            } else {
                _this.playSong()
            }


            // progress.oninput = function(e) {
            //     const seekTime = audio.duration * progress.value / 100
            //     audio.currentTime = seekTime
            // }

        }
        progressBar.onclick = function (e) {
            audio.currentTime = (audio.duration / 100 * (e.offsetX * 100 / progressBar.offsetWidth))
            audio.play()
        }
        audio.ontimeupdate = function () {
            const progressPercent = audio.currentTime / audio.duration * 100
            progressed.style.width = (progressPercent) + "%"

        }
        audio.onplay = function () {
            _this.isPlaying = true
            mainPlayBtn.classList.toggle('active', _this.isPlaying)
            songImg.classList.toggle('active', _this.isPlaying)
            _this.virtualizerRun()
            
            // virtualizer.classList.toggle('active', _this.isPlaying)
        }
        audio.onpause = function () {
            _this.isPlaying = false
            mainPlayBtn.classList.toggle('active', _this.isPlaying)
            songImg.classList.toggle('active', _this.isPlaying)
            _this.virtualizerRun()

            // virtualizer.classList.toggle('active', _this.isPlaying)
        }
        randomBtn.onclick = function () {
            _this.isRandom = !_this.isRandom
            randomBtn.classList.toggle('active', _this.isRandom)
        }
        repeatBtn.onclick = function () {
            const repeatIcon = repeatBtn.querySelector('span')
            if (repeatIcon.textContent === 'repeat_one') {
                _this.isRepeat = 'false'
                repeatIcon.textContent = 'repeat'
                repeatBtn.classList.remove('active')
            } else if (repeatBtn.classList.contains('active')) {
                _this.isRepeat = 'repeatOne'
                repeatIcon.textContent = 'repeat_one'
            } else {
                _this.isRepeat = 'repeatAll'
                repeatBtn.classList.add('active')
            }
        }
        nextBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.nextSong()
            }
            progressed.style.width = 100 + "%"

        }
        prevBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.previousSong()
            }
        }
        audio.onended = function () {
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



    },
    dragEvent: function () {
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
                var progressX = e.clientX / progressed.offsetWidth * 100
                console.log(progressX);
                console.log((100 - progressX) + "%");


            }

            function closeDragElement() {
                // stop moving when mouse button is released:
                document.onmouseup = null;
                document.onmousemove = null;
            }
        }
    },

    start: function () {
        // this.dragEvent()
        this.handleEvents()
        this.defineProperties()
        this.render()
        
        this.loadCurrentSong()
        
    }

}
app.start()