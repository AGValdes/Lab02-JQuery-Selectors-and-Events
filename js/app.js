'use strict';
// imageArray = [];

function Image(image) {
  this.image_url = image.image_url;
  this.title = image.title;
  this.description = image.description;
  this.keyword = image.keyword;
  this.horns = image.horns;
}

Image.prototype.render = function () {
  let $imageClone = $('#photo-template').clone();

  $('main').append($imageClone);

  $imageClone.find('img').attr('src', this.image_url);
  $imageClone.find('h2').text(this.name);
  $imageClone.find('p').text(this.description);
}

Image.readJson = () => {
  const ajaxSettings = { method: 'get', dataType: 'json' };

  $.ajax('data/page-1.json', ajaxSettings)
    .then(data => {
      data.forEach(item => {
        let renderedImage = new Image(item);
        renderedImage.render();
      })
    });
}

$(() => Image.readJson());