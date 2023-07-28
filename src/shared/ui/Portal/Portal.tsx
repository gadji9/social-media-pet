import { FunctionComponent, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Portal.module.scss';

interface IPortalProps {
    children: ReactNode;
    element?: HTMLElement;
}

const Portal = ({ children, element = document.body }: IPortalProps) =>
    createPortal(children, element);

export default Portal;
