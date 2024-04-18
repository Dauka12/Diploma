export const startSession = (user) => {
    sessionStorage.setItem("email", user.email);
    sessionStorage.setItem("accessToken", user.accessToken);
    sessionStorage.setItem("fullName", user.fullName)
  }
  
  export const getSession = () => {
    return {
      email: sessionStorage.getItem("email"),
      accessToken: sessionStorage.getItem("accessToken"),
      fullName: sessionStorage.getItem("fullName")
    }
  }
  
  export const endSession = () => {
    sessionStorage.clear();
  }
  
  export const isLoggedIn = () => {
    return getSession().accessToken;
  }