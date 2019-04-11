const piranhaConfig = {
    apiBaseUrl: "http://localhost:8080/api/",
    route: {
      home: "/",
      login: "login",
      logout: "auth/logout",
      reset_password: "auth/reset_password",
      register: "users",
      products: "products",
      forgetPassword: "auth/forget_password",
      allusers: "users",
      deleteuser: "users",
      users: "users",
      my_profile: "my_profile",
      change_password: "change_password",
    },
    auth: {
      accessToken: null,
    },
    user: {
      uid: null,
      name: "",
      org: {
        id: null,
        name: null,
        slug: null
      }
    },
    
  };
  
  export default piranhaConfig;
  