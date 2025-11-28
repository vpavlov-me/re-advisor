import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // In a real app, this would call Stripe API to create an account link
    // const accountLink = await stripe.accountLinks.create({...});
    
    // Mock response
    return NextResponse.json({
      url: 'https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_12345&scope=read_write',
    });
  } catch (error) {
    console.error('Error creating Stripe Connect link:', error);
    return NextResponse.json(
      { error: 'Failed to create Stripe Connect link' },
      { status: 500 }
    );
  }
}
