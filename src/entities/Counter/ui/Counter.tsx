import { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'shared/ui/Button/Button';
import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue';
import { counterActions } from '../model/slice/counterSlice';

interface ICounterProps {
    className?: string;
}

export const Counter: FunctionComponent<ICounterProps> = ({ className }) => {
    const dispatch = useDispatch();
    const counterValue = useSelector(getCounterValue);
    const increment = () => {
        dispatch(counterActions.increment());
    };

    const decrement = () => {
        dispatch(counterActions.decrement());
    };

    return (
        <div>
            <h1 data-testid="value-title">{counterValue}</h1>
            <Button onClick={increment} data-testid="increment-button">
                increment
            </Button>
            <Button onClick={decrement} data-testid="decrement-button">
                decrement
            </Button>
        </div>
    );
};
