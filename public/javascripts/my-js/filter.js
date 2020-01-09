(function (global) {
  let dc = {};
  let nItems = 8;
  let nLoaded = 0;
  let nTurn = 0;
  let sortType = "normal";

  let productsDbUrl = "http://localhost:3000/";
  let queryStr = "";
  let categorySingleProductHtmlUrl = '/snippets/category-single-product.ejs';
  let snippet;
  let data = [];

  getSnippet = async () => {
    await $.get(categorySingleProductHtmlUrl, (data, status) => {
      snippet = data;
    });
  }

  getSnippet();

  dc.getData = async () => {
    console.log('aaaaaaaaaaaaaaaaa');
    let realProductsDbUrl = productsDbUrl + nTurn + "/" + sortType + queryStr;
    console.log(realProductsDbUrl);
    realProductsDbUrl = encodeURI(realProductsDbUrl);
    let delta;
    await $.get(realProductsDbUrl, (res, status) => {
      data = res;
      delta = res.length;
      nTurn++;
    });
    buildView();
    nLoaded = data.length;
  }

  buildView = () => {
    let finalHtml = "";
    for (let i = 0; i < data.length; i++) {
      let tmp = insertProperty(snippet, "title", data[i].name);
      tmp = insertProperty(tmp, "price", data[i].price);
      tmp = insertProperty(tmp, "imagePath", data[i].images);
      tmp = insertProperty(tmp, "_id", data[i]._id);
      console.log(data[i].location);
      switch (data[i].location) {
        case 1:
          tmp = insertProperty(tmp, "location", "Tp.Hồ Chí Minh");
          break;
        case 2:
          tmp = insertProperty(tmp, "location", "Hà Nội");
          break;
        case 3:
          tmp = insertProperty(tmp, "location", "Đà Nẵng");
          break;
        case 4:
          tmp = insertProperty(tmp, "location", "Cần Thơ");
          break;
        case 5:
          tmp = insertProperty(tmp, "location", "Huế");
          break;
        default:
        // code block
      }
      finalHtml += tmp;
    }
    $("#category-single-product-section").empty();
    $("#category-single-product-section").append(finalHtml);
  }


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
    sortType = type;
    nTurn = 0;
    nLoaded = 0;
    dc.loadMoreNew(1);
  }

  $("#sort-filter option").each(function () {
    if ($(this)[0].value == 1) {
      $(this).attr('onclick', () => {
        return "dc.sort('normal')";
      })
    }

    if ($(this)[0].value == 2) {
      $(this).attr('onclick', () => {
        return "dc.sort('priceAsc')";
      })
    }

    if ($(this)[0].value == 3) {
      $(this).attr('onclick', () => {
        return "dc.sort('priceDsc')";
      })
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