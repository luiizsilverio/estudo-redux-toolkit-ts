import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"


function sleep(ms: number) {
    // simula uma chamada assíncrona
    return new Promise(resolve => setTimeout(resolve, ms));
}

export type TGetRandom = {
    limit: number;
}

export const getRandom = createAsyncThunk<
    number, // tipo do retorno 
    TGetRandom // tipo do argumento
>(
    'stock/getRandom', 
    async(param) => {
        await sleep(2000);
        const { limit } = param
        return Math.floor(Math.random() * limit);
    }
)

// para disparar a action getRandom: dispatch(getRandom())

type TCounter = {
    counter: number;
    status: string;
    error: boolean
}

const initialState: TCounter = {
    counter: 0,
    status: '',
    error: false
}

const stock = createSlice({
    name: 'stock',
    initialState,
    reducers: {
        increment (state) {
            state.counter ++
        },
        decrement (state) {
            state.counter --
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getRandom.pending, (state) => {
            state.status = 'aguarde...';
        });
        builder.addCase(getRandom.fulfilled, (state, action) => {
            state.counter = action.payload;
            state.status = 'sucesso';
            state.error = false;
        });
        builder.addCase(getRandom.rejected, (state, action) => {
            state.status = 'falha';
            state.error = true;
        });
    }
})

export const { decrement, increment } = stock.actions

export default stock.reducer
