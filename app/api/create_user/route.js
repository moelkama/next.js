import { PrismaClient } from '@prisma/client';
import {  NextResponse } from 'next/server';
const prisma = new PrismaClient();

export async function POST(request) {
    const { name, email } = await request.json();
    console.log("----------->", name, email);
    await prisma.user.create({ data: {email, name} });
    return NextResponse.json({ 'message': 'User created successfully' });
}