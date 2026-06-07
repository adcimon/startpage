import { html } from '../../html.js';
import { Bookmarks } from './bookmarks.js';

export function BookmarkList() {
	React.useEffect(() => {
		const swiperInstance = new Swiper('.bookmarks-swiper', {
			slidesPerView: 'auto',
			spaceBetween: 16,
			grabCursor: true,
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		});

		return () => {
			if (swiperInstance) {
				swiperInstance.destroy();
			}
		};
	}, []);

	return html`
		<div class="bookmarks-container">
			<div class="swiper bookmarks-swiper">
				<div class="swiper-wrapper">
					${Bookmarks.map(
						(bookmark, index) => html`
							<div
								key=${index}
								class="swiper-slide">
								<a
									href=${bookmark.url || window.location.href}
									target=${bookmark.url ? '_self' : '_blank'}
									class="bookmark-button"
									style=${{ backgroundColor: bookmark.background }}
									title=${bookmark.name}>
									<img
										src=${bookmark.icon}
										class="bookmark-icon"
										alt=${bookmark.name} />
								</a>
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
