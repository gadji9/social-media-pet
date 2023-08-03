import { FC, useEffect } from 'react';
import { useStore } from 'react-redux';
import {
    ReduxStoreWithManager,
    StateSchemaKey,
} from 'app/providers/StoreProvider/storeConfig/StateSheama';

import { Reducer } from '@reduxjs/toolkit';
import { useAppDispatch } from '../useAppDispatch/useAppDispatch';

export type ReducersList = {
    [name in StateSchemaKey]?: Reducer;
};

type ReducersListEntry = [StateSchemaKey, Reducer];

interface DynamicModuleLoaderProps {
    reducers: ReducersList;
    removeAfterUnmount?: boolean;
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = ({
    children,
    reducers,
    removeAfterUnmount = true,
}) => {
    const store = useStore() as ReduxStoreWithManager;
    const dispatch = useAppDispatch();

    useEffect(() => {
        Object.entries(reducers).forEach(([name, reducer]) => {
            store.reducerManager.add(name as StateSchemaKey, reducer);
            dispatch({ type: `@INIT ${name} reducer` });
        });

        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(([name, reducer]) => {
                    store.reducerManager.remove(name as StateSchemaKey);
                    dispatch({ type: `@DESTROY ${name} reducer` });
                });
            }
        };
    }, []);
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
};
