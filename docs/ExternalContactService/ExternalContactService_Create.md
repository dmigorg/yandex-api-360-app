# Добавить контакт

Добавляет новый внешний контакт.

## Request

```
POST https://api360.yandex.net/directory/v1/org/{orgId}/external_contacts
```

### Параметры пути

| Параметр | Тип | Описание |
|----------|-----|---------|
| `orgId` | integer | Идентификатор организации |

### Body (application/json)

```json
{
  "firstName": "example",
  "lastName": "example",
  "middleName": "example",
  "title": "example",
  "company": "example",
  "department": "example",
  "address": "example",
  "externalId": "example",
  "emails": [
    {
      "email": "example",
      "type": "example",
      "main": true
    }
  ],
  "phones": [
    {
      "phone": "example",
      "type": "example",
      "main": true
    }
  ]
}
```

| Параметр | Тип | Описание |
|----------|-----|---------|
| `emails` | v1ExternalContactEmail[] | Электронные адреса. Должен быть хотя бы один элемент |
| `firstName` | string | Имя |
| `lastName` | string | Фамилия |
| `address` | string | Почтовый адрес |
| `company` | string | Компания |
| `department` | string | Подразделение |
| `externalId` | string | Произвольный внешний идентификатор |
| `middleName` | string | Отчество |
| `phones` | v1ExternalContactPhone[] | Телефоны |
| `title` | string | Должность |

#### v1ExternalContactEmail

| Параметр | Тип | Описание |
|----------|-----|---------|
| `email` | string | Электронный адрес |
| `main` | boolean | Основной адрес (`true`) или дополнительный (`false`) |
| `type` | string | Тип: `work` — рабочая почта; пусто — личная почта |

#### v1ExternalContactPhone

| Параметр | Тип | Описание |
|----------|-----|---------|
| `main` | boolean | Основной телефон (максимум один) |
| `phone` | string | Телефон |
| `type` | string | Тип: `work`, `mobile`, `ip`, или пусто для прочих |

## Responses

### 200 OK

Запрос успешно выполнен.

```json
{
  "id": "example"
}
```

| Параметр | Тип | Описание |
|----------|-----|---------|
| `id` | string | Идентификатор созданного внешнего контакта |

### 400 Bad Request

Некорректный запрос.

### 401 Unauthorized

Пользователь не авторизован.

### 403 Forbidden

У пользователя или приложения нет прав на доступ к ресурсу.

### 404 Not Found

Запрашиваемый ресурс не найден.

### 500 Internal Server Error

Внутренняя ошибка сервиса. Попробуйте повторно отправить запрос через некоторое время.
