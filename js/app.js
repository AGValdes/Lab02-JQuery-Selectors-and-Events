'use strict';

let imageArray = [];
let titleDropDownArray = [];
let hornDropDownArray = [];

function Image(image) {
  for (let key in image) {
    this[key] = image[key];
  }
}

// function Image(image) {
//   this.image_url = image.image_url;
//   this.title = image.title;
//   this.description = image.description;
//   this.keyword = image.keyword;
//   this.horns = image.horns;
// }

Image.prototype.render = function () {
  let template = $('#photo-template').html();
  let html = Mustache.render(template, this);
  // $('main').append(html);

  return html;
  
  // let $imageClone = $('#photo-template').clone();


  // $('main').append($imageClone);

  // $imageClone.find('img').attr('src', this.image_url);
  // $imageClone.find('h2').text(this.title);
  // $imageClone.find('p').text(this.description);
  // $imageClone.attr('class', this.keyword);
  // $imageClone.removeClass('photo-template');
}

// imageArray.forEach(image => {
//   $('#photo-template').append(image.toHtml());
// });

function populateTitleDropDown() {
  console.log(titleDropDownArray);
  titleDropDownArray.forEach(item => {
    $('#titleDropDown').append(`<option value= ${item}>${item}</option>`);
  });
}

function populateHornDropDown() {
  imageArray.forEach(item => {
    $('#hornDropDown').append(`<option value= ${item.horns}>${item.horns}</option>`);
  });
}

Image.readJson = () => {
  const ajaxSettings = { method: 'get', dataType: 'json' };
  if (document.URL.includes('index.html')) {
  $.ajax('data/page-1.json', ajaxSettings)
    .then(data => {
      data.forEach(item => {
        if (!titleDropDownArray.includes(item.keyword)) {
          titleDropDownArray.push(item.keyword);
          // hornDropDownArray.push(item.horns);
        }
        imageArray.push(new Image(item));
        // renderedImage.render();
      });
      imageArray.forEach(item => {
        $('#imageContainer').append(item.render());
      })
      populateTitleDropDown();
      populateHornDropDown();
    })
} else {
  $.ajax('data/page-2.json', ajaxSettings)
    .then(data => {
      data.forEach(item => {
        if (!titleDropDownArray.includes(item.keyword)) {
          titleDropDownArray.push(item.keyword);
          // hornDropDownArray.push(item.horns);
        }
        imageArray.push(new Image(item));
        // renderedImage.render();
      });
      imageArray.forEach(item => {
      $('#imageContainer').append(item.render());
    })
      populateTitleDropDown();
      populateHornDropDown();
    });
}
}

// $('section').toggle(false);

$('select').on('change', function () {
  // $('section').toggle(false);
  let grabKeyword = $(this).val();
  // .find(':selected').attr('value');
  console.log(grabKeyword);
  $('div').hide();
  $(`div.${grabKeyword}`).fadeIn();
});

$(() => Image.readJson());
