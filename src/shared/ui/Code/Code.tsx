import { FunctionComponent, ReactNode, useCallback } from 'react';

import CopyIcon from 'shared/assets/icons/copy.svg';
import { classNames } from 'shared/lib/classNames/classNames';

import { Button, ThemeButton } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import cls from './Code.module.scss';

interface ICodeProps {
    className?: string;
    text: string;
}

export const Code: FunctionComponent<ICodeProps> = ({ className, text }) => {
    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text);
    }, []);

    return (
        <pre className={classNames(cls.Code, {}, [className])}>
            <Button
                className={cls.copyBtn}
                theme={ThemeButton.CLEAR}
                onClick={onCopy}
            >
                <Icon Svg={CopyIcon} className={cls.copyIcon} />
            </Button>
            <code>{text}</code>
        </pre>
    );
};
