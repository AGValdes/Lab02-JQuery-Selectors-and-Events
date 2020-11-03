'use strict';

function Image(image); {
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
}

Image.prototype.render = function() {
  let $imageClone = $('#photo-template');
}