import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const UserLogin = () => {
  return (
    <header>
    <SignedOut>
      <SignInButton >
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign in</button>
      </SignInButton>
    </SignedOut>
    <SignedIn>
      <UserButton  />
    </SignedIn>
  </header>
  )
}

export default UserLogin