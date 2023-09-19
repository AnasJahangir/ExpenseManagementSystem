

var forms = document.querySelector(".forms"),
      pwShowHide = document.querySelectorAll(".eye-icon"),
      links = document.querySelectorAll(".link");

pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        var pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");
        
        pwFields.forEach(password => {
            if(password.type === "password"){
                password.type = "text";
                eyeIcon.classList.replace("bx-hide", "bx-show");
                return;
            }
            password.type = "password";
            eyeIcon.classList.replace("bx-show", "bx-hide");
        })
        
    })
})      

links.forEach(link => {
    link.addEventListener("click", e => {
       e.preventDefault(); //preventing form submit
       forms.classList.toggle("show-signup");
    })
})



  function register() {
      var sEmail = document.getElementById("semail")
      var sPass = document.getElementById("spass")
      var sConformPass = document.getElementById("sconpass")
      var sName = document.getElementById("sname")
      var checkLocalEmail = JSON.parse(localStorage.getItem(sEmail.value)) 

      if (sEmail.value.trim() != "" && sPass.value.trim() != "" && sConformPass.value.trim() && sName.value.trim() != "") {


        if (sPass.value.length == 8) {

        if (sPass.value === sConformPass.value) {

            if (checkLocalEmail == null) {
                var user = {
                    name: sName.value,
                    email: sEmail.value.toLowerCase(),
                    pass: sPass.value,
                    expense:{
                        balance: 0.00,
                        income: 0.00,
                        expenses: 0.00,
                        transaction: [

                        ]
                    }
                }
                localStorage.setItem(sEmail.value.toLowerCase(),JSON.stringify(user));
                
                var getUser = JSON.parse(localStorage.getItem(sEmail.value.toLowerCase()));
                localStorage.setItem("currentUser",JSON.stringify(getUser));

                sName.value ="";
                sEmail.value ="";
                sPass.value ="";
                sConformPass.value ="";

             

                Swal.fire({
                    icon: 'success',
                    title: '<h3 style="color: #4070F4 ">Great! You are now logged in. Click OK to proceed.</h3>',
                    confirmButtonColor: "#4070F4",
                    iconColor: '#4070F4',
                  }).then(() => {
                    if (true) {
                        location.href = 'https://anas-expense.netlify.app/home';
                    }
                  });
         
            
            }else{
         
            Swal.fire({
                icon: 'error',
                title: '<h3 style="color: #4070F4 ">Oops...</h3>',
                text: 'This email address is already registered. Please try a different one.',
                confirmButtonColor: "#4070F4",
                iconColor: '#4070F4',
                footer: ''
        })
            }
          

        }else{
            Swal.fire({
                icon: 'error',
                title: '<h3 style="color: #4070F4 ">Oops...</h3>',
                text: 'Please make sure that the passwords match.',
                confirmButtonColor: "#4070F4",
                iconColor: '#4070F4',
              })
        }

    }else{
        Swal.fire({
            icon: 'error',
            title: '<h3 style="color: #4070F4 ">Oops...</h3>',
            text: 'Your password must be at least 8 characters long.',
            confirmButtonColor: "#4070F4",
            iconColor: '#4070F4',
          }) 
    }
      }else{
        Swal.fire({
            icon: 'error',
            title: '<h3 style="color: #4070F4 ">Oops...</h3>',
            text: 'Please complete all the required fields.',
            confirmButtonColor: "#4070F4",
            iconColor: '#4070F4',
            footer: ''
          })
      }

  }

  function login() {
      var lEmail = document.getElementById("lemail")
      var lPass = document.getElementById("lpass")

      if (lEmail.value.trim() != "" && lPass.value.trim() != "") {
        var getUser = JSON.parse(localStorage.getItem(lEmail.value))

      if (getUser != null) {
        if (getUser.email == lEmail.value.toLowerCase() && getUser.pass == lPass.value) {

            lEmail.value = "";
            lPass.value = "";

            localStorage.setItem("currentUser",JSON.stringify(getUser));
                
            Swal.fire({
                icon: 'success',
                title: '<h3 style="color: #4070F4 ">Great! You are now logged in. Click OK to proceed.</h3>',
                confirmButtonColor: "#4070F4",
                iconColor: '#4070F4',
              }).then(() => {
                if (true) {
                    location.href = 'https://anas-expense.netlify.app/home';
                }
              });

        }else{
            Swal.fire({
                icon: 'error',
                title: '<h3 style="color: #4070F4 ">Oops...</h3>',
                text: 'Your password is incorrect. Please reset your password or try again.',
                confirmButtonColor: "#4070F4",
                iconColor: '#4070F4',
                footer: ''
              })
        }
         }else{
            Swal.fire({
                icon: 'error',
                title: '<h3 style="color: #4070F4 ">Oops...</h3>',
                text: 'Sorry, the user does not exist.',
                confirmButtonColor: "#4070F4",
                iconColor: '#4070F4',
                footer: ''
              })
         }
      }else{
        Swal.fire({
            icon: 'error',
            title: '<h3 style="color: #4070F4 ">Oops...</h3>',
            text: 'Please complete all the required fields.',
            confirmButtonColor: "#4070F4",
            iconColor: '#4070F4',
            footer: ''
          })
      }
      

  }

  function serviceError() {
    Swal.fire({
        icon: 'error',
        title: '<h3 style="color: #4070F4 ">Sorry...</h3>',
        text: 'This service is currently not available.',
        confirmButtonColor: "#4070F4",
        iconColor: '#4070F4',
        footer: ''
      })
  }

  var getcurrentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (getcurrentUser != null) {


    var balanceHtml = document.getElementById("balance");
    var expensesHtml = document.getElementById("expenses");
    var incomeHtml = document.getElementById("income");
    document.getElementById("UserName").innerText = getcurrentUser.name;
    document.getElementById("UserName2").innerText = getcurrentUser.name;
    document.getElementById("UserNameinp").value = getcurrentUser.name;

    document.getElementById("Useremail").value = getcurrentUser.email;
    document.getElementById("userPass").value = getcurrentUser.pass;




    function reloadData() {
      var getcurrentUser = JSON.parse(localStorage.getItem("currentUser"));


      if (getcurrentUser.expense.transaction.length != 0) {
        document.getElementById("not-found").style.display = "none"
        document.getElementById("table-div").style.minHeight = "auto"
        var balance = 0;
        var income = 0;
        var expenses = 0;
        for (var i = 0; i < getcurrentUser.expense.transaction.length; i++) {
          
          var tbody = document.getElementById("tbody")
          var tr = document.createElement("tr");
  
          balance += Number(getcurrentUser.expense.transaction[i].amount)
  
          if (getcurrentUser.expense.transaction[i].amount >= 0) {
            income +=  Number(getcurrentUser.expense.transaction[i].amount);
        } else {
            expenses +=  Math.abs(getcurrentUser.expense.transaction[i].amount);
           
        }
        
          
          var th = document.createElement("th");
          var tdAmount = document.createElement("td");
          var tdDesc = document.createElement("td");
          var tdDate = document.createElement("td");
          var tdDelete = document.createElement("td");
          var tdEdite = document.createElement("td");
    
          // getUser.expense.
          th.textContent = i + 1
          tdAmount.textContent = getcurrentUser.expense.transaction[i].amount
          tdDesc.textContent = getcurrentUser.expense.transaction[i].description
          tdDate.textContent = getcurrentUser.expense.transaction[i].date
          tdEdite.innerHTML =  '<i onclick="editTransaction(this)" data-bs-toggle="modal" data-bs-target="#editTrans" class="fa-solid fa-pen-to-square">'
          tdDelete.innerHTML =  '<i onclick="deleteTrans(this)" class="fa-solid fa-trash"></i>'
          tr.appendChild(th)
          tr.appendChild(tdDesc)
          tr.appendChild(tdAmount)
          tr.appendChild(tdDate)
          tr.appendChild(tdEdite)
          tr.appendChild(tdDelete)
      
          tbody.appendChild(tr)
  
    
        }
       
        balanceHtml.innerText = balance.toFixed(2)
        incomeHtml.innerText = income.toFixed(2)
        expensesHtml.innerText = expenses.toFixed(2)
        
      }else{
        document.getElementById("not-found").style.display = "block"
      }
  
    }

    reloadData()
  

    var addModal = document.getElementById('staticBackdrop')
    addModal.addEventListener('hidden.bs.modal', event => {
    
        var description = document.getElementById("Description");
        var amount = document.getElementById("Amount");
        var date = document.getElementById("addDate");
    
        description.value = "";
        amount.value = "";
        date.value   = "";
    
    })

    var editModale = document.getElementById('editTrans')
    editModale.addEventListener('hidden.bs.modal', event => {
    
        var description = document.getElementById("eDescription");
        var amount = document.getElementById("eAmount");
        var date = document.getElementById("eaddDate");
    
        description.value = "";
        amount.value = "";
        date.value   = "";
    
    })

    var UserModal = document.getElementById('User')
    UserModal.addEventListener('hidden.bs.modal', event => {
      var editeLocalUser = JSON.parse(localStorage.getItem(getcurrentUser.email))
      var userFullName2 =  document.getElementById('UserNameinp');
      var userPass = document.getElementById('userPass'); 
      var userEmail = document.getElementById('Useremail');
      var editBtn =  document.getElementById('edit-btn');
      editBtn.innerText = "Edit";
      editBtn.removeAttribute("onclick")
      editBtn.setAttribute('onclick','editeAccBtn()')

      userEmail.disabled = false
      userEmail.removeAttribute('data-bs-title');
      userEmail.removeAttribute('title')

     userPass.setAttribute("readonly",true);
     userFullName2.setAttribute("readonly",true);
     userEmail.setAttribute("readonly",true);

     userFullName2.style = "border: none; border-radius: 0px;  cursor: default;";
     userPass.style = " border: none; border-radius: 0px; cursor: default;";
     userEmail.style = " border: none; border-radius: 0px; cursor: default;";

      userFullName2.value = editeLocalUser.name;
      userPass.value = editeLocalUser.pass; 
      
   
    })


    function addTransaction() {
  

        var description = document.getElementById("Description");
        var amount = document.getElementById("Amount");
        var date = document.getElementById("addDate");

        if (description.value.trim() != "" && amount.value.trim() != "" && date.value.trim()) {

          document.getElementById("not-found").style.display = "none"
          document.getElementById("table-div").style.minHeight = "auto"

        var getUser = JSON.parse(localStorage.getItem(getcurrentUser.email))
        var transaction = {
            description: description.value,
            amount: amount.value,
            date: date.value
          }

        getUser.expense.transaction.push(transaction)
        localStorage.setItem(getUser.email, JSON.stringify(getUser))
        localStorage.setItem("currentUser", JSON.stringify(getUser))

        // var getUserTotal = JSON.parse(localStorage.getItem(getcurrentUser.email));
        //   var balance = 0;
        //   var income = 0;
        //   var expenses = 0;
        // for (let i = 0; i < getUserTotal.expense.transaction.length; i++) {
        //   balance += Number(getUserTotal.expense.transaction[i].amount)

          
        // if (getUserTotal.expense.transaction[i].amount >= 0) {
        //   income =+ getUserTotal.expense.transaction[i].amount;
        // } else {
        //   expenses =+ getUserTotal.expense.transaction[i].amount;
        // }

        // }
       

        // balanceHtml.innerText = balance.toFixed(2)
        // incomeHtml.innerText = income.toFixed(2)
        // expensesHtml.innerText = expenses.toFixed(2)
        document.getElementById("tbody").innerHTML = "";

        reloadData()

        // var tbody = document.getElementById("tbody")
        // var tr = document.createElement("tr");
    
        // var th = document.createElement("th");
        // var tdAmount = document.createElement("td");
        // var tdDesc = document.createElement("td");
        // var tdDate = document.createElement("td");
        // var tdDelete = document.createElement("td");
        // var tdEdite = document.createElement("td");
  
    
        // th.textContent = transaction.id
        // tdAmount.textContent = transaction.amount
        // tdDesc.textContent = transaction.description
        // tdDate.textContent = transaction.date
        // tdEdite.innerHTML =  '<i onclick="editTransaction(this)" data-bs-toggle="modal" data-bs-target="#editTrans" class="fa-solid fa-pen-to-square">'
        // tdDelete.innerHTML =  '<i class="fa-solid fa-trash"></i>'
        // tr.appendChild(th)
        // tr.appendChild(tdDesc)
        // tr.appendChild(tdAmount)
        // tr.appendChild(tdDate)
        // tr.appendChild(tdEdite)
        // tr.appendChild(tdDelete)
    
        // tbody.appendChild(tr)

        var closeButton = document.getElementById('close-trans');
        closeButton.click();
        }
 
    
    
        
    }

    
    var lengthTrans = 0;

    function editTransaction(e) {
      var parent = e.parentNode.parentNode;
      lengthTrans = Number(parent.firstChild.innerText);
    }

    function editSave() {
      var description = document.getElementById("eDescription");
      var amount = document.getElementById("eAmount");
      var date = document.getElementById("eaddDate");
      var getUser = JSON.parse(localStorage.getItem(getcurrentUser.email))

      if (description.value.trim() != "" || amount.value.trim() != "" || date.value.trim()) {
        console.log(lengthTrans - 1);
        
       

          if (description.value.trim() != "") {
          getUser.expense.transaction[lengthTrans - 1].description = description.value;
            
          }
          if (amount.value.trim() != "") {
        getUser.expense.transaction[lengthTrans - 1].amount = amount.value;
            
          }
          if (date.value.trim()) {
        getUser.expense.transaction[lengthTrans - 1].date = date.value;
            
          }

         

        localStorage.setItem(getUser.email, JSON.stringify(getUser))
        localStorage.setItem("currentUser", JSON.stringify(getUser))

         document.getElementById("tbody").innerHTML = "";
        
          reloadData()
        description.value = "";
        amount.value = "";
        date.value   = "";

        
        var closeButton = document.getElementById('eClose');
        closeButton.click();
      }
    }

    function deleteTrans(e) {
      var parent = e.parentNode.parentNode;
      var lengthTrans = Number(parent.firstChild.innerText);
      var getUser = JSON.parse(localStorage.getItem(getcurrentUser.email))

      getUser.expense.transaction.splice(lengthTrans - 1, 1)
      
      localStorage.setItem(getUser.email, JSON.stringify(getUser))
      localStorage.setItem("currentUser", JSON.stringify(getUser))
      document.getElementById("tbody").innerHTML="";
  
      
      reloadData()
      if (getUser.expense.transaction.length ==0 ) {
        document.getElementById("not-found").style.display = "block";
        document.getElementById("table-div").style.minHeight = "300px";
      
        balanceHtml.innerText = "0.00";
        incomeHtml.innerText = "0.00";
        expensesHtml.innerText = "0.00";
      }

    }

    function deleteAllTrans() {

      var getUser = JSON.parse(localStorage.getItem(getcurrentUser.email));
      if ( getUser.expense.transaction.length !=0 ) {

        Swal.fire({
          icon: 'warning',
          title: 'Do you want your entire expense data to be deleted?',
          confirmButtonColor: "#4070F4",
          iconColor: '#4070F4',
          showDenyButton: true,
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: 'Confirm',
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
    
            getUser.expense.transaction = [];

            localStorage.setItem(getUser.email, JSON.stringify(getUser));
            localStorage.setItem("currentUser", JSON.stringify(getUser));
      
            document.getElementById("tbody").innerHTML="";
            document.getElementById("not-found").style.display = "block";
            document.getElementById("table-div").style.minHeight = "300px";
            
         
          balanceHtml.innerText = "0.00";
          incomeHtml.innerText = "0.00";
          expensesHtml.innerText = "0.00";
    
          }
          })

       
      }
 
    }

    function editeAccBtn() {
      var userFullName2 =  document.getElementById('UserNameinp');
      var userPass = document.getElementById('userPass');
      var userEmail = document.getElementById('Useremail');
       var editBtn =  document.getElementById('edit-btn');
       editBtn.innerText = "Save";
       editBtn.removeAttribute("onclick")
       editBtn.setAttribute('onclick','editAccSave()')
       userFullName2.focus();
       userFullName2.removeAttribute("readonly");
       userEmail.disabled = true
       userEmail.setAttribute('data-bs-title','tooltip');
       userEmail.setAttribute('title','Sorry, email cannot be changed.')

      userEmail.removeAttribute("readonly");
      userPass.removeAttribute("readonly");
      userPass.setAttribute("type", "text");
      userFullName2.style = " border: 2px solid #1a75ff; border-radius: 5px; cursor: text; ";
      userPass.style = " border: 2px solid #1a75ff; border-radius: 5px; cursor: text; ";
      userEmail.style = " border: 2px solid #1a75ff; border-radius: 5px; ";
    }

    function editAccSave() {
      var editeLocalUser = JSON.parse(localStorage.getItem(getcurrentUser.email))


      Swal.fire({
        icon: 'warning',
        title: 'Do you want to make changes to this?',
        confirmButtonColor: "#4070F4",
        iconColor: '#4070F4',
        showDenyButton: true,
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Confirm',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
  
    
          var userFullName2 =  document.getElementById('UserNameinp');
          var userPass = document.getElementById('userPass');
    
          if (userFullName2.value.trim() != "" || userPass.value.trim() != "") {
       
            if (userFullName2.value.trim() != "" ) {
              editeLocalUser.name = userFullName2.value
            }
            if (userPass.value.trim() != "" ) {
              editeLocalUser.pass = userPass.value        
            }

            localStorage.setItem(editeLocalUser.email, JSON.stringify(editeLocalUser));
            localStorage.setItem("currentUser", JSON.stringify(editeLocalUser));

            document.getElementById("UserName").innerText = editeLocalUser.name;
            document.getElementById("UserName2").innerText = editeLocalUser.name;
            document.getElementById("UserNameinp").value = editeLocalUser.name;

            document.getElementById("Useremail").value = editeLocalUser.email;
            document.getElementById("userPass").value = editeLocalUser.pass;

            var closeButton = document.getElementById('UserModalClose');
            closeButton.click();
          }
     
    
  
        }
        })

    }

    function logout() {
      
      Swal.fire({
        icon: 'warning',
        title: 'Do you want to make changes to this?',
        confirmButtonColor: "#4070F4",
        iconColor: '#4070F4',
        showDenyButton: true,
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Confirm',
      }).then((result) => {
        if (result.isConfirmed) {
        localStorage.setItem("currentUser",null)
        location.href = "https://anas-expense.netlify.app/"

      }
    }
    )
      
    }
    
    function deleteAcc() {
      Swal.fire({
        icon: 'warning',
        title: 'Do you want your account to be deleted?',
        confirmButtonColor: "#4070F4",
        iconColor: '#4070F4',
        showDenyButton: true,
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Confirm',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
  
          var userEmail = JSON.parse(localStorage.getItem("currentUser")).email
  
          localStorage.setItem("currentUser",null)
          localStorage.removeItem(userEmail)
          location.href = "https://anas-expense.netlify.app/"
  
        }
        })
    }
  }

  

