import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';

// /=======CONFIGURATIONS=======/
const runConfigurations = (app, __filename) => {
  /* 
Эта строка определяет специальную переменную __dirname, которая хранит имя папки, в которой находится файл кода. 
Это полезно, потому что иногда нужно знать точное местоположение файла кода на компьютере или сервере. 
Например, если необходимо прочитать или записать еще один файл в той же папке, то нужно знать полный путь к этой папке. 
В коде используется функция path.dirname(), которая принимает имя файла(index.js) (__filename) и возвращает имя папки(server), в которой он находится.
 */
  const __dirname = path.dirname(__filename);
  /* 
Эта строка указывает приложению использовать встроенную функцию из модуля express, 
которая парсит входящие запросы с данными JSON и делает их доступными в объекте req.body.
*/
  app.use(express.json());
  /* 
Эта строка указывает приложению использовать функцию из модуля helmet, 
которая добавляет некоторые заголовки безопасности в ответы, например, 
для предотвращения атак типа clickjacking и content sniffing. 
*/
  app.use(helmet());
  /* 
Эта строка указывает приложению использовать специальную функцию из модуля helmet,
которая устанавливает заголовок Cross-Origin-Resource-Policy в значение 'cross-origin',
что означает, что приложение может загружать ресурсы из разных источников,
только если они принадлежат одному и тому же сайту или явно разрешены другим сервером с таким же заголовком. */
  app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
  /* 
Эта строка кода указывает приложению использовать инструмент под названием morgan, 
который помогает отслеживать, какие запросы поступают к вашему приложению и как они обрабатываются. 
лово 'common' - это одна из опций, которую предоставляет morgan для форматирования регистрируемой информации. 
Например, он покажет IP адрес запроса, дату и время отправления запроса, метод и URL запроса, код состояния и размер ответа, и так далее.
 */
  app.use(morgan('common'));
  /* 
Эта строка указывает приложению использовать функцию из модуля body-parser, 
которая анализирует входящие запросы с данными JSON и делает их доступными в объекте req.body, 
с некоторыми опциями, такими как ограничение размера данных до 30 мегабайт и разрешение вложенных объектов.
  Удаленный адрес запрашивающего пользователя(127.0.0.1)
  Удаленный пользователь (если доступно)
  Дата и время запроса в формате обычного лога( [03/Apr/2023:02:10:42 +0300])
  Метод и URL запроса(GET / HTTP/1.1)
  HTTP-версия запроса(1.1)
  Код состояния(404) и размер ответа(139)
  */
  app.use(bodyParser.json({ limit: '30mb', extended: true }));
  /* 
Эта строка указывает приложению использовать другую функцию из модуля body-parser, 
которая разбирает входящие запросы с URL-кодированными данными(---) и делает их доступными в объекте req.body, 
с теми же опциями, что и раньше.
 */
  app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
  /* 
Эта строка указывает приложению использовать функцию из модуля cors, 
которая обеспечивает cross-origin совместное использование ресурсов, 
что означает, что приложение может принимать запросы от разных источников и отвечать соответствующими заголовками, 
например, разрешать определенные методы, заголовки и учетные данные.
  */
  app.use(cors());
  /* 
Этот код указывает приложению искать файлы в папке public/assets и отправлять их пользователю. 
Таким образом, пользователь может увидеть изображения, видео, таблицы стилей и другие данные, 
которые придают веб-странице красивый внешний вид и обеспечивают хорошую работоспособность.
  */
  app.use('/assets', express.static(path.join(__dirname, 'public/assets')));
};

export default function applyMiddlewares(app, __filename) {
  runConfigurations(app, __filename);
}
