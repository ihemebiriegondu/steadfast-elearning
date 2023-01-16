import React, { useState } from 'react'
import { useUserAuth } from '../context/UserAuthContext'
import { updateProfile } from 'firebase/auth'
import { auth } from "../firebase";
import { storage } from '../firebase';
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import "../css/settings.css"
import { BiPlus } from 'react-icons/bi'
import { BsFillExclamationCircleFill } from 'react-icons/bs'
import { GiCheckMark } from 'react-icons/gi'
import { Alert } from 'react-bootstrap';

const Settings = () => {

    const { user } = useUserAuth();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    //alerts
    const alertDiv = document.querySelectorAll(".error-div")

    const hideAlertFunction = () => {
        alertDiv.forEach(alert => {
            alert.classList.add("d-none")
        });
    }

    const changeProfilePhoto = () => {

        //getting image file and changing the src for the profile picture updating
        let imgInput = document.getElementById("profilepic")
        let displayImg = document.getElementById("displayPicture")
        let reader = new FileReader();
        let imgInputFile = imgInput.files[0]
        let imgInputFileName = imgInputFile.name

        //console.log(imgInputFileName)
        reader.readAsDataURL(imgInputFile);
        //console.log(imgInput.files[0]);
        reader.onload = () => {
            displayImg.setAttribute("src", reader.result)
            //getting images
            const storageRef = ref(storage, `images/${imgInputFileName}`);

            uploadString(storageRef, reader.result, 'data_url').then(
                (snapshot) => {
                    //console.log('Uploaded a data_url string!');
                    getDownloadURL(snapshot.ref).then((link) => {
                        displayImg.setAttribute("src", link)

                        updateProfile(auth.currentUser, {
                            photoURL: link
                        }).then(() => {
                            alertDiv.forEach(alert => {
                                alert.classList.remove("d-none")
                            });

                            setSuccess("Updated successfully")
                            setTimeout(hideAlertFunction, 5000)
                        }).catch((error) => {
                            alertDiv.forEach(alert => {
                                alert.classList.remove("d-none")
                            });

                            setError(error.code)
                            setTimeout(hideAlertFunction, 5000)
                        });
                    })
                })
        }
    }

    return (
        <div className='settings'>
            <div>
                <div className='top-setting d-flex justify-content-center align-items-center py-4 px-4'>
                    <div className='d-flex flex-column align-items-center'>
                        <div className='img-div mb-2'>
                            <img src={user.photoURL} id='displayPicture' alt=''></img>
                        </div>
                        <div className='user-info-div'>
                            <h5 className='text-center pb-0 mb-0'>{user.displayName}</h5>
                            <p className='text-center'>{user.email}</p>
                        </div>
                        <div className='btn-div d-flex flex-column justify-content-center align-items-center'>
                            <input type="file" accept="image/*" id="profilepic" name='profilepic' onChange={() => changeProfilePhoto()} className="d-none" />
                            <label htmlFor='profilepic' className='d-inline-block text-center'>Change photo <BiPlus className='mb-1' /></label>
                        </div>
                    </div>
                </div>
                <div className='error-div'>
                    {error && <Alert variant='danger' className='error'><BsFillExclamationCircleFill className='text-danger me-4 fs-4' />{error}</Alert>}
                </div>
                <div className='error-div'>
                    {success && <Alert variant='success' className='error'><GiCheckMark className='text-success me-4 fs-4' />{success}</Alert>}
                </div>
            </div>
        </div>
    )
}

export default Settings