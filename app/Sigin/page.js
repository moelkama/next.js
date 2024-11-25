'use client';

import { useState } from 'react';
const Create_User_Uri = '/api/create_user';

export default function CreateUser() {
    const [formData, setFormData] = useState({ name: 'elkamal', email: 'mohame@gmail.com' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          const response = await fetch(Create_User_Uri, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });

          const data = await response.json();
    
          if (response.ok) {
            setMessage(data.message); // Show success message
            setFormData({ name: '', email: '' }); // Clear the form
          } else {
            setMessage(data.error || 'Submission failed');
          }
        } catch (error) {
          setMessage('An error occurred. Please try again.', error);
        }
      };

    return (
        <form onSubmit={handleSubmit} method="post">
            <label name="name">Name:</label>
            <input value={formData.name} onChange={handleChange} type="text" id="name" name="name" required />
            <label name="email">Email:</label>
            <input value={formData.email} onChange={handleChange} type="email" id="email" name="email" required />
            <h1 className="bg-red-700">{message}</h1>
            <button type="submit">Submit</button>
        </form>
    )
}