const connection = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {

    async list(request, response) {

        const result = await connection('ongs').select('*')
    
        return response.json(result);
    },

    async create(request, response) {

        const {name, email, city, uf, whatsapp} = request.body;

        const id = generateUniqueId();

       await connection('ongs').insert({
            id, 
            name,
            email,
            city,
            uf,
            whatsapp
        });
        
        return response.json({ id });
    }
}  

