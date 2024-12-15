
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

// 左右互搏的function
(function($) {
    $.fn.scrollReveal = function(options) {
        // 預設參數
        var settings = $.extend({
            // 觸發顯示的視窗高度比例（預設80%）
            triggerRatio: 0.8,
            // 是否開啟淡入效果
            fadeEffect: true,
            // 淡入時間（毫秒）
            duration: 500,
            // 是否只顯示一次
            once: false
        }, options);

        // 為每個匹配的元素設置效果
        return this.each(function() {
            var $images = $(this).find('.scroll-images .image-box');
            var revealed = [];

            // 初始化：隱藏所有圖片
            if (settings.fadeEffect) {
                $images.css({
                    'opacity': '0',
                    'transition': 'opacity ' + settings.duration + 'ms ease-in-out'
                });
            }

            // 滾動事件處理函數
            function checkVisibility() {
                var windowHeight = $(window).height();
                var scrollTop = $(window).scrollTop();

                $images.each(function(index) {
                    var $image = $(this);
                    var imageTop = $image.offset().top;
                    var imageHeight = $image.height();

                    // 判斷圖片是否在可視範圍
                    var isInView = 
                        imageTop < scrollTop + windowHeight * settings.triggerRatio && 
                        imageTop + imageHeight > scrollTop;

                    // 如果尚未顯示過，或不要求只顯示一次
                    if (isInView && (!settings.once || !revealed[index])) {
                        $image.css('opacity', '1');
                        revealed[index] = true;
                    } else if (!isInView && !settings.once) {
                        $image.css('opacity', '0');
                    }
                });
            }

            // 綁定滾動事件
            $(window).on('scroll resize', checkVisibility);
            
            // 初始檢查
            checkVisibility();
        });
    };
})(jQuery);

// 日韓
$(document).ready(function() {
    // 呼叫function
    $('#jp-kr').scrollReveal({
        triggerRatio: 0.8,   // 可調整觸發位置
        fadeEffect: true,    // 啟用淡入效果
        duration: 500,       // 淡入時間
        once: false          // 是否只顯示一次
    });
});

// 優優
$(document).ready(function() {
    $('#yoyo').scrollReveal({
        triggerRatio: 0.8,
        fadeEffect: true,    
        duration: 500,   
        once: false     
    });
});

// AKMU
$(document).ready(function() {
    $('#akmu').scrollReveal({
        triggerRatio: 0.8,
        fadeEffect: true,    
        duration: 500,   
        once: false     
    });
});

// wei
$(document).ready(function() {
    $('#wei').scrollReveal({
        triggerRatio: 0.8,
        fadeEffect: true,    
        duration: 500,   
        once: false     
    });
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

        // 修改判斷邏輯，擴大觸發範圍
        if (scrollProgress >= 0 && scrollProgress <= 0.5) {
            $transText.addClass('active'); // 顯示文字
        } else {
            $transText.removeClass('active'); // 隱藏文字
        }

        // 控制背景透明度變化（保持原邏輯）
        if (scrollProgress >= 0.3 && scrollProgress <= 0.5) {
            const opacityValue = (scrollProgress - 0.3) / 0.2; // 將 0.3~0.5 映射到 0~1
            $concertLight.css('opacity', opacityValue);
        } else if (scrollProgress < 0.3) {
            $concertLight.css('opacity', 0);
        } else {
            $concertLight.css('opacity', 1);
        }
    });
});


