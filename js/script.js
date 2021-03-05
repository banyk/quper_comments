const filterByType = (type, ...values) => values.filter(value => typeof value === type),
	// функция фильтрации получаемых данных
	// в values попадают значения поля "Данные", которые подошли по условию, то есть их тип равен типу по которому идет фильтрация
	// в type попадает значение выбраной опции поля "Тип данных"

	hideAllResponseBlocks = () => {
		// функция скрытия всех блоков с ответом для пользователя
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		// получение всех блоков с ответом пользователю и преобразование в массив
		responseBlocksArray.forEach(block => block.style.display = 'none');
		// перебор массива и скрытие каждого блока через display = none
	},


	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		// функция, которая показывает ответ пользователю
		// в аргументах селектор блока, сообщение и селектор span-а
		hideAllResponseBlocks();
		// вызов функции скрытия всех блоков с ответом
		document.querySelector(blockSelector).style.display = 'block';
		// показ блока, селектор которого передается в аргументы
		if (spanSelector) {
			document.querySelector(spanSelector).textContent = msgText;
			// передача msgText в значение span, если селектор span-а передан
		}
	},

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),
	// функция принимет сообщение для ползователя и вызывает функцию показа блока с ответом об ошибке

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),
	// функция принимет сообщение для ползователя и вызывает функцию показа блока с ответом об успехе

	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),
	// функция вызывает функцию показа блока с ответом том, что пока нечего показать

	tryFilterByType = (type, values) => {
		// безопасная функция фильтрации данных
		try {
			// происходит обычное выполнение кода
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			// вызов функции filterByType и передача аргументов в виде строки через eval
			// создание массива со значениями из переданных аргументов
			const alertMsg = (valuesArray.length) ?
				// если массив не пустой то выполняется следующее
				`Данные с типом ${type}: ${valuesArray}` :
				// в alertMsg записывается сообщение о данных типа type : массив со значениями
				`Отсутствуют данные типа ${type}`;
			// в alertMsg записывается сообщение об отсутствии данных типа type
			//
			showResults(alertMsg);
			// вызывается функция показа результатов
		} catch (e) {
			// происходит выполнение кода в случае возникновения ошибок в блоке try
			showError(`Ошибка: ${e}`);
			// при ошибке вызывается функция showError, которая выводит на страницу блок с ответом об ошибке
		}
	};

const filterButton = document.querySelector('#filter-btn');
// получение элемента-кнопки со страницы по id

filterButton.addEventListener('click', e => {
	// навешивание слушателя события
	const typeInput = document.querySelector('#type');
	const dataInput = document.querySelector('#data');
	// получение элементов-полей ввода со страницы по id

	if (dataInput.value === '') {
		// проверка на то, что поле вводе с данными не пустое
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		// создание специального сообщения об ошибке для поля с данными
		// оповещение пользователя о том, что поле не должно быть пустым
		showNoResults();
		// вызов функции которая показывает блок о том, что результатов пока нет
	} else {
		// в случае если поле ввода с данными не пустое
		dataInput.setCustomValidity('');
		// удаление специального сообщения об ошибке для поля с данными
		e.preventDefault();
		// отмена привычного поведения для события
		// то есть перезагрузки страницы по событию submit
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
		// вызов безопасной функции фильтрации данных с передачей аргументов
	}
});