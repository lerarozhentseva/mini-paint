import React, {FC} from 'react';
import './Homepage.css';
import { useNavigate} from 'react-router-dom';

const HomePage: FC = (): JSX.Element => {
    const navigate = useNavigate();

    return (
        <div className={'container'}>
            <h1 className={'container_h1'}>Discover the talent of an artist with the application Paint</h1>
            <h2 className={'container_h2'}>Try it now!</h2>
            <div className={'btns'}>
                <button onClick={() => {
                    navigate('/login', {replace: true})
                }} className={'btn_auth'}>
                    Login
                </button>
                <button onClick={() => {
                    navigate('/register', {replace: true})
                }} className={'btn_auth'}>
                    Registration
                </button>
            </div>
        </div>
    );
};

export default HomePage;
