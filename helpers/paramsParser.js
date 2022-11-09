module.exports = {
    getParams: function ( req, method ) {
        switch (method) {
            case 'POST': return JSON.parse(JSON.stringify(req.body));
         
            
            default: return -1;
        }
        
    }
}

//Parser of params when return a JSON with the contents of request