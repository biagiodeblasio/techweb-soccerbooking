

/*const users = [
    {email: 'admin', password: 'admin001'},
];

const db = window.openDatabase('utenti', '1.0', 'utenti', 1*1024*1024);
db.transaction(t => {
    t.executeSql('CREATE TABLE USERS (email TEXT, password TEXT)');
    for (let s of users) {
        t.executeSql('INSERT INTO users (email, password) VALUES (?, ?)', 
        [s.email, s.password]);
    }
}, e => console.error(e));

var loginuser = false;
var userlogin = ''; 
var userpass = '';
var SuccesEmail = false;*/

  


function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
   
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");
    /*
    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });
    */
    loginForm.addEventListener("submit", e => {
        e.preventDefault();
        var x = document.getElementById("email-in").value;
        var y = document.getElementById("pass-in").value;
        email_exists(x,y);
    });

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
                setInputError(inputElement, "Username must be at least 10 characters in length");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
    /*createAccountForm.addEventListener("submit", e => {
        e.preventDefault();
        var x = document.getElementById("email-rec").value;
        var y = document.getElementById("pass-rec").value;
        var z =  document.getElementById("pass-rec2").value;
        if (y==z){
        db.transaction(t => {
            for (let s of users) {
                t.executeSql('INSERT INTO users (email, password) VALUES (?, ?)', 
                [document.getElementById("email-rec").value, document.getElementById("pass-rec").value]);
            }
        },e => console.error(e));
    
        document.location.href="singin.html";
        
    }
    
        
    });*/
    
   
});

function email_exists(email,password) {
   
    db.transaction(function (tx) { 
        tx.executeSql(
            'SELECT * FROM users WHERE email = ? AND password = ? LIMIT 1',
            [email,password],
            function (tx, result) { 
                if(result.rows.length){
                    // user found
                    alert("User found - ", result.rows[0]);
                     var x = document.getElementById("email-in").value;
                      var y = document.getElementById("pass-in").value;
                    SuccesEmail = true;
                    userlogin= x;
                    userpass = y;
                    login = true;
                    var btn = document.createElement("a");
                    btn.innerHTML = userlogin;
                    document.getElementById("logged").appendChild(btn);
                    const element = document.getElementById('loginform');
                                         element.remove();
                    WhoIsLogged(x,y);
                } 
                else {
                    // email does not exists
                    alert("User not found");
                    SuccesEmail= false;
                    userlogin= '';
                    userpass = '';
                    login = false;
                }
            },
            null
        ); 
    });
    return SuccesEmail;
}

function WhoIsLogged (email , password){
    const islogged = [
        {email: '', password: ''},
    ];
    
    const db = window.openDatabase('islogged', '1.0', 'islogged', 1*1024*1024);
    db.transaction(t => {
        t.executeSql('CREATE TABLE islogged (email TEXT, password TEXT)');
        for (let s of islogged) {
            t.executeSql('INSERT INTO islogged (email, password) VALUES (?, ?)', 
            [email, password]);
        }
    }, e => console.error(e));
}


document.querySelector("#page2").addEventListener("click", e => {
    var btn = document.createElement("a");
    btn.innerHTML = userlogin;
    document.getElementById("logged").appendChild(btn);
});

$(document).ready(function(){
    
    $("#login").submit(function(event){
        event.preventDefault();
        var email = $('#email-in').val();
        var password = $('#pass-in').val();
        $.ajax({
            method: 'post',
            url: '/accedi',
            data: JSON.stringify({ email: email, password: password}),
            contentType: 'application/json',
            success: function(data) {
                $('#answer').val(data);
                //window.location.href = "/invalidemail.html";
                user =$('#answer').val();
                if(user != ""){
                    localStorage.setItem('user', user); 
                   window.location.href = "/logged.html";
                }
            }

        })
        
    });
   
});
function userloginresps(){
    var retrievedObject = localStorage.getItem('campo');
    if(retrievedObject==null){
      window.location.href = "/singin.html";
    }
    else{
        return retrievedObject;
    }

}
function theFunction () {
    var split = $('#dateissuebegan').val();
    var giorno = split.split("T")[0];
    var oras = split.split("T")[1];
    var ora= oras.split(":")[0];
    var oraPrenotata =  ora;
    var giornoprenotato = giorno; 
    var campoPrenotato = userloginresps() 
    localStorage.removeItem('campo');                              
}



    function addToCartClicked(event) {
        var button = event.target
        var shopItem = button.parentElement.parentElement
        var title = shopItem.getElementsByClassName('nomecampo')[0].innerText
        var price = shopItem.getElementsByClassName('prezzocampo')[0].innerText
        var split = $('#dateissuebegan').val();
        var giorno = split.split("T")[0];
        var oras = split.split("T")[1];
        var ora= oras.split(":")[0];
        var giornoprenotato = giorno; 

        $.ajax({
            method: 'post',
            url: '/verifica',
            data: JSON.stringify({ campo: title, ora: ora, giorno:giornoprenotato, prezzo:price}),
            contentType: 'application/json',
            success: function(data) {

              var esito = data;
              console.log(esito);
              if (esito == true)
              {
                $('.eliminac').remove();
                var modal = document.getElementById('myModal');
                modal.style.display = "block";
                window.scrollTo(0,0);
                $('#after-mod').append(' <div  class="container eliminac"> <h3 class="stats-heading text-center my-1"> campo prenotato!</h3> </div>');
                
                $.ajax({
                    method: 'post',
                    url: '/prenota',
                    data: JSON.stringify({ campo: title, ora: ora, giorno:giornoprenotato, prezzo:price}),
                    contentType: 'application/json',
                    success: function(data) {
                        console.log(" campo prenotato")

                    }
                })

                // Get the button that opens the modal
                 var btn = document.getElementById("button-verifica"); 

               // Get the <span> element that closes the modal
                var span = document.getElementsByClassName("close")[0];
                


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    $('.eliminac').remove();
    modal.style.display = "none";
    

}
              }
              else if(esito==false){
                $('.eliminac').remove();
                var modal = document.getElementById('myModal');
                modal.style.display = "block";
                window.scrollTo(0,0);
                
                $('#after-mod').append(' <div class="container eliminac"> <h3 class="stats-heading text-center my-1"> campo non disponibile! </h3> </div>');

                // Get the button that opens the modal
                 var btn = document.getElementById("button-verifica"); 

               // Get the <span> element that closes the modal
                var span = document.getElementsByClassName("close")[0];
                


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    
    modal.style.display = "none";


              }
                

                
            }






                

                
            }

        })
        const closeModal = function () {
            modal.classList.add("hidden");
            overlay.classList.add("hidden");
          };




       
       
    }



$(document).ready(function(){
    
    $("#search-match").submit(function(event){
        event.preventDefault();
        var regione = $('#regione').val();
        regione.charAt(0).toUpperCase() + regione.slice(1);
        var split = $('#dateissuebegan').val();
        var giorno = split.split("T")[0];
        var oras = split.split("T")[1];
        var ora= oras.split(":")[0];
        $.ajax({
            method: 'post',
            url: '/search',
            data: JSON.stringify({ regione: regione, ora: ora, giorno:giorno}),
            contentType: 'application/json',
            success: function(data) {

                var el = document.getElementById( 'card-con' );
                if (el != null){
                    $(".card-card").remove();}
                if (data[0]==null){
                    $('#card-con').append('<div id="card-cam" class="card card-card"> <div class="imgBx"> <img src="images/card.png"></div><div class="contentBx"><h1 id="centratext">NESSUN RISULTATO DI RICERCA. </h1></div></div>' );
                }
                data.forEach(function(oggetto){
                 var nomecampo = oggetto.campo;
                 var prezzocampo = oggetto.prezzo;
                 var regionecampo = oggetto.regione;
                 var cittacampo   = oggetto.citta;
                 
                 
                 
                $('#card-con').append('<div id="card-cam" class="card card-card"> <div class="imgBx"> <img src="images/card.png"></div><div class="contentBx"><h2 class="nomecampo" id="nome-camp">'+ nomecampo +'</h2><h3 class="prezzocampo">'+ prezzocampo +'€'+'</h3> <h3> ' + cittacampo +' '+ regionecampo +'</h3><h4> alle: ' + ora +' dell giorno: '+ giorno +'</h4><button  id="button-verifica" class="button-37 btn-open" role="button">clicca e prenota</button></div></div>' );
                user =$('#nome-camp').val();
                if(user != ""){
                    localStorage.setItem('campo', user); 
                }
                
                  
                
                
               
                    console.log(oggetto);
                  });
                  
               var addToCartButtons = document.getElementsByClassName('button-37')
               for (var i = 0; i < addToCartButtons.length; i++) {
               var button = addToCartButtons[i]
               button.addEventListener('click', addToCartClicked)
    }

                

                
            }

        })
        
    });
    
   
});








