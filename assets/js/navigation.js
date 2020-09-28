/**
 * Settings: Navigation.
 */
var navSettings = {
    'icon_closed' : '+',
    'icon_open' : '-'
};


/**
 * General: Javascript initiated.
 */
var html_elem = document.querySelector('html');

html_elem.classList.remove('no-js');
html_elem.classList.add('js');

/**
 * Navigation: Add Toggle Button.
 */
var all_navigations = document.querySelectorAll('.navigation');

all_navigations.forEach(function (navigation, index) {
    var anchors = navigation.querySelectorAll('a');

    anchors.forEach(function(anchor, index) {
      var ul = anchor.nextElementSibling;
      if (anchor.nextElementSibling != null) {
        var submenu_id = 'submenu-' + index;
        ul.setAttribute('id', submenu_id);

        var btn = document.createElement('button');
        anchor.parentNode.insertBefore(btn, anchor);
        btn.className = 'toggle-button';
        btn.setAttribute('aria-expanded', false); // A11y
        btn.setAttribute('aria-controls', submenu_id); // A11y
        btn.textContent = navSettings.icon_closed;
      }
    });
});

/**
 * Navigation: Toggle Sub-menus on Click.
 */
var toggle_buttons = document.querySelectorAll('.toggle-button');

toggle_buttons.forEach(function (toggle_button, index) {
    toggle_button.addEventListener('click', function () {
        var anchor = this.nextElementSibling;
        if (anchor.classList.contains('active')) {
            anchor.classList.remove('active');
            this.textContent = navSettings.icon_closed;
            this.setAttribute('aria-expanded', false); // A11y
        } else {
            anchor.classList.add('active');
            this.textContent = navSettings.icon_open;
            this.setAttribute('aria-expanded', true); // A11y
        }
    });
});