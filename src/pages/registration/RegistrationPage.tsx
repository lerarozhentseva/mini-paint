import React, {FC} from 'react';
import {RegisterForm} from '../../components/form/formConstants';
import Form from '../../components/form/Form';

const RegistrationPage: FC = (): JSX.Element => {
    return (
       <Form formType={RegisterForm} />
    );
};

export default RegistrationPage;