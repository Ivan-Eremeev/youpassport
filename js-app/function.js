/*!
 *
 * Ivan Eremeev - 2019
 * Skype: ivan.eremeev_1
 * Telegram: IvanMessage
 * Email: ivan.frontcoder@gmail.com
 *
 */

// Брэйкпоинты js
var	breakXl = 1400,
breakLg = 1200,
breakMd = 1025,
breakSm = 769,
breakXs = 500;

$(document).ready(function () {

	// Отмена перехода по ссылкам
	$('a[href="#"]').click(function(e) {
		e.preventDefault();
	});

	// Меню
	menu($('#menu'));

	// Показать еще новости
	limitBlock($('#articles'));
	limitBlock($('#articles2'));
	limitBlock($('#articles3'));
	limitBlock($('#articles4'));
	limitBlock($('#articles5'));
	limitBlock($('#articles6'));
	limitBlock($('#articles7'));
	limitBlock($('#articles8'));
	limitBlock($('#articles9'));
	limitBlock($('#faq'),1);

	// Аккордеон
	accordeon($('#nav-accordeon'),true);
	accordeon($('#accordeon-scroll'),true);

	// Бегающее меню
	scrollMenu($('#scrollMenu'));
	
});

// Аккордеон
function accordeon(accordeon, mobile) {
	var trigger = accordeon.find('.accordeon_trigger'),
			content = accordeon.find('.accordeon_content'),
			close = accordeon.find('.accordeon_close');
			time = 300;
	trigger.on('click', function() {
		if ($(window).width() <= breakSm) {
			$this = $(this);
			if (!$this.hasClass('active')) {
				// trigger.removeClass('active');
				$this.addClass('active');
				// content.stop().slideUp(time);
				$this.next('.accordeon_content').stop().slideDown(time).removeClass('hide');
			}
			else {
				$this.removeClass('active');
				$this.next('.accordeon_content').stop().slideUp(time).addClass('hide');
			}
		}
	});
	close.on('click', function() {
		trigger.removeClass('active');
		content.stop().slideUp(time).addClass('hide');
	});
	if (mobile == true) {
		$(window).resize(function() {
			if ($(window).width() > breakSm) {
				trigger.removeClass('active');
				content.removeClass('hide')
					.attr('style', '');
			}
			else {
				content.addClass('hide')
			}
		});
	}
};

// Меню
function menu(menu) {
	var button = $('#menu-btn'),
	close = menu.find('.menu_close'),
	arrow = menu.find('.menu_arrow'),
	items = menu.find('.menu_item'),
	submenus = menu.find('.submenu');
	button.click(function() {
		menu.addClass('open');
	});
	close.click(function() {
		menu.removeClass('open');
	});
	arrow.click(function() {
		if ($(window).width() < breakSm) {
			var item = $(this).closest('.menu_item'),
			submenu = $(this).next('.submenu');
			if (item.hasClass('open')) {
				item.removeClass('open');
				submenu.removeClass('open');
			}
			else {
				items.removeClass('open');
				submenus.removeClass('open');
				item.addClass('open');
				submenu.addClass('open');
			}
		}
	});
	$(window).resize(function() {
		if ($(window).width() >= breakSm) {
			menu.removeClass('open');
			items.removeClass('open');
			submenus.removeClass('open');
		}
	});
};

// Показать еще новости
function limitBlock(wrap, newsNum) {
	if (!newsNum) {
		newsNum = 3
	}
	var news = wrap.find('.limit-block'),
			parent = news.parent(),
			newsLimit = news.slice(0, newsNum),
			btn = wrap.find('.show-btn'),
			btnShow = btn.text(),
			btnHide = 'Скрыть',
			heightResized = false;
	width();
	$(window).resize(function() {
		var windowWidth = $(window).width();
		if (heightResized == windowWidth) {
			return;
		}
		heightResized = windowWidth;
		width();
	});
	function width() {
		if ($(window).width() <= breakSm) {
			news.remove();
			parent.append(newsLimit);
			btn.text(btnShow)
				.removeClass('active');
		}else {
			parent.append(news);
			btn.text(btnHide)
				.addClass('active');
		}
	};
	btn.click(function() {
		if (!btn.hasClass('active')) {
			parent.append(news);
			btn.text(btnHide)
				.addClass('active');
		}else {
			news.remove();
			parent.append(newsLimit);
			btn.text(btnShow)
				.removeClass('active');
		}
	});
};

function scrollMenu(menu) {
	var offset = 30, // Отступ меню от верха страницы
			time = 500, // Скорость прокрутки
			menuOffset = menu.offset().top,
			menuHeight = menu.height(),
			wrapper = menu.parent(),
			wrapperOffset = wrapper.offset().top,
			wrapperHeight = wrapper.height(),
			wrapperBottom = wrapperOffset + wrapperHeight,
			item = menu.find('a[href^="#"]'),
			block = $('.accordeon-scroll_block');
	// Скролл меню вместе с экраном
	$(window).scroll(function() {
		var scrollTrigger = $(window).scrollTop() - menuOffset,
				scrollMenu = scrollTrigger + offset,
				menuBottom = scrollMenu + menuHeight;
		if (scrollMenu > 0 && $(window).width() > breakSm) {
			menu.css({
				position: 'fixed',
				top: offset
			});
		}else {
			menu.css({
				position: 'relative',
				top: '0'
			});
		}
		if (menuBottom > (wrapperHeight - 100)) {
			menu.css({
				top: (($(document).scrollTop() - (wrapperBottom - menuHeight - 100)) * -1)
			});
		}
	});
	// Плавный скролл
	item.click(function(e) {
		e.preventDefault();
		var id = $(this).attr('href');
				blockTop = $(id).offset().top - offset;
		$('body,html').animate({scrollTop: blockTop}, time);
	});
	// Подсветка активных пунктов меню
	$(window).scroll(function() {
		if ($(window).width() > breakSm) {
			block.each(function(index, el) {
				var topBlock = $(el).offset().top - offset - 2;
						bottomBlock = topBlock + $(el).height(),
						scroll = $(window).scrollTop();
						idBlock = $(el).attr('id');
				if (scroll > topBlock && scroll < bottomBlock) {
					item.removeClass('active');
					menu.find('a[href="#'+idBlock+'"]').addClass('active');
				}
			});
		}
	});
};