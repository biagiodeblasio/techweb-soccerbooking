function userloginresp(){
    var retrievedObject = localStorage.getItem('user');
    if(retrievedObject==null){
      window.location.href = "/singin.html";
    }
    else{
        return retrievedObject;
    }

}
$(document).ready(function(){
    var islogged =userloginresp();
    var btn = document.createElement("a");
    btn.innerHTML = islogged;
    document.getElementById("logged").appendChild(btn);
    const element = document.getElementById('loginform');
                         element.remove();
});