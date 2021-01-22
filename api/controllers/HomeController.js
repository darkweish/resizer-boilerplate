/**
 * HomeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  home: async function(req, res) {
    let user = await User.findOne(req.user.id).populate('image');
    res.view('home/home', {user:user});
  }
};
