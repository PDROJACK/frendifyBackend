const Config = {
    "development":{
        "FRONTEND": "http://localhost:3000/chat",
        "FRONTEND_ORIGIN": "http://localhost:3000",
        "REDIRECT_URI": "http://localhost:4000/callback"
    }, 
    "production": {
        "FRONTEND": "https://frendify.herokuapp.com/chat",
        "FRONTEND_ORIGIN": "https://frendify.herokuapp.com",
        "REDIRECT_URI": "https://frendify-b.herokuapp.com/callback"
    }
}

module.exports = Config;