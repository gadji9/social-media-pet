import { DeepPartial } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { StateSchema } from 'app/providers/StoreProvider';
import StoreProvider from 'app/providers/StoreProvider/ui/StoreProvider';
import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import i18nForTests from 'shared/config/i18n/i18nForTests';

export interface componentRenderOptions {
    route?: string;
    inititalState?: DeepPartial<StateSchema>;
}

export function componentRender(
    component: ReactNode,
    options: componentRenderOptions = {},
) {
    const { route = '/', inititalState } = options;

    return render(
        <StoreProvider initialState={inititalState}>
            <MemoryRouter initialEntries={[route]}>
                <I18nextProvider i18n={i18nForTests}>
                    {component}
                </I18nextProvider>
            </MemoryRouter>
            ,
        </StoreProvider>,
    );
}
