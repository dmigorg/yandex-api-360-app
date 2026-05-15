# Включить 2FA (v2)

Включает двухфакторную аутентификацию для домена организации (версия v2 с поддержкой персональной настройки).

## Request

```
POST https://api360.yandex.net/security/v2/org/{orgId}/domain_2fa
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
  "scope": "per_domain",
  "validationMethod": "default"
}
```

| Параметр | Тип | Описание |
|----------|-----|---------|
| `duration` | integer | Период (в секундах), в течение которого пользователи могут откладывать настройку 2FA |
| `logoutUsers` | boolean | Завершить все сессии пользователей при включении 2FA |
| `scope` | string | Область применения: `per_domain` — для всех пользователей; `per_user` — для отдельных сотрудников |
| `validationMethod` | string | Метод подтверждения: `default` или `phone` |

## Responses

### 200 OK

Запрос успешно выполнен.

```json
{
  "enabled": true,
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
