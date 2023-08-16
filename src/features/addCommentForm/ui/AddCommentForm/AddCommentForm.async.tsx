import { FunctionComponent, lazy } from 'react';

import { IAddCommentFormProps } from './AddCommentForm';

export const AddCommentFormAsync = lazy<
    FunctionComponent<IAddCommentFormProps>
>(
    () =>
        new Promise((resolve) => {
            // @ts-ignore
            // ТАК В РЕАЛЬНЫХ ПРОЕКТАХ НЕ ДЕЛАТЬ!!!!! ДЕЛАЕМ ДЛЯ КУРСА!
            setTimeout(() => resolve(import('./AddCommentForm')), 1500);
        }),
);
