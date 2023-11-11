const Point = require("../modal/point");

//Method for listing occurrences
module.exports.listOccurrences = async function (req, res){
    const point = await Point.findAll();
    res.status(200).send(point);
};

//Method for adding occurrences
module.exports.addOccurrences = async function (req, res){
    const point = Point.build(req.body);
    try{
        await point.save();
        res.status(202).send("Saved");
    }catch(err){
        console.log(err);
        res.status(400).send("Falid save");
    }
};

//Method for deleting occurrences
module.exports.delOccurrences = async function (req, res){
    try{
        const deletados = await Point.destroy({
          where: { id : req.params.id } });
    
        if(deletados > 0){
          res.status(200).send('Occurrence removed');
        }else{
          res.status(404).send('Occurrence not found');
        }
      }catch(err){
        res.status(400).send('Failed to delete');
      }
};

//Method for updating occurrences
module.exports.updateOccurrences = async function (req, res){
  try {
    const atulizado = await Point.update(
      req.body, {where:{ id: req.params.id}}
    );
    if(atulizado){
      res.status(200).send('Occurrence updated');
    }else{
      res.status(400).send('Occurrence not found');
    }
  } catch (err) {
    res.status(400).send('Failed to update');
  }
}