# Проектная работа "Разделение приложения Mesto на микрофронтенды"

В работе реализованы все три уровня решения

## Запуск

Микрофронтенды и хостовое приложение находятся в папке frontend/microfrontend.

### Development

```
// Запуск auth на порту 8081
$ cd frontend/microfrontend/auth
$ npm run start
```

```
// Запуск profile на порту 8082
$ cd frontend/microfrontend/profile
$ npm run start
```

```
// Запуск gallery на порту 8083
$ cd frontend/microfrontend/gallery
$ npm run start
```

```
// Запуск host на порту 8080
$ cd frontend/microfrontend/host
$ npm run start
```

### Production

```
// Запуск auth на порту 8081
$ cd frontend/microfrontend/auth
$ npm run build
$ http-server ./dist -p 8081 --cors
```

```
// Запуск profile на порту 8082
$ cd frontend/microfrontend/profile
$ npm run build
$ http-server ./dist -p 8082 --cors
```

```
// Запуск gallery на порту 8083
$ cd frontend/microfrontend/gallery
$ npm run build
$ http-server ./dist -p 8083 --cors
```

```
// Запуск host на порту 8080
$ cd frontend/microfrontend/host
$ npm run build
$ http-server ./dist -p 8080
```

## Описание работы

### Анализ

В данной работе было принято решение разбить монолит на микрофронтенды на основе предметных областей. 

В ходе анализа приложения были выделены следующие функциональные области:
  - аутентификация и авторизация
  - профиль пользователя
  - галерея

Соответственно, приложение было разбито на следующие микрофронтенды:
  - auth
  - profile
  - gallery

и хостовое приложение:
  - host

### Инструмент

В качестве инструмента был выбран Webpack Module Federation, т.к. он позволяет легко обмениваться зависимостями между микрофронтендами + в данном случае все микрофронтенды будут реализованы на одном и том же стеке (React).
