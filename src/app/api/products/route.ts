import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// GET all products
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit') || '50';
    const page = searchParams.get('page') || '1';

    let query = supabase
      .from('products')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    // Apply filters
    if (category) {
      query = query.eq('category', category);
    }
    
    if (featured === 'true') {
      query = query.eq('is_featured', true);
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const from = (pageNum - 1) * limitNum;
    const to = from + limitNum - 1;
    
    query = query.range(from, to);

    const { data: products, error, count } = await query;

    if (error) {
      console.error('Products query error:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      products: products || [],
      total: count || 0,
      page: pageNum,
      limit: limitNum,
      hasMore: (count || 0) > to + 1
    });

  } catch (error: any) {
    console.error('Products API error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST create product (admin only)
export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    
    // Verify admin
    if (!secret || secret !== process.env.ADMIN_SECRET) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { 
      name, slug, description, short_description, 
      price, compare_at_price, type, category,
      tags, features, file_url, thumbnail_url,
      gallery_urls, is_featured, affiliate_commission
    } = body;

    // Validation
    if (!name || !slug || !price) {
      return NextResponse.json(
        { success: false, error: 'Name, slug, and price are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('products')
      .insert([{
        name,
        slug,
        description: description || '',
        short_description: short_description || '',
        price: parseFloat(price),
        compare_at_price: compare_at_price ? parseFloat(compare_at_price) : null,
        type: type || 'template',
        category: category || 'Uncategorized',
        tags: tags || [],
        features: features || [],
        file_url: file_url || null,
        thumbnail_url: thumbnail_url || null,
        gallery_urls: gallery_urls || [],
        is_featured: is_featured || false,
        affiliate_commission: affiliate_commission || 30.00,
        status: 'published'
      }])
      .select()
      .single();

    if (error) {
      console.error('Create product error:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      product: data,
      message: 'Product created successfully'
    }, { status: 201 });

  } catch (error: any) {
    console.error('Create product API error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}