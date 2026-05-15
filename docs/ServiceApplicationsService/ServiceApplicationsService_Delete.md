# Очистить список сервисных приложений

Удаляет список сервисных приложений организации.

## Request

```
DELETE https://api360.yandex.net/security/v1/org/{orgId}/service_applications
```

### Параметры пути

| Параметр | Тип | Описание |
|----------|-----|---------|
| `orgId` | integer | Идентификатор организации |

## Responses

### 200 OK

Запрос успешно выполнен.

```json
{
  "applications": [
    {
      "id": "string",
      "scopes": ["string"]
    }
  ]
}
```

| Параметр | Тип | Описание |
|----------|-----|---------|
| `applications` | array | Список сервисных приложений |
| `applications[].id` | string | Идентификатор приложения |
| `applications[].scopes` | array of string | Список разрешений приложения |

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
