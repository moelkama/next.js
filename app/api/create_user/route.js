import { PrismaClient, Prisma } from '@prisma/client';
import {  NextResponse } from 'next/server';
import { existsSync } from "fs";
import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from 'uuid';
import { profile } from 'console';

const UPLOAD_PATH = "public/upload";

const prisma = new PrismaClient();

export const config = {
    api: {
      bodyParser: false,
    },
};

async function saveFile(file, destinationDirPath, file_name) {
    const fileArrayBuffer = await file.arrayBuffer();

    if (!existsSync(destinationDirPath))
        fs.mkdir(destinationDirPath, { recursive: true });

    await fs.writeFile(
        path.join(destinationDirPath, file_name),
        Buffer.from(fileArrayBuffer),
        'utf8'
    );
    return ({ status: 201 });
}

export async function POST(req, res) {
    const formData = await req.formData();
    // const file = formData.get("file");
    // if (!file)
    //     return NextResponse.json({ status: 400 });
    // const uniqueId = uuidv4();
    // const extension  = path.extname(file.name);
    const destinationDirPath = path.join(process.cwd(), UPLOAD_PATH);
    // const avatar_name = `${uniqueId}${extension}`;

    const first_name = formData.get('first_name');
    const last_name = formData.get('last_name');
    const username = formData.get('username');
    const email = formData.get('email');
    // const password = formData.get('password');
    try
    {
        // await saveFile(file, destinationDirPath, avatar_name);
        console.log("hello world?????????");
        await prisma.user.create(
            { data:{
                email,
                username,
                first_name,
                last_name,
                hello: 'hello_world',
            }});
    }
    catch (error)
    {
        console.log("errrrrrrrrrrrrror:", error);
        if (error instanceof Prisma.PrismaClientKnownRequestError)
        {
            if (error.code === 'P2002')
            {
                const duplicatedField = error.meta.target;

                if (duplicatedField.includes('email')) 
                    return NextResponse.json({ 'error': 'A user with this email already exists' }, { status: 400 });
                else if (duplicatedField.includes('username'))
                    return NextResponse.json({ 'error': 'A user with this username already exists' }, { status: 400 });
                else
                    return NextResponse.json({ 'error': 'A unique constraint violation occurred' }, { status: 400 });
            }
            else
                return NextResponse.json({ 'error': 'Somthing went wrong please try again...' }, { status: 500 });
        }
    }
    return NextResponse.json({ 'message': 'User created successfully' });
}