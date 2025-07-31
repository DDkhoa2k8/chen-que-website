//Ruou
const frameCount = 16;
const endScroll = 500;
const ruouImg = document.getElementById("ruou");
const ruouImgCon = document.getElementById("ruou-img-con");
const ruouImgList = [];

async function preLoadRuou() {
    for (let i = 1; i <= frameCount;i++) {
        const img = new Image();
        img.src = `video/ruou${i}.png`;
        ruouImgList.push(img);
    }
}

window.onload = async function () {
    await preLoadRuou();

    window.addEventListener('scroll', e => { 
        if (window.scrollY < endScroll) {
            ruouImgCon.innerHTML = "";
            ruouImgCon.appendChild(ruouImgList[Math.floor((1 - window.scrollY / endScroll) * (frameCount - 1))]);
        }
    });
};