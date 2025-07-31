//Ruou
const frameCount = 16;
const endScroll = window.innerHeight * .8;
const ruouImgCon = document.getElementById("ruou-img-con");
const ruouImgList = [];

async function preLoadRuou() {
    for (let i = 1; i <= frameCount;i++) {
        const img = new Image();
        img.src = `video/ruou${i}.png`;
        img.id = "ruou-img";
        ruouImgList.push(img);
    }
}

window.onload = async function () {
    await preLoadRuou();
    centerBanner();

    window.addEventListener('scroll', e => { 
        if (window.scrollY < endScroll) {
            ruouImgCon.innerHTML = "";
            ruouImgCon.appendChild(ruouImgList[Math.floor((1 - window.scrollY / endScroll) * (frameCount - 1))]);
        }
    });

    requestAnimationFrame(updateRuou);
};

const cen_banner = document.getElementById('cen_banner');

function centerBanner() {debugger   
    const rect = cen_banner.getBoundingClientRect();

    cen_banner.style.top = `${window.innerHeight / 2 - rect.height / 2}px`;
    cen_banner.style.left = `${window.innerWidth / 2 - rect.width / 2}px`;
}

window.addEventListener('resize', e => {
    centerBanner();
});

function moveRuou(p) {
    ruouImgCon.style.top = "0px";
    ruouImgCon.style.left ="0px";

    const rectRuou = ruouImgCon.getBoundingClientRect();
    const rectCenBanner = cen_banner.getBoundingClientRect();

    ruouImgCon.style.top = `${(rectCenBanner.y - rectRuou.y) * (1 - p)}px`;
    ruouImgCon.style.left = `${(rectCenBanner.x - rectRuou.x) * (1 - p)}px`;
}

function updateRuou() {
    if (window.scrollY > endScroll) {
        requestAnimationFrame(updateRuou);
        return;
    }

    let progress = window.scrollY / endScroll;
    moveRuou(progress);

    requestAnimationFrame(updateRuou);
}