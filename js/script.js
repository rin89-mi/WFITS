document.addEventListener('DOMContentLoaded', () => {

    /* =====================
       ページトップへ戻る
    ===================== */
    const goToTopLink = document.getElementById('js-goto-top');
    if (goToTopLink) {
        goToTopLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* =====================
       共通スライダー（SPのみ）
    ===================== */
    if (window.innerWidth > 440) return;

    function initSlider(selector) {
        const track = document.querySelector(selector);
        if (!track) return;

        const slides = track.children;
        const slideCount = slides.length;
        if (slideCount <= 1) return;

        const firstClone = slides[0].cloneNode(true);
        track.appendChild(firstClone);

        let index = 0;
        const interval = 3000;
        const speed = 600;

        setInterval(() => {
            index++;
            track.style.transition = `transform ${speed}ms ease`;
            track.style.transform = `translateX(-${index * 100}%)`;

            if (index === slideCount) {
                setTimeout(() => {
                    track.style.transition = 'none';
                    track.style.transform = 'translateX(0)';
                    index = 0;
                }, speed);
            }
        }, interval);
    }

    // カラーページ
    initSlider('.color_sh__track');

    // トリートメントページ
    initSlider('.sh__track');

    const menuItems = document.querySelectorAll('.gnav2__item a');
    const currentPath = location.pathname.split("/").pop(); // ファイル名だけ取得

    menuItems.forEach(link => {
        const linkPath = link.getAttribute('href').split("/").pop(); // ファイル名だけ
        if (linkPath === currentPath) {
            link.parentElement.classList.add('current');
        }
    });

});