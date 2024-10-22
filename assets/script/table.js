window.onload = function() {
  gapi.load('client', initClient);
};

// Инициализация Google API клиента
function initClient() {
  gapi.client.init({
      apiKey: 'AIzaSyACWC0tqYNds-ErRC-FkUBqx3j0vVRpcFk',
      discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  }).then(loadSheetData)
  .catch(error => {
      console.error('Ошибка инициализации клиента:', error);
  });
}

// Загрузка данных с Google таблицы
async function loadSheetData() {
  try {
      const response = await gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: '16Zdhw0WLdkPET8OSU9782QMUUiTQWB7bhHvjsOQSu-0',
          range: '!A1:B41',
      });

      const data = response.result.values;
      if (data && data.length > 0) {
          renderTable(data);
      } else {
          console.log('Данные отсутствуют или некорректны');
      }
  } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
  }
}

// Рендеринг таблицы
function renderTable(data) {
  const tableBody = document.querySelector('tbody');
  tableBody.innerHTML = ''; // Очищаем таблицу

  const fragment = document.createDocumentFragment(); // Оптимизация с помощью DocumentFragment

  data.forEach(row => {
      const firstCellContent = row[0].trim();

      if (firstCellContent.startsWith('Отделение')) {
          // Заголовок для отделения
          const tr = document.createElement('tr');
          tr.classList.add('division-header');
          const td = document.createElement('td');
          td.colSpan = 2;
          td.textContent = firstCellContent;
          tr.appendChild(td);
          fragment.appendChild(tr);

          // Строка с заголовками "Позывной" и "Должность" при создании нового заголовка "Отеделение"
          const headerRow = createHeaderRow();
          fragment.appendChild(headerRow);
      } else {
          // Данные для игрока
          const tr = document.createElement('tr');
          row.forEach(cell => {
              const td = document.createElement('td');
              td.textContent = cell;
              tr.appendChild(td);
          });
          fragment.appendChild(tr);
      }
  });

  tableBody.appendChild(fragment); // Добавляем все элементы 
}

function createHeaderRow() {
  const headerRow = document.createElement('tr');
  const callSignHeader = document.createElement('th');
  const positionHeader = document.createElement('th');
  callSignHeader.textContent = 'Позывной';
  positionHeader.textContent = 'Должность';
  headerRow.appendChild(callSignHeader);
  headerRow.appendChild(positionHeader);
  return headerRow;
}
