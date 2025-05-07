// File: src/app/api/cart/route.js
import { NextResponse } from 'next/server';
import User from '../../lib/models/admins/adminSchema';
import { helperFunction } from '../../Helper/helperFunction';

export async function POST(req) {
  try {
    const { productId } = await req.json();
    const decoded = await helperFunction();
    if (!decoded?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Fetch user
    const user = await User.findById(decoded.id);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Toggle in the cart array
    const idx = user.cart.findIndex(id => id.toString() === productId);
    if (idx === -1) {
      user.cart.push(productId);
    } else {
      user.cart.splice(idx, 1);
    }

    await user.save();

    return NextResponse.json(
      { 
        cart: user.cart.map(i => i.toString()), 
        added: idx === -1 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Cart toggle error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
