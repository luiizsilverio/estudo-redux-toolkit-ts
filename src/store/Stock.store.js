import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"


function sleep(ms) {
    // simula uma chamada assíncrona
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const getRandom = createAsyncThunk(
    'stock/getRandom', 
    async() => {
        await sleep(2000);
        return Math.floor(Math.random() * 10);
    }
)


const stock = createSlice({
    name: 'stock',
    initialState: {
        counter: 0,
        status: null
    },
    reducers: {
        increment (state) {
            state.counter ++
        },
        decrement (state) {
            state.counter --
        }
    },
    extraReducers: {
        [getRandom.pending]: (state, action) => {
            state.status = 'aguarde...';
        },
        [getRandom.fulfilled]: (state, action) => {
            state.counter = action.payload;
            state.status = 'sucesso';
        },
        [getRandom.rejected]: (state, action) => {
            state.status = 'falha';
        }
    }
})

export const { decrement, increment } = stock.actions

export default stock.reducer
