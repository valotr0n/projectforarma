 // Инициализируем клиент только после полной загрузки страницы
 window.onload = function() {
    gapi.load('client', initClient);
  };

  function initClient() {
    gapi.client.init({
      apiKey: 'AIzaSyACWC0tqYNds-ErRC-FkUBqx3j0vVRpcFk', 
      discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function () {
      loadSheetData();
    });
  }

  function loadSheetData() {
    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: '16Zdhw0WLdkPET8OSU9782QMUUiTQWB7bhHvjsOQSu-0',
      range: '!A1:B41',
    }).then(function (response) {
      const data = response.result.values;
      renderTable(data);
    }, function (error) {
      console.log('Ошибка при загрузке данных с Google Sheets: ' + error.result.error.message);
    });
  }

function renderTable(data) {
    const tableBody = document.querySelector('tbody');
    tableBody.innerHTML = ''; // Очищаем таблицу перед загрузкой новых данных

    data.forEach(row => {
        // Обрезаем пробелы в начале и конце строки, чтобы избежать проблем с пробелами
        const firstCellContent = row[0].trim();

        // Если строка начинается с "Отделение", то это заголовок группы
        if (firstCellContent.startsWith("Отделение")) {
            // Создаем строку для заголовка отделения
            const tr = document.createElement('tr');
            tr.classList.add('division-header'); // Добавляем класс для стилизации
            const td = document.createElement('td');
            td.colSpan = 2; // Заголовок отделения занимает 2 колонки
            td.textContent = firstCellContent; // Название отделения
            tr.appendChild(td);
            tableBody.appendChild(tr);

            // Добавляем строку с заголовками "Позывной" и "Должность"
            const headerRow = document.createElement('tr');
            const callSignHeader = document.createElement('th');
            const positionHeader = document.createElement('th');
            callSignHeader.textContent = 'Позывной';
            positionHeader.textContent = 'Должность';
            headerRow.appendChild(callSignHeader);
            headerRow.appendChild(positionHeader);
            tableBody.appendChild(headerRow);
        } else {
            // Если это не заголовок отделения, то это строка с данными игрока
            const tr = document.createElement('tr');
            row.forEach(cell => {
                const td = document.createElement('td');
                td.textContent = cell;
                tr.appendChild(td);
            });
            tableBody.appendChild(tr);
        }
    });
}

  