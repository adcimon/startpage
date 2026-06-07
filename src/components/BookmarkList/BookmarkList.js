import { html } from '../../html.js';
import { Bookmarks } from './bookmarks.js';

export function BookmarkList() {
	React.useEffect(() => {
		const swiperInstance = new Swiper('.bookmarks-swiper', {
			slidesPerView: 1,
			spaceBetween: 12,
			grabCursor: true,
			watchOverflow: true,
			mousewheel: {
				releaseOnEdges: false,
			},
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			breakpoints: {
				576: {
					slidesPerView: 'auto',
					spaceBetween: 16,
				},
			},
		});

		const handleMiddleClick = (e) => {
			if (e.button === 1) {
				// Middle mouse button
				if (e.target.closest('.category-link')) {
					return; // Allow middle-clicking links to open in a new tab
				}
				e.preventDefault();
				const rect = swiperInstance.el.getBoundingClientRect();
				const clickX = e.clientX - rect.left;
				if (clickX < rect.width / 2) {
					swiperInstance.slidePrev();
				} else {
					swiperInstance.slideNext();
				}
			}
		};

		const swiperEl = swiperInstance.el;
		if (swiperEl) {
			swiperEl.addEventListener('mousedown', handleMiddleClick);
		}

		return () => {
			if (swiperEl) {
				swiperEl.removeEventListener('mousedown', handleMiddleClick);
			}
			if (swiperInstance) {
				swiperInstance.destroy();
			}
		};
	}, []);

	// Group bookmarks by category.
	const categories = Bookmarks.reduce((acc, curr) => {
		if (!acc[curr.category]) {
			acc[curr.category] = [];
		}
		acc[curr.category].push(curr);
		return acc;
	}, {});

	return html`
		<div class="bookmarks-container">
			<div class="swiper bookmarks-swiper">
				<div class="swiper-wrapper">
					${Object.entries(categories).map(
						([categoryName, items]) => html`
							<div
								key=${categoryName}
								class="swiper-slide">
								<div class="category-card">
									<h4 class="category-header">${categoryName}</h4>
									<div class="category-links">
										${items.map((item, itemIdx) => {
											const handleClick = (event) => {
												if (item.trigger === '/exit') {
													event.preventDefault();
													window.close();
												}
											};
											return html`
												<a
													key=${itemIdx}
													href=${item.url || window.location.href}
													target=${item.url ? '_self' : '_blank'}
													onClick=${handleClick}
													class="category-link">
													<div class="link-left">
														<img
															src=${item.icon}
															class="link-icon"
															alt=${item.name} />
														<span class="link-name">${item.name}</span>
													</div>
													<span class="link-trigger">${item.trigger}</span>
												</a>
											`;
										})}
									</div>
								</div>
							</div>
						`,
					)}
				</div>
				<div class="swiper-pagination"></div>
			</div>
			<div class="swiper-button-prev"></div>
			<div class="swiper-button-next"></div>
		</div>
	`;
}
