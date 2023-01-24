import { firestore } from "../database/firebase";
import { PicObj } from "../interfaces/paintInterface";

export const getPics = (): Promise<Array<PicObj>> => {
  return firestore
    .collection("pictures")
    .get()
    .then((snapshot) =>
      snapshot.docs.map((doc) => ({
        user: doc.data().user,
        picData: doc.data().picData,
      }))
    );
};

export const sendPic = (
  picture: string,
  user: string,
  cb: () => void
): void => {
  firestore
    .collection("pictures")
    .add({
      user: user,
      picData: picture,
    })
    .then(() => cb());
};