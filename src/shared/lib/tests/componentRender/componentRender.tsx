import { render } from '@testing-library/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
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
        <MemoryRouter initialEntries={[route]}>
            <StoreProvider initialState={inititalState}>
                <I18nextProvider i18n={i18nForTests}>
                    {component}
                </I18nextProvider>
            </StoreProvider>
        </MemoryRouter>,
    );
}
