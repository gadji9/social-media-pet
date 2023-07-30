import { DeepPartial } from '@reduxjs/toolkit';
import { loginByUsername } from '../services/loginByUsername/loginByUsername';
import { LoginSchema } from '../types/loginSchema';
import { loginActions, loginReducer } from './loginSlice';

describe('loginSlice', () => {
    test('set username', () => {
        const state: DeepPartial<LoginSchema> = { username: 'user' };
        expect(
            loginReducer(
                state as LoginSchema,
                loginActions.setUsername('username'),
            ),
        ).toEqual({ username: 'username' });
    });

    test('test password', () => {
        const state: DeepPartial<LoginSchema> = { password: '123' };
        expect(
            loginReducer(
                state as LoginSchema,
                loginActions.setPassword('123123'),
            ),
        ).toEqual({ password: '123123' });
    });

    test('test isLoading extraReducer', () => {
        const state: LoginSchema = {
            username: 'user',
            password: '123',
            error: undefined,
            isLoading: false,
        };

        const pendingAction = loginByUsername.pending(
            '',
            { username: 'user', password: '123' },
            undefined,
        );

        const pendingState = loginReducer(state, pendingAction);

        expect(pendingState).toEqual({
            username: 'user',
            password: '123',
            error: undefined,
            isLoading: true,
        });

        const fullfiledAction = loginByUsername.fulfilled(
            { username: 'user', id: '123' },
            '',
            { username: 'user', password: '123' },
            undefined,
        );

        const fullfiledState = loginReducer(state, fullfiledAction);

        expect(fullfiledState).toEqual({
            username: 'user',
            password: '123',
            error: undefined,
            isLoading: false,
        });
    });
});
