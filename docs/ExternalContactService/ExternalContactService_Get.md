# Просмотреть контакт

Возвращает информацию об одном внешнем контакте.

## Request

```
GET https://api360.yandex.net/directory/v1/org/{orgId}/external_contacts/{contactId}
```

### Параметры пути

| Параметр | Тип | Описание |
|----------|-----|---------|
| `contactId` | string | Идентификатор внешнего контакта |
| `orgId` | integer | Идентификатор организации |

## Responses

### 200 OK

Запрос успешно выполнен.

```json
{
  "id": "example",
  "firstName": "example",
  "lastName": "example",
  "middleName": "example",
  "title": "example",
  "company": "example",
  "department": "example",
  "address": "example",
  "externalId": "example",
  "emails": [...],
  "phones": [...],
  "createdAt": "2025-01-01T00:00:00Z",
  "updatedAt": "2025-01-01T00:00:00Z"
}
```

| Параметр | Тип | Описание |
|----------|-----|---------|
| `id` | string | Идентификатор внешнего контакта |
| `firstName` | string | Имя |
| `lastName` | string | Фамилия |
| `middleName` | string | Отчество |
| `title` | string | Должность |
| `company` | string | Компания |
| `department` | string | Подразделение |
| `address` | string | Почтовый адрес |
| `externalId` | string | Произвольный внешний идентификатор |
| `emails` | v1ExternalContactEmail[] | Электронные адреса |
| `phones` | v1ExternalContactPhone[] | Телефоны |
| `createdAt` | string (date-time) | Дата и время создания |
| `updatedAt` | string (date-time) | Дата и время изменения |

### 400 Bad Request

Некорректный запрос.

### 401 Unauthorized

Пользователь не авторизован.

### 403 Forbidden

У пользователя нет прав на доступ к ресурсу.

### 404 Not Found

Запрашиваемый ресурс не найден.

### 500 Internal Server Error

Внутренняя ошибка сервиса.
