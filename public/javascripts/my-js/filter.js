(function (global) {
  let dc = {};
  let nItems = 6;
  let nLoaded = 0;
  let nTurn = 0;
  let sortType = "normal";

  let productsDbUrl = "/product/";
  let queryStr = "";
  let categorySingleProductHtmlUrl = '/snippets/category-single-product.ejs';
  let snippet;
  let data = [];

  getSnippet = async () => {
    await $.get(categorySingleProductHtmlUrl, (data, status) => {
      snippet = data;
    });
  }

  // getSnippet();

  snippet = `

  <div class="f_p_item col-md-4 col-xs-6" style="display: block;">
  <div class="product">
  <div class="product-img">
  <img src="{{imagePath}}" alt="">
  </div>
  <div class="product-body">
  <p class="product-category">{{location}}</p>
  <h3 class="product-name"><a href="product/{{_id}}">{{title}}</a></h3>
  <h4 class="product-price">{{price}}</h4>
  </div>
  <div class="add-to-cart">
  <button  type="button" id="addwishlist" class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i>{{_id}} add to
  Wishlist</button>
  <input class="input" type="text" id="proid" value="{{_id}}" hidden  placeholder="{{_id}}">
  </div>
  </div>
  </div>
  `;

  dc.getData = async () => {
    console.log('aaaaaaaaaaaaaaaaa');
    let realProductsDbUrl = productsDbUrl + nTurn + "/" + sortType + queryStr;
    console.log(realProductsDbUrl);
    realProductsDbUrl = encodeURI(realProductsDbUrl);
    let delta;
    await $.get(realProductsDbUrl, (res, status) => {
      data = res;
      $("#category-single-product-section").empty();
      $("#category-single-product-section").append(data);
      delta = res.length;
      nTurn++;
    });
    // buildView();
    nLoaded = data.length;
  }

  // buildView = () => {
  //   let finalHtml = "";
  //   for (let i = 0; i < data.length; i++) {
  //     let tmp = insertProperty(snippet, "title", data[i].name);
  //     tmp = insertProperty(tmp, "price", data[i].price);
  //     tmp = insertProperty(tmp, "imagePath", data[i].images);
  //     tmp = insertProperty(tmp, "_id", data[i]._id);
  //     console.log(data[i].location);
  //     switch (data[i].location) {
  //       case 1:
  //         tmp = insertProperty(tmp, "location", "Tp.Hồ Chí Minh");
  //         break;
  //       case 2:
  //         tmp = insertProperty(tmp, "location", "Hà Nội");
  //         break;
  //       case 3:
  //         tmp = insertProperty(tmp, "location", "Đà Nẵng");
  //         break;
  //       case 4:
  //         tmp = insertProperty(tmp, "location", "Cần Thơ");
  //         break;
  //       case 5:
  //         tmp = insertProperty(tmp, "location", "Huế");
  //         break;
  //       default:
  //       // code block
  //     }
  //     finalHtml += tmp;
  //   }
  //   $("#category-single-product-section").empty();
  //   $("#category-single-product-section").append(finalHtml);
  // }


  activePageNum = (pageNum) => {
    $('#page-pagination .page-item').each(function () {
      if ($(this).hasClass("active")) {
        $(this).removeClass("active");
      }

      if (parseInt($(this)[0].innerText) == pageNum) {
        $(this).addClass("active");
      }
    });
  }


  dc.loadMoreNew = (nPage) => {
    activePageNum(nPage);

    (async () => {
      if (nPage * nItems > nLoaded) {
        await dc.getData();
      }

      $('.f_p_item').each(function (i) {
        if ($(this)[0].style.display == 'block') {
          $(this)[0].style.display = 'none';
        }
      });

      $('.f_p_item').each(function (i) {
        if (i >= nItems * (nPage - 1) && (i < nItems * nPage)) {
          if ($(this)[0].style.display == 'none') {
            $(this)[0].style.display = 'block';
          }
        }
      });
    })();
  }


  dc.filter = () => {
    let tmpQueryStr = "?type=";
    $(".type-filter input").each(function () {
      if ($(this)[0].checked) {
        tmpQueryStr += $(this)[0].value + ",";
      }
    });
    tmpQueryStr = tmpQueryStr.substring(0, tmpQueryStr.length - 1);

    tmpQueryStr += "&location=";
    $(".location-filter input").each(function () {
      if ($(this)[0].checked) {
        tmpQueryStr += $(this)[0].value + ",";
      }
    });
    tmpQueryStr = tmpQueryStr.substring(0, tmpQueryStr.length - 1);

    tmpQueryStr += "&status=";
    $(".status-filter input").each(function () {
      if ($(this)[0].checked) {
        tmpQueryStr += $(this)[0].value + ",";
      }
    });
    tmpQueryStr = tmpQueryStr.substring(0, tmpQueryStr.length - 1);

    tmpQueryStr += "&title=";
    tmpQueryStr += $('.search-txt')[0].value;

    tmpQueryStr += '&price=';
    tmpQueryStr += $('#amount')[0].value + '';

    tmpQueryStr = tmpQueryStr.substring(0, tmpQueryStr.length - 1);
    queryStr = tmpQueryStr;

    nTurn = 0;
    nLoaded = 0;

    dc.loadMoreNew(1);
  }

  dc.sort = (type) => {
    console.log('sort');
    sortType = type;
    nTurn = 0;
    nLoaded = 0;
    dc.loadMoreNew(1);
  }

  // $("#sort-filter option").each(function () {
  //   if ($(this)[0].value == 1) {
  //     $(this).attr('onclick', () => {
  //       return "dc.sort('normal')";
  //     })
  //   }

  //   if ($(this)[0].value == 2) {
  //     $(this).attr('onclick', () => {
  //       return "dc.sort('priceAsc')";
  //     })
  //   }

  //   if ($(this)[0].value == 3) {
  //     $(this).attr('onclick', () => {
  //       return "dc.sort('priceDsc')";
  //     })
  //   }
  // });

  $('#sort-filter').change(() => {
    if ($('#sort-filter')[0].value == 1) {
      dc.sort('normal');
    }

    if ($('#sort-filter')[0].value == 2) {
      dc.sort('priceAsc');
    }

    if ($('#sort-filter')[0].value == 3) {
      dc.sort('priceDsc');
    }
  });

  $(".search-txt").on('keyup', function (e) {
    if (e.keyCode === 13) {
      dc.filter();
    }
  });

  insertProperty = (snippet, key, value) => {
    var pattern = "{{" + key + "}}";
    let tmp = snippet;
    tmp = tmp.replace(new RegExp(pattern, "g"), value);
    return tmp;
  }

  dc.search = () => {
    // let keyWord = $('.nav-item.searchbox .search-txt')[0].value;
    // $('#search-bar')[0].href = "/search-result/" + keyWord;

    $('#dynamic-body').empty();
    $.get(searchResultHtml, (data, status) => {
      $('#dynamic-body').append(data);
    });

    dc.filter();
  }

  global.dc = dc;
})(window);