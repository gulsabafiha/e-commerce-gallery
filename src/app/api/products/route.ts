import { NextResponse } from 'next/server';
import { products } from '../../../data/products';

export const dynamic = 'force-static';
export const revalidate = false;

export async function GET() {
  return NextResponse.json(products);
} 