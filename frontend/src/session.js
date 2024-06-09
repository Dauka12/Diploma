export const startSession = (user) => {
  localStorage.setItem("iin", user.iin);
  localStorage.setItem("accessToken", user.token);
  localStorage.setItem("uid", user.id);
  localStorage.setItem("phone_number", user.phone_number);
  localStorage.setItem("role", user.roles[0].name);
  localStorage.setItem("username", user.username);
  localStorage.setItem("userSecondName", user.userSecondname);
  localStorage.setItem("userThirdName", user.userThirdname);
  localStorage.setItem("userImageUrl", user.imageUrl);
  console.log(user);
  }
   
  export const getSession = () => {
    return {
      iin: localStorage.getItem("iin"),
      accessToken: localStorage.getItem("accessToken"),
      role: localStorage.getItem("role"),
    }
  }
  
  export const endSession = () => {
    localStorage.clear();
  }
  
  export const isLoggedIn = () => {
    return getSession().accessToken;
  }