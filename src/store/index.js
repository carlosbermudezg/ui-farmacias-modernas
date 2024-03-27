import { configureStore } from '@reduxjs/toolkit'
import productsSlice from './slices/products.slice'
import categorySlice from './slices/category.slice'
import pageSlice from './slices/page.slice'
import renderProductsSlice from './slices/renderProducts.slice'
import totalPageSlice from './slices/totalPage'
import categoryUserSlice from './slices/categoryUser.slice'
import searchQuerySlice from './slices/searchQuery.slice'

export default configureStore({
  reducer: {
        products: productsSlice,
        category: categorySlice,
        page: pageSlice,
        renderProducts: renderProductsSlice,
        totalPage: totalPageSlice,
        categoryUser: categoryUserSlice,
        searchQuery: searchQuerySlice
	}
})