import { ChangeEvent, FunctionComponent, memo, useMemo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import cls from './Select.module.scss';

export interface SelectOption<T extends string> {
    value: T;
    content: string;
}

interface ISelectProps<T extends string> {
    className?: string;
    label?: string;
    options?: SelectOption<T>[];
    readOnly?: boolean;
    value: T;
    onChange?: (value: T) => void;
}

export const Select = <T extends string>({
    className,
    readOnly,
    label,
    options,
    value,
    onChange,
}: ISelectProps<T>) => {
    const optionList = useMemo(() => {
        return options?.map((opt) => (
            <option className={cls.option} value={opt.value} key={opt.value}>
                {opt.content}
            </option>
        ));
    }, []);

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value as T);
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
};
