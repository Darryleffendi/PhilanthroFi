import React from 'react'
import { AuthClient } from "@dfinity/auth-client";
// import { handleAuthenticated, renderIndex } from "./views";
// One day in nanoseconds
const days = BigInt(1);
const hours = BigInt(24);
const nanoseconds = BigInt(3600000000000);
export const defaultOptions = {
  createOptions: {
    idleOptions: {
      // Set to true if you do not want idle functionality
      disableIdle: true,
    },
  },
  loginOptions: {
    identityProvider:
      process.env.DFX_NETWORK === "ic"
        ? "https://identity.ic0.app/#authorize"
        : `https://identity.ic0.app/#authorize`,
    // Maximum authorization expiration is 8 days
    maxTimeToLive: days * hours * nanoseconds,
  },
};

// const init = async () => {
//   const authClient = await AuthClient.create(defaultOptions.createOptions);

//   if (await authClient.isAuthenticated()) {
//     handleAuthenticated(authClient);
//   }
//   renderIndex();
//   setupToast();
// };

async function setupToast() {
  const status = document.getElementById("status");
  const closeButton = status?.querySelector("button");
  closeButton?.addEventListener("click", () => {
    status?.classList.add("hidden");
  });
}


// init();
setupToast()
const Auth = () => {
  async function init() {
    try {
      const authClient = await AuthClient.create(defaultOptions.createOptions);
      
      // Here, you would use authClient with loginOptions
      // For example:
      await authClient.login(defaultOptions.loginOptions);
      
      // Now, you can proceed with handling authenticated user, rendering index, etc.
    } catch (error) {
      console.error('Error initializing AuthClient:', error);
    }
  }

  // Call init() when the component mounts
  React.useEffect(() => {
    init();
  }, []);
  return (
    <div>auth</div>
  )
}

export default Auth