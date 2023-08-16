import { FunctionComponent, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getUserAuthState } from 'entities/User';

import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';

import { SidebarItemType } from '../../model/types/sidebar';
import cls from './SidebarItem.module.scss';

interface ISidebarItemProps {
    item: SidebarItemType;
    collapsed: boolean;
}

export const SidebarItem: FunctionComponent<ISidebarItemProps> = memo(
    ({ item, collapsed }) => {
        const { t } = useTranslation();

        const isAuth = useSelector(getUserAuthState);

        if (item.authOnly && !isAuth) {
            return null;
        }

        return (
            <AppLink
                className={classNames(
                    cls.item,
                    { [cls.collapsed]: collapsed },
                    [],
                )}
                theme={AppLinkTheme.SECONDARY}
                to={item.path}
            >
                <item.Icon className={cls.icon} />
                <span className={cls.link}>{t(item.text)}</span>
            </AppLink>
        );
    },
);
