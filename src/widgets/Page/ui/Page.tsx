import { StateSchema } from 'app/providers/StoreProvider';

import {
    FunctionComponent,
    MutableRefObject,
    ReactNode,
    useRef,
    UIEvent,
    useEffect,
} from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import {
    getScrollSaverScrollByPageName,
    scrollSaverActions,
} from 'features/scrollSaver';

import { classNames } from 'shared/lib/classNames/classNames';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useThrottle } from 'shared/lib/hooks/useThrottle/useThrottle';
import { useAppDispatch } from 'shared/lib/useAppDispatch/useAppDispatch';

import cls from './Page.module.scss';

interface IPageProps {
    className?: string;
    children: ReactNode;
    onScrollEnd?: () => void;
}

export const Page: FunctionComponent<IPageProps> = ({
    className,
    children,
    onScrollEnd,
}) => {
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();

    const scrollPosition = useSelector((state: StateSchema) =>
        getScrollSaverScrollByPageName(state, pathname),
    );

    useInfiniteScroll({
        triggerRef,
        wrapperRef,
        callback: onScrollEnd,
    });

    useEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition;
    }, []);

    const onScroll = useThrottle(() => {
        dispatch(
            scrollSaverActions.setScrollPosition({
                pageName: pathname,
                position: wrapperRef.current.scrollTop,
            }),
        );
    }, 500);

    return (
        <section
            ref={wrapperRef}
            className={classNames(cls.Page, {}, [className])}
            onScroll={onScroll}
        >
            {children}
            {onScrollEnd && <div className={cls.trigger} ref={triggerRef} />}
        </section>
    );
};
