import { ChangeEvent, FunctionComponent, memo, useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Select.module.scss';

export interface SelectOption {
    value: string;
    content: string;
}

interface ISelectProps {
    className?: string;
    label?: string;
    options?: SelectOption[];
    readOnly?: boolean;
    value: string;
    onChange?: (value: string) => void;
}

export const Select: FunctionComponent<ISelectProps> = memo(
    ({ className, readOnly, label, options, value, onChange }) => {
        const optionList = useMemo(() => {
            return options?.map((opt) => (
                <option
                    className={cls.option}
                    value={opt.value}
                    key={opt.value}
                >
                    {opt.content}
                </option>
            ));
        }, []);

        const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
            onChange?.(e.target.value);
        };

        const mods = {
            [cls.readonly]: readOnly,
        };

        return (
            <div className={classNames(cls.Wrapper, mods, [className])}>
                {label && <span className={cls.label}>{`${label}>`}</span>}
                <select
                    className={cls.select}
                    onChange={onChangeHandler}
                    value={value}
                    disabled={readOnly}
                >
                    {optionList}
                </select>
            </div>
        );
    },
);
