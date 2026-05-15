# Создать список антиспама

Создает или заменяет список разрешенных IP-адресов и CIDR-подсетей.

## Примечание

Для выполнения запроса приложению требуется разрешение на управление настройками антиспама. При настройке приложения на OAuth-сервере Яндекса необходимо включить это разрешение.

## Пример

```bash
curl --request POST https://api360.yandex.net/admin/v1/org/{orgId}/mail/antispam/allowlist/ips \
    --header 'Authorization: OAuth token' \
    --data-binary '{
      "allowList": [
        "77.88.21.249",
        "77.88.54.0/23",
        "2a02:6b8::/32"
      ]
    }'
```

## Request

```
POST https://api360.yandex.net/admin/v1/org/{orgId}/mail/antispam/allowlist/ips
```

### Параметры пути

| Параметр | Тип | Описание |
|----------|-----|---------|
| `orgId` | integer | Идентификатор организации |

### Body (application/json)

```json
{
  "allowList": [
    "example"
  ]
}
```

| Параметр | Тип | Описание |
|----------|-----|---------|
| `allowList` | string[] | Список разрешенных IP-адресов и CIDR-подсетей. Примеры: `"77.88.21.249"`, `"77.88.54.0/23"`, `"2a02:6b8::/32"` |

## Responses

### 200 OK

Запрос успешно выполнен.

**Body:** `{}`

### 400 Bad Request

Некорректный запрос.

```json
{
  "code": 0,
  "message": "example",
  "details": [
    {
      "@type": "example"
    }
  ]
}
```

### 401 Unauthorized

Пользователь не авторизован.

### 403 Forbidden

Отсутствуют права доступа к ресурсу.

### 404 Not Found

Запрашиваемый ресурс не найден.

### 500 Internal Server Error

Внутренняя ошибка сервиса. Повторите запрос позже.
