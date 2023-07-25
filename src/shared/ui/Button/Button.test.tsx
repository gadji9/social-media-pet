import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
    test('To be in the document', () => {
        render(<Button>TEST</Button>);
        expect(screen.getByText('TEST')).toBeInTheDocument();
    });
});
