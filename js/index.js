(function(){
    'use strict';

    function get_set_infos(){
        var table = document.querySelector(".container-table table");
        var containerBody = table.querySelector(".containerBody");
        var getSessionData = sessionStorage.getItem("data-return-api");
        var transformData = JSON.parse(getSessionData);
        var i = 0;
        
        while(i < transformData.length){
            var row = document.createElement('tr');
            var th  = document.createElement('th');
            var tdTitle = document.createElement('td');
            var tdContent = document.createElement('td');
            
            row.className += "row-" + i;
            th.setAttribute('scope', 'row');

            tdTitle.textContent = transformData[i].title;
            tdContent.textContent = transformData[i].body;
            th.textContent = i + 1;
            
            row.appendChild(th);
            row.appendChild(tdTitle);
            row.appendChild(tdContent);
            containerBody.appendChild(row);

            i+=1;
        }
    }

    function request_URL(url){
        fetch(url)
            .then(function(data){
                return data.json();
            }).then(function(infos){
                sessionStorage.setItem("data-return-api", JSON.stringify(infos));
                get_set_infos();
            })
            .catch(function(error){
                console.log(error);
            });
    }


    function linkin(){
        var urlJSON = 'https://jsonplaceholder.typicode.com/posts';

        if(sessionStorage.getItem("data-return-api") === null){
            request_URL(urlJSON);
        }else{
            get_set_infos();
        }
    }

    linkin();

})();