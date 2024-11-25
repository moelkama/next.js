import { PrismaClient } from '@prisma/client';
import {  NextResponse } from 'next/server';
const prisma = new PrismaClient();

export async function GET(request) {
    request.json();
    const user = await prisma.user.findMany();
    return NextResponse.json(user);
}