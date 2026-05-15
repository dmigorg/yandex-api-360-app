# Просмотреть список контактов

Возвращает список внешних контактов с постраничной навигацией.

## Request

```
GET https://api360.yandex.net/directory/v1/org/{orgId}/external_contacts
```

### Параметры пути

| Параметр | Тип | Описание |
|----------|-----|---------|
| `orgId` | integer | Идентификатор организации |

### Query-параметры

| Параметр | Тип | Описание | По умолчанию |
|----------|-----|---------|--------------|
| `page` | integer | Номер страницы ответа | `1` |
| `perPage` | integer | Количество контактов на одной странице ответа | `10` |

## Responses

### 200 OK

Запрос успешно выполнен.

**Response Body:**

```json
{
  "contacts": [...],
  "page": 0,
  "pages": 0,
  "perPage": 0,
  "total": 0
}
```

| Параметр | Тип | Описание |
|----------|-----|---------|
| `contacts` | v1ExternalContact[] | Список внешних контактов |
| `page` | integer | Номер страницы ответа |
| `pages` | integer | Количество страниц ответа |
| `perPage` | integer | Количество результатов на одной странице ответа |
| `total` | integer | Общее количество результатов |

#### v1ExternalContact

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

#### v1ExternalContactEmail

| Параметр | Тип | Описание |
|----------|-----|---------|
| `email` | string | Электронный адрес |
| `main` | boolean | Основной адрес (`true`) или дополнительный (`false`) |
| `type` | string | Тип: `work` — рабочая почта; пусто — личная почта |

#### v1ExternalContactPhone

| Параметр | Тип | Описание |
|----------|-----|---------|
| `main` | boolean | Основной телефон (`true`) или дополнительный (`false`) |
| `phone` | string | Телефон |
| `type` | string | Тип: `work`, `mobile`, `ip`, или пусто для прочих |

### 400 Bad Request

Некорректный запрос.

### 401 Unauthorized

Пользователь не авторизован.

### 403 Forbidden

У пользователя или приложения нет прав на доступ к ресурсу.

### 404 Not Found

Запрашиваемый ресурс не найден.

### 500 Internal Server Error

Внутренняя ошибка сервиса.
