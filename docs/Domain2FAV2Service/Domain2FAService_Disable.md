# Отключить 2FA (v2)

Отключает двухфакторную аутентификацию для домена организации (версия v2).

## Request

```
DELETE https://api360.yandex.net/security/v2/org/{orgId}/domain_2fa
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
  "enabled": false,
  "duration": 0,
  "enabledAt": "2025-01-01T00:00:00Z",
  "scope": "per_domain"
}
```

| Параметр | Тип | Описание |
|----------|-----|---------|
| `enabled` | boolean | Статус обязательной 2FA |
| `duration` | integer | Период откладывания в секундах |
| `enabledAt` | string (date-time) | Дата и время включения 2FA |
| `scope` | string | Режим: `per_domain` или `per_user` |

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
