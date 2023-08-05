import React, {
    FunctionComponent,
    InputHTMLAttributes,
    memo,
    useEffect,
    useRef,
    useState,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange'
>;

interface IInputProps extends HTMLInputProps {
    className?: string;
    value?: string | number;
    onChange?: (value: string) => void;
    autoFocus?: boolean;
}

export const Input: FunctionComponent<IInputProps> = memo(
    ({
        className,
        value,
        onChange,
        placeholder,
        type = 'text',
        autoFocus,
        readOnly,
        ...otherProps
    }) => {
        const [isFocused, setIsFocused] = useState(false);
        const [caretPosition, setCaretPosition] = useState(0);
        const inputRef = useRef<HTMLInputElement>(null);

        const isCaretVisible = isFocused && !readOnly;

        useEffect(() => {
            if (autoFocus) {
                inputRef.current?.focus();
                setIsFocused(true);
            }
        }, [autoFocus]);

        const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange?.(e.target.value);
            setCaretPosition(e.target.value.length);
        };

        const onBlur = () => {
            setIsFocused(false);
        };
        const onFocus = () => {
            setIsFocused(true);
        };
        const onSelect = (e: any) => {
            setCaretPosition(e?.target?.selectionStart || 0);
        };

        const mods = {
            [cls.readonly]: readOnly,
        };

        return (
            <div
                className={classNames(cls.InputWrapper, mods, [className])}
                {...otherProps}
            >
                {placeholder && (
                    <div className={cls.placeholder}>{`${placeholder}>`}</div>
                )}
                <div className={cls.caretWrapper}>
                    <input
                        onChange={onChangeHandler}
                        ref={inputRef}
                        type={type}
                        className={cls.input}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onSelect={onSelect}
                        value={value}
                        readOnly={readOnly}
                    />
                    {isCaretVisible && (
                        <span
                            className={cls.caret}
                            style={{ left: `${caretPosition * 9}px` }}
                        />
                    )}
                </div>
            </div>
        );
    },
);
