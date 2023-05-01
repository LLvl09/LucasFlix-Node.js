const ValidationContract = require('../validators/fluentValidator');
const repository = require('../repositories/categoriaRepository');


exports.post=  async (req, res) => {
    let contract = new ValidationContract();
    
    contract.hasMinLen(req.body.titulo, 3, 'o titulo deve ter pelo menos 3 caracteres!');
    contract.hasMinLen(req.body.cor, 3, 'A descrição deve ter pelo menos 3 caracteres!');
    
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    try {
        await repository.create(req.body);
        
        res.status(201).send({ message: "categoria cadastrado com sucesso!" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

exports.get= async (req, res) => {
    const data= await repository.get(req.query.page, req.query.limit);

    res.status(200).send(data);
}

exports.getById= async (req, res) => {
    const data = await repository.getById(req.params.id);
    res.status(200).send(data);
}

exports.put=  async (req, res) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({ message: 'Categoria atualizada com sucesso!'});
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

exports.delete=  async (req, res) => {
    try {
        await repository.delete(req.params.id);

        res.status(200).send({message: 'Categoria deletada com sucesso!'});

    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}