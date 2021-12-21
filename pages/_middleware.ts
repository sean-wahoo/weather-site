import { NextRequest, NextResponse } from "next/server";
import { codeToName } from "utils/conversions";

export async function middleware(req: NextRequest) {
  const { nextUrl: url, geo } = req;
  const city = geo?.city || "San Francisco";
  let state: any = geo?.region || "California";
  const latitude = geo?.latitude || 37.7749;
  const longitude = geo?.longitude || 122.4194;

  state ||= codeToName(state);

  url.searchParams.set("city", city);
  url.searchParams.set("state", state);
  url.searchParams.set("lat", latitude.toString());
  url.searchParams.set("lon", longitude.toString());

  return NextResponse.rewrite(url);
}
