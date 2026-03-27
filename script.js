let allPosts = [];
let filteredPosts = [];
let currentPage = 1;
const perPage = 2;
let currentTag = null;

fetch("posts.json")
    .then(res => res.json())
    .then(data => {
        allPosts = data;
        filteredPosts = data;
        renderTags();
        loadPosts();
    });

function loadPosts() {
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;

    const pagePosts = filteredPosts.slice(start, end);

    document.getElementById("posts").innerHTML = "";

    pagePosts.forEach(post => {
        fetch(post.file)
            .then(res => res.text())
            .then(md => {
                const html = marked.parse(md);

                const tagsHtml = post.tags.map(t =>
                    `<span class="tag" onclick="filterTag('${t}')">${t}</span>`
                ).join("");

                document.getElementById("posts").innerHTML += `
                    <div class="post">
                        <h2>${post.title}</h2>
                        ${tagsHtml}
                        ${html}
                    </div>
                `;
            });
    });

    renderPagination();
}

function renderPagination() {
    const totalPages = Math.ceil(filteredPosts.length / perPage);
    let html = "";

    for (let i = 1; i <= totalPages; i++) {
        html += `<button onclick="goPage(${i})">${i}</button>`;
    }

    document.getElementById("pagination").innerHTML = html;
}

function goPage(page) {
    currentPage = page;
    loadPosts();
}

function toggleDark() {
    document.body.classList.toggle("dark");
}

function renderTags() {
    let tags = new Set();
    allPosts.forEach(p => p.tags.forEach(t => tags.add(t)));

    let html = "<h3>标签：</h3>";
    tags.forEach(tag => {
        html += `<span class="tag" onclick="filterTag('${tag}')">${tag}</span>`;
    });

    document.getElementById("tags").innerHTML = html;
}

function filterTag(tag) {
    currentTag = tag;
    filteredPosts = allPosts.filter(p => p.tags.includes(tag));
    currentPage = 1;
    loadPosts();
}

function searchPost() {
    const keyword = document.getElementById("search").value.toLowerCase();

    filteredPosts = allPosts.filter(p =>
        p.title.toLowerCase().includes(keyword)
    );

    currentPage = 1;
    loadPosts();
}