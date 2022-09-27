$(document).ready(function () {
  // 모달창
  let modalWrap = $(".modal-wrap");
  let modalClose = $(".modal-close");

  modalClose.click(function () {
    modalWrap.stop().fadeOut(500);
    // 추가기능 : 스크롤바 살리기
    // $('html').css('overflow', 'auto');
  });
  let modalMain = $(".modal-main");
  //내용 배경 클릭
  modalMain.click(function (event) {
    // 클릭 정보 전달 막기
    event.stopPropagation();
  });
  //전체 배경 클릭
  modalWrap.click(function () {
    modalWrap.stop().fadeOut(500);
    // 추가기능 : 스크롤바 살리기
    // $('html').css('overflow', 'auto');
  });
  $("html").keydown(function (key) {
    if (key.keyCode == 13) {
      modalWrap.stop().fadeOut(200);
      $("html").css("overflow", "auto");
    }
  });

  // 메뉴버튼 클릭시 모바일 메뉴 화면
  let mbBtn = $(".menu-btn");
  let mbWrap = $(".mb-wrap");
  let mbGnb = $(".mb-gnb");
  let mbHeaderBtn = $(".mb-header-bt");
  let mbDim = $(".mb-wrap-show");

  mbBtn.click(function (event) {
    event.preventDefault();
    mbWrap.addClass("mb-wrap-show");
    mbGnb.addClass("mb-gnb-show");
  });

  mbHeaderBtn.click(function () {
    mbWrap.removeClass("mb-wrap-show");
    mbGnb.removeClass("mb-gnb-show");
  });

  let header = $(".header");

  $(window).scroll(function () {
    let temp = $(window).scrollTop();
    if (temp > 0) {
      header.addClass("header-fix");
    } else {
      header.removeClass("header-fix");
    }
  });

  // goTop btn
  let go_top = $(".gotop");
  console.log(go_top);

  $(window).scroll(function () {
    let temp = $(window).scrollTop();
    if (temp > 500) {
      go_top.addClass("gotop-show");
    } else {
      go_top.removeClass("gotop-show");
    }
  });

  // gotop 눌렀을 때 최상단으로 가는거
  go_top.click(function () {
    $("html").animate(
      {
        scrollTop: 0,
      },
      1000
    );
  });

  let resBtn = $(".res-footer-bt");
  let resDepth = $(".res-depth");

  resBtn.click(function () {
    resDepth.toggleClass("res-depth-open");
    resBtn.toggleClass("res-footer-bt-toggle");
  });
});

window.onload = function () {
  AOS.init();
  //     $("#wrapper").dotdotdot({
  //         wrapper  : 'div',  /*  콘텐트를 감쌀 요소. */
  //         ellipsis: '... ',  /*  말줄임표를 뭘로 할지 */
  //         wrap  : 'word',    /*  자를 단위. 다음 옵션 중 하나 선택: 'word'/'letter'/'children' */
  //         after  : null,     /*  자르고 나서도 유지시킬 요소를 jQuery 선택자로 적는다. */
  //         watch  : false,    /*  윈도우가 리사이즈될 때 업데이트할 건지: true/'window' */
  //         height  : null,     /*  선택. max-height를 지정한다. 만약 null이면 알아서 잰다. */
  //         tolerance: 0       /*  글이 넘치면 이만큼쯤 height를 늘린다 */
  //       });

  // 데이터 받아보기
  fetch("itemlist.json")
    .then((res) => res.json())
    .then((data) => {
      // console.log(data)

      let html = "";

      data.forEach((element) => {
        console.log(element);
        html += `
                <div class="goods-list">
                <img src="${element.url}" alt="gg">
                <span class="goods-list-hover">
                <img src="${element.hoverurl}" alt="">
                </span>
                <div class="goods-list-desc">
                <p class="item-tag">${element.tag}</p>
                <p class="item-title">${element.title}</p>
                <p class="item-price"><span class="item-sale">${element.price}</span>${element.subtitle}</p>
                </div>
                </div>
                    `;
        // html += `
        // <div class="goods-list" id="item-list">
        //         <img src="${element.url}" alt="gg">
        //     <span class="goods-list-hover" id="item-list">
        //         <img src="${element.hoverurl}" alt="">
        //     </span>
        //     <div class="goods-list-desc" id="item-list">
        //         <p>${element.title}</p>
        //         <p>${element.title}</p>
        //     </div>
        //     </div>
        //     `;
      });
      html += "";
      document.getElementById("item-list").innerHTML = html;
    })
    .catch((err) => console.log(err));

  let dataPromise = function (_method, _url, _payload) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open(_method, _url);
      xhr.setRequestHeader("Content-type", "application/json");
      let jData = JSON.stringify(_payload);
      xhr.send(jData);

      xhr.onreadystatechange = function (e) {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        if (xhr.status === 200) {
          resolve(xhr.response);
          console.log(xhr.responseText);
        } else {
          reject(console.log("Error"));
        }
      };
    });
  };

  dataPromise("GET", "itemlistmd.json")
    .then(JSON.parse)
    .then(showMd)
    .catch(console.error);

  function showMd(_obj) {
    console.log("성공", _obj);

    let html = ``;

    _obj.forEach((element) => {
      console.log(element.url);
      html += `
            <div class="goods-list">
                <img src="${element.url}" alt="gg">
                <span class="goods-list-hover">
                <img src="${element.hoverurl}" alt="">
                </span>
                <div class="goods-list-desc">
                <p class="item-tag">${element.tag}</p>
                <p class="item-title">${element.title}</p>
                <p class="item-price"><span class="item-sale">${element.price}</span>${element.subtitle}</p>
                </div>
                </div>
            `;
    });
    html += ``;
    document.getElementById("md-item-list").innerHTML = html;
  }

  // item-list-bottom
  fetch("itemlistbottom.json")
    .then((res) => res.json())
    .then((data) => {
      // console.log(data)

      let html = "";

      data.forEach((element) => {
        console.log(element);
        html += `
                <div class="goods-list">
                <img src="${element.url}" alt="gg">
                <span class="goods-list-hover">
                <img src="${element.hoverurl}" alt="">
                </span>
                <div class="goods-list-desc">
                <p class="item-tag">${element.tag}<span class="item-subtag">${element.subtag}</span></p>
                <p class="item-title">${element.title}</p>
                <p class="item-price"><span class="item-sale">${element.price}</span>${element.subtitle}</p>
                </div>
                </div>
                    `;
      });
      html += "";
      document.getElementById("item-list-bottom").innerHTML = html;
    })
    .catch((err) => console.log(err));

  let visualSwiper = new Swiper(".sw-visual", {
    loop: true,
    speed: 500,
    autoplay: {
      delay: 1000,
    },
    pagination: {
      el: ".swiper-pagination",
    },
    navigation: {
      nextEl: ".sw-next-bt",
      prevEl: ".sw-prev-bt",
    },
  });

  // 스와이퍼바텀
  // 스와이퍼

  fetch("swiper.json")
    .then((res) => res.json())
    .then((data) => {
      // console.log(data)

      let html = "";

      data.forEach((element) => {
        console.log(element);
        html += `
        <div class="swiper-slide main-slide">
        <img src="${element.url}" alt="">
        <span class="swiper-img-hover">
            <img src="${element.hoverurl}" alt="">
        </span>
        <div class="main-item-desc">
            <p class="item-tag">${element.tag}<span class="item-subtag">${element.subtag}</span></p>
            <p>${element.title}</p>
            <p class="item-price"><span class="item-sale">${element.price}</span>${element.subtitle}</p>
        </div>
        </div>
        `;
      });
      html += "";
      document.getElementById("main-slide").innerHTML = html;

      new Swiper(".sw-main-item", {
        loop: true,
        speed: 500,
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 6,
        navigation: {
          nextEl: ".main-item-prev",
          prevEl: ".main-item-next",
        },
        breakpoints: {
          760: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 6,
          },
        },
      });
    })
    .catch((err) => console.log(err));

  fetch("swiper.json")
    .then((res) => res.json())
    .then((data) => {
      // console.log(data)

      let html = "";

      data.forEach((element) => {
        console.log(element);
        html += `
            <div class="swiper-slide main-slide">
            <img src="${element.url}" alt="">
            <span class="swiper-img-hover">
                <img src="${element.hoverurl}" alt="">
            </span>
            <div class="main-item-desc">
            <p class="item-tag">${element.tag}<span class="item-subtag">${element.subtag}</span></p>
            <p>${element.title}</p>
            <p class="item-price"><span class="item-sale">${element.price}</span>${element.subtitle}</p>
            </div>
            </div>
            `;
      });
      html += "";
      document.getElementById("main-slide-bottom").innerHTML = html;

      new Swiper(".sw-main-item-bottom", {
        loop: true,
        speed: 500,
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 6,
        navigation: {
          nextEl: ".main-item-prev",
          prevEl: ".main-item-next",
        },
        breakpoints: {
          760: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 6,
          },
        },
      });
    })
    .catch((err) => console.log(err));
};
