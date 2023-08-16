import { createSelector } from '@reduxjs/toolkit';
import { RoutePath } from 'app/providers/router/routeConfig/routeConfig';

import React from 'react';

import { getUserAuthState } from 'entities/User';

import AboutIcon from 'shared/assets/icons/about.svg';
import ArticlesIcon from 'shared/assets/icons/articles.svg';
import MainIcon from 'shared/assets/icons/main.svg';
import ProfileIcon from 'shared/assets/icons/profile.svg';

import { SidebarItemType } from '../types/sidebar';

export const getSidebatItems = createSelector(
    getUserAuthState,
    (userAuthState) => {
        const sidebarItemList: SidebarItemType[] = [
            {
                path: RoutePath.main,
                Icon: MainIcon,
                text: 'Главная',
            },
            {
                path: RoutePath.about,
                Icon: AboutIcon,
                text: 'О сайте',
            },
        ];
        if (userAuthState) {
            sidebarItemList.push(
                {
                    path: RoutePath.profile + userAuthState.id.toString(),
                    Icon: ProfileIcon,
                    text: 'Профиль',
                    authOnly: true,
                },
                {
                    path: RoutePath.articles,
                    Icon: ArticlesIcon,
                    text: 'Статьи',
                    authOnly: true,
                },
            );
        }

        return sidebarItemList;
    },
);
