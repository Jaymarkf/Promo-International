import { throttle } from 'lodash';
import { SupermarketProductCardsGraphQLQuery, productCardTemplate } from './theme-utils';
import mustache from 'mustache';

export class SpecialProductsGraphQLQuery extends SupermarketProductCardsGraphQLQuery {
    /**
     * Load special products from GraphQL
     * @param {new|top|featured} type Load newest, bestselling or featured products
     * @param {String} afterCursor Load products after cursor
     * @param {Number} limit Number of products to load
     * @param {Boolean} hideOutOfStock Hide out of stock products
     * @returns products
     */
    async load(
        type = 'new',
        afterCursor = '',
        limit = 10,
        hideOutOfStock = true,
    ) {
        const cacheKey = `${this.currencyCode}_${type}_${afterCursor}_${limit}_${hideOutOfStock}`;

        if (!this.cachedProducts[cacheKey]) {
            this.cachedProducts[cacheKey] = await new Promise(resolve => {
                $.ajax({
                    url: '/graphql',
                    method: 'POST',
                    data: JSON.stringify({
                        query: `
                            query categoryProducts(
                                $after: String,
                                $first: Int,
                                $hideOutOfStock: Boolean,
                                $currencyCode: currencyCode!
                            ) {
                                site {
                                    ${type === 'new' ? `
                                    newestProducts(after: $after, first: $first, hideOutOfStock: $hideOutOfStock) {
                                        edges {
                                            node {
                                                ...ProductFields
                                            }
                                        }
                                        pageInfo {
                                            endCursor
                                            hasNextPage
                                        }
                                    }
                                    ` : ''}
                                    ${type === 'top' ? `
                                    bestSellingProducts(after: $after, first: $first, hideOutOfStock: $hideOutOfStock) {
                                        edges {
                                            node {
                                                ...ProductFields
                                            }
                                        }
                                        pageInfo {
                                            endCursor
                                            hasNextPage
                                        }
                                    }
                                    ` : ''}
                                    ${type === 'featured' ? `
                                    featuredProducts(after: $after, first: $first, hideOutOfStock: $hideOutOfStock) {
                                        edges {
                                            node {
                                                ...ProductFields
                                            }
                                        }
                                        pageInfo {
                                            endCursor
                                            hasNextPage
                                        }
                                    }
                                    ` : ''}
                                    settings {
                                        tax {
                                            plp
                                        }
                                        inventory {
                                            defaultOutOfStockMessage
                                        }
                                        storefront {
                                            catalog {
                                                productComparisonsEnabled
                                            }
                                        }
                                    }
                                    currency(currencyCode: $currencyCode) {
                                        display {
                                            symbol
                                            symbolPlacement
                                            decimalToken
                                            thousandsToken
                                            decimalPlaces
                                        }
                                    }
                                }
                            }
                            fragment MoneyFields on Money {
                                value
                                currencyCode
                            }
                            fragment ImageFields on Image {
                                url80wide: url(width: 80)
                                url160wide: url(width: 160)
                                url320wide: url(width: 320)
                                url640wide: url(width: 640)
                            }
                            fragment ProductFields on Product {
                                entityId
                                name
                                sku
                                path
                                addToCartUrl
                                minPurchaseQuantity
                                maxPurchaseQuantity
                                pricesWithTax: prices(includeTax: true, currencyCode: $currencyCode) {
                                    price {
                                        ...MoneyFields
                                    }
                                    basePrice {
                                        ...MoneyFields
                                    }
                                    salePrice {
                                        ...MoneyFields
                                    }
                                    retailPrice {
                                        ...MoneyFields
                                    }
                                    priceRange {
                                        min {
                                            ...MoneyFields
                                        }
                                        max {
                                            ...MoneyFields
                                        }
                                    }
                                }
                                pricesWithoutTax: prices(includeTax: false, currencyCode: $currencyCode) {
                                    price {
                                        ...MoneyFields
                                    }
                                    basePrice {
                                        ...MoneyFields
                                    }
                                    salePrice {
                                        ...MoneyFields
                                    }
                                    retailPrice {
                                        ...MoneyFields
                                    }
                                    priceRange {
                                        min {
                                            ...MoneyFields
                                        }
                                        max {
                                            ...MoneyFields
                                        }
                                    }
                                }
                                defaultImage {
                                    ...ImageFields
                                }
                                images {
                                    edges {
                                    node {
                                        ...ImageFields
                                        isDefault
                                    }
                                    }
                                }
                                brand {
                                    name
                                    path
                                }
                                reviewSummary {
                                    averageRating
                                }
                                productOptions(first: 1) {
                                    edges {
                                        node {
                                            entityId
                                        }
                                    }
                                }
                                availabilityV2 {
                                    status
                                }
                                inventory {
                                    isInStock
                                }
                                customFields {
                                    edges {
                                        node {
                                            name
                                            value
                                        }
                                    }
                                }
                            }
                        `,
                        variables: {
                            after: afterCursor,
                            first: limit,
                            hideOutOfStock,
                            currencyCode: this.currencyCode,
                        },
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${this.graphQLToken}`,
                    },
                    xhrFields: {
                        withCredentials: true,
                    },
                    success: (resp) => {
                        const data = {
                            newestProducts: type === 'new' && resp.data.site.newestProducts
                                ? this.mapGraphQLProducts(resp.data.site.newestProducts, resp.data.site.settings, resp.data.site.currency)
                                : [],
                            newestProductsInfo: type === 'new' && resp.data.site.newestProducts
                                ? {
                                    endCursor: resp.data.site.newestProducts.pageInfo.endCursor,
                                    hasNextPage: resp.data.site.newestProducts.pageInfo.hasNextPage,
                                }
                                : { endCursor: '', hasNextPage: false },
                            bestsellingProducts: type === 'top' && resp.data.site.bestSellingProducts
                                ? this.mapGraphQLProducts(resp.data.site.bestSellingProducts, resp.data.site.settings, resp.data.site.currency)
                                : [],
                            bestsellingProductsInfo: type === 'top' && resp.data.site.bestSellingProducts
                                ? {
                                    endCursor: resp.data.site.bestSellingProducts.pageInfo.endCursor,
                                    hasNextPage: resp.data.site.bestSellingProducts.pageInfo.hasNextPage,
                                }
                                : { endCursor: '', hasNextPage: false },
                            featuredProducts: type === 'featured' && resp.data.site.featuredProducts
                                ? this.mapGraphQLProducts(resp.data.site.featuredProducts, resp.data.site.settings, resp.data.site.currency)
                                : [],
                            featuredProductsInfo: type === 'featured' && resp.data.site.featuredProducts
                                ? {
                                    endCursor: resp.data.site.featuredProducts.pageInfo.endCursor,
                                    hasNextPage: resp.data.site.featuredProducts.pageInfo.hasNextPage,
                                }
                                : { endCursor: '', hasNextPage: false },
                        };
                        resolve(data);
                    },
                    error: () => {
                        resolve('');
                    },
                });
            });
        }

        return this.cachedProducts[cacheKey];
    }
}

class SpecialProductsTabs {
    constructor($scope, context) {
        this.$scope = $scope;
        this.context = context;
        this.$viewportCheck = $scope.find('[data-viewport-check]');
        this.$loading = $scope.find('.loading').hide();
        this.$loadMore = $scope.find('.loadMore').hide();
        this.$collapse = $scope.find('.collapse').hide();
        this.defaultProductsCount = this.context.themeSettings.specialProductsTab_lazy_count + this.context.themeSettings.specialProductsTab_init_count;
        this.template = `
            <div class="emthemesModez-specialProductsTabs-products">
                {{#featuredProducts.length}}
                    <ul class="productGrid productGrid--maxCol4" data-product-type="featured" data-list-name="Featured Products">
                        {{#featuredProducts}}
                            <li class="product" data-product-id="{{id}}">
                                {{&productCardHtml}}
                            </li>
                        {{/featuredProducts}}
                    </ul>
                {{/featuredProducts.length}}

                {{#bestsellingProducts.length}}
                    <ul class="productGrid productGrid--maxCol4" data-product-type="bestselling" data-list-name="Most Popular Products">
                        {{#bestsellingProducts}}
                            <li class="product" data-product-id="{{id}}">
                                {{&productCardHtml}}
                            </li>
                        {{/bestsellingProducts}}
                    </ul>
                {{/bestsellingProducts.length}}

                {{#newestProducts.length}}
                    <ul class="productGrid productGrid--maxCol4" data-product-type="newest" data-list-name="Most Popular Products">
                        {{#newestProducts}}
                            <li class="product" data-product-id="{{id}}">
                                {{&productCardHtml}}
                            </li>
                        {{/newestProducts}}
                    </ul>
                {{/newestProducts.length}}
            </div>
        `;
        this.onCheckViewport = throttle(this.onCheckViewport.bind(this), 100);
        this.onLoadMore = this.onLoadMore.bind(this);
        this.onCollapse = this.onCollapse.bind(this);
        this.onTabToggled = this.onTabToggled.bind(this);

        if (this.context.themeSettings.specialProductsTab_more) {
            this.$loadMore.show();
        }

        this.bindEvents();

        this.gql = new SpecialProductsGraphQLQuery(context);
    }

    bindEvents() {
        $('body').one('beforeload.instantload', () => this.unbindEvents());

        if (this.$viewportCheck.length > 0) {
            $(window).on('load resize scroll', this.onCheckViewport);
        }

        if (this.context.themeSettings.specialProductsTab_more) {
            this.$loadMore.on('click', this.onLoadMore);
        }

        this.$collapse.on('click', this.onCollapse);

        $('[data-tab]', this.$scope).on('toggled', this.onTabToggled);
    }

    unbindEvents() {
        $(window).off('load resize scroll', this.onCheckViewport);
        this.$loadMore.off('click', this.onLoadMore);
        this.$collapse.off('click', this.onCollapse);
        $('[data-tab]', this.$scope).off('toggled', this.onTabToggled);
    }

    onCheckViewport() {
        const offset = 250;

        this.$viewportCheck.each((i, el) => {
            const $el = $(el);

            if (!$el.is(':visible')) {
                return;
            }

            const elTop = $el.offset().top;
            const elBottom = elTop + $el.outerHeight();
            const winTop = $(window).scrollTop();
            const winBottom = winTop + $(window).innerHeight();

            if (elTop - offset < winBottom && elBottom + offset > winTop) {
                this.loadViewportProducts(
                    $el.data('viewportCheck'),
                    $el.closest('.tab-content').find('.productGrid, .productList, .productCarousel'),
                );

                this.$viewportCheck = this.$viewportCheck.not($el);
                $el.remove();
            }
        });
    }

    onLoadMore(event) {
        event.preventDefault();

        const $tab = this.$scope.find('.tab-content.is-active');

        if (!$tab.data('loadedMore')) {
            $tab.data('loadedMore', true);

            const limit = 50;
            const type = $tab.data('productType');

            this.$loading.show();
            this.$loadMore.attr('disabled', true);

            this.gql.load(type, '', limit, true).then(data => {
                this.$loading.hide();
                this.$loadMore.removeAttr('disabled');

                if (!data) {
                    return;
                }

                const html = mustache.render(this.template, {
                    featuredProducts: data.featuredProducts.map(product => ({
                        ...product,
                        productCardHtml: mustache.render(productCardTemplate, product),
                    })),
                    bestsellingProducts: data.bestsellingProducts.map(product => ({
                        ...product,
                        productCardHtml: mustache.render(productCardTemplate, product),
                    })),
                    newestProducts: data.newestProducts.map(product => ({
                        ...product,
                        productCardHtml: mustache.render(productCardTemplate, product),
                    })),
                });

                const existProductIds = $tab
                    .find('.product, .productCarousel-slide')
                    .map((i, el) => $(el).data('productId')).get();

                const $products = $(html)
                    .find('.product, .productCarousel-slide')
                    .filter((i, el) => existProductIds.indexOf($(el).data('productId')) === -1);

                $products
                    .slice(this.defaultProductsCount)
                    .hide();

                $tab
                    .find('.productGrid, .productList, .productCarousel')
                    .append($products);

                if (!$products.is(':hidden')) {
                    this.$loadMore.hide();
                }

                if ($products.length > 0) {
                    this.$collapse.show();
                }
            });
        } else {
            const $products = $tab.find('.product, .productCarousel-slide').filter(':hidden');

            $products
                .slice(0, this.defaultProductsCount)
                .show();

            if (!$products.is(':hidden')) {
                this.$loadMore.hide();
            }

            this.$collapse.show();
        }
    }

    onCollapse(event) {
        event.preventDefault();

        const $tab = this.$scope.find('.tab-content.is-active');
        const $products = $tab.find('.product, .productCarousel-slide');

        $products.slice(this.defaultProductsCount).hide();

        this.$collapse.hide();

        if ($products.length > this.defaultProductsCount) {
            this.$loadMore.show();
        }

        $('html, body').animate({
            scrollTop: $tab.offset().top,
        });
    }

    onTabToggled(event, tab) {
        const $tabContent = $($('a', tab).attr('href'));

        $('[data-slick]', $tabContent).slick('setPosition');

        if (this.$viewportCheck.length > 0) {
            this.onCheckViewport();
        }

        const $products = $tabContent.find('.product, .productCarousel-slide');
        const visible = $products.filter(':visible').length;

        if (this.context.themeSettings.specialProductsTab_more) {
            if (!$tabContent.data('loadedMore') || $products.is(':hidden')) {
                this.$loadMore.show();
            } else {
                this.$loadMore.hide();
            }

            if (visible > this.defaultProductsCount) {
                this.$collapse.show();
            } else {
                this.$collapse.hide();
            }
        }
    }

    async loadViewportProducts(type, $container) {
        this.$loading.show();

        const limit = this.defaultProductsCount;
        const data = await this.gql.load(type, '', limit, true);

        this.$loading.hide();

        if (!data) {
            return;
        }

        const html = mustache.render(this.template, {
            featuredProducts: data.featuredProducts.map(product => ({
                ...product,
                productCardHtml: mustache.render(productCardTemplate, product),
            })),
            bestsellingProducts: data.bestsellingProducts.map(product => ({
                ...product,
                productCardHtml: mustache.render(productCardTemplate, product),
            })),
            newestProducts: data.newestProducts.map(product => ({
                ...product,
                productCardHtml: mustache.render(productCardTemplate, product),
            })),
        });

        const $products = $(html).find('.product, .productCarousel-slide');
        $container.empty().append($products);
    }
}

export default function init({ selector = '[data-special-products-tabs]', context }) {
    $(selector).each((i, el) => {
        const $el = $(el);
        if (!$el.data('specialProductsTabsInstance')) {
            $el.data('specialProductsTabsInstance', new SpecialProductsTabs($el, context));
        }
    });
}
