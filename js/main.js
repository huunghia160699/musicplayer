const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const audio = $('#audio')
audio.play()
const sideMenuItem = $$('.side-menu-inner-content-full-item>a')
sideMenuItem.forEach(function (el) {
    el.addEventListener("click", sideMenuItemChange);
});
function sideMenuItemChange(el) {
    var sideMenuItemOnClick = el.currentTarget;
    sideMenuItem.forEach(function(el) {
        el.classList.remove('active')
    });
    sideMenuItemOnClick.classList.add('active');
    
}










