import {NextResponse} from 'next/server';
import { PrismaClient } from '@prisma/client';

export async function POST(request) {
  if (process.env.NODE_ENV !== 'development') {
    throw new Error(`seeding prohibited for environment: ${process.env.NODE_ENV}`);
  }
  const prisma = new PrismaClient();
  await prisma.$queryRaw`delete from TimeReportFile`;
  await prisma.$queryRaw`delete from TimeReportItem`;
  const message = 'reseeded';
  return NextResponse.json({
    message: message
  }, {
    status: 200
  })

}
