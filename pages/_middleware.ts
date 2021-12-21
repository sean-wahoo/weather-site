import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { nextUrl: url, geo } = req;
  const country = geo?.country || "US";
  const city = geo?.city || "San Francisco";
  const region = geo?.region || "CA";
  const latitude = geo?.latitude || 37.7749;
  const longitude = geo?.longitude || 122.4194;

  url.searchParams.set("country", country);
  url.searchParams.set("city", city);
  url.searchParams.set("region", region);
  url.searchParams.set("lat", latitude.toString());
  url.searchParams.set("lon", longitude.toString());

  return NextResponse.rewrite(url);
}
