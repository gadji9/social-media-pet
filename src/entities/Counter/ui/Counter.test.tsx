import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';
import { Counter } from './Counter';

describe('Sidebar', () => {
    const user = userEvent.setup();
    test('To be in the document', () => {
        componentRender(<Counter />, {
            inititalState: { counter: { value: 10 } },
        });
        expect(screen.getByTestId('value-title')).toHaveTextContent('10');
    });

    test('Increment', async () => {
        componentRender(<Counter />, {
            inititalState: { counter: { value: 10 } },
        });
        await user.click(screen.getByTestId('increment-button'));

        expect(screen.getByTestId('value-title')).toHaveTextContent('11');
    });

    test('Decrement', async () => {
        componentRender(<Counter />, {
            inititalState: { counter: { value: 10 } },
        });
        await user.click(screen.getByTestId('decrement-button'));

        expect(screen.getByTestId('value-title')).toHaveTextContent('9');
    });
});
