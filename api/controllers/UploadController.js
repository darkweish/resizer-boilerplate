/**
 * UploadController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: async function (req, res){
    req.file('image').upload({
      // don't allow the total upload size to exceed ~10MB
      maxBytes: 10000000
    },function whenDone(err, uploadedFiles) {
      if (err) {
        return res.serverError(err);
      }

      // If no files were uploaded, respond with an error.
      if (uploadedFiles.length === 0){
        return res.badRequest('No file was uploaded');
      }
      Image.create({
        name : uploadedFiles[0].name, //nom du fichier
        path:  uploadedFiles[0].fd,
        uploader: req.user.id, //user connec
      }).exec((err)=>{
        if(err)
          return res.serverError(err);
        return res.ok();
      })

    });
    res.redirect("/");
  },

  show: async function(req, res){
    Image.findOne(req.param('id')).exec((err, img)=>{
      if (err) return res.serverError(err);
      if (!img) return res.notFound();
      var SkipperDisk = require('skipper-disk');
      var fileAdapter = SkipperDisk(/* optional opts */);

      // set the filename to the same file as the user uploaded
      res.set("Content-disposition", "attachment; filename='" +img.path+ "'");

      // Stream the file down
      fileAdapter.read(img.path)
      .on('error', (err)=>{
        return res.serverError(err);
      })
      .pipe(res);
    });
  }
};
