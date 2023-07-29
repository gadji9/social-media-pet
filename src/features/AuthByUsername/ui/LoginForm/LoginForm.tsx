import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import cls from './LoginForm.module.scss';

interface ILoginFormProps {
    className?: string;
}

export const LoginForm: FunctionComponent<ILoginFormProps> = ({
    className,
}) => {
    const { t } = useTranslation();

    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <Input
                placeholder={t('Введите username')}
                type="text"
                className={cls.input}
                autoFocus
            />
            <Input
                placeholder={t('Введите пароль')}
                type="text"
                className={cls.input}
            />
            <Button className={cls.loginBtn}>{t('Войти')}</Button>
        </div>
    );
};
