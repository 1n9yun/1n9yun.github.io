$(function() {
  function getOptions(container) {
    return ($(container).data());
  }

  $(".swiper-container").each((index, swiperContainer) => {
    const swiperContainerNode = $(swiperContainer);
    const swiperOptions = getOptions(swiperContainerNode);
    
    var innerHTML = `<div class="swiper-wrapper" align="center">`;
    swiperContainerNode.find("img").each((index, img) => {
      innerHTML += 
        `<div class="swiper-slide">
            <img src="${$(img).data("src")}" style="width: ${swiperOptions.size ? swiperOptions.size : "100%"}; min-width: 300px" class="swiper-lazy">
            <div class="swiper-lazy-preloader"></div>
        </div>`
    });
    if(swiperOptions.dotted) innerHTML += `<div class="swiper-pagination"></div>`;
    innerHTML += `<div class="swiper-button-next"></div>`;
    innerHTML += `<div class="swiper-button-prev"></div>`;
    innerHTML += `</div>`;

    swiperContainerNode.html(innerHTML);

    new Swiper(`#${swiperContainerNode.attr("id")}`, swiperOptions);
  })
});