
$(document).ready(function () {
    let videoOpening = $('#fullScreenVideo');
    let title = $('#title');

    // 影片結束事件
    videoOpening.on('ended', function () {
        videoOpening[0].pause(); // 停留在最後幀
        title.addClass('active'); // 觸發文字顯示
    });

    title.on('transitionend', function () {
        document.querySelector('#intro').scrollIntoView({
            behavior: 'smooth' // 平滑滾動
        });
    });
    
});

// 參拜小物的動畫
$(document).ready(function () {
    const $container = $('.sticky-container');
    const animationTimings = {
        'C-title': 0.1, // 與 plate 同步出現
        'plate': 0.2,
        'seat': 0.25,
        'seat-content': { start: 0.25, end: 0.4 },
        'dessert': 0.45,
        'dessert-content': { start: 0.45, end: 0.65},
        'cards': 0.7,
        'cards-content': { start: 0.75, end: 0.9},
    };

    function handleScroll() {
        const containerTop = $container.offset().top;
        const scrollProgress = ($(window).scrollTop() - containerTop) /
            ($container.height() - $(window).height());

        // 顯示 plate
        const $plate = $('#plate');
        if (scrollProgress >= animationTimings['plate']) {
            $plate.addClass('active');
        }

        // 控制 C-title 的顯示與隱藏
        const $cTitle = $('#C-title');
        if (scrollProgress >= animationTimings['C-title'] && scrollProgress < animationTimings['seat']) {
            $cTitle.addClass('active');
        } else {
            $cTitle.removeClass('active');
        }

        // 顯示 seat
        const $seat = $('#seat');
        if (scrollProgress >= animationTimings['seat']) {
            $seat.addClass('active');
        }

        // 顯示 seat-content, dessert-content, cards-content 等內容
        ['seat-content', 'dessert-content', 'cards-content'].forEach(id => {
            const { start, end } = animationTimings[id];
            const $element = $(`#${id}`);
            if (scrollProgress >= start && scrollProgress <= end) {
                $element.addClass('active');
            } else {
                $element.removeClass('active');
            }
        });

        // 顯示 dessert, cards 等元素
        ['dessert', 'cards'].forEach(id => {
            const $element = $(`#${id}`);
            if (scrollProgress >= animationTimings[id]) {
                $element.addClass('active');
            }
        });
    }

    // 監聽滾動事件
    $(window).on('scroll', handleScroll);

    // 頁面載入時執行一次檢查
    handleScroll();
});

// 轉場點燈
$(document).ready(function () {
    $(window).scroll(function () {
        const $transSection = $('#trans');
        const $transText = $('#trans-text');
        const $concertLight = $('#concert_light');

        const scrollPosition = $(window).scrollTop();
        const sectionTop = $transSection.offset().top;
        const sectionHeight = $transSection.height();
        const windowHeight = $(window).height();

        // 計算滾動進度
        const scrollProgress = (scrollPosition - sectionTop) / (sectionHeight - windowHeight);

        // 控制文字透明度和顯示
        if (scrollProgress >= 0.2 && scrollProgress <= 0.3) {
            $transText.addClass('active'); // 顯示文字
        } else {
            $transText.removeClass('active'); // 隱藏文字
        }

        // 控制背景透明度變化
        if (scrollProgress >= 0.3 && scrollProgress <= 0.5) {
            const opacityValue = (scrollProgress - 0.3) / 0.2; // 將 0.3~0.5 映射到 0~1
            $concertLight.css('opacity', opacityValue);
        } else if (scrollProgress < 0.5) {
            $concertLight.css('opacity', 0);
        } else {
            $concertLight.css('opacity', 1);
        }
    });
});


