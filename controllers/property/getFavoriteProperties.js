const Property = require("../../models/Property");

module.exports = {
  getFavoriteProperties: async (req, res) => {
    let { propertyId } = req.query;

    var param = propertyId[0].split(",");
    try {
      const favorites = await Property.find({
        _id: { $in: param },
      });

      if (!favorites) {
        return res.status(422).json({ msg: "No property result" });
      }

      res.json(favorites);
    } catch (error) {
      res.status(500).send("Ooops something went wrong please try again later");
    }
  },
};
