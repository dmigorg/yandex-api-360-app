# Добавить сотрудника

Добавляет нового сотрудника в организацию.

## Примечание

Требуется разрешение на изменение данных о сотрудниках.

## Request

```
POST https://api360.yandex.net/directory/v1/org/{orgId}/users
```

### Параметры пути

| Параметр | Тип | Описание |
|----------|-----|---------|
| `orgId` | integer | Идентификатор организации |

### Body (application/json)

```json
{
  "nickname": "example",
  "departmentId": 0,
  "name": {
    "first": "example",
    "last": "example",
    "middle": "example"
  },
  "gender": "example",
  "position": "example",
  "about": "example",
  "birthday": "1999-11-22",
  "contacts": [
    {
      "type": "example",
      "value": "example",
      "label": "example"
    }
  ],
  "externalId": "example",
  "timezone": "example",
  "language": "example",
  "password": "example",
  "passwordChangeRequired": true,
  "displayName": "example"
}
```

| Параметр | Тип | Описание |
|----------|-----|---------|
| `nickname` | string | Логин сотрудника |
| `departmentId` | integer | Идентификатор подразделения |
| `name` | v1UserNameParams | ФИО сотрудника |
| `password` | string | Пароль сотрудника |
| `about` | string | Описание сотрудника |
| `birthday` | string | Дата рождения (YYYY-MM-DD) |
| `contacts` | v1UserContactParams[] | Список контактов |
| `displayName` | string | Публичное имя сотрудника |
| `externalId` | string | Внешний идентификатор |
| `gender` | string | Пол сотрудника |
| `language` | string | Язык сотрудника |
| `passwordChangeRequired` | boolean | Обязательность смены пароля при первом входе |
| `position` | string | Должность сотрудника |
| `timezone` | string | Часовой пояс сотрудника |

**Поддерживаемые типы контактов:** `email`, `phone_extension`, `phone`, `site`, `icq`, `twitter`, `skype`

## Responses

### 200 OK

Запрос успешно выполнен. Возвращает объект созданного сотрудника.

### 400 Bad Request

Некорректный запрос.

### 401 Unauthorized

Пользователь не авторизован.

### 403 Forbidden

Недостаточно прав доступа.

### 404 Not Found

Ресурс не найден.

### 500 Internal Server Error

Внутренняя ошибка сервиса.
