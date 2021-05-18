/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var account ={};
var currentMessage ="";
var msgDiv = document.createElement("div");

(function() {
    
        
        account.logon = function(){
        
            var findDiv = document.createElement("div");
            findDiv.classList.add("find");

            var emailSpan = document.createElement('span');
            emailSpan.innerHTML = "Email Address: ";
            findDiv.appendChild(emailSpan);
            var emailInput = document.createElement("input");
            findDiv.appendChild(emailInput);

            var passwordSpan = document.createElement('span');
            passwordSpan.innerHTML = "Password: ";
            findDiv.appendChild(passwordSpan);
            var passwordInput = document.createElement("input");
            passwordInput.setAttribute("type", "password");
            findDiv.appendChild(passwordInput);


            var loginButton = document.createElement("button");
            loginButton.innerHTML = "Login";
            findDiv.appendChild(loginButton);

            findDiv.appendChild(msgDiv);
            
            

            loginButton.onclick = function () {

                // You have to escape user input before putting into a URL for an AJAX call.
                // Otherwise, your URL may be refused (for security reasons) by the web server.
                var url = "webAPIs/logonAPI.jsp?email=" + encodeURI(emailInput.value) +
                        "&password=" + encodeURI(passwordInput.value);

                console.log("onclick function will make AJAX call with url: " + url);
                
                ajax(url, buildProfile, msgDiv);

            };  // onclick function
            return findDiv;
    }
    
    account.getProfile = function(){

        // You have to escape user input before putting into a URL for an AJAX call.
        // Otherwise, your URL may be refused (for security reasons) by the web server.
        var url = "webAPIs/getProfileAPI.jsp";
        
        console.log("onclick function will make AJAX call with url: " + url);
        
        ajax(url, buildProfile, msgDiv);
        
      
        
        return msgDiv;
    }
    
    account.logoff = function(){

        // You have to escape user input before putting into a URL for an AJAX call.
        // Otherwise, your URL may be refused (for security reasons) by the web server.
        var url = "webAPIs/logoffAPI.jsp";
        
        console.log("onclick function will make AJAX call with url: " + url);
        ajax(url, buildProfile, msgDiv);
        

        return msgDiv;
    }
    
    function buildProfile(userObj){
        var msg ="";
        
        if(userObj.errorMsg.length>0){
            msg += "<strong>Error: " + userObj.errorMsg + "</strong>";
        } else{
            msg += "<strong>Welcome Web User " + userObj.webUserId + "</strong>";
            msg += "<br/> Birthday: " + userObj.birthday;
            msg += "<br/> MembershipFee: " + userObj.membershipFee;
            msg += "<br/> User Role: " + userObj.userRoleId + " " + userObj.userRoleType;
            msg += "<p> <img src ='" + userObj.image + "'> </p>";
        }
        currentMessage = msg;
        console.log(currentMessage);
        msgDiv.innerHTML = msg;
        return msg;
    };
    
}());