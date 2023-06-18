// import React from 'react'
// import {useState} from 'react'
// import axios from "axios"
// import { useRef } from 'react'

// const UploadPic = () => {
//     const [files, setFiles] = useState([]);

//     const filesPicked = event => {
//         const selectedFiles = Array.from(event.target.files);
//         setFiles(selectedFiles);
//     };

//     const submit = async event => {
//         event.preventDefault();
//         const formData = new FormData();
//        for (let i=0; i < files.length; i++){
//         formData.append('image', files[i])
//   await axios.post('/api/restaurants/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
//        }
//     };

//     return (
//         <div className="flex flex-col items-center justify-center">
//             <form onSubmit={submit} style={{ width: 650 }} className="flex flex-col space-y-5 px-5 py-14">
//                 <input onChange={filesPicked} accept="image/*" type="file" multiple></input>
//                 <button type="submit">Submit</button>
//             </form>
//         </div>
//     );
// };

// export default UploadPic
