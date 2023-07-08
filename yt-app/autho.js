
class User{
  constructor(){
   
  }

#checkUsername(username){

// if(username.incudes('#')){
//     return false;
// }
// else{
//     return true;
// }

     let value= username.includes('#') ? false : true;
     return value;
    

}
#checkpassword(password){
    let value= password.length >= 8 ?   true : false ;
     return value;
}

async Singup(n, e, p, u, m, d){
   
   let isvalid= this.#checkUsername(u) && this.#checkpassword(p);

   if(isvalid){
    this.name=n;
    this.email=e;
    this.password=p;
    this.username=u;
    this.mobile=m;
    this.description=d;

    let actual_data=JSON.stringify(this);
    console.log(actual_data)

   try{

   
    let res = await fetch('https://masai-api-mocker.herokuapp.com/auth/register',{
        method:'POST',
        body: actual_data,
        headers:{
            'Content-Type':'application/json',
        },
    });

    let data =await res.json();
    console.log("data:", data)

    alert("Register Sucssesfully")
    window.location="login.html"
   }
   catch(error){
    console.log("error:", error)
   }
   }
   else{
    alert("Put Right details")
   }

  }


//   async Login(u,p){
    
//     this.password=p;
//     this.username=u;
    

//   const login_url = `https://masai-api-mocker.herokuapp.com/auth/login`

//   let res=await fetch(login_url,{
//     method:'POST',
//     body:JSON.stringify(login_data),
//     headers: {
//         'Content-Type': 'application/json',
//     },
//    });
//    let data=await res.json();
  

//    if(data.error==true){
//     console.log("wrong")
//    }
//   }

}

let u1=new User();
console.log(u1)

function register(){

    const name= document.getElementById('name').value;
    const email= document.getElementById('email').value;
    const password= document.getElementById('password').value;
    const username = document.getElementById('username').value;
    const mobile= document.getElementById('mobile').value;
    const description= document.getElementById('description').value;
 
    u1.Singup(name,email,password,username,mobile,description);
}




