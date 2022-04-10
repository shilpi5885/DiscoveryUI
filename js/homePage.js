let serverData = [];

const getDataFromServer = () =>{
   makeServiceCalls("GET","http://localhost:3000/imageData",true)
         .then(responseText => {
            serverData = JSON.parse(responseText);
            document.querySelector('#paragraph').innerHTML = serverData.description;
            document.querySelector('#WelcomeHeading').innerHTML = serverData.title;
            document.querySelector('#seaImg').src = serverData.seaImg;
            document.querySelector('#mountainImg').src = serverData.mountainImg;
            document.querySelector('#manImg').src = serverData.manImg;
            console.log( "result is :" +serverData);
         })
         .catch(error => {
           console.log("GET Error Status: " + JSON.stringify(error));
           serverData =[];
         });
       }

       function makeServiceCalls(methodType, url, async = true, data = null) {
         return new Promise(function (resolve, reject) {
         let xhr = new XMLHttpRequest();
         xhr.onload = function () {
           console.log(methodType+ "state changed called Ready State" +xhr.readyState+"status" +xhr.status);
           if (xhr.status.toString().match('^[2][0-9]{2}$')) {
               resolve(xhr.responseText);
             } else if (xhr.status.toString().match('^[4,5][0-9]{2}$')) {
               reject({
                 status: xhr.status,
                 statusText: xhr.statusText,
               });
               console.log("XHR Failed!");
               console.log("Handle 400 Client Error or 500 Server Error.");
             }
           }
         xhr.onerror = function(){
             reject({
                 status: xhr.status,
                 statusText: xhttp.statusText
               });
         };
         xhr.open(methodType, url, async);
         if (data) {
           console.log(JSON.stringify(data));
           xhr.setRequestHeader("Content-Type", "application/json");
           xhr.send(JSON.stringify(data));
         } 
         else
        xhr.send();
         console.log(methodType + " request sent to the server.");
       });
       }
       getDataFromServer();
    