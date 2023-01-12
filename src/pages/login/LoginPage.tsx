import React, {FC} from 'react';
import {LoginForm} from '../../components/form/formConstants';
import Form from '../../components/form/Form';

const LoginPage: FC = (): JSX.Element => {
    return (
       <Form formType={LoginForm} />
    );
};

export default LoginPage;
