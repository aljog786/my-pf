import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Logged out" }, { status: 200 });
  res.cookies.set("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });
  return res;
}
