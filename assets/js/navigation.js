/**
 * Settings: Navigation.
 */
var navSettings = {
    'icon_closed' : '+ <span class="screen-reader-text">(expand)</span>',
    'icon_open': '- <span class="screen-reader-text">(collapse)</span>'
};

/**
 * Function: Get Siblings of an Element.
 * Source: https://www.javascripttutorial.net/javascript-dom/javascript-siblings/
 */
var getSiblings = function (e) {
    // for collecting siblings.
    var siblings = [];
    
    // if no parent, return no sibling.
    if (!e.parentNode) {
        return siblings;
    }

    // first child of the parent node.
    var sibling = e.parentNode.firstChild;

    // collecting siblings
    while (sibling) {
        if (sibling.nodeType === 1 && sibling !== e) {
            siblings.push(sibling);
        }
        sibling = sibling.nextSibling;
    }

    return siblings;
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
            // Add a class to <li> for wider devices to help showing an downward icon.
            anchor.parentElement.classList.add('has-submenu');

            var submenu_id = 'submenu-' + index;
            ul.setAttribute('id', submenu_id); // A11y

            var btn = document.createElement('button');
            anchor.appendChild(btn);
            btn.className = 'toggle-button';
            btn.setAttribute('aria-expanded', false); // A11y
            btn.setAttribute('aria-controls', submenu_id); // A11y
            btn.innerHTML = navSettings.icon_closed;
        }
    });
});

/**
 * Navigation: Toggle Sub-menus on Click.
 * 
 * @see getSiblings()
 */
var toggle_buttons = document.querySelectorAll('.toggle-button');

toggle_buttons.forEach(function (toggle_button, index) {
    toggle_button.addEventListener('click', function (event) {
        event.preventDefault();

        var anchor = this.parentElement;
        if (anchor.classList.contains('active')) {
            anchor.classList.remove('active');
            this.innerHTML = navSettings.icon_closed;
            this.setAttribute('aria-expanded', false); // A11y
        } else {
            // Close all elements except this one.
            var lis = getSiblings(anchor.parentElement);
            lis.forEach(function(li) {
                // Remove .active from <a>.
                li.firstElementChild.classList.remove('active');

                // Change icon on the button.
                var button_elem = li.firstElementChild.querySelector('button');
                if (button_elem !== null) {
                    button_elem.innerHTML = navSettings.icon_closed;
                }
            });

            // Open this one.
            anchor.classList.add('active');
            this.innerHTML = navSettings.icon_open;
            this.setAttribute('aria-expanded', true); // A11y
        }
    });
});