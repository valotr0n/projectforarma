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

function hidePreloader() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
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
          handleError('Данные отсутствуют или некорректны');
      }
  } catch (error) {
      handleError(error);
  }
}

function handleError(error) {
    console.error('Ошибка:', error);
    hidePreloader();
    // Можно добавить отображение сообщения об ошибке для пользователя
}

// Рендеринг таблицы
function renderTable(data) {
  const tableBody = document.querySelector('tbody');
  tableBody.innerHTML = '';

  const fragment = document.createDocumentFragment(); 

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

  tableBody.appendChild(fragment); 

  // Скрываем прелоадер после загрузки данных
  hidePreloader();
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

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const rows = document.querySelectorAll('tbody tr');
            
            rows.forEach(row => {
                if (row.classList.contains('division-header')) {
                    row.style.display = ''; 
                    return;
                }
                
                const callSign = row.cells[0]?.textContent.toLowerCase();
                if (callSign && callSign.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
});
