/**
 * Created by nathan on 2/14/16.
 */

//document.addEventListener('DOMContentLoaded', bindButtonsHttpBin);

httpbinBaseUri = "http://httpbin.org";
httpbinPostUri = httpbinBaseUri + "/post";

function bindButtonsHttpBin() {
    document.getElementById('httpbinSubmit').addEventListener('click', function (event) {
        //Clear the page
        document.getElementById('httpbinResponse').textContent = "";

        var sendText = document.getElementById('httpbinInputField').value;
        var req = new XMLHttpRequest();
        req.open("POST", httpbinPostUri, true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.addEventListener('load', function() {
            if(req.status >= 200 && req.status < 400) {
                var parsedJson = JSON.parse(req.responseText);
                var parsedText = JSON.stringify(parsedJson.json);
                if(parsedText === 'null')
                    document.getElementById('httpbinResponse').textContent = 'Invalid JSON';
                else
                    document.getElementById('httpbinResponse').textContent = parsedText;
            }
        });
        req.send(sendText);
        event.preventDefault();
    })
}