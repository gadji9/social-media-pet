import { FunctionComponent, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { StateSchema } from '../storeConfig/StateSheama';
import { createReduxStore } from '../storeConfig/store';

interface IStoreProviderProps {
    children?: ReactNode;
    initialState?: StateSchema;
}

const StoreProvider: FunctionComponent<IStoreProviderProps> = ({
    children,
    initialState,
}) => {
    const store = createReduxStore(initialState);

    return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
