let files = [
    "posts/2026-03-27.md",
    "posts/2026-03-28.md"
];

let allData = [];

// 加载日记
function loadAll() {
    files.forEach(f => {
        fetch(f)
            .then(r => r.text())
            .then(md => {
                allData.push({
                    file: f,
                    text: md
                });
                render(allData);
            });
    });
}

// 渲染列表（带动画）
function render(data) {
    let html = "";
    data.forEach((d, i) => {
        const preview = d.text.split("\n").slice(0,3).join("\n");

        html += `
        <div class="post" onclick="openPost(${i})">
            ${marked.parse(preview)}
        </div>`;
    });
    document.getElementById("posts").innerHTML = html;
}

// 打开全文
function openPost(index) {
    const d = allData[index];

    document.getElementById("posts").innerHTML = `
        <div class="post" style="animation: fadeIn 0.5s;">
            ${marked.parse(d.text)}
            <button onclick="back()">⬅ 返回</button>
        </div>
    `;
}

// 返回列表
function back() {
    render(allData);
}

// 搜索
function searchDiary() {
    const key = document.getElementById("search").value.toLowerCase();

    const filtered = allData.filter(d =>
        d.text.toLowerCase().includes(key)
    );

    render(filtered);
}

// 夜间模式
function toggleDark() {
    document.body.classList.toggle("dark");
}

// 粒子背景
particlesJS("particles-js", {
  particles: {
    number: { value: 40 },
    size: { value: 3 },
    move: { speed: 0.6 },
    line_linked: { enable: true, opacity: 0.2 }
  },
  interactivity: {
    events: {
      onhover: { enable: true, mode: "repulse" }
    }
  }
});

// 启动
loadAll();