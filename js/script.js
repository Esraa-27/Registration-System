/************************* registration *********************************************/

var regName  =document.getElementById("reg-name");
var regEmail  =document.getElementById("reg-email");
var regPassword  =document.getElementById("reg-password");

var btnSignUp=document.querySelector(".signup button")
var usersList;
var user;

if(localStorage.getItem("users")!=null){
    usersList=JSON.parse(localStorage.getItem("users"))
    
}
else{
    usersList=[];
}

function SignUp(){
   
    user={
        name:regName.value,
        email:regEmail.value,
        password:regPassword.value
    }
    usersList.push(user);
    localStorage.setItem("users", JSON.stringify(usersList))
    document.getElementById("reg-alert").innerHTML=
                `Success <br> 
                now you have an account , go to <a href="index.html" class="a-dec text-white">Log In</a>`;

}

function validName(){
    var RgxName=/^[A-Z][a-z]+$/
    return RgxName.test(regName.value);
}
function validEmail(){
    var RgxName=/^[A-Za-z1-9]{5,}@[a-z]{5}.[a-z]{3}$/
    return RgxName.test(regEmail.value);
}
function validPassword(){
    var RgxName=/^[A-Za-z1-9]{8,}$/
    return RgxName.test(regPassword.value);

}

function inputValid(){
    if(regName.value==null||regEmail.value==null||regPassword.value==null){
        document.getElementById("reg-alert").innerHTML="all inputs required ";
        return false;
        
    }
    else if( !validName()|| !validEmail()|| !validPassword()){
        document.getElementById("reg-alert").innerHTML="values invalid ";
        return false;        
    }
    else{
        return true;
    }
    
}
if(btnSignUp){
btnSignUp.addEventListener("click" , function(){   
    if(inputValid()){
        if(usersList.length<1){
            SignUp();
        }
        else{
            for(var i=0;i<usersList.length;i++){
                if(regEmail.value==usersList[i].email){
                    document.getElementById("reg-alert").innerHTML="this email already exists ";
                    return;
                }
            }
            SignUp();
            
        }  
    } 
});
}

/********************** Log in************************************************/


var lognEmail  =document.getElementById("logn-email");
var lognPassword  =document.getElementById("logn-password");
var lognName ="" ;

var btnLogIn=document.querySelector(".login button");

function login(){
   
    for(var i=0;i<usersList.length;i++){
        if(lognEmail.value==usersList[i].email){
            if(lognPassword.value==usersList[i].password){
                lognName=usersList[i].name;
                window.location.href = 'home.html'
                return ;
            }
            else{
                document.getElementById("logn-alert").innerHTML="enter true password";
                return;

            }
        }
        
    }
    document.getElementById("logn-alert").innerHTML="this email not exists ";
}


if(btnLogIn){
btnLogIn.addEventListener("click" , function(){

    if(usersList.length<1){
        document.getElementById("logn-alert").innerHTML="this email not exists ";

    }else{
        login();

    }
});
}
/****************** Home ****************************************************/

document.getElementById("username").innerHTML=`Welcome ${ lognName } `;

var logout  =document.getElementById("logout");
if(logout){
logout.addEventListener("click" , function(){
   
    lognName=" ";
    lognEmail=" ";
    lognPassword=" ";
    window.location.href = 'index.html'
});
}


/*
 I have error and don't know how fix it 
 1- lognName ==>  value is null outside function login() scope {line 97} although it's global var 
                it make line 139 don't work 

*/


/**********************************************************************/