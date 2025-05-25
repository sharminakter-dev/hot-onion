import { createSlice } from "@reduxjs/toolkit";
import data from '../../data/data.json'

const searchFoodSlice = createSlice({
    name: "searchFood",
    initialState: {
        allItems:data,
        filtered:[],
        query:''
    },
    reducers: {
        setQuery:(state, action)=>{
            state.query = action.payload;
        },
        filterFood:(state)=>{
            const search = state.query.toLocaleLowerCase();
            state.filtered = state.allItems.filter(item=>
                item.name.toLowerCase().includes(search)||
                item.subtitle.toLowerCase().includes(search)||
                item.description.toLowerCase().includes(search)||
                item.category.toLowerCase().includes(search));
            }
        },    
});

export const { setQuery, filterFood } = searchFoodSlice.actions;
export default searchFoodSlice.reducer;