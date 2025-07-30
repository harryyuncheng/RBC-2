import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET() {
  try {
    const userConfigPath = path.join(process.cwd(), 'src', 'config', 'user.json');
    const userData = JSON.parse(fs.readFileSync(userConfigPath, 'utf8'));
    
    return NextResponse.json(userData);
  } catch (error) {
    console.error('Failed to read user data:', error);
    // Return fallback data if file doesn't exist or can't be read
    return NextResponse.json({ 
      user: { 
        firstName: 'John',
        lastName: '',
        fullName: 'John'
      } 
    });
  }
}

export async function POST(request: Request) {
  try {
    const { firstName, lastName, fullName } = await request.json();
    const userConfigPath = path.join(process.cwd(), 'src', 'config', 'user.json');
    
    // Structure the data to match the expected format
    const updatedUserData = {
      user: {
        firstName: firstName || '',
        lastName: lastName || '',
        fullName: fullName || firstName || ''
      }
    };
    
    fs.writeFileSync(userConfigPath, JSON.stringify(updatedUserData, null, 2));
    
    // Return the same structure as GET endpoint for consistency
    return NextResponse.json(updatedUserData);
  } catch (error) {
    console.error('Failed to update user data:', error);
    return NextResponse.json({ error: 'Failed to update user data' }, { status: 500 });
  }
}
