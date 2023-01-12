import React, {FC} from 'react';
import {useDispatch} from 'react-redux';
import {selectAuthErrors, selectUser} from '../../core/selectors/authSelectors';
import {Link, useNavigate} from 'react-router-dom';
import {useForm, SubmitHandler} from 'react-hook-form';
import {ErrorMessage} from '@hookform/error-message';
import {login, register as registration} from '../../core/actions/authActions';
import {useTypedSelector} from '../../core/hooks/useTypedSelector';
import './Form.css';

interface FormData {
    email: string;
    password: string;
}

interface FormProps {
    formType: {
        title: string;
        text: string;
        link: string;
        linkName: string;
    };
}

const Form: FC<FormProps> = ({formType}): JSX.Element => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormData>({criteriaMode: 'all'});
    const {title, text, link, linkName} = formType;
    const serverErrors = useTypedSelector(selectAuthErrors);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userEmail = useTypedSelector(selectUser);

    const createUser: SubmitHandler<FormData> = (data): void => {
        if (title === 'Login') {
            dispatch(login({...data}));
            if (userEmail) {
                navigate('/profile', {replace: true})
            }
        } else if (title === 'Registration') {
            dispatch(registration({...data}));
            if (userEmail) {
                navigate('/profile', {replace: true})
            }
        }
    };

    return (
        <div className={'form_container'}>
            <form onSubmit={handleSubmit(createUser)}>
                <h1 className={'form_container_h1'}>{title}</h1>
                <p className={'form_container_p'}>
                    {text}
                    <Link className={'form_container_link'} to={link}>{linkName}</Link>
                </p>
                <div className={'form_controls'}>
                    <input
                        className={'form_controls_elem'}
                        placeholder='Enter email'
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: 'Invalid email',
                            }
                        })}
                    />
                    <ErrorMessage
                        errors={errors}
                        name='email'
                        render={({message}) => <span className={'error'}>{message}</span>}
                    />
                    <input
                        type='password'
                        placeholder='Enter password'
                        className={'form_controls_elem'}
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: 'Your password must be larger then 5 characters',
                            },
                        })}
                    />
                    <ErrorMessage
                        errors={errors}
                        name='password'
                        render={({message}) => <span className={'error'}>{message}</span>}
                    />
                    <span className={'error'}>
                        {title === 'Login' && serverErrors?.loginError
                            ? serverErrors.loginError
                            : ''}
                        {title === 'registration' && serverErrors?.registerError
                            ? serverErrors.registerError
                            : ''}
                    </span>
                    <button className={'form_controls_elem btn'}
                            type='submit'>{title}</button>
                </div>
            </form>
        </div>
    );
};

export default Form;
