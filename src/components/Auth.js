import axios from "axios";

const Auth = {
  login: (data, successCb, failCb) => {
      axios.post('http://localhost:4000/login', data).then(response => {
       console.log(response.data);
          successCb(response);

      }).catch(err => {
//          alert(err.response.data);
           failCb(err);
          console.log(err);
      });
  },
  logout: (successCb, failCb) => {
      axios.get('/logout', {headers: {Authorization: 'Bearer ' + localStorage.getItem("user.api_token")}})
          .then(response => {
              localStorage.clear();

              successCb(response);
          }).catch(err => {
              failCb(err);
          alert(err.response.data.message);
      });
  },
  checkAuth: (successCb, failCb) => {
      axios.get('/check-auth', {headers: {Authorization: 'Bearer ' + localStorage.getItem("user.api_token")}})
          .then(response => {
            successCb(response);
          }).catch(err => {
            failCb(err);
      });
  }
};

export default Auth;