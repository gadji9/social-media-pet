import { Dispatch } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { ThunkExtraArg } from 'app/providers/StoreProvider/storeConfig/StateSheama';
import axios from 'axios';
import { userActions } from 'entities/User';
import { TestAsyncFunc } from 'shared/lib/tests/testAyncFunt/testAsyncFunc';
import { loginByUsername } from './loginByUsername';

describe('loginByUsername', () => {
    let dispatch: Dispatch;
    let getState: () => StateSchema;

    beforeEach(() => {
        dispatch = jest.fn();
        getState = jest.fn();
    });

    test('success login', async () => {
        const userValue = { username: '123', id: '1' };

        const thunk = new TestAsyncFunc(loginByUsername);
        thunk.api.post.mockReturnValue(Promise.resolve({ data: userValue }));
        const result = await thunk.callTunk({
            username: 'user',
            password: '123',
        });

        expect(thunk.dispatch).toHaveBeenCalledWith(
            userActions.setAuthData(userValue),
        );

        expect(thunk.dispatch).toHaveBeenCalledTimes(3);

        expect(thunk.api.post).toHaveBeenCalled();

        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(userValue);
    });

    test('error login', async () => {
        const thunk = new TestAsyncFunc(loginByUsername);
        thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));

        const result = await thunk.callTunk({
            username: '123',
            password: '123',
        });

        expect(thunk.api.post).toHaveBeenCalled();
        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(result.meta.requestStatus).toBe('rejected');
    });
});
