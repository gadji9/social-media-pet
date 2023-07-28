import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { CounterSchema } from '../type/counterSchema';
import { counterActions, counterReducer } from './counterSlice';

describe('counterSlice', () => {
    test('decrement', () => {
        const state: DeepPartial<CounterSchema> = {
            value: 10,
        };

        expect(
            counterReducer(state as CounterSchema, counterActions.decrement()),
        ).toEqual({ value: 9 });
    });

    test('increment', () => {
        const state: DeepPartial<CounterSchema> = {
            value: 10,
        };

        expect(
            counterReducer(state as CounterSchema, counterActions.increment()),
        ).toEqual({ value: 11 });
    });

    test('empty state', () => {
        expect(
            counterReducer(
                undefined as CounterSchema,
                counterActions.increment(),
            ),
        ).toEqual({ value: 1 });
    });
});
