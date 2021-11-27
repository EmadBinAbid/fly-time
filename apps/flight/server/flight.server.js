var express = require('express');

var app = express()

const port = 3000

exports.getAppInstance = function() {
    return app
}

var init = function() {
    app.listen(port, () => {
        console.log(`Flight API server listening on port ${port}...`)
    })
}

init()