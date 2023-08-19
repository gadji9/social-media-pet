import { FunctionComponent, ReactNode, memo, useCallback } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import { Card, CardTheme } from '../Card/Card';
import cls from './Tabs.module.scss';

export interface TabItem<T extends string> {
    value: T;
    content: ReactNode;
}

interface ITabsProps<T extends string> {
    className?: string;
    tabs: TabItem<T>[];
    value: string;
    onTabClick: (tab: TabItem<T>) => void;
}

export const Tabs = <T extends string>({
    className,
    tabs,
    value,
    onTabClick,
}: ITabsProps<T>) => {
    const clickHandler = useCallback((tab: TabItem<T>) => {
        return () => {
            onTabClick(tab);
        };
    }, []);

    return (
        <div className={classNames(cls.Tabs, {}, [className])}>
            {tabs.map((tab) => (
                <Card
                    key={tab.value}
                    theme={
                        tab.value === value
                            ? CardTheme.NORMAL
                            : CardTheme.OUTLINE
                    }
                    className={cls.tab}
                    onClick={clickHandler(tab)}
                >
                    {tab.content}
                </Card>
            ))}
        </div>
    );
};
