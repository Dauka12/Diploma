export const startSession = (user) => {
  localStorage.setItem("username", user.username);
  localStorage.setItem("accessToken", user.token);
  localStorage.setItem("uid", user.id)
  console.log(user);
  }
  
  export const getSession = () => {
    return {
      username: localStorage.getItem("username"),
      accessToken: localStorage.getItem("accessToken"),
    }
  }
  
  export const endSession = () => {
    localStorage.clear();
  }
  
  export const isLoggedIn = () => {
    return getSession().accessToken;
  }