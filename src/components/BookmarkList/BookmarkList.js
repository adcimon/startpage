import { html } from '../../html.js';
import { Bookmarks } from './bookmarks.js';

export function BookmarkList() {
	React.useEffect(() => {
		const swiperInstance = new Swiper('.bookmarks-swiper', {
			slidesPerView: 1,
			spaceBetween: 8,
			grabCursor: true,
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

		return () => {
			if (swiperInstance) {
				swiperInstance.destroy();
			}
		};
	}, []);

	// Group bookmarks by category
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
										${items.map(
											(item, itemIdx) => html`
												<a
													key=${itemIdx}
													href=${item.url || window.location.href}
													target=${item.url ? '_self' : '_blank'}
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
											`,
										)}
									</div>
								</div>
							</div>
						`,
					)}
				</div>
				<!-- Add Pagination -->
				<div class="swiper-pagination"></div>

				<!-- Add Navigation Arrows -->
				<div class="swiper-button-prev"></div>
				<div class="swiper-button-next"></div>
			</div>
		</div>
	`;
}
