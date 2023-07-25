import { fireEvent, screen } from '@testing-library/react';
import { renderWith18n } from 'shared/lib/tests/renderWith18n/renderWith18n';
import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
    test('To be in the document', () => {
        renderWith18n(<Sidebar />);
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });

    test('Toogle sidebar', () => {
        renderWith18n(<Sidebar />);
        const toogleBtn = screen.getByTestId('sidebar-toogle');
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
        fireEvent.click(toogleBtn);
        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
    });
});
