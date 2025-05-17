const mainss  = require('../services/API_services');

module.exports.getreview =  async(req, res) => {
    const code = req.body.code;
    
    if(!code) {
        return res.status(400).json({ error: 'Code is required' });
    }
    const response = await mainss(code);
    res.send(response);
}