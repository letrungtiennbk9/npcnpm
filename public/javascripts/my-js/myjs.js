

$(document).ready(function () {
  const API_URL = 'http://localhost:3000/'
  const POST_PRODUCT_URL = 'users/addProduct';

  $('#submit-product').click(function () {
    let fd = new FormData();
    fd.append('name', $('#input-product-name')[0].value);
    fd.append('categoryId', $('#input-category')[0].value);
    fd.append('userId', $('#user-id')[0].innerText);
    fd.append('price', $('#input-price')[0].value);
    fd.append('detail', $('#input-details')[0].value);
    fd.append('location', $('#input-location')[0].value);
    fd.append('brand', $('#input-brand')[0].value);
    fd.append('status', $('#input-status')[0].value);
    fd.append('productImage', $('#input-image-1')[0].files[0]);

    $.ajax({
      type: 'POST',
      url: API_URL + POST_PRODUCT_URL,
      data: fd,
      contentType: false,
      processData: false,
      success: () => {
        console.log('Success');
        // $('#error-dialogue').removeClass('alert-danger');
        // $('#error-dialogue').addClass('alert-success');
        // $('#error-dialogue').text('Add product successfully');
      },
      error: (xhr, status, error) => {
        console.log('error posting');
        console.log(xhr.status);
        console.log(xhr.statusText);
        if (xhr.status == 500) {
          // $('#error-dialogue').addClass(['alert', 'alert-danger']);
          // $('#error-dialogue').text('Invalid format file at field productImage');
        }
        else if (xhr.status == 422) {
          // $('#error-dialogue').addClass(['alert', 'alert-danger']);
          // $('#error-dialogue').text(JSON.parse(xhr.responseText).errors[0].msg + ' at ' + JSON.parse(xhr.responseText).errors[0].param);
        }
      }
    });

    window.location.href = "/users/san-pham";
  });
});