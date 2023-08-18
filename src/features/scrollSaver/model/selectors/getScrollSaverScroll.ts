import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';

export const getScrollSaverScroll = (state: StateSchema) =>
    state.scrollSaver.scroll;

export const getScrollSaverScrollByPageName = createSelector(
    getScrollSaverScroll,
    (state: StateSchema, pageName: string) => pageName,
    (scroll, pageName) => scroll[pageName] || 0,
);
