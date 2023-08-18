import { FunctionComponent, SyntheticEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getLoginError } from 'features/AuthByUsername/model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from 'features/AuthByUsername/model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginPassword } from 'features/AuthByUsername/model/selectors/getLoginPassword/getLoginPassword';
import { getLoginUsername } from 'features/AuthByUsername/model/selectors/getLoginUsername/getLoginUsername';
import { loginByUsername } from 'features/AuthByUsername/model/services/loginByUsername/loginByUsername';
import {
    loginActions,
    loginReducer,
} from 'features/AuthByUsername/model/slice/loginSlice';

import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/useAppDispatch/useAppDispatch';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { Text, TextTheme } from 'shared/ui/Text/Text';

import cls from './LoginForm.module.scss';

interface ILoginFormProps {
    className?: string;
    onSuccess: () => void;
}

const initialReducers: ReducersList = {
    login: loginReducer,
};

export const LoginForm: FunctionComponent<ILoginFormProps> = ({
    className,
    onSuccess,
}) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsLoading);
    const error = useSelector(getLoginError);

    const onChangeUsername = useCallback(
        (value: string) => {
            dispatch(loginActions.setUsername(value));
        },
        [dispatch],
    );

    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(loginActions.setPassword(value));
        },
        [dispatch],
    );

    const onLoginClick = useCallback(
        async (event: SyntheticEvent<Element>) => {
            event.preventDefault();
            const result = await dispatch(
                loginByUsername({ username, password }),
            );

            if (result.meta.requestStatus === 'fulfilled') {
                onSuccess();
            }
        },
        [onSuccess, dispatch, username, password],
    );

    return (
        <DynamicModuleLoader reducers={initialReducers}>
            <form
                className={classNames(cls.LoginForm, {}, [className])}
                onSubmit={(e) => onLoginClick}
            >
                <Text title={t('Форма авторизации')} />

                {error && (
                    <Text
                        text={t('Неверное имя пользователя или пароль')}
                        theme={TextTheme.ERROR}
                    />
                )}
                <Input
                    placeholder={t('Введите username')}
                    type="text"
                    className={cls.input}
                    onChange={onChangeUsername}
                    value={username}
                    autoFocus
                />
                <Input
                    placeholder={t('Введите пароль')}
                    type="text"
                    className={cls.input}
                    onChange={onChangePassword}
                    value={password}
                />
                <Button
                    className={cls.loginBtn}
                    theme={ThemeButton.OUTLINE}
                    onClick={onLoginClick}
                    disabled={isLoading}
                    type="submit"
                >
                    {t('Войти')}
                </Button>
            </form>
        </DynamicModuleLoader>
    );
};

export default LoginForm;
