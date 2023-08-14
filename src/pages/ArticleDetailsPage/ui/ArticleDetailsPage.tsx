import { FunctionComponent, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './ArticleDetailsPage.module.scss';

interface IArticleDetailsPageProps {
    className?: string;
}

const ArticleDetailsPage: FunctionComponent<IArticleDetailsPageProps> = ({
    className,
}) => {
    const { t } = useTranslation('articleDetails');

    return (
        <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
            ArticleDetailsPage
        </div>
    );
};
export default memo(ArticleDetailsPage);
