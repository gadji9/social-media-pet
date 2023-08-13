import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { StoreProvider } from 'app/providers/StoreProvider';
import { loginReducer } from 'features/AuthByUsername';
import { LoginForm } from './LoginForm';

const meta = {
    title: 'features/LoginForm',
    component: LoginForm,
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
Primary.args = {};
Primary.decorators = [
    (Story: StoryFn) => (
        <StoreProvider asyncReducers={{ login: loginReducer }}>
            <Story />
        </StoreProvider>
    ),
];
