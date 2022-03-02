import React from "react";
import { getAuth, signInAnonymously } from "firebase/auth";

function SignIn({ auth }) {
  return (
    <div>
      <button
        onClick={() => {
          signInAnonymously(auth)
            .then(() => {
              console.log("logged in");
              console.log(auth);
            })
            .catch();
        }}
      >
        sign in
      </button>
      <div>Sign In</div>
    </div>
  );
}
export default SignIn;
