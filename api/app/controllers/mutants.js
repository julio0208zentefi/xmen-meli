const DNAMatrixService = require('../services/DNAMatrix')
const DNAMatrixModel = require('../models/DNAMatrixModel')

const isMutant = async function(req, res) {

    if(!req.body.dna || !Array.isArray(req.body.dna)) {
        return res.send({
            'message': 'Invalid Request'
        }, 400)
    }

    let dnaMatrix = req.body.dna;

    try {
        DNAMatrixService.checkMatrixSanity(dnaMatrix);
    } catch(exception) {
        return res.send({
            'message': exception.message
        }, 400);
    }

    let isMutant = DNAMatrixService.isMutantDNAMatrix(dnaMatrix);

    const dnaMatrixModel = new DNAMatrixModel({
        'dna_matrix': dnaMatrix.join(','),
        'is_mutant': isMutant
    });

    dnaMatrixModel.save();

    await DNAMatrixService.updateStats(isMutant)

    if(isMutant) {
        res.send({
            'message': 'Mutant DNA'
        }, 200);
        return;
    }

    return res.send({
        'message': 'No Mutant DNA'
    }, 403);
}

const stats = async function(req, res) {

    let stats = await DNAMatrixService.getStats()

    res.send(stats, 200);
}

module.exports = { isMutant, stats }