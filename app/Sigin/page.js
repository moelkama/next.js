'use client';

import { useState } from 'react';
const Create_User_Url = '/api/create_user';

export default function CreateUser() {
    const [formData, setFormData] = useState(
      {
        first_name: 'Mohamed',
        last_name: 'Elkamal',
        username: 'moelkama',
        email: 'mohame@gmail.com',
        password: 'User1234',
        cpassword: 'User1234',
      });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          const formData = new FormData();
          formData.append('image', file);
          const response = await fetch(Create_User_Url, {
            method: 'POST',
            // headers: {
            //   'Content-Type': 'multipart/form-data',
            //   // 'encType':'multipart/form-data',
            // },
            body: formData,
          });

          const data = await response.json();
    
          if (response.ok) {
            setMessage(data.message); // Show success message
            setFormData({ 
              first_name: '',
              last_name: '',
              username: '',
              email: '',
              username: '',
              password: '',
              cpassword: '',
            }); // Clear the form
          } else {
            console.error(data);
            setMessage(data.error || 'Submission failed');
          }
        } catch (error) {
          setMessage(error);
        }
      };
;
    
    return (
        <form onSubmit={handleSubmit}>
            {/* <div >
                <label name="name">First Name:</label>
                <input value={formData.first_name} onChange={handleChange} type="text" name="first_name" required />
            </div>
            <div>
                <label name="email">Last Name:</label>
                <input value={formData.last_name} onChange={handleChange} type="text" name="last_name" required />
            </div>
            <div>
                <label name="email">username:</label>
                <input value={formData.username} onChange={handleChange} type="text" name="username" required />
            </div>
            <div>
                <label name="email">Email:</label>
                <input value={formData.email} onChange={handleChange} type="email" name="email" required />
            </div>
            <div>
                <label name="email">Password:</label>
                <input value={formData.password} onChange={handleChange} type="text" name="password" required />
            </div>
            <div>
                <label name="email">Confirme password:</label>
                <input value={formData.cpassword} onChange={handleChange} type="text" name="Cpassword" required />
            </div> */}
            <input type="file" onChange={handleFileChange} required />
            <h1 className="">{message}</h1>
            <button type="submit">Submit</button>
        </form>
    )
}