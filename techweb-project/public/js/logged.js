

function userloginresp(){
   var testgog =  $("#email-in").val();

   
    var retrievedObject = localStorage.getItem('user');
    if(retrievedObject==null){
      console.log(retrievedObject);
    }
    else{
        return retrievedObject;
    }


}
$(document).ready(function(){
    var islogged =userloginresp();
    var btn = document.createElement("a");
    btn.innerHTML = islogged;
    
    if (islogged=="undefined"){
        document.getElementById("name").style.display = 'none';
        localStorage.removeItem('user');
        console.log(undefined);
    }
    else{
    document.getElementById("logged").appendChild(btn);
    const element = document.getElementById('loginform');
                         element.remove();}
});