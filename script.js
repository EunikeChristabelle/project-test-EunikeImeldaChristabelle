const posts = [
    { date: '2022-09-05', title: 'Kenali Tingkatan Influencers berdasarkan Jumlah Followers', img: 'https://storage.googleapis.com/a1aa/image/ppJP7NOE0F5cDZEe9IE6Lat39fLFtMQTuftaapV9SelXZRpOB.jpg' },
    { date: '2022-09-06', title: 'Contoh Judul Post Lainnya', img: 'https://placehold.co/400x200' },
    { date: '2022-09-07', title: 'Judul Post yang Sangat Panjang dan Memerlukan Truncation', img: 'https://placehold.co/400x200' },
    { date: '2022-09-08', title: 'Judul Post Keempat', img: 'https://placehold.co/400x200' },
    { date: '2022-09-09', title: 'Judul Post Kelima', img: 'https://placehold.co/400x200' },
    { date: '2022-09-10', title: 'Judul Post Keenam', img: 'https://placehold.co/400x200' },
    { date: '2022-09-11', title: 'Judul Post Ketujuh', img: 'https://placehold.co/400x200' },
    { date: '2022-09-12', title: 'Judul Post Kedelapan', img: 'https://placehold.co/400x200' },
    { date: '2022-09-13', title: 'Judul Post Kesembilan', img: 'https://placehold.co/400x200' },
    { date: '2022-09-14', title: 'Judul Post Kesepuluh', img: 'https://placehold.co/400x200' },
    { date: '2022-09-15', title: 'Judul Post Kesebelas', img: 'https://placehold.co/400x200' },
];

const grid = document.getElementById('grid');
const pagination = document.getElementById('pagination');
const showPerPageSelect = document.getElementById('show-per-page');
const sortBySelect = document.getElementById('sort-by');

let currentPage = 1;
let itemsPerPage = parseInt(showPerPageSelect.value);
let sortedPosts = [...posts];

function renderPosts() {
    grid.innerHTML = '';
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentPosts = sortedPosts.slice(start, end);

    currentPosts.forEach(post => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${post.img}" alt="${post.title}" />
            <div class="info">
                <p>${post.date}</p>
                <h3>${post.title}</h3>
            </div>
        `;
        grid.appendChild(card);
    });

    renderPagination();
}

function renderPagination() {
    pagination.innerHTML = '';
    const pageCount = Math.ceil(sortedPosts.length / itemsPerPage);

    for (let i = 1; i <= pageCount; i++) {
        const pageLink = document.createElement('a');
        pageLink.textContent = i;
        pageLink.className = (i === currentPage) ? 'active' : '';
        pageLink.href = '#';
        pageLink.addEventListener('click', (e) => {
            e.preventDefault();
            currentPage = i;
            renderPosts();
        });
        pagination.appendChild(pageLink);
    }
}

showPerPageSelect.addEventListener('change', (e) => {
    itemsPerPage = parseInt(e.target.value);
    currentPage = 1;
    renderPosts();
});

sortBySelect.addEventListener('change', (e) => {
    const sortOrder = e.target.value;
    if (sortOrder === 'newest') {
        sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
    } else {
        sortedPosts = [...posts].sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    currentPage = 1;
    renderPosts();
});

renderPosts();

let lastScrollTop = 0; 
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
   
        header.classList.add('hidden');
        header.classList.remove('visible');
    } else {
       
        header.classList.remove('hidden');
        header.classList.add('visible');
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; 
});
