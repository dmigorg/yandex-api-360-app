# Изменить информацию о сотруднике

Изменяет информацию о сотруднике. Изменяются значения только тех параметров, которые были переданы в запросе.

## Примечание

Требуется разрешение на изменение данных о сотрудниках.

## Request

```
PATCH https://api360.yandex.net/directory/v1/org/{orgId}/users/{userId}
```

### Параметры пути

| Параметр | Тип | Описание |
|----------|-----|---------|
| `orgId` | integer | Идентификатор организации |
| `userId` | string (uint64) | Идентификатор сотрудника |

### Body (application/json)

```json
{
  "nickname": "example",
  "departmentId": 0,
  "name": { "first": "example", "last": "example", "middle": "example" },
  "gender": "example",
  "position": "example",
  "about": "example",
  "birthday": "1999-11-22",
  "contacts": [{ "type": "example", "value": "example", "label": "example" }],
  "externalId": "example",
  "isAdmin": true,
  "isEnabled": true,
  "timezone": "example",
  "language": "example",
  "password": "example",
  "passwordChangeRequired": true,
  "displayName": "example"
}
```

| Параметр | Тип | Описание |
|----------|-----|---------|
| `about` | string | Описание сотрудника |
| `birthday` | string (date) | Дата рождения (YYYY-MM-DD) |
| `contacts` | v1UserContactParams[] | Список контактов сотрудника |
| `departmentId` | integer | Идентификатор подразделения |
| `displayName` | string | Публичное имя сотрудника |
| `externalId` | string | Произвольный внешний идентификатор |
| `gender` | string | Пол сотрудника |
| `isAdmin` | boolean | Признак администратора |
| `isEnabled` | boolean | Статус аккаунта: `true` — активен; `false` — заблокирован |
| `language` | string | Язык сотрудника |
| `name` | v1UserNameParams | ФИО сотрудника |
| `nickname` | string | Логин сотрудника |
| `password` | string | Пароль сотрудника |
| `passwordChangeRequired` | boolean | Обязательность смены пароля при входе |
| `position` | string | Должность сотрудника |
| `timezone` | string | Часовой пояс сотрудника |

**Поддерживаемые типы контактов:** `email`, `phone_extension`, `phone`, `site`, `icq`, `twitter`, `skype`

## Responses

### 200 OK

Запрос успешно выполнен. Возвращает обновленный объект сотрудника.

### 400 Bad Request

Некорректный запрос.

### 401 Unauthorized

Пользователь не авторизован.

### 403 Forbidden

Нет прав доступа к ресурсу.

### 404 Not Found

Запрашиваемый ресурс не найден.

### 500 Internal Server Error

Внутренняя ошибка сервиса.
