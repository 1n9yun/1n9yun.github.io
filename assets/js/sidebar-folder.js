function spread(count){
    let submenu = document.getElementById('submenu-' + count);
    if(submenu?.classList.contains('hide')) submenu?.classList.remove('hide');
    else submenu?.classList.add('hide');

    let spreadIcon = document.getElementById('spread-icon-' + count);
    spreadIcon.innerHTML = spreadIcon.innerHTML == 'arrow_right' ? 'arrow_drop_down' : 'arrow_right';
}