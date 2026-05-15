# Просмотреть список правил доменной политики

Возвращает список правил доменной политики.

## Примечание

Для выполнения запроса приложению требуется разрешение на чтение правил обработки почты для домена.

## Request

```
GET https://api360.yandex.net/admin/v1/org/{orgId}/mail/routing/policies
```

### Параметры пути

| Параметр | Тип | Описание |
|----------|-----|---------|
| `orgId` | integer | Идентификатор организации |

## Responses

### 200 OK

Запрос успешно выполнен.

**Response Body:**

```json
{
  "rules": [
    {
      "name": "string",
      "description": "string",
      "enabled": true,
      "condition": {
        "ip_filter": { "list": ["string"] },
        "domain_filter": { "list": ["string"] },
        "email_from_filter": { "list": ["string"] }
      },
      "action": {
        "type": "accept|reject",
        "options": { "force": "spam|ham" }
      }
    }
  ],
  "revision": 0
}
```

| Параметр | Тип | Описание |
|----------|-----|---------|
| `revision` | integer | Номер ревизии |
| `rules` | array | Массив правил доменной политики |
| `rules[].name` | string | Название правила |
| `rules[].description` | string | Описание правила |
| `rules[].enabled` | boolean | Активно ли правило |
| `rules[].condition` | object | Условия применения правила |
| `rules[].condition.ip_filter` | object | Фильтр по IPv4/IPv6 адресам или маскам подсетей |
| `rules[].condition.domain_filter` | object | Фильтр по доменам (поддерживается `*`) |
| `rules[].condition.email_from_filter` | object | Фильтр по адресам отправителя |
| `rules[].action` | object | Действие над письмом |
| `rules[].action.type` | string | Тип действия: `accept` или `reject` |
| `rules[].action.options` | object | Дополнительные параметры (force: `spam` или `ham`) |

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
