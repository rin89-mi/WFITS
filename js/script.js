/*index.html*/
/*footerページのトップに行く*/
document.addEventListener('DOMContentLoaded', function () {
    // ID 'js-goto-top' を使用してリンクを取得
    const goToTopLink = document.getElementById('js-goto-top');

    // イージング関数 (スムーズな動きを実現)
    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function animateScroll(targetPosition, duration) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;

            let progress = timeElapsed / duration;
            progress = Math.min(progress, 1);

            const easedProgress = easeInOutCubic(progress);

            window.scrollTo(0, startPosition + distance * easedProgress);

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    }

    if (goToTopLink) {
        goToTopLink.addEventListener('click', function (event) {
            event.preventDefault();
            const durationTime = 800;
            animateScroll(0, durationTime); // ページトップ (0) へ
        });
    }
});


/*color.html*/
/*fade-up-titleとfade-up-textの文字の入り方*/
const fadeTargets = document.querySelectorAll('.fade-up, .fade-up-title, .fade-up-text');

const options = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, options);

fadeTargets.forEach(target => observer.observe(target));

/*treatment.html*/
/*healthyhair__titleとhealthyhair__textの文字の入り方*/
document.addEventListener("DOMContentLoaded", () => {
    const fades = document.querySelectorAll('.fade-up');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.5
    });

    fades.forEach((el) => observer.observe(el));
});


/*index*/
/*private__pic*/
document.addEventListener('DOMContentLoaded', () => {

    // スマホだけ
    if (window.innerWidth > 440) return;

    const images = document.querySelectorAll(
        '.private__pics-row .private__img'
    );

    if (images.length === 0) return;

    let currentIndex = 0;

    // 初期表示
    images.forEach(img => img.classList.remove('active'));
    images[0].classList.add('active');

    setInterval(() => {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }, 3000);

});
