# Создать подразделение

Создает подразделение.

## Примечание

Требуется разрешение на изменение данных о подразделениях.

## Request

```
POST https://api360.yandex.net/directory/v1/org/{orgId}/departments
```

### Параметры пути

| Параметр | Тип | Описание |
|----------|-----|---------|
| `orgId` | integer | Идентификатор организации |

### Body (application/json)

```json
{
  "name": "example",
  "parentId": 0,
  "description": "example",
  "externalId": "example",
  "label": "example"
}
```

| Параметр | Тип | Описание |
|----------|-----|---------|
| `name` | string | Название подразделения |
| `parentId` | integer | Идентификатор родительского подразделения |
| `description` | string | Описание подразделения |
| `externalId` | string | Произвольный внешний идентификатор подразделения |
| `label` | string | Имя почтовой рассылки (например, `new-department` для `new-department@your-domain.ru`) |

## Responses

### 200 OK

Запрос успешно выполнен.

```json
{
  "id": 0,
  "name": "example",
  "parentId": 0,
  "description": "example",
  "createdAt": "2025-01-01T00:00:00Z",
  "externalId": "example",
  "label": "example",
  "email": "example",
  "emailId": "example",
  "membersCount": 0,
  "aliases": ["example"]
}
```

| Параметр | Тип | Описание |
|----------|-----|---------|
| `id` | integer | Идентификатор подразделения |
| `name` | string | Название подразделения |
| `parentId` | integer | Идентификатор родительского подразделения |
| `description` | string | Описание подразделения |
| `createdAt` | string (date-time) | Дата и время создания |
| `externalId` | string | Внешний идентификатор |
| `label` | string | Имя почтовой рассылки |
| `email` | string | Адрес почтовой рассылки подразделения |
| `emailId` | string (uint64) | Идентификатор почтовой рассылки |
| `membersCount` | integer | Количество сотрудников (включая вложенные подразделения) |
| `aliases` | string[] | Алиасы почтовых рассылок |

### 400 Bad Request

Некорректный запрос.

### 401 Unauthorized

Пользователь не авторизован.

### 403 Forbidden

Отсутствуют права доступа.

### 404 Not Found

Запрашиваемый ресурс не найден.

### 500 Internal Server Error

Внутренняя ошибка сервиса. Повторите запрос через некоторое время.
