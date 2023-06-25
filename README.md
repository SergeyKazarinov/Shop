# Проект: Unicorn

Архитектура: [Feature-Sliced Design](https://feature-sliced.design/)
Shared — переиспользуемый код, не имеющий отношения к специфике приложения/бизнеса.
Entities (сущности) — бизнес-сущности (например, User, Product или Order).
Features (фичи) — взаимодействия с пользователем, действия, которые несут бизнес-ценность для пользователя.
Widgets (виджеты) — композиционный слой для соединения сущностей и фич в самостоятельные блоки.
Pages (страницы) — композиционный слой для сборки полноценных страниц из сущностей, фич и виджетов.
Processes — сложные сценарии, покрывающие несколько страниц (например, аутентификация).
App — настройки, стили и провайдеры для всего приложения.


## Stacks:

- TypeScript
- React
- React-Router v.6
- Redux-Toolkit
- Axios
- SCSS-module
- Eslint

## Быстрый старт

<br />

1. Склонировать проект на свой компьютер

```bash
git clone https://github.com/SergeyKazarinov/unicorn-test.git
```

2. Перейти в папку с проектом и установить зависимости

```bash
cd unicorn-test
npm install
```
3. Запустить сервер

```bash
npm run start:server
```

3. Запустить проект

```bash
npm run start
```