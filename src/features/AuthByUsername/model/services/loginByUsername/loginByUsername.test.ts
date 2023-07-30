import { Dispatch } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import axios from 'axios';
import { userActions } from 'entities/User';
import { TestAsyncFunc } from 'shared/lib/tests/testAyncFunt/testAsyncFunc';
import { loginByUsername } from './loginByUsername';

jest.mock('axios');

const mockedAxios = jest.mocked(axios, true);

describe('loginByUsername', () => {
    let dispatch: Dispatch;
    let getState: () => StateSchema;

    beforeEach(() => {
        dispatch = jest.fn();
        getState = jest.fn();
    });

    test('success login', async () => {
        const userValue = { username: '123', id: '1' };
        mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }));

        const thunk = new TestAsyncFunc(loginByUsername);
        const result = await thunk.callTunk({
            username: 'user',
            password: '123',
        });

        expect(thunk.dispatch).toHaveBeenCalledWith(
            userActions.setAuthData(userValue),
        );

        expect(thunk.dispatch).toHaveBeenCalledTimes(3);

        expect(mockedAxios.post).toHaveBeenCalled();

        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(userValue);

        // expect().toBe();
    });

    test('error login', async () => {
        mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));
        const action = loginByUsername({ username: 'user', password: '123' });

        const result = await action(dispatch, getState, undefined);

        expect(mockedAxios.post).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(result.meta.requestStatus).toBe('rejected');

        // expect().toBe();
    });
});
