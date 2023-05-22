const AppError = require("../utils/appError")
const sqliteConecition = require("../database/sqlite")

class UsersController {
    
    async create(request, response) {
        const { name, email, password } = request.body;
        
        const database = await sqliteConecition();
        const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

        if(checkUserExists) {
            throw new AppError("Este usuário ja esta em uso.")
        }
        
        await database.run("INSERT INTO users (name, email, password) VALUES = (?, ?, ?)", [name, email, password])
        
        return response.status(201).json();
    }
    
}

module.exports = UsersController