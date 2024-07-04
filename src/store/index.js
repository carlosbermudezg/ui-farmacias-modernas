import { configureStore } from '@reduxjs/toolkit'
import productsSlice from './slices/products.slice'
import categorySlice from './slices/category.slice'
import pageSlice from './slices/page.slice'
import renderProductsSlice from './slices/renderProducts.slice'
import totalPageSlice from './slices/totalPage'
import categoryUserSlice from './slices/categoryUser.slice'
import searchQuerySlice from './slices/searchQuery.slice'
import userSlice from './slices/user.slice'
import usersSlice from './slices/users.slice'
import brandsSlice from './slices/brands.slice'
import dataSlice from './slices/register/data.slice'
import selectedBrandsSlice from './slices/register/selectedBrands.slice'
import selectedZonesSlice from './slices/register/selectedZones.slice'
import userTypeSlice from './slices/register/userType.slice'
import zonesSlice from './slices/register/zones.slice'
import snackbarSlice from './slices/info/snackbar.slice'
import editUserSlice from './slices/users/editUser.slice'
import sheylaSlice from './slices/sheyla/sheyla.slice'
import isLoadingSlice from './slices/isLoading.slice'
import recetaUserSlice from './slices/recetas/recetaUser.slice'
import recetaYearSlice from './slices/recetas/recetaYear.slice'
import selectedRecetaSlice from './slices/recetas/selectedReceta.slice'
import modalVisibleSlice from './slices/recetas/modalVisible.slice'
import userRendimientoSlice from './slices/rendimiento/userRendimiento.slice'

export default configureStore({
  reducer: {
        products: productsSlice,
        category: categorySlice,
        page: pageSlice,
        renderProducts: renderProductsSlice,
        totalPage: totalPageSlice,
        categoryUser: categoryUserSlice,
        searchQuery: searchQuerySlice,
        user: userSlice,
        editUser: editUserSlice,
        users: usersSlice,
        brands: brandsSlice,
        zones: zonesSlice,
        // registration reducers
        data: dataSlice,
        selectedBrands: selectedBrandsSlice,
        userType: userTypeSlice,
        selectedZones: selectedZonesSlice,
        // info
        snackbar: snackbarSlice,
        // sheyla api
        sheyla: sheylaSlice,
        isLoading: isLoadingSlice,
        // recetas
        recetaUser: recetaUserSlice,
        recetaYear: recetaYearSlice,
        selectedReceta: selectedRecetaSlice, 
        modalVisible: modalVisibleSlice,
        // rendimiento
        userRendimiento: userRendimientoSlice 
	}
})