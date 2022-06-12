function ajax(params = {
    type: "error"
}, success, error, url = 'server/scripts/ajax.php', method = 'post', contentType = 'application/json') {

    if (window.fetch) {
        let header = {
            method: method,
            body: JSON.stringify(params),
            headers: {
                'Content-Type': contentType
            }
        };
        fetch(url,
            header
        ).then(ans => ans.json())
            .then(ans => {
                if (ans.type != "Error") {
                    success(ans);
                } else {
                    error(ans);
                }
            }).catch(err => {
                console.log(err);
            })

    } else {
        let req = null;
        if (window.XMLHttpRequest) {
            req = new XMLHttpRequest();
        } else if (typeof ActiveXObject != "undefined") {
            req = new ActiveXObject("Microsoft.XMLHTTP");
        }

        if (req) {
            req.onreadystatechange = function () {
                let ready = req.readyState;
                if (ready == 4) {
                    const status = req.status;
                    if (status == 200) {
                        const json = JSON.parse(req.responseText);
                        console.log(json);
                        success(json);
                    }
                }
            }
            req.open(method, url, true);
            if (method != "post")
                req.send(null);
            else
                req.setRequestHeader("Content-Type", contentType);

            req.send(JSON.stringify(params));


        }
    }


}