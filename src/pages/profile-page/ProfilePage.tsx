import React, {FC, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useTypedSelector} from "../../core/hooks/useTypedSelector";
import {selectUser} from "../../core/selectors/authSelectors";
import './ProfilePage.css';
import NavigationHeader from "../../components/navigationHeader/NavigationHeader";
import {ProfilePageNav} from "../../components/navigationHeader/navConstants";
import GalleryComponent from "../../components/gallery/GalleryComponent";

const ProfilePage: FC = (): JSX.Element => {
    const navigate = useNavigate();
    const user = useTypedSelector(selectUser);

    useEffect(() => {
        if (!user) {
            navigate('/', {replace: true})
        }
    }, []);

    return (
        <>
            <NavigationHeader navType={ProfilePageNav}/>
            <div className={'container_profile'}>
                <h2 className={'h2_profile'}>G A L L E R Y</h2>
                <hr />
                <GalleryComponent />
            </div>
        </>

    );
};

export default ProfilePage;