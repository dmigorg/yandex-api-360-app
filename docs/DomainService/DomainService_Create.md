# Добавить домен

Подключает новый домен к организации.

## Примечание

Требуется разрешение на запись данных о доменах.

## Request

```
POST https://api360.yandex.net/directory/v1/org/{orgId}/domains
```

### Параметры пути

| Параметр | Тип | Описание |
|----------|-----|---------|
| `orgId` | integer | Идентификатор организации |

### Body (application/json)

```json
{
  "domain": "example"
}
```

| Параметр | Тип | Описание |
|----------|-----|---------|
| `domain` | string | Полное имя домена |

## Responses

### 200 OK

Запрос успешно выполнен.

```json
{
  "name": "example",
  "country": "example",
  "mx": true,
  "delegated": true,
  "master": true,
  "verified": true,
  "status": {
    "name": "example",
    "lastCheck": "2025-01-01T00:00:00Z",
    "lastAdded": "2025-01-01T00:00:00Z",
    "spf": { "match": true, "value": "example" },
    "mx": null,
    "ns": null,
    "dkim": null
  }
}
```

| Параметр | Тип | Описание |
|----------|-----|---------|
| `country` | string | Страна домена |
| `delegated` | boolean | Признак домена, делегированного на серверы Яндекса |
| `master` | boolean | Признак основного домена (`true`) или домена-алиаса (`false`) |
| `mx` | boolean | Указывает ли MX-запись на сервер `mx.yandex.net` |
| `name` | string | Полное доменное имя |
| `verified` | boolean | Признак подтвержденного домена |
| `status` | v1DomainStatus | Статус домена и DNS-записей |

#### v1DomainStatus

| Параметр | Тип | Описание |
|----------|-----|---------|
| `name` | string | Полное доменное имя |
| `lastCheck` | string (date-time) | Дата и время последней проверки |
| `lastAdded` | string (date-time) | Дата и время добавления домена |
| `spf` | v1DomainStatatusValue | Статус SPF-записи |
| `mx` | v1DomainStatatusValue | Статус MX-записи |
| `ns` | v1DomainStatatusValue | Статус NS-записи |
| `dkim` | v1DomainStatatusValue | Статус DKIM-записи |

#### v1DomainStatatusValue

| Параметр | Тип | Описание |
|----------|-----|---------|
| `match` | boolean | Статус записи: `true` — настроена; `false` — нет |
| `value` | string | Значение |

### 400 Bad Request

Некорректный запрос.

### 401 Unauthorized

Пользователь не авторизован.

### 403 Forbidden

У пользователя или приложения нет прав на доступ к ресурсу, запрос отклонен.

### 404 Not Found

Запрашиваемый ресурс не найден.

### 500 Internal Server Error

Внутренняя ошибка сервиса. Попробуйте повторно отправить запрос через некоторое время.
