import { NextResponse } from 'next/server'
import { getAllModels } from '@/api/_lib/models'

export async function GET() {
  return NextResponse.json({
    success: true,
    data: getAllModels()
  })
}
