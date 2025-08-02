//Ruou
const frameCount = 16;
const stay = 100;
let endScroll = window.innerHeight;
let stayScroll = endScroll + stay;
let endScroll2 = endScroll * 2;
const ruouImgCon = document.getElementById("ruou-img-con");
const ruou2CP = document.getElementById("ruou2-check-point");
const ruou2 = document.getElementById("ruou2");
const ruouImgList = [];
const startSize = 800;
const endSize = 500;
let ruouHeight = startSize;
let img;
let change = false;
let deg = 40;
const sec4_state_1 = document.getElementById("sec4_state_1");

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
            // ruouImgCon.innerHTML = "";
            // ruouImgCon.appendChild(ruouImgList[Math.floor((1 - window.scrollY / endScroll) * (frameCount - 1))]);
            // ruouImgCon.children[0].style.height = ruouHeight;
            img = ruouImgList[Math.floor((1 - window.scrollY / endScroll) * (frameCount - 1))];
            change = true;
        }
    });

    requestAnimationFrame(updateRuou);
};

const cen_banner = document.getElementById('cen_banner');

function centerBanner() {
    const rect = cen_banner.getBoundingClientRect();

    cen_banner.style.top = `${window.innerHeight / 2 - rect.height / 2}px`;
    cen_banner.style.left = `${window.innerWidth / 1.8 - rect.width / 2}px`;
}

window.addEventListener('resize', e => {
    centerBanner();
    endScroll = window.innerHeight;
    stayScroll = endScroll + stay;
    endScroll2 = endScroll * 2;
});

function moveRuou(p) {
    ruouImgCon.style.top = "0px";
    ruouImgCon.style.left = "0px";
    // cen_banner.style.transform = `rotate(${40 * (1 - p)}deg)`;

    const rectRuou = ruouImgCon.getBoundingClientRect();
    const rectCenBanner = cen_banner.getBoundingClientRect();

    ruouImgCon.style.top = `${(rectCenBanner.y - rectRuou.y) * (1 - p)}px`;
    ruouImgCon.style.left = `${(rectCenBanner.x - rectRuou.x) * (1 - p)}px`;
    // ruouImgCon.style.transform = `rotate(${40 * (1 - p)}deg)`;
    ruouHeight = `${endSize * p + startSize * (1 - p)}px`;
    // ruouImgCon.children[0].style.height = ruouHeight;
}
let ot = 0;

const rice_img = document.getElementById("small-img");
const top_filter = document.getElementById("top-filter");
let state1_length = window.innerHeight;
let scrollTo;
let curScroll = 0;

const nl = document.getElementById('nguyen-lieu-con');
const cn = document.getElementById('chuyen-nghiep');
let endNL = 1.3;
let startCN = 1.6;
let endCN_clear = 2;
let endCN_show_header = 2.2;

function updateRuou(t) {
    curScroll += (window.scrollY - curScroll) * (t - ot) * .005;
    ot = t;

    {
        let progress = (curScroll - sec4_state_1.offsetTop) / state1_length;
        let local_progress = Math.min(Math.max(progress, 0), 1);

        rice_img.style.width = `${60 + 40 * local_progress}%`;
        top_filter.style.opacity = local_progress;
        top_filter.style.transform = `scale(${1.2 - .2 * local_progress})`;

        local_progress = (Math.min(Math.max(progress, 1), endNL) - 1) * (1 / (endNL - 1));

        nl.style.opacity = local_progress;

        local_progress = (Math.min(Math.max(progress, startCN), endCN_clear) - startCN) * (1 / (endCN_clear - startCN));

        cn.style.opacity = local_progress;
    }

    if (window.scrollY > endScroll2) {
        ruou2.style.opacity = 0;
        ruou2CP.style.opacity = 1;
        requestAnimationFrame(updateRuou);
        return;
    }

    if (window.scrollY > stayScroll) {
        ruouImgCon.style.opacity = 0;
        ruou2CP.style.opacity = 0;

        const ruou_rect = ruouImgCon.getBoundingClientRect();
        const ruouCP_rect = ruou2CP.getBoundingClientRect();
        // console.log(ruou_rect.y, ruou_rect.x, ruouCP_rect.y, ruouCP_rect.x, `fps:${(1000 / (t - ot) < 120 ? "low":"")}`);
        // ot = t;

        let progress = (window.scrollY - stayScroll) / (endScroll2 - stayScroll);
        ruou2.style.height = `${ruou_rect.height}px`;
        ruou2.style.top = `${(ruouCP_rect.y - ruou_rect.y) * progress + (ruou_rect.y + window.scrollY)}px`;
        ruou2.style.left = `${(ruouCP_rect.x - ruou_rect.x) * progress + ruou_rect.x}px`;
        ruou2.style.opacity = 1;
        ruou2.style.height = `${ruou_rect.height * (1 - progress) + ruouCP_rect.height * progress}px`;
        ruou2.style.width = `${ruou_rect.width * (1 - progress) + ruouCP_rect.width * progress}px`;
        requestAnimationFrame(updateRuou);
        return;
    }
    
    if (window.scrollY > endScroll) {
        requestAnimationFrame(updateRuou);
        return;
    }

    ruouImgCon.style.opacity = 1;
    ruou2CP.style.opacity = 0;
    ruou2.style.opacity = 0;

    let progress = window.scrollY / endScroll;
    moveRuou(progress);

    if (change) {
        change = false;
        ruouImgCon.innerHTML = "";
        ruouImgCon.appendChild(ruouImgList[Math.floor((1 - window.scrollY / endScroll) * (frameCount - 1))]);
        ruouImgCon.children[0].style.height = ruouHeight;
    }

    requestAnimationFrame(updateRuou);
}

const muc1 = document.getElementById("muc_1");
const muc1_con = document.getElementById("muc_1_con");

muc1.style.animationName = 'none';

let animateMuc_1 = (entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            muc1.style.animationName = 'show_slide';
        }
    });
};

let hideMuc_1 = (entries, observer) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            muc1.style.animationName = 'none';
        }
    });
};

const observerMuc_1 = new IntersectionObserver(animateMuc_1, {
    threshold: .5
});

observerMuc_1.observe(muc1_con);

const obsMuc1_Out = new IntersectionObserver(hideMuc_1, {
    threshold: 0
});

obsMuc1_Out.observe(muc1_con);

const strip = document.getElementById("strip");
const strip_con = document.getElementById("strip-con");

strip.style.animationName = 'none';

let hide_strip = (entries, observer) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            strip.style.animationName = 'none';
        }
    });
};

let show_strip = (entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            strip.style.animationName = 'show_slide';
        }
    });
};

const obs_show_strip = new IntersectionObserver(show_strip, {
    threshold: .8
});

obs_show_strip.observe(strip_con);

const obs_hide_strip = new IntersectionObserver(hide_strip, {
    threshold: 0
});

obs_hide_strip.observe(strip_con);