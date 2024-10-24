import { NextResponse } from "next/server";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./app/config/Firebase";

export async function middleware(request) {
  let isAuthenticated = false;

  // Use a Promise to handle the async nature of onAuthStateChanged
  const checkAuth = new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        isAuthenticated = true;
        console.log(user);
      }
      resolve();
    });
  });

  // Wait for the authentication check to complete
  await checkAuth;

  // If not authenticated, redirect to signin
  if (!isAuthenticated && !request.url.includes("/auth/signin")) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  // Allow the request to continue if authenticated
  return NextResponse.next();
}

// Apply the middleware to protected routes (like dashboard)
export const config = {
  matcher: ["/dashboard/:path*"],
};
