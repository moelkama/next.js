import { PrismaClient, Prisma } from '@prisma/client';
// import multer from 'multer';
import {  NextResponse } from 'next/server';
import path from 'path';
import formidable from 'formidable';
// const prisma = new PrismaClient();
// const upload = multer({dest: path.join(process.cwd(), 'public/uploads'), });

// import { v4 as uuidv4 } from 'uuid';

export const config = {
    api: {
      bodyParser: false,
    },
};

export async function POST(req, res) {
    const form = new formidable.IncomingForm(
        {
            uploadDir: path.join(process.cwd(), 'public/uploads'), // Define the upload directory
            keepExtensions: true, // Keep the file extensions (e.g., .jpg, .png)
        }
    );
    form.uploadDir = "./public/uploads";  // Specify the folder to save the image
    form.keepExtensions = true;  // Keep the file extensions (e.g., .jpg, .png)
    form.maxFieldsSize = 10 * 1024 * 1024;  // Maximum file size (10MB)
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error(err);
        return NextResponse.json({ 'message': 'errrrr' });
    }
    
    const file = files.image[0];  // Assuming you're sending 'image' field from form
    const filePath = `/uploads/${file.newFilename}`;
    
    Console.log("--------->", file, filePath);
    return NextResponse.json({ 'message': 'success' });
    });
    // const fileName = `${uuidv4()}_${'file'}`;
    // const filePath = `./public/uploads/${fileName}`;

    // const { first_name, last_name, username, email } = await request.json();
    // try
    // {
    //     await prisma.tst.create(
    //         { data:{
    //             first_name,
    //             last_name,
    //             username,
    //             email,
    //         }});
    // }
    // catch (error)
    // {
    //     if (error instanceof Prisma.PrismaClientKnownRequestError)
    //     {
    //         if (error.code === 'P2002')
    //         {
    //             const duplicatedField = error.meta.target;

    //             if (duplicatedField.includes('email')) 
    //                 return NextResponse.json({ 'error': 'A user with this email already exists' }, { status: 400 });
    //             else if (duplicatedField.includes('username'))
    //                 return NextResponse.json({ 'error': 'A user with this username already exists' }, { status: 400 });
    //             else
    //                 return NextResponse.json({ 'error': 'A unique constraint violation occurred' }, { status: 400 });
    //         }
    //         else
    //             console.error('Prisma error code:', error.code, error.message);
    //     }
    // }
    return NextResponse.json({ 'message': 'User created successfully' });
}