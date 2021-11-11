function CreateID(length){
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-';
  for(var i = 0; i < length; i++ ){
      result += characters.charAt(Math.floor(Math.random() * characters.length));
  };
}

/*const getData = () => {
  fetch('http://localhost:8030/users',{
  })
    .then(response => response.json())
    .then(data => console.log(data.data))
}*/
