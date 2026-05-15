# Включить 2FA

Включает двухфакторную аутентификацию для домена организации.

## Request

```
POST https://api360.yandex.net/security/v1/org/{orgId}/domain_2fa
```

### Параметры пути

| Параметр | Тип | Описание |
|----------|-----|---------|
| `orgId` | integer | Идентификатор организации |

### Body (application/json)

```json
{
  "duration": 0,
  "logoutUsers": true,
  "validationMethod": "default"
}
```

| Параметр | Тип | Описание |
|----------|-----|---------|
| `duration` | integer | Задержка в секундах перед обязательным включением 2FA |
| `logoutUsers` | boolean | Принудительно завершить сессии пользователей |
| `validationMethod` | string | Метод подтверждения: `default` или `phone` |

## Responses

### 200 OK

Запрос успешно выполнен.

```json
{
  "enabled": true,
  "duration": 0,
  "enabledAt": "2024-01-01T00:00:00Z"
}
```

| Параметр | Тип | Описание |
|----------|-----|---------|
| `enabled` | boolean | Статус 2FA |
| `duration` | integer | Задержка в секундах |
| `enabledAt` | string (date-time) | Дата и время включения 2FA |

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
