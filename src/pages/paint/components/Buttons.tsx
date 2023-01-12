import React, {FC, RefObject} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {sendPic} from '../../../core/actions/paintActions';
import {useTypedSelector} from '../../../core/hooks/useTypedSelector';
import {selectUser} from '../../../core/selectors/authSelectors';
import {CanvasSize} from '../../../core/interfaces/paintInterface';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ClearIcon from '@mui/icons-material/Clear';
import CollectionsIcon from '@mui/icons-material/Collections';
import Tooltip from '@mui/material/Tooltip';
import './Buttons.css';

interface ButtonsPanelProps {
    context: CanvasRenderingContext2D | null;
    canvasRef: RefObject<HTMLCanvasElement> | null;
    canvasSize: CanvasSize;
}

const Buttons: FC<ButtonsPanelProps> = ({
                                            context,
                                            canvasRef,
                                            canvasSize,
                                        }): JSX.Element => {
    const userEmail = useTypedSelector(selectUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const toGallery = () => navigate('/profile', {replace: true})

    const clearSheet = () => {
        if (context) context.clearRect(0, 0, canvasSize.width, canvasSize.height);
    };

    const savePicture = () => {
        if (canvasRef) {
            const picture = canvasRef.current?.toDataURL('image/png');
            dispatch(
                sendPic({
                    picture: picture,
                    user: userEmail,
                    cb: () => navigate('/profile', {replace: true})

                })
            );
        }
    };

    return (
        <div className={'btns_paint'}>
            <Tooltip title={'Clear all'}>
                <button onClick={clearSheet}><ClearIcon/></button>
            </Tooltip>
            <Tooltip title={'Save'}>
                <button onClick={savePicture}><SaveAltIcon/></button>
            </Tooltip>
            <Tooltip title={'Go to gallery'}>
                <button onClick={toGallery}><CollectionsIcon/></button>
            </Tooltip>
        </div>
    );
};

export default Buttons;