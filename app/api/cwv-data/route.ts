import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Get the Google Sheet ID from environment variable
    const SHEET_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID
    const API_KEY = process.env.GOOGLE_SHEETS_API_KEY
    
    if (!SHEET_ID || !API_KEY) {
      return NextResponse.json(
        { error: 'Missing configuration' },
        { status: 500 }
      )
    }

    // Fetch data from Google Sheets API
    const range = 'CWV_Data!A2:L1000' // Adjust range as needed
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error('Failed to fetch from Google Sheets')
    }
    
    const data = await response.json()
    
    // Transform the data
    const rows = data.values || []
    const transformedData = rows.map((row: any[]) => ({
      date: new Date(row[0]),
      url: row[1],
      type: row[2],
      device: row[3],
      ttfb: parseFloat(row[4]) || 0,
      lcp: parseFloat(row[5]) || 0,
      lcp_status: row[6],
      inp: parseFloat(row[7]) || 0,
      inp_status: row[8],
      cls: parseFloat(row[9]) || 0,
      cls_status: row[10],
      overall: row[11]
    }))
    
    return NextResponse.json(transformedData)
  } catch (error) {
    console.error('Error fetching data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    )
  }
}
