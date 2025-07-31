//Ruou
const frameCount = 17;
const endScroll = 500;
const ruouImg = document.getElementById("ruou");

window.onload = function () {
    window.addEventListener('scroll', e => { 
        if (window.scrollY < endScroll) {
            ruouImg.src = "video/ruou" + Math.floor((1 - window.scrollY / endScroll) * 16) + ".png";
        }
    });
};