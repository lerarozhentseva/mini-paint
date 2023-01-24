import React, { FC } from "react";
import { RegisterForm } from "../../components/form/formConstants";
import Form from "../../components/form/Form";
import { SubmitHandler } from "react-hook-form";
import { register as registration } from "../../core/actions/authActions";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../core/hooks/useTypedSelector";
import {
  selectAuthErrors,
  selectUser,
} from "../../core/selectors/authSelectors";
import { FormData } from "../../components/form/Form";

const RegistrationPage: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userEmail = useTypedSelector(selectUser);
  const serverErrors = useTypedSelector(selectAuthErrors);

  const registrationNewUser: SubmitHandler<FormData> = (data): void => {
    dispatch(registration({ ...data }));
    if (userEmail) {
      navigate("/profile", { replace: true });
    }
  };

  return (
    <Form
      formType={RegisterForm}
      authUser={registrationNewUser}
      serverErrors={serverErrors?.registerError}
    />
  );
};

export default RegistrationPage;
