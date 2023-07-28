import { DeepPartial } from '@reduxjs/toolkit';
import { FunctionComponent, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { StateSchema } from '../storeConfig/StateSheama';
import { createReduxStore } from '../storeConfig/store';

interface IStoreProviderProps {
    children?: ReactNode;
    initialState?: DeepPartial<StateSchema>;
}

const StoreProvider: FunctionComponent<IStoreProviderProps> = ({
    children,
    initialState,
}) => {
    const store = createReduxStore(initialState as StateSchema);

    return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
