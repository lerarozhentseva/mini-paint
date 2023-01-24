import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../core/hooks/useTypedSelector";
import { selectUser } from "../../core/selectors/authSelectors";
import "./ProfilePage.css";
import NavigationHeader from "../../components/navigationHeader/NavigationHeader";
import GalleryComponent from "../../components/gallery/GalleryComponent";
import firebase from "firebase/compat/app";

const ProfilePage: FC = (): JSX.Element => {
  const navigate = useNavigate();

  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      navigate("/", { replace: true });
    } else {
      console.log(user?.email);
    }
  });


  return (
    <>
      <NavigationHeader
        title="Profile Page"
        link="/paint"
        linkName="Paint"
      />
      <div className="container_profile">
        <h2 className="h2_profile">G A L L E R Y</h2>
        <hr />
        <GalleryComponent />
      </div>
    </>
  );
};

export default ProfilePage;
