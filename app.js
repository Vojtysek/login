const app = new Vue({
  el: '#app',
  mounted:function(){
    this.getFetch();
  },
  data:{
    title: 'Login',
    newUser: '',
    newPass: '',
    newUserID: '',
    users: []
  },
  methods: {
    addUser(){
        this.users.push({
          newUser: this.newUser,
          newPass: this.newPass
        });
      this.newUser = ''
      this.newPass = ''
    },
    removeUser(user){
      const userIndex = this.users.indexOf(user);
      this.users.splice(userIndex, 1);
    },
    postFetch(){
      const postRequest = new Request(
        "http://localhost:8030/newUser",
        {
          method: "POST",
          headers: {
            'Accept': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
            'newUser': document.getElementById('newUser').value,
            'newPass': document.getElementById('newPass').value
          })
        })
          const postRes = fetch(postRequest);
      },

      
      /*async editUserFetch(_id){
          let currentID = _id;
          const urlBase = "http://localhost:8030/edit/users/name/"
          let editUser = new Request(
          urlBase + currentID,
          {
            method: "POST",
            headers: {
              'Accept': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
              'editUser': document.getElementById('editUser').value
            })
          }
        )
        const editRes = fetch(editUser);
        await location.reload();
      },
      async editPassFetch(_id){
          let currentID = _id;
          const urlBase = "http://localhost:8030/edit/users/password/"
          let editPass = new Request(
          urlBase + currentID,
          {
            method: "POST",
            headers: {
              'Accept': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
              'editPass': document.getElementById('editPass').value
            })
          }
        )
        const editRes = fetch(editPass);
        await location.reload();
      },*/


      async deleteFetch(_id){
      let getRequest = new Request(
        "http://localhost:8030/users",
        {
          method: "GET",
          headers: {
            'Accept': 'application/x-www-form-urlencoded'
          }
        })
        const res = await fetch(getRequest);
        const getData = await res.json();
        console.log(getData.data , JSON.stringify(this.users));
        this.users = getData.data;
        let currnetID = _id;
        console.log(currnetID);
        const urlBase = "http://localhost:8030/users/"
        let deleteRequest = new Request(
          urlBase + currnetID,
          {
            method: "POST",
            headers: {
              'Accept': 'application/x-www-form-urlencoded'
            }
          }
        )
        const delRes = fetch(deleteRequest);
        await location.reload();
    },
    async getFetch(){
      let getRequest = new Request(
        "http://localhost:8030/users",
        {
          method: "GET",
          headers: {
            'Accept': 'application/x-www-form-urlencoded'
          }
        })
        const res = await fetch(getRequest);
        const getData = await res.json();
        console.log(getData.data , JSON.stringify(this.users));
        this.users = getData.data;
    },
    async deleteAllFetch(){
      let allRequest = new Request(
        "http://localhost:8030/usersDelete/all",
        {
          method: "POST",
          headers: {
            'Accept': 'application/x-www-form-urencoded'
          }
        })
        const allDelete = fetch(allRequest);
        await location.reload();
    }
  }
});
