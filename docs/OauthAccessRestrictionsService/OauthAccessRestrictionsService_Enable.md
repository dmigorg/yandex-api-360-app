# Включить ограничение OAuth

Включает ограничение авторизации через сторонние OAuth-приложения для организации.

## Request

```
POST https://api360.yandex.net/security/v1/org/{orgId}/oauth_access_restriction
```

### Параметры пути

| Параметр | Тип | Описание |
|----------|-----|---------|
| `orgId` | integer | Идентификатор организации |

### Body (application/json)

```json
{}
```

Тело запроса — пустой объект.

## Responses

### 200 OK

Запрос успешно выполнен.

**Body:** `{}`

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
