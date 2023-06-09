[![Tests](../../actions/workflows/tests-13-sprint.yml/badge.svg)](../../actions/workflows/tests-13-sprint.yml) [![Tests](../../actions/workflows/tests-14-sprint.yml/badge.svg)](../../actions/workflows/tests-14-sprint.yml)

# Учебный backend-проект: "Место"

![Image alt](https://i.ibb.co/jkHpLJQ/Screenshot-2113.png)


## 1. Описание проекта

- Данная работа выполнена в рамках образовательной программы Яндекс Практикума. Проект написания серверной логики для последующего объединения с частью frontendа, сделанной на библиотеке "React".

## Чеклисты:

- https://code.s3.yandex.net/web-developer/checklists-pdf/new-program/checklist_14.pdf

- https://code.s3.yandex.net/web-developer/checklists-pdf/new-program/checklist_13.pdf

## 2. Стек технологий

![Image alt](https://i.ibb.co/rp4XNvD/Screenshot-2117.png)

- NODE.JS

- EXPRESS.JS

- POSTMAN

- MONGODB

![Image alt](https://i.ibb.co/djzGCZw/Screenshot-2118.png)

## 3. Установка и запуск приложения в локальном репозитории

1. git clone - клонировать репозиторий (с использованием HTTPS) на свое устройство

2. npm i - установить все зависимости

3. npm run dev - запустить сервер в режиме разработчика с hot-reload (в браузере ввести ссылку http://localhost:3000/ )

## 4. Процесс создания

![Image alt](https://i.ibb.co/FDn30Qz/Screenshot-2116.png)

1. Написание схем, контроллеров и моделей (users & cards), подключение запросов с методами api (см. ниже), добавление кодов и текстов ошибок при неуспешных запросах (400, 404, 500)

2. Расширение схем и контроллеров (users & cards), добавление функций регистрации и авторизации пользователей, валидации данных (celebrate & joi), обработка новых ошибок в едином обработчике (401, 403 и 409), обеспечение безопасности приложения (хэширование паролей пользователей, защита от DoS-атак, настройка заголовков HTTP)

## 5. Функционал

![Image alt](https://i.ibb.co/q1F34NN/Screenshot-2109.png)

- Регистрация пользователя

- Авторизация пользователя

- Получение данных о всех пользователях, об одном и о текущем авторизованном

- Редактирование данных пользователя

- Создание карточки

- Получение карточек

- Переключение лайка карточки

- Удаление карточки

## 6. Статус проекта

- ожидает прохождения проверки ревьювером

## Cсылка на проект

- https://anna-gorgulenko.github.io/express-mesto-gha/
