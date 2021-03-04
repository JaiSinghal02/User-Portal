const dispSignUp = () => {
    var SignupModal = document.querySelector('#Signup-Modal');
    SignupModal.classList.add('Signup-Disp');
    //console.log('Sign up clicked..');
    var SigninModal = document.querySelector('#Signin-Modal');
    SigninModal.classList.remove('Signin-Disp');
    document.querySelector('.Info').style.display = 'none';
}
const dispSignIn = () => {
    var SigninModal = document.querySelector('#Signin-Modal');
    SigninModal.classList.add('Signin-Disp');
    var SignupModal = document.querySelector('#Signup-Modal');
    SignupModal.classList.remove('Signup-Disp');
    document.querySelector('.Info').style.display = 'none';
}


const closeSignUp = () => {
    var SignupModal = document.querySelector('#Signup-Modal');
    SignupModal.classList.remove('Signup-Disp');
    //console.log('Sign up clicked..');
    var SigninModal = document.querySelector('#Signin-Modal');
    SigninModal.classList.remove('Signin-Disp');
}
const closeSignIn = () => {
    var SigninModal = document.querySelector('#Signin-Modal');
    SigninModal.classList.remove('Signin-Disp');
    //console.log('Sign up clicked..');
    var SignupModal = document.querySelector('#Signup-Modal');
    SignupModal.classList.remove('Signup-Disp');

    var userInfo = document.querySelector('#User-Info');
    userInfo.style.display = 'flex';
}
const dispInfoForm = () => {
    var InfoForm = document.querySelector("#Fill-Info-Form");
    InfoForm.classList.add('Info-Form-Display');
}
const hideInfoForm = () => {
    var InfoForm = document.querySelector("#Fill-Info-Form");
    InfoForm.classList.remove('Info-Form-Display');
}
const getUserInfo=(user)=>{
    db.collection('User-Info').doc(user.uid).get()
    .then(snapshot => {
        if(typeof snapshot !== "undefined") {
        dispUserInfo(snapshot.data());
        var userInfo = document.querySelector('#User-Info');
        userInfo.style.display = 'flex';
        document.querySelector("#Signout").style.display = 'block';
        }
        

    })
    .catch(err => {
        if(typeof snapshot!== "undefined"){
            alert(err.message);
            document.querySelector("#Signout").style.display = 'block';
        }
        
    })
}

const changeUI = (user) => {
    if (user) {
        document.querySelector("#Signup").style.display = 'none';
        document.querySelector("#Signin").style.display = 'none';
        
        document.querySelector('.Info').style.display = 'none';
        getUserInfo(user);

    }
    else {
        document.querySelector("#Signup").style.display = 'block';
        document.querySelector("#Signin").style.display = 'block';
        document.querySelector("#Signout").style.display = 'none';
    }
}

const dispTag = () => {
    document.querySelector('.Info').style.display = 'block';
    var userInfo=document.querySelector('#User-Info');
    userInfo.style.display='none';
}

const dispUserInfo = (info) => {
    console.log("info received")
    const place = document.getElementById("User-Info")
    var field = `
    <p class="Info-Tag">User Info</p>
    <div class="Info-DOB">DOB: ${info.DOB}</div>
    <div class="Info-Gender">Gender: ${info.Gender}</div>
    <div class="Info-BirthPlace">Place of Birth: ${info.BirthPlace}</div>
    <div class="Info-PhoneNumber">Phone number :${info.PhoneNumber}</div>
    `;
    place.innerHTML = '' + field;

}




var Signupbtn = document.querySelector("#Signup");
Signupbtn.addEventListener('click', dispSignUp)

var Signinbtn = document.querySelector("#Signin");
Signinbtn.addEventListener('click', dispSignIn)


