# Посмотреть информацию об общем ящике

Возвращает сведения об общем почтовом ящике.

## Примечание

Приложению необходимо разрешение на чтение данных о правах доступа к почтовым ящикам при настройке на OAuth-сервере Яндекса.

## Request

```
GET https://api360.yandex.net/admin/v1/org/{orgId}/mailboxes/shared/{resourceId}
```

### Параметры пути

| Параметр | Тип | Описание |
|----------|-----|---------|
| `orgId` | integer | Идентификатор организации |
| `resourceId` | string (uint64) | Идентификатор почтового ящика |

## Responses

### 200 OK

Запрос успешно выполнен.

**Response Body:**

```json
{
  "id": "example",
  "email": "example",
  "name": "example",
  "description": "example",
  "createdAt": "2025-01-01T00:00:00Z",
  "updatedAt": "2025-01-01T00:00:00Z"
}
```

| Параметр | Тип | Описание |
|----------|-----|---------|
| `id` | string (uint64) | Идентификатор общего ящика |
| `email` | string | Адрес электронной почты общего ящика |
| `name` | string | Имя общего ящика |
| `description` | string | Описание ящика |
| `createdAt` | string (date-time) | Дата и время создания |
| `updatedAt` | string (date-time) | Дата и время изменения |

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
