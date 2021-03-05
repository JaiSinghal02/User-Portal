var uid = null;
var userp=null;
auth.onAuthStateChanged(user => {
    
    if (user) {
        changeUI(user);
        uid = user.uid;
        userp=user;
        var userInfo = document.querySelector('#User-Info-Disp');
        if(!(userInfo.style.display==='none')){
            getUserInfo(userp);
        }
        
    }
    else {
        var userInfo = document.querySelector('#User-Info-Disp');
        userInfo.style.display='none';
        console.log(userInfo.style.display)
        changeUI(null);
        uid=null;
        userp=null;
    }
})

const Signup = document.querySelector('#Signup-Button');
Signup.addEventListener('click', (e) => {
    e.preventDefault();
    showLoader("Signing Up...");
    const SignupForm = document.querySelector('#Signup-Form');
    const email = SignupForm['Signup-Email'].value;
    const password = SignupForm['Signup-Password'].value;
    //console.log(email, password);
    auth.createUserWithEmailAndPassword(email, password)
        .then(res => {
            //console.log(res.user)
            SignupForm.reset();
            closeSignUp();
            dispInfoForm();
            var userInfo = document.querySelector('#User-Info-Disp');
            userInfo.style.display='none';
            hideLoader();
        })
        .catch(err => {
            hideLoader();
            if (err.message === "The email address is already in use by another account.") {
                alert(err.message);
                SignupForm.reset();
            }
            else {
                alert(err.message);
                console.log(err);
            }

        })
}
)
const Signin = document.querySelector('#Signin-Button');

Signin.addEventListener('click', (e) => {
    e.preventDefault();
    const SigninForm = document.querySelector('#Signin-Form');
    const email = SigninForm['Signin-Email'].value;
    const password = SigninForm['Signin-Password'].value;
    //console.log(email, password);
    showLoader("Signing in ...");
    console.log(document.readyState);
    auth.signInWithEmailAndPassword(email, password)
        .then(res => {
            //console.log(res.user);
            closeSignIn();
            SigninForm.reset();
            getUserInfo(res.user);
            hideLoader();
            
            
        }
        )
        .catch(err=>{
            alert(err.message);
            hideLoader();
        })
        
        
});

const Signout = document.querySelector('#Signout');

Signout.addEventListener('click', (e) => {
    e.preventDefault();
    showLoader("Signing Out...");
    auth.signOut()
        .then(() => {
            console.log("Signed out");
            dispTag();
            var userInfo = document.querySelector('#User-Info-Disp');
        userInfo.style.display = 'none';
        hideLoader();
        })
        .catch(err=>{
            alert(err.message);
            hideLoader();
        })
})

const infoForm = document.querySelector('.Details-Form');

infoForm.addEventListener('submit', e => {
    e.preventDefault();
    showLoader("Submitting...");
    //const infoForm = document.querySelector('.Details-Form');
    db.collection('User-Info').doc(uid).set({
        DOB: infoForm['Details-DOB'].value,
        'BirthPlace': infoForm['Details-BirthPlace'].value,
        'PhoneNumber': infoForm['Details-PhoneNumber'].value,
        Gender: infoForm['Details-Gender'].value,
    })
        .then(() => {
            console.log("Info added...");
            hideInfoForm();
            getUserInfo(userp);
            infoForm.reset();
            hideLoader();
        })
        .catch(err => {
            console.log(err.message);
            alert(err.message);
            hideLoader();
        })
})