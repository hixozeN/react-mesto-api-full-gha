[![Tests](../../actions/workflows/tests-14-sprint.yml/badge.svg)](../../actions/workflows/tests-14-sprint.yml)
# Проект Mesto бэкенд

## API
**Signin/Signup**
* POST /signin — войти (email, password)
* POST /signup — регистрация (required: email, password, additional: name, about, avatar)

**Users**
* GET /users — получить список всех пользователей
* GET /users/__ID__ — получить пользователя по ID
* PATCH /users/me — изменить данные текущего пользователя (name, about)
* PATCH /users/me/avatar — изменить аватар (avatar)

**Cards**
* POST /cards — создать карточку (name, link)
* GET /cards — получить все карточки
* DELETE /cards/__ID__ — удалить карточку по ID
* PUT /cards/__ID__/likes — поставить лайк карточке по ID
* DELETE /cards/__ID__/likes — убрать лайк с карточки по ID

## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки
`/middlewares` — промежуточные миддлвейры
`/utils` — вспомогательные файлы, конфиги
  
## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload

## Ссылка на репозиторий
https://github.com/hixozeN/express-mesto-gha
