import {
    fetchProfileData,
    ProfileCard,
    profileReducer,
} from 'entities/Profile';
import { FunctionComponent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/useAppDispatch/useAppDispatch';

const reducers: ReducersList = {
    profile: profileReducer,
};

interface IProfilePageProps {
    className?: string;
}

const ProfilePage: FunctionComponent<IProfilePageProps> = ({ className }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProfileData());
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames('', {}, [className])}>
                <ProfileCard />
            </div>
        </DynamicModuleLoader>
    );
};
export default ProfilePage;
