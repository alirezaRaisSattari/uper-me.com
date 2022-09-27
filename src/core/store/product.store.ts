import {defineStore} from "pinia";


export const ProductStore = defineStore({
        id: 'ProductStore',
        state: () => ({
            categoryId: null,
            listFeatureCreate: null,
            images: {mainPhoto: '', otherImages: []},
            productId: null
        })
    }
)