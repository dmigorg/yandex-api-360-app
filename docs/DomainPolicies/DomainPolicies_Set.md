# Задать список правил доменной политики

Создает или обновляет список правил доменной политики.

## Примечание

Для выполнения запроса приложению требуется разрешение на управление правилами обработки почты для организации.

## Request

```
PUT https://api360.yandex.net/admin/v1/org/{orgId}/mail/routing/policies
```

### Параметры пути

| Параметр | Тип | Описание |
|----------|-----|---------|
| `orgId` | integer | Идентификатор организации |

### Body (application/json)

```json
{
  "rules": [
    {
      "name": "example",
      "description": "example",
      "enabled": true,
      "condition": {
        "ip_filter": {
          "list": ["example"]
        },
        "domain_filter": null,
        "email_from_filter": null
      },
      "action": {
        "type": "accept",
        "options": {
          "force": "spam"
        }
      }
    }
  ]
}
```

#### Параметры правила

| Параметр | Тип | Описание |
|----------|-----|---------|
| `name` | string | Название правила |
| `description` | string | Описание правила |
| `enabled` | boolean | Статус правила (`true` = включено) |
| `condition` | object | Условия применения правила |
| `action` | object | Действие над письмом |

#### Объект condition

Используется только один тип фильтра на правило:

| Параметр | Тип | Описание |
|----------|-----|---------|
| `ip_filter` | object | Фильтр по IPv4/IPv6 адресам или маскам подсетей |
| `domain_filter` | object | Фильтр по доменам (поддерживается `*`) |
| `email_from_filter` | object | Фильтр по адресам отправителя |

#### Объект action

| Параметр | Тип | Описание |
|----------|-----|---------|
| `type` | string | Тип действия: `accept` или `reject` |
| `options` | object | Дополнительные настройки (только для `accept`) |
| `options.force` | string | `spam` или `ham` |

## Responses

### 200 OK

Запрос успешно выполнен.

**Body:** `{}`

### 400 Bad Request

Некорректный запрос.

### 401 Unauthorized

Пользователь не авторизован.

### 403 Forbidden

Недостаточно прав доступа к ресурсу.

### 404 Not Found

Запрашиваемый ресурс не найден.

### 500 Internal Server Error

Внутренняя ошибка сервиса. Повторите запрос позже.
