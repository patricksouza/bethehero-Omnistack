const connection = require('../database/connection');


module.exports ={
    /**async index(request,response){
        const incidents = await connection('incidents').select('*');
        return response.json(incidents);
    }, */
    async index(request,response){
        const {page = 1} = request.query;

        const [count] = await connection('incidents').count();
        //console.log(count);

        const incidents = await connection('incidents')
        .join('ongs','ongs.id','=','incidents.ong_id')
        .limit(5)
        .offset((page-1)* 5)
        .select(['incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf']);

        response.header('X-Total-Count',count['count(*)']);
        return response.json(incidents);
    },
    async create(request, response){
        const { title, description, value} = request.body;
        const ong_id = request.headers.authorization;

        //const result =
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        //Informações do context desta requisição
        //request.headers
        return response.json({id});
    },

    async delete(request,response){
        const {id} = request.params;
        //Usado para verificar se o caso pertence a ong que quer deletá-lo
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id',id)
            .select('ong_id')
            .first();
        if(incident.ong_id != ong_id){
            //401 = Não autorizado
            return response.status(401).json({error: "Operação não autoriada!"});
        }

        await connection('incidents').where('id',id).delete();

        //204 = Sem conteudo
        return response.status(204).send();
    }
};