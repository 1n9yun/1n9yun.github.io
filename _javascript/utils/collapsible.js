$(function() {
    const headers = $(".collapsible-header");
    const bodies = $(".collapsible-body");
    
    headers.each((index, item) => {
        const header = $($(item).children().get(0));
        const body = $(bodies.get(index));
        const isHidden = body.is(":hidden");

        header.html(`
        <p>
            <span class="collapsible-mark">${getHandShape(isHidden)}</span>
            <span class="collapsible-title">${header.text()}</span>
        </p>
        `);

        header.find("p").click((e) => {
            const shouldHide = !body.is(":hidden");

            header.find(".collapsible-mark").text(getHandShape(shouldHide));
            shouldHide ? body.slideUp(500) : body.slideDown(500);
        });
    });
    
    function getHandShape(flag) {
        return flag ? "✊" : "🖐️";
    }
})