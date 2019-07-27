import question from '../../model/question';
export function get(req, res) {
    console.log(req.params);
    const response = {foo: 'is it?'};
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
}
