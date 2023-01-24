import React, { FC } from "react";
import { LoginForm } from "../../components/form/formConstants";
import Form from "../../components/form/Form";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../core/database/firebase";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../core/hooks/useTypedSelector';
import { selectAuthErrors, selectUser } from '../../core/selectors/authSelectors';
import {FormData} from '../../components/form/Form';
import { login } from '../../core/actions/authActions';
import { SubmitHandler } from 'react-hook-form';

const LoginPage: FC = (): JSX.Element => {
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userEmail = useTypedSelector(selectUser);
  const serverErrors = useTypedSelector(selectAuthErrors);


  const signInWithGoogle = async () => {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user?.email;
    if (user) {
      navigate("/profile", { replace: true });
    }
  };

  const loginUser: SubmitHandler<FormData> = (data): void => {
    dispatch(login({ ...data }));
    if (userEmail) {
      navigate("/profile", { replace: true });
    }
  };

  return (
    <div className="login_container">
      <Form
        formType={LoginForm}
        authUser={loginUser}
        serverErrors={serverErrors?.loginError}
      />
      <button
        className="form_controls_elem btn google_btn"
        onClick={signInWithGoogle}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default LoginPage;
