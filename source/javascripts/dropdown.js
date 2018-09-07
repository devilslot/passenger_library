(function(){
var select = document.querySelector('.<%= dropdown_type.downcase %> select');
var arr = ["<%= dropdown_items.map(&:downcase).join('", "') %>"];

function changeHandler() {
  var self = this;
  var location = window.location.href;
  var value = self.value.toLowerCase();

  arr.forEach(function(item) {
    if (item !== value && location.indexOf(item) !== -1) {
      if (value === 'node') {
        value = 'nodejs';
      }
      window.location = location.replace(item, value);
    }

    // change logo if this's value doesn't change the content
    self.style.backgroundImage = "url(\"../../../images/" + value + ".svg\")";

    // save selection in localStorage
    localStorage.setItem(self.name, self.value);
  });
}

select.addEventListener('change', changeHandler.bind(select));

(function(element, array) {
  var location = window.location.href;
  var value = array.find(item => (location.indexOf(item) !== -1));
  if (!localStorage.getItem(element.name) && !value) {
    value = array[0];
  }
  if (value) {
    localStorage.setItem(element.name, value.replace(/^(.)(.*)/, (match, p1, p2) =>
      p1.toUpperCase() + p2.toLowerCase()
    ));
  }
})(select, arr);

(function (element) {
  var value = localStorage.getItem(element.name);
  var option = element.querySelector("option[value=" + value + "]");
  option.setAttribute('selected', true);
  changeHandler.bind(element)();
})(select);
})();
