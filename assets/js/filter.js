/* Календарь */

$( function() {
    $( "#datepicker" ).datepicker({
        clearButton: true,
        minDate: new Date(),
        onSelect(date, formattedDate, inst){
            inst.hide();
        }
    });
});

/* Фильтр */

document.addEventListener('DOMContentLoaded', function() {
    // `NodeList` из выпадающих списков.
    const SELECTS = document.querySelectorAll('select.linked__data');
    // `NodeList` товаров для фильтрации.
    const LIST = document.querySelectorAll('#result .filtered');
  
    // Индекс текущего выпадающего списка,
    // в котором было изменено значение пользователем.
    let currentIndex = 0;
  
    // Функция фильтрации и перерисовки выпадающих списков.
    function filterList(event, index) {
      // Массив классов из выбранных выпадающих списков.
      const query = [];
  
      // Уникальных значения выбранных классов
      // для обновленного списка.
      // Нужен для перестроения выпадающих списков.
      const filtered = new Set();
  
      // 1. Меняем индекс текущего выпадающего списка,
      // на котором был произведен выбор пользователем.
      currentIndex = index;
  
      // 2. Формирование запроса для выбранных значений всех `select`.
      SELECTS.forEach(function(select, index) {
        // Сбрасываем `value`, если `index` больше текущего выбранного.
        if (index > currentIndex) select.value = '';
  
        // Если в списке выбран пункт, добавляем в запрос.
        if (select.value) query.push(select.value);
      });
  
      // 3. Фильтруем список товаров, попутно формируя `filtered`.
      LIST.forEach(function(product, index) {
        if (query.every(prop => product.classList.contains(prop))) {
          product.classList.forEach(function(item){
            filtered.add(item)
          });
          product.classList.remove('hide');
        } else {
          product.classList.add('hide');
        }
      });
  
      // 4. По отфильтрованным данным формируем доступные выпадающие списки.
      // Для текущего списка ничего не меняем, поэтому currentIndex + 1,
      // то есть начинаем формирование только со следующего.
      let i = document.querySelectorAll('select[name=filter__type] option');
  
     
       
          i.forEach(function(option) {

            
            // Если элемент списка не имеет `value` или
            // `value` находится в `filtered`, то покажем его.
            if (option.value == '' || filtered.has(option.value)) {
              option.classList.remove('hide');
            } else {
              option.classList.add('hide');
            }
          });
      
    }
  
    // Регистрируем обработчика события для каждого выпадающего списка.
    SELECTS.forEach(function(item, index) {
        item.addEventListener('change', (event) => filterList(event, index));
    });
});

