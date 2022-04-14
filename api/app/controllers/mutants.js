const DNAMatrixService = require('../services/DNAMatrix')
const Redis = require('../services/Redis')
const DNAMatrixModel = require('../models/DNAMatrixModel')

const REDIS_KEY = process.env.REDIS_STATS_KEY;

const isMutant = async function(req, res) {

    console.log('[API] [IS_MUTANT] [REQ]', req.body.dna);

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

    let stats = await DNAMatrixModel.getRatioJSON();
    await Redis.setJSON(REDIS_KEY, stats);

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

    let stats = await Redis.getJSON(REDIS_KEY, {
        'count_mutant_dna': 0,
        'count_human_dna': 0,
        'ratio': 0
    });

    res.send(stats, 200);
}

module.exports = { isMutant, stats }