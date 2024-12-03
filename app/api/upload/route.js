import { NextResponse } from "next/server";
import { existsSync } from "fs";
import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from 'uuid';

const UPLOAD_PATH = "public/upload";

export async function POST(req) {
    const formData = await req.formData();
    const uniqueId = uuidv4(); // Generate a unique ID
    const file = formData.get("file");
    console.log("file:", file);

    if (!file)
        return NextResponse.json({}, { status: 400 });

    const extension  = path.extname(file.name);
    const destinationDirPath = path.join(process.cwd(), UPLOAD_PATH);

    const fileArrayBuffer = await file.arrayBuffer();

    if (!existsSync(destinationDirPath))
        fs.mkdir(destinationDirPath, { recursive: true });

    await fs.writeFile(
        path.join(destinationDirPath, `${uniqueId}${extension}`),
        Buffer.from(fileArrayBuffer),
        'utf8'
    );

    return NextResponse.json({
        fileName: file.name,
        size: file.size,
        lastModified: new Date(file.lastModified),
    });
}