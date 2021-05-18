/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";

function livePlayers (){
    function deleteUser (userId, td) {
        console.log("to delete user "+userId);

        if (confirm("Do you really want to delete user " + userId + "? ")) {

            // HERE YOU HAVE TO CALL THE DELETE API and the success function should run the 
            // following (delete the row that was clicked from the User Interface).
            ajax("webAPIs/deleteUserAPI.jsp?deleteId=" +userId, success, td);
            // get the row of the cell that was clicked 
            function success(obj){
                var dataRow = td.parentNode;
                var rowIndex = dataRow.rowIndex - 1; // adjust for oolumn header row?
                var dataTable = dataRow.parentNode;
                dataTable.deleteRow(rowIndex);
            }
        }
    }
    
    var contentDOM = document.createElement("div");
    contentDOM.classList.add("clickSort");
    ajax("webAPIs/listUsersAPI.jsp", success, contentDOM);
    function success(obj) {

        console.log("listUsersAPI.jsp AJAX successfully returned the following data");
        console.log(obj);

        // Remember: getting a successful ajax call does not mean you got data. 
        // There could have been a DB error (like DB unavailable). 
        if (obj.dbError.length > 0) {
            contentDOM.innerHTML += "Database Error Encountered: " + obj.dbError;
            return;
        }

        var heading = Utils.make({
            htmlTag: "h2",
            parent: contentDOM
        });
        Utils.make({// don't need reference to this span tag...
            htmlTag: "span",
            innerHTML: "Web User List ",
            parent: heading
        });
        var img = Utils.make({
            htmlTag: "img",
            parent: heading
        });
        img.src = CRUD_icons.insert;
        img.onclick = function () {
            // By changing the URL, you invoke the user insert. 
            window.location.hash = "#/insertUser";
        };


        /* Web API property names: "webUserId", "userEmail", "userPassword", "userPassword2", 
         * "image", "birthday", "membershipFee", "userRoleId", "userRoleType", "errorMsg"   */

        // create userList (new array of objects) to have only the desired properties of obj.webUserList. 
        // Add the properties in the order you want them to appear in the HTML table.  
        var userList = [];
        for (var i = 0; i < obj.webUserList.length; i++) {
            userList[i] = {}; // add new empty object to array
            
            userList[i].User_Id = SortableTableUtils.makeNumber(obj.webUserList[i].webUserId, false);

            userList[i].User_Credentials = SortableTableUtils.makeText(obj.webUserList[i].userEmail + "<br/>&nbsp; PW (to test Logon): " +
                    obj.webUserList[i].userPassword);
            userList[i].Image = SortableTableUtils.makeImage(obj.webUserList[i].image, "5rem");
            userList[i].Birthday = SortableTableUtils.makeDate(obj.webUserList[i].birthday);
            userList[i].Membership_Fee = SortableTableUtils.makeNumber(obj.webUserList[i].membershipFee, true);
            userList[i].Role = SortableTableUtils.makeText(obj.webUserList[i].userRoleId + "&nbsp;" +
                    obj.webUserList[i].userRoleType);

            userList[i]._Update = SortableTableUtils.makeLink(
                    "<img src='" + CRUD_icons.update + "'  style='width:1rem' />", // innerHTML of link
                    '#/userUpdate/' + obj.webUserList[i].webUserId             // href of link
            );
    
            userList[i]._Delete = SortableTableUtils.makeImage(CRUD_icons.delete, '1rem');
            
            // freeze the webUserId
            const userId=obj.webUserList[i].webUserId;
            userList[i]._Delete.onclick = function () {
                deleteUser(userId,this);
            };

            // Remove this once you are done debugging...
            userList[i].Error_Msg = SortableTableUtils.makeText(obj.webUserList[i].errorMsg);

        }
        var heading = "";
        var webUserTable = MakeClickSortTable(heading, userList, "User_Id", "icons/sortUpDown16.png");

        contentDOM.appendChild(webUserTable);
    } // end of function success

    return contentDOM;
    
    
    
}