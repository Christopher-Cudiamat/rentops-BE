module.exports = {

  getNavigationStructure: async(req, res) => {
    try {
      
      const navigation = [
        {
          productTitle: "Dior",
          price: 100
        },
        {
          productTitle: "Dior",
          price: 100
        },
        {
          productTitle: "Dior",
          price: 100
        },
        {
          productTitle: "Dior",
          price: 100
        }
        
      ]
      
      

      res.json(navigation);
    } catch (error) {
  
      res.status(500).send('Server Error');
    }
  }

}