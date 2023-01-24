import React, { FC } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../core/actions/authActions";
import "./NavigationHeader.css";

interface NavigationProps {
  title: string;
  link: string;
  linkName: string;
}

const NavigationHeader: FC<NavigationProps> = (props): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOutFromAcc = () => {
    dispatch(logOut());
    navigate("/", { replace: true });
  };

  return (
    <nav>
      <h1>{props.title}</h1>
      <div>
        <Link className="link_control" to={props.link}>
          {props.linkName}
        </Link>
        <button className="btn_control" onClick={logOutFromAcc}>
          Log out
        </button>
      </div>
    </nav>
  );
};

export default NavigationHeader;
