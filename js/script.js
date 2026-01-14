document.addEventListener('DOMContentLoaded', () => {

    /* =====================
       ページトップへ戻る
    ===================== */
    const goToTopLink = document.getElementById('js-goto-top');
    if (goToTopLink) {
        goToTopLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* =====================
       現在ページのメニューに下線
    ===================== */
    const menuLinks = document.querySelectorAll('.gnav__item a, .gnav2__item a');
    let currentPath = location.pathname.split('/').pop() || 'index.html';

    menuLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        if (linkPath === currentPath) {
            link.parentElement.classList.add('current');
        }
    });

    /* =====================
       共通スライダー（SPのみ）
    ===================== */
    function initSlider(selector) {
        const track = document.querySelector(selector);
        if (!track) return;

        const slides = track.children;
        const slideCount = slides.length;
        if (slideCount <= 1) return;

        const firstClone = slides[0].cloneNode(true);
        track.appendChild(firstClone);

        let index = 0;
        setInterval(() => {
            index++;
            track.style.transition = 'transform 600ms ease';
            track.style.transform = `translateX(-${index * 100}%)`;

            if (index === slideCount) {
                setTimeout(() => {
                    track.style.transition = 'none';
                    track.style.transform = 'translateX(0)';
                    index = 0;
                }, 600);
            }
        }, 3000);
    }

    if (window.innerWidth <= 440) {
        initSlider('.color_sh__track');
        initSlider('.sh__track');
    }

    /* =====================
       IntersectionObserver
    ===================== */
    const targets = document.querySelectorAll('.talk-section, .result-section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-show');
                observer.unobserve(entry.target);
            }
        });
    });
    targets.forEach(target => observer.observe(target));

    const fadeUps = document.querySelectorAll('.fade-up');
    const fadeObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                fadeObserver.unobserve(entry.target);
            }
        });
    });
    fadeUps.forEach(el => fadeObserver.observe(el));

    /* =====================
       NEWS
    ===================== */
    const newsTrack = document.getElementById('newsTrack');

    fetch('https://wfits.microcms.io/api/v1/news?orders=-date', {
        headers: {
            'X-MICROCMS-API-KEY': 'UYUZQu4LYgZf2JSwhTjJXFXKALyiSdxG91ZF'
        }
    })
        .then(res => res.json())
        .then(data => {
            const contents = data.contents;

            for (let i = 0; i < contents.length; i += 3) {
                // 3件で1ページ
                const page = document.createElement('div');
                page.className = 'news-page';

                const ul = document.createElement('ul');
                ul.className = 'news__list';

                contents.slice(i, i + 3).forEach(item => {
                    const li = document.createElement('li');
                    li.className = 'news__item';
                    li.style.display = 'flex';

                    li.innerHTML = `
          <div class="news__date">
            ${new Date(item.date).toLocaleDateString('ja-JP')}
          </div>
          <div>
            <div class="news__heading">${item.title}</div>
            <div class="news__text">${item.content}</div>
          </div>
        `;

                    ul.appendChild(li);
                });

                page.appendChild(ul);
                newsTrack.appendChild(page);
            }
        });

    let currentIndex = 0;

    const track = document.getElementById('newsTrack');
    const prevBtn = document.querySelector('.news-arrow--prev');
    const nextBtn = document.querySelector('.news-arrow--next');

    function updateSlide() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    nextBtn.addEventListener('click', () => {
        const pageCount = track.children.length;
        currentIndex++;

        if (currentIndex >= pageCount) {
            currentIndex = pageCount - 1;
        }

        updateSlide();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex--;

        if (currentIndex < 0) {
            currentIndex = 0;
        }

        updateSlide();
    });

});
