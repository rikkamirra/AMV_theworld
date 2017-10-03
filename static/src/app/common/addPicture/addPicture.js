import $ from 'jquery';


const addPicture = {
  restrict: 'E',
  template: require('./addPicture.html'),
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: AddPictureController
};

function AddPictureController(Upload, UserService) {
  this.$onInit = () => {
    this.currentPicture = this.resolve.pictures[0];
    this.currentIndex = 0;
    this.pending = false;
    this.style = {
      "width": "0%"
    };
  };

  this.upload = (file) => {
    this.pending = true;
    Upload.upload({
      url: 'https://api.cloudinary.com/v1_1/drjvh4g6x/image/upload/',
      data: { file: file, upload_preset: 'zero8500zero', api_key: '467695578193825' }
    }).then(res => {
      UserService.saveImage({path: res.data.url, instance_type: this.resolve.instance_type || 'account', instance_id: this.resolve.instance_id || UserService.getCurrentUser().id}).then(res => {
        this.resolve.pictures.push(res.data);
        this.currentIndex = this.resolve.pictures.length - 1;
        this.currentPicture = res.data;
        this.style["width"] = "0%";
      });
    }, err => {
      console.log(err);
    }, avt => {
      this.style["width"] = Math.round((avt.loaded / avt.total) * 100) + "%";
    });
  };

  this.changePicture = (toFront) => {
    if (toFront) {
      this.currentIndex = (this.currentIndex + 1) % this.resolve.pictures.length;
    } else {
      if (this.currentIndex) this.currentIndex -= 1;
      else this.currentIndex = this.resolve.pictures.length - 1;
    }

    this.currentPicture = this.resolve.pictures[this.currentIndex];
  };

  this.fileSelected = () => {
    if (this.newImage) {
      this.upload(this.newImage);
    }
  };

  this.selectImage = () => {
    this.close({$value: this.currentPicture});
  };
}

AddPictureController.$inject = ['Upload', 'UserService'];

export default addPicture;
