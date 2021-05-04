import React, { useEffect, useState } from 'react'
import Dropzone from 'react-dropzone'
import { UploadOutlined } from '@ant-design/icons';
import { Button, Alert } from 'reactstrap'
import axios from 'axios'
import { Button as MButton } from '@material-ui/core/'
import { Redirect } from 'react-router';

export default function UploadVideo() {

    const [description, setDescription] = useState("")
    const [FilePath, setFilePath] = useState("")
    const [FileName, setFileName] = useState("")
    const [isUploaded, setIsUploaded] = useState(false)
    const [msg, setMsg] = useState(null)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const successMsg = "Video succesfully uploaded!"

    useEffect(() => {
        setDescription("")
        setFileName("")
        setFilePath("")
        setIsUploaded(false)
    }, [isSubmitted])

    const onSubmit = () => {
        if (isUploaded) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': `${localStorage.getItem("token")}`
                }
            }
            var data = {
                fileName: FileName,
                filePath: FilePath,
                userEmail: localStorage.getItem("email")
            }
            const { fileName, filePath, userEmail } = data
            var body = JSON.stringify({ fileName, filePath, description, userEmail })
            console.log(body)
            axios.post('/api/uploadVideo/uploadInfo', body, config)
                .then(response => {
                    console.log(response.data)
                    setIsSubmitted(true)
                    setMsg(successMsg)
                    setTimeout(() => {
                        setIsSubmitted(false)
                        setMsg(null)
                    }, 3000);
                    // setTimeout(() => setIsSubmitted(false), 3000);
                })
                .catch(err => {
                    console.log({ err })
                })
        } else {
            setMsg('Please select a video to upload')
            setTimeout(() => setMsg(null), 3000);
        }
    }


    const onDrop = (files) => {
        let formData = new FormData();
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'x-auth-token': `${localStorage.getItem("token")}`
            }
        }
        if (files[0].type == "video/mp4") {
            formData.append("file", files[0])
            axios.post('/api/uploadVideo', formData, config)
                .then(response => {
                    if (response.data.success) {
                        console.log(response.data)
                        let variable = {
                            filePath: response.data.filePath,
                            fileName: response.data.fileName
                        }
                        setFilePath(response.data.filePath)
                        setFileName(response.data.fileName)
                        setIsUploaded(true)
                        setMsg(null)
                        //gerenate thumbnail with this filepath ! 

                    } else {
                        alert('Failed to save the video in server!!')
                    }
                })
        }else{
            setMsg("Only mp4 video format is supported")
            setTimeout(() => setMsg(null), 3000);
            setIsSubmitted(false)
        }
    }


    const handleChangeDecsription = (event) => {
        setDescription(event.currentTarget.value)
    }


    return (
        // isSubmitted ? <Redirect to="/dashboard"></Redirect> :
        <div className="col-md-6 m-auto">
            <div className="card-body mt-5" style={{border: '1px solid gray'}}>
                <h2 className="text-center">Upload Video</h2>
                <br /><br />
                <form onSubmit={onSubmit}>

                    {
                        isSubmitted ?
                            <div>{msg !== null ? <Alert color="success">{msg}</Alert> : null}</div>
                            :
                            <div>{msg !== null ? <Alert color="danger">{msg}</Alert> : null}</div>
                    }

                    <center>
                        <Dropzone
                            onDrop={onDrop}
                            multiple={false}
                            maxSize={800000000}>
                            {({ getRootProps, getInputProps }) => (
                                <div style={{ width: '300px', height: '240px', border: '1px solid gray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    {...getRootProps()}
                                >
                                    <input {...getInputProps()} />
                                    <UploadOutlined style={{ fontSize: '3rem' }} />

                                </div>
                            )}
                        </Dropzone>
                        {FileName != "" ? FileName : null}
                    </center>
                    <br /><br />
                    <label>Description of the Video</label>
                    <textarea
                        className="form-control"
                        type="textarea"
                        onChange={handleChangeDecsription}
                        value={description}
                    />
                    <center>
                        <MButton style={{ marginTop: '2rem' }} variant="contained" color="primary" onClick={onSubmit}>Upload Video</MButton>
                    </center>
                </form>
            </div>
        </div>
    )
}
