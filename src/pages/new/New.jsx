/* eslint-disable array-callback-return */
import './new.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useEffect, useState } from 'react';

import { serverTimestamp, setDoc, doc } from 'firebase/firestore';
import { auth, db, storage } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import { MdDone } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import FormExampleFieldControlId from '../../components/Form/Form';
import { Form } from 'semantic-ui-react';
import ReactLoading from 'react-loading';

const New = ({ inputs, title, path }) => {
  const [files, setFile] = useState([]);
  const [posterImage, setPosterImage] = useState();
  const [data, setData] = useState({});
  const [uploadProgress, setUploadProgress] = useState();
  const [error, setError] = useState(false);

  const Navigate = useNavigate();

  console.log(files);

  useEffect(() => {
    const fileUpload = () => {
      let urlList = [];
      files.map(file => {
        const name = new Date().getTime() + file.name;
        const storageRef = ref(storage, 'Images/' + name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          'state_changed',
          snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            setUploadProgress(progress);
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
              default:
                break;
            }
          },
          error => {
            console.log(error);
          },
          async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
              urlList.push(downloadURL);
              setData(prev => ({ ...prev, images: urlList }));
            });
          }
        );
      });
    };
    files && fileUpload();
  }, [files]);

  // PosterImage

  useEffect(() => {
    const fileUpload = () => {
      const name = new Date().getTime() + posterImage.name;
      const storageRef = ref(storage, `posters/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, posterImage);

      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          setUploadProgress(progress);
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              break;
          }
        },
        error => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            setData(prev => ({ ...prev, posterImg: downloadURL }));
          });
        }
      );
    };
    posterImage && fileUpload();
  }, [posterImage]);

  const InputHandler = event => {
    const id = event.target.id;
    console.log(id);
    const value = event.target.value;
    setData({ ...data, [id]: value });
  };

  const dropDownHandler = value => {
    setData({ ...data, place: value });
  };

  const setImageHandler = event => {
    for (let index = 0; index < event.target.files.length; index++) {
      const newImage = event.target.files[index];
      newImage['id'] = new Date().getTime();
      setFile(prev => [...prev, newImage]);
    }
  };

  const AddHandler = async e => {
    e.preventDefault();
    try {
      const res =
        path === 'users' && (await createUserWithEmailAndPassword(auth, data.email, data.password));
      const productId = 'id' + new Date().getTime();
      const id = path === 'products' ? productId : res.user.uid;
      const collectionName = path === 'products' ? 'products' : 'users';
      await setDoc(doc(db, collectionName, id), {
        ...data,
        timeStamp: serverTimestamp(),
      });
      Navigate(`/${path}`);
    } catch (e) {
      setError(true);
    }
  };

  const setPosterImageHandler = event => {
    setPosterImage(event.target.files[0]);
  };

  console.log(data);

  return (
    <div className='new'>
      <Sidebar />
      <div className='newContainer'>
        <Navbar />
        <div className='top'>
          <h1>{title}</h1>
        </div>
        <div className='bottom'>
          <div className='images'>
            <div className='left'>
              <label htmlFor='file'>
                <img
                  src={'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'}
                  alt=''
                />
                <p>Shop Images</p>
                {files.length !== 0 && (
                  <div className='uploadStyle'>
                    {uploadProgress === 100 && uploadProgress ? (
                      <>
                        Uploaded
                        <MdDone style={{ paddingLeft: '10px' }} />
                      </>
                    ) : (
                      <ReactLoading className='loadingScreen' type='bubbles' color='#000' />
                    )}
                  </div>
                )}
              </label>
              <input
                type='file'
                id='file'
                multiple
                onChange={setImageHandler}
                style={{ display: 'none' }}
              />
            </div>

            <div className='left'>
              <label htmlFor='poster'>
                <img
                  src={'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'}
                  alt=''
                />
                <p>Poster Image</p>
                {posterImage && (
                  <div className='uploadStyle'>
                    {uploadProgress === 100 && uploadProgress ? (
                      <>
                        Uploaded
                        <MdDone style={{ paddingLeft: '10px' }} />
                      </>
                    ) : (
                      <ReactLoading className='loadingScreen' type='bubbles' color='#000' />
                    )}
                  </div>
                )}
              </label>
              <input
                type='file'
                id='poster'
                onChange={setPosterImageHandler}
                style={{ display: 'none' }}
              />
            </div>
          </div>

          <div className='right'>
            <Form onSubmit={AddHandler}>
              <FormExampleFieldControlId
                error={error}
                files={files}
                InputHandler={InputHandler}
                uploadProgress={uploadProgress}
                dropDownHandler={dropDownHandler}
              />
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
