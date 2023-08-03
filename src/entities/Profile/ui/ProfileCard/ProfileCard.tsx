import { getProfileData } from 'entities/Profile/model/selectors/getProfileData/getProfileData';
import { getProfileError } from 'entities/Profile/model/selectors/getProfileError/getProfileError';
import { getProfileIsLoading } from 'entities/Profile/model/selectors/getProfileIsLoading/getProfileIsLoading';
import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { Text } from 'shared/ui/Text/Text';

import cls from './ProfileCard.module.scss';

interface IProfileCardProps {
    className?: string;
}

export const ProfileCard: FunctionComponent<IProfileCardProps> = ({
    className,
}) => {
    const { t } = useTranslation<'profile'>('profile');

    const data = useSelector(getProfileData);
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);
    return (
        <div className={classNames(cls.ProfileCard, {}, [className])}>
            <div className={cls.header}>
                <Text title={t('Профиль')} />
                <Button className={cls.editBtn} theme={ThemeButton.OUTLINE}>
                    {t('Редактировать')}
                </Button>
            </div>
            <div className={cls.data}>
                <Input
                    className={cls.input}
                    value={data?.first}
                    placeholder={t('Ваше имя')}
                />
                <Input
                    className={cls.input}
                    value={data?.lastname}
                    placeholder={t('Ваша фамилия')}
                />
            </div>
        </div>
    );
};
