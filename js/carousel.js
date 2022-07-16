
window.addEventListener("load",function () {
    const sliderTray = document.querySelector(".slider--tray")
    const sliderDot = document.querySelectorAll(".slider--dot button");
    const sliderImgs = document.querySelectorAll("#slider img");
    const nextSliderBtn = document.querySelector(".next--slider button");
    const previousSliderBtn = document.querySelector(".previous--slider button");
    const sliderImgWidth = sliderImgs[0].offsetWidth;
    var positionChangeX = 0;
    var sliderImgsLength = sliderImgs.length;
    

    this.setInterval(nextSlider,2000)
    nextSliderBtn.addEventListener('click', function () {
        nextSlider(1);
    });
    previousSliderBtn.addEventListener('click', function () {
        previousSlider(-1);
    });
    sliderDot.forEach(function (el) {
        el.addEventListener("click", dotChangeSlider);
    });
    function dotChangeSlider(el) {
        var sliderDotOnClick = el.currentTarget;//lấy dotBtn được click vào
        var activeSliderDot = sliderDotOnClick.dataset.slider.slice(6,7);//lấy ký tự cuối của data-slider 
        var index = activeSliderDot;//gán
        //xóa class active của Img
        sliderImgs.forEach(function(el) {
            el.classList.remove("active")
        });
        //xóa class active của DotBtn
        sliderDot.forEach(function(el) {
            el.classList.remove("active")
        });
        sliderDotOnClick.classList.add('active');//thêm class active cho dotBtn được click vào
        sliderImgs[index].classList.add('active');//thêm class active cho Img có index bằng dòng #2
        positionChangeX = -(index * sliderImgWidth);//dịch chuyển Img theo trục X
        sliderTray.style = `transform: translateX(${positionChangeX}px)`//thêm style
    }
    function previousSlider() {
        var activeSliderImgs = document.querySelector('img.active').id.slice(6,7);
            var index = activeSliderImgs;
            sliderImgs[index].classList.remove('active');
            sliderDot[index].classList.remove('active');
            if (index == 0) {
                index = sliderImgsLength - 1;
                positionChangeX = -(sliderImgWidth * index);
            } 
            else {
                positionChangeX = positionChangeX + sliderImgWidth;
                index--;
            }
            sliderImgs[index].classList.add('active');
            sliderDot[index].classList.add('active');
            
            sliderTray.style = `transform: translateX(${positionChangeX}px)`
            sliderDot[index].classList.add('active');
    }
    function nextSlider() {
            var activeSliderImgs = document.querySelector('img.active').id.slice(6,7);
            var index = activeSliderImgs;
            sliderImgs[index].classList.remove('active');
            sliderDot[index].classList.remove('active');
            if (index == sliderImgsLength - 1) {
                positionChangeX = 0;
                index = 0;
            } 
            else {
                positionChangeX = positionChangeX - sliderImgWidth;
                index++;
            }
            sliderImgs[index].classList.add('active');
            sliderDot[index].classList.add('active');
            
            sliderTray.style = `transform: translateX(${positionChangeX}px)`
            sliderDot[index].classList.add('active');
        } 
            
        
    }
)