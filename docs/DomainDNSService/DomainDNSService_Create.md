# Добавить DNS-запись

Добавляет DNS-запись для домена.

## Примечание

Требуется разрешение на управление DNS (чтение и запись).

## Request

```
POST https://api360.yandex.net/directory/v1/org/{orgId}/domains/{domain}/dns
```

### Параметры пути

| Параметр | Тип | Описание |
|----------|-----|---------|
| `domain` | string | Полное доменное имя (например `example.com`). Для кириллических доменов используйте кодировку Punycode |
| `orgId` | integer | Идентификатор организации |

### Body (application/json)

```json
{
  "type": "A",
  "name": "example",
  "ttl": 0,
  "address": "example",
  "target": "example",
  "exchange": "example",
  "preference": 0,
  "text": "example",
  "port": 0,
  "priority": 0,
  "weight": 0,
  "flag": 0,
  "tag": "example",
  "value": "example"
}
```

| Параметр | Тип | Описание |
|----------|-----|---------|
| `type` | v1RecordType | Тип DNS-записи: `A`, `AAAA`, `CNAME`, `MX`, `TXT`, `SRV`, `NS`, `CAA` |
| `name` | string | Имя записи |
| `ttl` | integer | Время жизни записи в секундах (TTL) |
| `address` | string | Адрес для записи A или AAAA |
| `exchange` | string | EXCHANGE для MX-записи |
| `flag` | integer | Флаг для CAA-записи |
| `port` | integer | Порт для SRV-записи |
| `preference` | integer | PREFERENCE для MX-записи |
| `priority` | integer | Приоритет для SRV-записи |
| `tag` | string | Тег для CAA-записи |
| `target` | string | Цель для записи CNAME или SRV |
| `text` | string | Содержимое для TXT-записи |
| `value` | string | CAA-запись в двойных кавычках, например `"ca.example.net"` |
| `weight` | integer | Вес для SRV-записи |

## Responses

### 200 OK

Запрос успешно выполнен. Возвращает созданную DNS-запись с её идентификатором.

```json
{
  "recordId": 0,
  "type": "A",
  "name": "example",
  "ttl": 0,
  "address": "example",
  ...
}
```

### 400 Bad Request

Некорректный запрос.

### 401 Unauthorized

Пользователь не авторизован.

### 403 Forbidden

У пользователя или приложения нет прав на доступ к ресурсу.

### 404 Not Found

Запрашиваемый ресурс не найден.

### 500 Internal Server Error

Внутренняя ошибка сервиса. Повторите запрос позже.
