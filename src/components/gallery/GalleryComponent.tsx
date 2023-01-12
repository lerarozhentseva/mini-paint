import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllPics } from '../../core/actions/paintActions';
import { useTypedSelector } from '../../core/hooks/useTypedSelector';
import { PicObj } from '../../core/interfaces/paintInterface';
import { selectAllPics, selectSearchEmail } from '../../core/selectors/paintSelectors';
import Search from './search/Search';
import './GalleryComponent.css';

const GalleryComponent: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  let sortedArr: Array<PicObj> = [];
  const arrOfPics: Array<PicObj> = useTypedSelector(selectAllPics);
  const userEmail = useTypedSelector(selectSearchEmail);

  useEffect(() => {
    dispatch(getAllPics());
  }, [dispatch]);

  if (userEmail === '') {
    sortedArr = arrOfPics;
  } else if (userEmail !== '') {
    sortedArr = arrOfPics.filter(({ user }) => user === userEmail);
  }

  return (
    <>
      <Search arrOfPics={arrOfPics}/>
      <div className={'images_container'}>
        {sortedArr.length !== 0 ?
          sortedArr.map(({ user, picData }) => {
            return (
              <div className={'card'} key={picData}>
                <p>Artist - {user}</p>
                <img src={picData} alt='picture'/>
              </div>
            );
          }) : <span>No images yet. Be the first!</span>}
      </div>
    </>
  );
};

export default GalleryComponent;