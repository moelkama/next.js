'use client';
import React, { useState } from 'react';

const Create_User_Url = '/api/create_user';

// export default function CreateUser() {
//     const [file, setFile] = useState(null);

//     const handleFileChange = (event) => {
//       setFile(event.target.files[0]); // Capture the selected file
//     };
//     const handleSubmit = async (event) => {
//         event.preventDefault();  // Prevent default form submission
        
//         if (!file) {
//           alert('Please select a file first!');
//           return;
//         }
    
//         const formData = new FormData();
//         formData.append('file', file);
//         formData.append('hello', 'hello_world');
    
//         try {
//           const response = await fetch(Create_User_Url, {
//             method: 'POST',
//             body: formData  // Send the form data
//           });
    
//           if (response.ok) {
//             const result = await response.json();
//             console.log('File uploaded successfully:', result);
//             alert('File uploaded successfully!');
//           } else {
//             console.error('Upload failed:', response.statusText);
//             alert('Upload failed.');
//           }
//         } catch (error) {
//           console.error('Error during upload:', error);
//           alert('Error during upload.');
//         }
//       };
//     return (
//         <form onSubmit={handleSubmit} encType="multipart/form-data">
//             <input type="file" name="file" onChange={handleFileChange} required />
//             <button type="submit">Submit</button>
//         </form>
//     );
// }

export default function CreateUser() {
    const [formData, setFormData] = useState(
    {
        first_name: `Mohamed`,
        last_name: `Elkamal`,
        username: `moelkama${Math.floor(Math.random() * 100000)}${Math.floor(Math.random() * 100000)}`,
        email: `mohame${Math.floor(Math.random() * 100000)}${Math.floor(Math.random() * 100000)}@gmail.com`,
        password: 'User1234',
        cpassword: 'User1234',
    });
    const [message, setMessage] = useState('');
    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]); // Capture the selected file
      };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file)
        {
            setMessage('Please select a file first!');
            return;
        }
        try
        {
            const input_data = new FormData();
            input_data.append('file', file);
            input_data.append('first_name', formData.first_name);
            input_data.append('last_name', formData.last_name);
            input_data.append('username', formData.username);
            input_data.append('email', formData.email);
            input_data.append('password', formData.password);

            const response = await fetch(Create_User_Url, {
                method: 'POST',
                body: input_data
            });
        
            const result = await response.json();
            console.log('::::::::::::',result);
            if (response.ok)
            {
                setMessage('user created successfully!');
                // setFormData({ 
                // first_name: '',
                // last_name: '',
                // username: '',
                // email: '',
                // username: '',
                // password: '',
                // cpassword: '',});
                setFile(file);
            }
            else
                setMessage(`create user failed: ${result.error}`);
        }
        catch (error)
        {
            console.error('catch errorrrrrrrrr:');
            setMessage('catch error:', error);
        }
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <div >
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
            </div>
            <input type="file" onChange={handleFileChange} required />
            <h1 className="">{message}</h1>
            <button type="submit">Submit</button>
        </form>
    )
}