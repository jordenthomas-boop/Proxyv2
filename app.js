const BYPASS_CODE = "1234jorden";
const REAL_PASSCODE = "jorden99";
const nukeAlarm = new Audio('https://soundboard.com');
nukeAlarm.loop = true;

window.onload = () => {
    if (localStorage.getItem("banned") === "true") triggerBan();
    if (localStorage.getItem("theme") === "light") setTheme('light');
    const savedBg = localStorage.getItem("customBg");
    if (savedBg) document.body.style.backgroundImage = `url(${savedBg})`;
    const savedStar = localStorage.getItem("customStar");
    if (savedStar) document.getElementById("starLayer").style.backgroundImage = `url(${savedStar})`;
    updateBrightness(localStorage.getItem("bgBrightness") || 100);
};

function triggerBan() {
    const b = document.getElementById("banScreen");
    b.style.display = "flex";
    document.getElementById("lockScreen").style.display = "none";
    document.body.onclick = () => nukeAlarm.play();
}

function unban(e) {
    if (e.key === "Enter") {
        if (document.getElementById("backdoor").value === BYPASS_CODE) {
            localStorage.clear(); location.reload();
        } else {
            const b = document.getElementById("backdoor");
            b.classList.add("apply-shake");
            setTimeout(() => b.classList.remove("apply-shake"), 300);
            b.value = "";
        }
    }
}

function fakeRequest() {
    const e = document.getElementById("dummyEmail").value.toLowerCase();
    if (e.includes("@legacytraditionalschool.org") || e.includes(".edu")) {
        localStorage.setItem("banned", "true"); location.reload();
    } else { alert("Status: Pending review."); }
}

function checkFinalCode() {
    if (document.getElementById("finalCode").value === REAL_PASSCODE) {
        document.getElementById("lockScreen").style.display = "none";
        document.getElementById("boot").style.display = "flex";
        setTimeout(() => {
            document.getElementById("boot").style.display = "none";
            document.getElementById("main").style.display = "block";
            document.getElementById("dockContainer").style.display = "flex";
        }, 2000);
    } else { alert("Denied."); }
}

function openPage(id) {
    document.querySelectorAll('.page, #home').forEach(p => p.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}

function setTheme(m) {
    if (m === 'light') document.body.classList.add('light-mode');
    else document.body.classList.remove('light-mode');
    localStorage.setItem("theme", m);
}

function uploadImage(type) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        const res = e.target.result;
        if (type === 'bg') { document.body.style.backgroundImage = `url(${res})`; localStorage.setItem("customBg", res); }
        else { document.getElementById("starLayer").style.backgroundImage = `url(${res})`; localStorage.setItem("customStar", res); }
    };
    reader.readAsDataURL(file);
}

function updateBrightness(v) {
    document.body.style.filter = `brightness(${v / 100})`;
    document.getElementById("brightVal").innerText = v + "%";
    localStorage.setItem("bgBrightness", v);
}

function resetBackgrounds() { localStorage.clear(); location.reload(); }
function cloakTab() {
    const win = window.open();
    const iframe = win.document.createElement('iframe');
    iframe.style = "width:100%;height:100%;border:none;margin:0;";
    iframe.src = window.location.href;
    win.document.body.appendChild(iframe);
    window.location.replace("https://google.com");
}

function disguise(t, i) {
    document.title = t;
    let l = document.querySelector("link[rel*='icon']") || document.createElement('link');
    l.rel = 'shortcut icon'; l.href = i; document.head.appendChild(l);
}

function panic() { window.location.href = "https://google.com"; }
function showPasscodeState() { document.getElementById("requestState").style.display="none"; document.getElementById("passcodeState").style.display="block"; }
function showRequestState() { document.getElementById("requestState").style.display="block"; document.getElementById("passcodeState").style.display="none"; }
function launchProxy() { document.getElementById("proxyFrame").src = "https://t97.net" + document.getElementById("proxyInput").value; }

// ARCADE
let canvas = document.getElementById("gameCanvas"), ctx = canvas.getContext("2d"), gI;
function playSnake() {
    clearInterval(gI); let s=[{x:160,y:160}],dx=20,dy=0,f={x:80,y:80};
    document.onkeydown=(e)=>{
        if(e.key.includes("Up")&&dy==0){dx=0;dy=-20} if(e.key.includes("Down")&&dy==0){dx=0;dy=20}
        if(e.key.includes("Left")&&dx==0){dx=-20;dy=0} if(e.key.includes("Right")&&dx==0){dx=20;dy=0}
    };
    gI=setInterval(()=>{
        let h={x:s[0].x+dx,y:s[0].y+dy}; s.unshift(h);
        if(h.x==f.x&&h.y==f.y) f={x:Math.floor(Math.random()*19)*20,y:Math.floor(Math.random()*19)*20}; else s.pop();
        if(h.x<0||h.x>=400||h.y<0||h.y>=400) clearInterval(gI);
        ctx.fillStyle="black"; ctx.fillRect(0,0,400,400);
        ctx.fillStyle="lime"; s.forEach(p=>ctx.fillRect(p.x,p.y,18,18));
        ctx.fillStyle="red"; ctx.fillRect(f.x,f.y,18,18);
    },100);
}

function playPong() {
    clearInterval(gI); let b={x:200,y:200,dx:4,dy:4},p1=160;
    canvas.onmousemove=(e)=>{p1=e.offsetY-40};
    gI=setInterval(()=>{
        b.x+=b.dx; b.y+=b.dy; if(b.y<0||b.y>390) b.dy*=-1;
        if((b.x<20&&b.y>p1&&b.y<p1+80)||b.x>380) b.dx*=-1;
        ctx.fillStyle="black"; ctx.fillRect(0,0,400,400);
        ctx.fillStyle="white"; ctx.fillRect(10,p1,10,80);
        ctx.beginPath(); ctx.arc(b.x,b.y,8,0,7); ctx.fill();
    },16);
}

function playDodge() {
    clearInterval(gI); let px=200,en=[],f=0;
    canvas.onmousemove=(e)=>{px=e.offsetX-10};
    gI=setInterval(()=>{
        f++; if(f%20==0) en.push({x:Math.random()*380,y:0});
        ctx.fillStyle="black"; ctx.fillRect(0,0,400,400);
        ctx.fillStyle="cyan"; ctx.fillRect(px,370,20,20);
        ctx.fillStyle="orange";
        en.forEach(e=>{ e.y+=5; ctx.fillRect(e.x,e.y,15,15); if(e.y>360&&e.x>px-15&&e.x<px+20) clearInterval(gI); });
    },16);
}
