/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";

function players (){
    
    var playersDOM = document.createElement("div");
    
    ajax("json/players.json", processUserData, playersDOM);

        function processUserData(userList) {

                // print out JS object/array that was converted from JSON data by ajax function
                console.log(userList);

                // build new list as we want the fields to appear in the HTML table
                // we can decide the order we want the fields to appear (first property defined is shown first)
                // we can combine, decide to exclude etc...
                var newUserList = [];

                // modify properties (image and price) of the array of objects so it will look 
                // better on the page.
                for (var i = 0; i < userList.length; i++) {

                    newUserList[i] = {};
                    // Don't show the id (no meaningful data)
                    newUserList[i]._Image = SortableTableUtils.makeImage(userList[i].image, "5rem");
                    newUserList[i].Email = SortableTableUtils.makeText(userList[i].userEmail);
                    // Don't show the password
                    newUserList[i].Birthdate = SortableTableUtils.makeText(userList[i].birthday);
                    
                    // true means format like currency
                    newUserList[i].MembershipFee = SortableTableUtils.makeNumber(userList[i].membershipFee);
                    
                    newUserList[i].Role = SortableTableUtils.makeText(userList[i].userRoleId + " " + userList[i].userRoleType);
                }


                /*    
                 "webUserId": "2",
                 "userEmail": "dominic@temple.edu",
                 "userPassword": "p",
                 "image": "http://cis-linux2.temple.edu/~sallyk/pics_users/dominic.jpg",
                 "birthday": "",
                 "membershipFee": "$1,000.99",
                 "userRoleId": "3",
                 "userRoleType": "Member",
                 "errorMsg": ""
                 */

                // Making a DOM object, nothing shows yet... 
                playersDOM.appendChild(MakeClickSortTable("The CIS Club", newUserList, "Email","pics/sortUpDown16.png" ));
            }
    return playersDOM;
    
}