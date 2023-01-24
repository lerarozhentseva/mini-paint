import React, { FC, ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { PicObj } from "../../../core/interfaces/paintInterface";
import { useTypedSelector } from "../../../core/hooks/useTypedSelector";
import { getSearchEmail } from "../../../core/actions/paintActions";
import { selectSearchEmail } from "../../../core/selectors/paintSelectors";
import "./Search.css";

interface SearchProps {
  arrOfPics: Array<PicObj>;
}

const Search: FC<SearchProps> = ({ arrOfPics }): JSX.Element => {
  const [selectedEmail, setSelectedEmail] = useState("");
  const emailToSearch = useTypedSelector(selectSearchEmail);
  const users: Array<string> = Array.from(
    new Set(arrOfPics.map(({ user }) => user))
  );
  const dispatch = useDispatch();

  const searchEmail = () => dispatch(getSearchEmail(selectedEmail));

  const chooseUser = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value.includes("@")) {
      setSelectedEmail(e.target.value);
    } else if (e.target.value.includes("All")) {
      setSelectedEmail("");
    }
  };

  return (
    <div className="search_container">
      <select defaultValue={emailToSearch} onChange={chooseUser}>
        <option>All users</option>
        {users.length &&
          users.map((user) => (
            <option key={user} value={user}>
              {user}
            </option>
          ))}
      </select>
      <button className="btn_search" onClick={searchEmail}>
        Search images
      </button>
    </div>
  );
};

export default Search;
