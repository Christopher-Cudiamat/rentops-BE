

module.exports = {

  postChangePassword: async(req, res) => {
    const {email,newPassword} = req.body;
    console.log("BODY",req.body)
    console.log("EMAIL",typeof email)
    console.log("EMAIL",typeof newPassword)
    const filter = { "local.email": email };
    const update = { "local.password": newPassword };

    try { 

      let user = await User.findOneAndUpdate(filter, update, {
        new: true
      });

      await user.save();
      return res.status(200).json({message: "Change password successful"});

    } catch (error) {
      return res.status(500).json({error: 'Oops something went wrong please try again later'});
    }
  },
}