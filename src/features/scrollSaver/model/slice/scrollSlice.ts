import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { ScrollSaverSchema } from '../types/scrollSaver';

const initialState: ScrollSaverSchema = {
    scroll: {},
};

export const scrollSaverSlice = createSlice({
    name: 'addCommentForm',
    initialState,
    reducers: {
        setScrollPosition: (
            state,
            action: PayloadAction<{ pageName: string; position: number }>,
        ) => {
            state.scroll[action.payload.pageName] = action.payload.position;
        },
    },
});

// Action creators are generated for each case reducer function
export const { actions: scrollSaverActions } = scrollSaverSlice;

export const { reducer: scrollSaverReducer } = scrollSaverSlice;
