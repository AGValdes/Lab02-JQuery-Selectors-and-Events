'use strict';
let imageArray = [];

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
  $imageClone.find('h2').text(this.title);
  $imageClone.find('p').text(this.description);
  $imageClone.attr('class', this.keyword);
  $imageClone.removeClass('photo-template');
}

function populateDropDown() {
  imageArray.forEach(item => {
    console.log(item);
    $('select').append(`<option value= ${item}>${item}</option>`);
  });
}

Image.readJson = () => {
  const ajaxSettings = { method: 'get', dataType: 'json' };

  $.ajax('data/page-1.json', ajaxSettings)
    .then(data => {
      data.forEach(item => {
        if (!imageArray.includes(item.keyword)) {
          imageArray.push(item.keyword);
        }
        let renderedImage = new Image(item);
        renderedImage.render();
      });
      populateDropDown();
    })
}
$(() => Image.readJson());

$('section').toggle(false);



$('select').on('change', function () {
  $('section').toggle(false);
  let grabKeyword = $(this).find(':selected').attr('value');
  $(`.${grabKeyword}`).toggle();
});
