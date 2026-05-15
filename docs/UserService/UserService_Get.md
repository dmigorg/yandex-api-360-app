# Просмотреть информацию о сотруднике

Возвращает информацию об одном сотруднике.

## Примечание

Требуется разрешение на чтение данных о сотрудниках.

## Request

```
GET https://api360.yandex.net/directory/v1/org/{orgId}/users/{userId}
```

### Параметры пути

| Параметр | Тип | Описание |
|----------|-----|---------|
| `orgId` | integer | Идентификатор организации |
| `userId` | string (uint64) | Идентификатор сотрудника |

## Responses

### 200 OK

Запрос успешно выполнен.

```json
{
  "id": "example",
  "nickname": "example",
  "departmentId": 0,
  "email": "example",
  "name": {
    "first": "example",
    "last": "example",
    "middle": "example"
  },
  "gender": "example",
  "position": "example",
  "avatarId": "example",
  "about": "example",
  "birthday": "example",
  "contacts": [...],
  "aliases": ["example"],
  "groups": [0],
  "externalId": "example",
  "isAdmin": true,
  "isRobot": true,
  "isDismissed": true,
  "isEnabled": true,
  "isEnabledUpdatedAt": "2025-01-01T00:00:00Z",
  "timezone": "example",
  "language": "example",
  "createdAt": "2025-01-01T00:00:00Z",
  "updatedAt": "2025-01-01T00:00:00Z",
  "displayName": "example"
}
```

| Параметр | Тип | Описание |
|----------|-----|---------|
| `about` | string | Описание сотрудника |
| `aliases` | string[] | Список алиасов сотрудника |
| `avatarId` | string | Идентификатор портрета сотрудника |
| `birthday` | string | Дата рождения (YYYY-MM-DD) или пусто |
| `contacts` | v1UserContact[] | Список контактов сотрудника |
| `createdAt` | string (date-time) | Дата и время создания |
| `departmentId` | integer | Идентификатор подразделения |
| `displayName` | string | Публичное имя сотрудника |
| `email` | string | Основной адрес электронной почты |
| `externalId` | string | Внешний идентификатор |
| `gender` | string | Пол сотрудника |
| `groups` | integer[] | Идентификаторы групп |
| `id` | string (uint64) | Идентификатор сотрудника |
| `isAdmin` | boolean | Статус администратора |
| `isDismissed` | boolean | Статус уволенного сотрудника |
| `isEnabled` | boolean | Статус активности аккаунта |
| `isEnabledUpdatedAt` | string (date-time) | Дата последнего изменения статуса |
| `isRobot` | boolean | Признак робот/сервисного аккаунта |
| `language` | string | Язык сотрудника |
| `name` | v1UserName | Полное имя сотрудника |
| `nickname` | string | Логин сотрудника |
| `position` | string | Должность сотрудника |
| `timezone` | string | Часовой пояс |
| `updatedAt` | string (date-time) | Дата последнего изменения |

### 400 Bad Request

Некорректный запрос.

### 401 Unauthorized

Пользователь не авторизован.

### 403 Forbidden

Недостаточно прав доступа к ресурсу.

### 404 Not Found

Запрашиваемый ресурс не найден.

### 500 Internal Server Error

Внутренняя ошибка сервиса. Повторите запрос через некоторое время.
