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
       fade-up（共通）
    ===================== */
    const fadeTargets = document.querySelectorAll(
        '.fade-up, .fade-up-title, .fade-up-text'
    );

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // 一度だけ
            }
        });
    }, { threshold: 0.3 });

    fadeTargets.forEach(el => fadeObserver.observe(el));

    /* =====================
       語りかけブロック
    ===================== */
    const talkBlocks = document.querySelectorAll(
        '.talk-section, .result-section'
    );

    const talkObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-show');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    talkBlocks.forEach(el => talkObserver.observe(el));

    /* =====================
       private__pic（スマホ）
    ===================== */
    if (window.innerWidth <= 440) {
        const images = document.querySelectorAll(
            '.private__pics-row .private__img'
        );

        if (images.length > 0) {
            let currentIndex = 0;
            images[0].classList.add('active');

            setInterval(() => {
                images[currentIndex].classList.remove('active');
                currentIndex = (currentIndex + 1) % images.length;
                images[currentIndex].classList.add('active');
            }, 3000);
        }
    }

    /* =====================
       グローバルメニュー current 自動判定
    ===================== */
    const currentPath = location.pathname;

    const navLinks = document.querySelectorAll(
        '.gnav__item a, .gnav2__item a'
    );

    navLinks.forEach(link => {
        if (link.getAttribute('href').startsWith('#')) return;

        const linkPath = new URL(link.href).pathname;

        if (currentPath === linkPath) {
            link.parentElement.classList.add('current');
        }
    });
    /* =====================
   マーカー演出（文字は固定）
===================== */
    const markers = document.querySelectorAll('.js-marker');

    const markerObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.6 });

    markers.forEach(marker => markerObserver.observe(marker));

});