const cloudUpload = {
  restrict: 'E',
  template: require('./cloudUpload.html'),
  controller: CloudUploadController
};

function CloudUploadController(Upload) {
  this.upload = (file) => {
    Upload.upload({
      url: 'https://api.cloudinary.com/v1_1/drjvh4g6x/image/upload/',
      data: { file: file, upload_preset: 'zero8500zero', api_key: '467695578193825' }
    }).then(res => {
      this.imgUrl = res.data.url;
    }, err => {
      console.log(err);
    }, avt => {
      console.log(avt.loaded, avt.total);
    });
  };

  this.submitImage = () => {
    if (this.image) {
      this.upload(this.image);
    }
  };
}

CloudUploadController.$inject = ['Upload'];

export default cloudUpload;
