import { NextRequest, NextResponse } from 'next/server';
import { fetchVisaFriendlyJobs } from '@/lib/linkedin';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get('location') ?? 'United Kingdom';
  const limit = Number.parseInt(searchParams.get('limit') ?? '10', 10);
  const keywords =
    searchParams.get('keywords') ??
    '("digital marketing" OR marketing OR "social media" OR content OR videographer OR "video editor" OR wordpress)';

  try {
    const jobs = await fetchVisaFriendlyJobs({
      location,
      keywords,
      limit: Number.isNaN(limit) ? 10 : Math.min(limit, 25),
    });
    return NextResponse.json({ jobs });
  } catch (error) {
    console.error('Error fetching jobs', error);
    return NextResponse.json(
      {
        error: 'Unable to fetch visa-sponsored jobs at this time.',
      },
      { status: 500 },
    );
  }
}

