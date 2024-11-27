import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode'; // This should be imported like this, not inside a destructure.
import axios from 'axios';
import { GetApiBaseUrl } from './env';
// Decode token and return the decoded object
export function decodeToken(token) {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}

// Utility function to check if the token is valid
export const isTokenValid = (token) => {
  const decoded = decodeToken(token);
  if (!decoded) return false;

  const currentTime = Date.now() / 1000; // Convert to seconds
  return decoded.exp > currentTime;
};

// Check if the token has expired
export function isTokenExpired(token) {
  const decoded = decodeToken(token);
  if (!decoded) return true;

  const expirationTime = decoded.exp * 1000; // Convert to milliseconds
  return Date.now() >= expirationTime;
}

// Check if the user is authenticated based on the token
export function isAuth() {
  const token = Cookies.get('jwtToken');
  return token && !isTokenExpired(token) ? decodeToken(token) : null;
}

// Function to refresh token using the refresh token
export const refreshToken = async () => {
  console.log("get refresh token");
  const apiurl = GetApiBaseUrl();
  const refreshToken = Cookies.get('refreshToken');
  if (!refreshToken) return null;

  try {
    const response = await axios.post(`${apiurl}/auth/token-refresh?refreshToken=${encodeURIComponent(refreshToken)}`, {}, {
      headers: {
        'accept': '*/*',
      }
    });

    if (response.status === 200) {
      const user = response.data.data;
      await setSSOAuth(user.jwtToken, user.refreshToken);
      await setSSOuser(user.user);
      return user.jwtToken;
    } else {
      console.error('Failed to refresh token: ', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Failed to refresh token', error);
    return null;
  }
};

// Function to get a valid token, refresh if needed
export const getValidToken = async () => {
  console.log("get valid token");

  let token = Cookies.get('jwtToken'); // Retrieve token from cookies

  if (!token) {
    console.warn("No token found in cookies, redirecting to SSO login.");
    // RedirectToLoginSSO(); // Redirect the user to the SSO login page
    return null;
  }

  // if (!isTokenValid(token)) {
  //   token = await refreshToken();
  //   if (!token) {
  //     console.warn("Token refresh failed, redirecting to SSO login.");
  //     // RedirectToLoginSSO(); // Redirect the user to the SSO login page if token refresh fails
  //     return null;
  //   }
  // }

  return token;
};

// Get the token from cookies
export function getTokenWValidate() {
  const token = Cookies.get('jwtToken');
  const expiredToken = isTokenExpired(token);
  console.log("expiredToken", expiredToken);
  return token && !expiredToken ? token : null;
}

// export function getToken() {
//   const token = Cookies.get('jwtToken');
//   const expiredToken = isTokenExpired(token);
//   console.log("expiredToken", expiredToken);
//   return token && !expiredToken ? token : null;
// }

export function getToken() {
  console.log("getTokenWoValidate");
  const token = Cookies.get('jwtToken');
  return token;
}

// Get the user ID from the token
export function getUserId() {
  const decoded = decodeToken(getToken());
  return decoded ? decoded.user_id || null : null;
}

// Get the full name from the token
// export function getFullname() {
//   try {
//     const token = getToken();
//     const decoded = decodeToken(token);

//     if (decoded && decoded.fullname) {
//       return decoded.fullname;
//     }

//     const user = Cookies.get("ssoUser");

//     if (user) {
//       try {
//         const parsedUser = JSON.parse(user);
//         return parsedUser.fullname || null;
//       } catch (parseError) {
//         console.error('Error parsing user from cookies:', parseError);
//         return null;
//       }
//     }

//     return null;
//   } catch (error) {
//     console.error('Error in getFullname function:', error);
//     return null;
//   }
// }

// Get the full name from the token or cookie
export function getFullname() {
  try {
    const token = getToken(); // Get the token from cookies or elsewhere
    const decoded = decodeToken(token); // Decode the JWT token

    if (decoded && decoded.fullname) {
      return decoded.fullname; // Return fullname if found in the token
    }

    const user = Cookies.get("ssoUser"); // Get the ssoUser cookie

    if (user) {
      try {
        const parsedUser = JSON.parse(user); // Try to parse the cookie
        return parsedUser.fullname || 'Guest'; // Return fullname or default to 'Guest'
      } catch (parseError) {
        console.error('Error parsing user from cookies:', parseError);
        return 'Guest'; // Return a default value if parsing fails
      }
    }

    return 'Guest'; // Default to 'Guest' if no user info is found
  } catch (error) {
    console.error('Error in getFullname function:', error);
    return 'Guest'; // Default to 'Guest' in case of any error
  }
}


// Get the phone from the token
export function getPhone() {
  try {
    const token = getToken();
    const decoded = decodeToken(token);

    if (decoded && decoded.phone) {
      return decoded.phone;
    }

    const user = Cookies.get("ssoUser");

    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        return parsedUser.phone || null;
      } catch (parseError) {
        console.error('Error parsing user from cookies:', parseError);
        return null;
      }
    }

    return null;
  } catch (error) {
    console.error('Error in getFullname function:', error);
    return null;
  }
}

// Get the nik from the token
export function getNik() {
  try {
    const token = getToken();
    const decoded = decodeToken(token);

    if (decoded && decoded.nik) {
      return decoded.nik;
    }

    const user = Cookies.get("ssoUser");

    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        return parsedUser.nik || null;
      } catch (parseError) {
        console.error('Error parsing user from cookies:', parseError);
        return null;
      }
    }

    return null;
  } catch (error) {
    console.error('Error in getFullname function:', error);
    return null;
  }
}

// Get the nip from the token
export function getNip() {
  try {
    const token = getToken();
    const decoded = decodeToken(token);

    if (decoded && decoded.nip) {
      return decoded.nip;
    }

    const user = Cookies.get("ssoUser");

    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        return parsedUser.nip || null;
      } catch (parseError) {
        console.error('Error parsing user from cookies:', parseError);
        return null;
      }
    }

    return null;
  } catch (error) {
    console.error('Error in getFullname function:', error);
    return null;
  }
}


// Get the email from the token
export function getEmail() {
  try {
    const token = getToken();
    const decoded = decodeToken(token);

    if (decoded && decoded.email) {
      return decoded.email;
    }

    const user = Cookies.get("ssoUser");

    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        return parsedUser.email || null;
      } catch (parseError) {
        console.error('Error parsing user from cookies:', parseError);
        return null;
      }
    }

    return null;
  } catch (error) {
    console.error('Error in getFullname function:', error);
    return null;
  }
}

// Get the gender from the token
export function getGender() {
  try {
    const token = getToken();
    const decoded = decodeToken(token);

    if (decoded && decoded.gender) {
      return decoded.gender;
    }

    const user = Cookies.get("ssoUser");

    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        return parsedUser.gender || null;
      } catch (parseError) {
        console.error('Error parsing user from cookies:', parseError);
        return null;
      }
    }

    return null;
  } catch (error) {
    console.error('Error in getFullname function:', error);
    return null;
  }
}


// Get the role from the token
export function getRole() {
  const decoded = decodeToken(getToken());
  console.log('role', decoded)
  return decoded ? decoded.role || null : null;
}

// Set the token in cookies
export function setAuth(token) {
  Cookies.set("jwtToken", token);
}

export function setSSOAuth(token, refreshToken) {
  if (typeof token !== 'string' || typeof refreshToken !== 'string') {
    throw new Error('Tokens must be strings');
  }
  Cookies.set("jwtToken", token);
  Cookies.set("refreshToken", refreshToken);
}

export function setSSOuser(ssoUser) {
  Cookies.set("ssoUser", JSON.stringify(ssoUser));
}

export function getRegisterStatus() {
  const decoded = decodeToken(getToken());
  console.log('register_status', decoded)
  return decoded ? decoded.register_status || null : null;
}
export const clearAuth = () => {
  Cookies.remove("token");
  Cookies.remove("refreshToken");
  Cookies.remove("lastView");
  Cookies.remove("id");
  Cookies.remove("ids");
  Cookies.remove("idsAl");
  Cookies.remove("studiId");
  Cookies.remove("studiIdAl");
  Cookies.remove("notificationCount");
  Cookies.remove("latestTimestamp");
  Cookies.remove("notifications");
  Cookies.remove("selectedViewIndex");
  Cookies.remove("programStudiId");
  Cookies.remove("asesorId");
  Cookies.remove("selectedAssessmentId")
  Cookies.remove("newView")
  Cookies.remove('selectedView')
  Cookies.remove('currentPage')
  Cookies.remove('testAsesorId')
  Cookies.remove("role")
  Cookies.remove("code_upload")
  Cookies.remove("code_download")
  Cookies.remove("kodes")
  Cookies.remove("lastViewLanding")
  Cookies.remove("tokenExpiration")
  Cookies.remove("status")
  Cookies.remove("warningMessage")
  Cookies.remove("asesorIdLapangan")
  Cookies.remove("jwtToken")
  Cookies.remove("refreshToken")
  Cookies.remove("ssoUser")
  localStorage.removeItem('lastView')
  localStorage.removeItem('lastViewBendahara')
  localStorage.removeItem("token");
  localStorage.removeItem("id");
  localStorage.removeItem("ids");
  localStorage.removeItem("studiId");
  localStorage.removeItem("notificationCount");
  localStorage.removeItem("latestTimestamp");
  localStorage.removeItem("notifications");
  localStorage.removeItem("selectedViewIndex");
  localStorage.removeItem("programStudiId");
  localStorage.removeItem("asesorId");
  localStorage.removeItem("selectedAssessmentId")
  localStorage.removeItem("newView")
  localStorage.removeItem('selectedView')
  localStorage.removeItem('currentPage')
  localStorage.removeItem('testAsesorId')
  localStorage.removeItem("role")
  localStorage.removeItem("code_upload")
  localStorage.removeItem("code_download")
};
