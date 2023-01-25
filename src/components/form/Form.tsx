import React, {FC} from "react";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import "./Form.css";

export interface FormData {
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
    authUser: (data: FormData) => void;
    serverErrors: string;
}

const Form: FC<FormProps> = ({
                                 formType,
                                 authUser,
                                 serverErrors,
                             }): JSX.Element => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormData>({criteriaMode: "all"});
    const {title, text, link, linkName} = formType;
    const reg =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const emailValidation = {
        ...
            register("email", {
                required: "Email is required",
                pattern: {
                    value: reg,
                    message: "Invalid email",
                },
            })
    };

    const passwordValidation = {
        ...register("password", {
            required: "Password is required",
            minLength: {
                value: 6,
                message: "Your password must be larger then 5 characters",
            },
        })
    };
    
    return (
        <div className="form_container">
            <form onSubmit={handleSubmit(authUser)}>
                <h1 className="form_container_h1">{title}</h1>
                <p className="form_container_p">
                    {text}
                    <Link className="form_container_link" to={link}>
                        {linkName}
                    </Link>
                </p>
                <div className="form_controls">
                    <input
                        className="form_controls_elem"
                        placeholder="Enter email"
                        {...emailValidation}
                    />
                    <ErrorMessage
                        errors={errors}
                        name="email"
                        render={({message}) => <span className="error">{message}</span>}
                    />
                    <input
                        type="password"
                        placeholder="Enter password"
                        className="form_controls_elem"
                        {...passwordValidation}
                    />
                    <ErrorMessage
                        errors={errors}
                        name="password"
                        render={({message}) => <span className="error">{message}</span>}
                    />
                    <span className="error">{serverErrors && serverErrors}</span>
                    <button className="form_controls_elem btn" type="submit">
                        {title}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Form;
