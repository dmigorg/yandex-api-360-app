# Редактировать DNS-запись

Изменяет DNS-запись для домена.

## Примечание

Необходимо обладать разрешением на управление DNS (чтение и запись).

## Request

```
POST https://api360.yandex.net/directory/v1/org/{orgId}/domains/{domain}/dns/{recordId}
```

### Параметры пути

| Параметр | Тип | Описание |
|----------|-----|---------|
| `domain` | string | Полное доменное имя (например `example.com`). Для кириллических доменов используйте кодировку Punycode |
| `orgId` | integer | Идентификатор организации |
| `recordId` | integer | Идентификатор записи |

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
  "weight": 0
}
```

| Параметр | Тип | Описание |
|----------|-----|---------|
| `type` | v1RecordType | Тип DNS-записи: `A`, `AAAA`, `CNAME`, `MX`, `TXT`, `SRV`, `NS`, `CAA` |
| `name` | string | Имя записи |
| `ttl` | integer | Время жизни записи в секундах |
| `address` | string | Адрес для записей A или AAAA |
| `exchange` | string | EXCHANGE для MX-записи |
| `port` | integer | Порт для SRV-записи |
| `preference` | integer | PREFERENCE для MX-записи |
| `target` | string | Цель для записей CNAME или SRV |
| `text` | string | Содержимое для TXT-записи |
| `priority` | integer | Приоритет для SRV-записи |
| `weight` | integer | Вес для SRV-записи |

## Responses

### 200 OK

Запрос успешно выполнен. Возвращает полную информацию об обновленной записи.

### 400 Bad Request

Некорректные параметры запроса.

### 401 Unauthorized

Пользователь не авторизован.

### 403 Forbidden

Недостаточные права доступа.

### 404 Not Found

Ресурс не найден.

### 500 Internal Server Error

Внутренняя ошибка сервиса.
