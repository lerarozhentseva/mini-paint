import React, { FC } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectUser } from '../../core/selectors/authSelectors';
import { useTypedSelector } from '../../core/hooks/useTypedSelector';
import { logOut } from '../../core/actions/authActions';
import './NavigationHeader.css';

interface NavigationProps {
    navType: {
        title: string;
        link: string;
        linkName: string;
    }
}

const NavigationHeader: FC<NavigationProps> = ({navType}): JSX.Element => {
    const user = useTypedSelector(selectUser);
    const navigate = useNavigate();
    const {title, link, linkName} = navType;
    const dispatch = useDispatch();

    const logOutFromAcc = () => {
        dispatch(logOut());
        navigate('/', {replace: true})
    }

    return (
        <nav>
            <h1>
                {title}
            </h1>
            <div>
                <Link className={'link_control'} to={link}>{linkName}</Link>
                <button className={'btn_control'} onClick={logOutFromAcc}>Log out from {user}</button>
            </div>
        </nav>
    );
};

export default NavigationHeader;