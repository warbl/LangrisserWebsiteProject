
function blog() {

    // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    var content = ` 
        <h2>Blog</h2>
            <p>
                Most of my web development/design experience comes from self studying through FreeCodeCamp. I studied HTML/CSS, Javascript, JSON, how to use API's. I've not used this 
                knowledge in quite some time, so this class would be good to formally study the topics. 
            </p>
            
            <h3>Database Design</h3>
            <p>Other table: 
                primary key : teamID, 
                name: Each team consists of a collection of characters
                characters: array of characters by name, owned characters here
                apex characters: apex team characters by name
                # of apex characters: coun of apex characters, must not exceed 18
                
                foreign key: userID from the user table
            </p>
            <h3>HW1</h3>
            <p>It was a little difficult to distinguish what extra content the homework wanted me to add. Constantly switching windows to navigate is a bit boggling.
            </p>
    
            <h3>HW2</h3>
            <p>Debugging in the Google console was pretty straightforward. I struggled a bit with one of the additions (spent hour and a half on a one-line fix). I don't remember what it was because this blog entry is late.'
            </p>
    
            <h3>HW3</h3>
            <p>I thought I wasn't able to call JS from another folder (makeChar from twoChars) but it turns out the capitalization was the issue. Most of this homework was fairly straightforward in that it followed along pretty well with the Lab Assignment. There is some trouble because I intended for the onmouseout to set the data back to default but it doesn't seem to change the factions and buff parameters. It does reset the name however.</p>
    
            <h3>DATABASE</h3>
            <p>When designing the other table as teams, I realized that I would need multiple values under the character column because teams consist of multiple characters. I should be able to achieve this with a relational table (user> team>characters.) This makes more sense in the regard that web_users aren't uniquely tied to characters like they are with my current table setup. If following assignments involve a relational table, then I'll do that.
            I don't know if I was able to reproduce the error codes exactly. Maybe I have the wrong version of mysql?')'</p>
            
            <p>Click <a href="sql_lab_assignment.rtf">here</a> to see my document about database design</p>
    
            <h3> HW5: clicksort</h3>
            <p>I couldn't figure out how to implement the functionality for the reverse sort or the filter. The images are also not showing, do they have to be local?</p>
    
    
            <h3> HW6: Web APIs</h3>
            <p>Database access code: After figuring out what the correct SQL query statement was, we just put that into the View component of this project.</p>
                <p>Some important concepts I learned was tunneling and properly connecting to a database through a web client. Properly refactoring old code wasw one of the things that took up the most of my time this week. Understanding this weeks sample code was more time consuming than usual as well.</p>
            <p>Click <a href="WEBAPI_Document.docx">here</a> to see my document about java DB access errors</p>
            <p>Click <a href="webAPIs/listUsersAPI.jsp">here</a> for the Web API that lists users from my DB
Click <a href="webAPIs/listOtherAPI.jsp">here</a> for the Web API that lists data from my Character Table.</p>
    
            <h3> HW7: LogOn</h3>
            <p> I had formatted the account.js incorrectly which screwed with the routing of the page and prevented me from debugging. I should have asked for help about it sooner. Another problem that I ran into was that I was confused as to how I was supposed to get a return value from an AJAX call. I circumvented this by storing values in a global message object. </p>
            <p><a target="_blank" href ='webAPIs/logonAPI.jsp?email=tuk60559@temple.edu&password=ant3pods'>Log On API</a>
        <a target ="_blank" href ='webAPIs/logoffAPI.jsp'>Log Off API</a>
        <a target ="_blank" href ='webAPIs/getProfileAPI.jsp'>Get Profile API</a>
        <a target ="_blank" href="webAPIs/listUsersAPI.jsp">List All Users</a></p>
            
            <h3> HW8: Insert</h3>
            <p>The hardest part about this homework was constantly going between multiple files to change things. The java files interacted with the APIS that interacted with the JS file that interacted with other JS files. If it wasn't for the organization protocols that we've followed up until this point, it would be impossible to keep track of things. Being able to manipulate the database directly from the webpage seems like a very important concept.'</p>

            <h3> HW9: Update</h3>
            <p>Roughly the same challenge as the previous one, but I was more familiar with where all the files were </p>
    
            <h3>HW10: Delete</h3>
            <p>Very similar to the previous two homeworks but easier because deleting didn't require me to keep track of multiple variables. The SQL statement was simple too.</p>
          <p style="text-align:center;">
                <img src="pics/thinking_emoji.png" style="width:50%; border-radius:10px;">
          </p>
    
          
    `;
    
    var ele = document.createElement("div");
    ele.innerHTML = content;
    return ele;    
}