# Получить DNS-записи домена

Возвращает все DNS-записи, установленные для домена.

## Примечание

Требуется разрешение на управление DNS (чтение и запись).

## Request

```
GET https://api360.yandex.net/directory/v1/org/{orgId}/domains/{domain}/dns
```

### Параметры пути

| Параметр | Тип | Описание |
|----------|-----|---------|
| `domain` | string | Полное доменное имя (например `example.com`). Для кириллических доменов используйте кодировку Punycode |
| `orgId` | integer | Идентификатор организации |

### Query-параметры

| Параметр | Тип | Описание | По умолчанию |
|----------|-----|---------|--------------|
| `page` | integer | Номер страницы ответа | `1` |
| `perPage` | integer | Количество записей на одной странице | `50` |

## Responses

### 200 OK

Запрос успешно выполнен.

| Параметр | Тип | Описание |
|----------|-----|---------|
| `records` | array | Список DNS-записей |
| `page` | integer | Номер страницы ответа |
| `pages` | integer | Количество страниц ответа |
| `perPage` | integer | Количество записей на одной странице |
| `total` | integer | Общее количество записей |

**Поля DNS-записи:**

| Параметр | Тип | Описание |
|----------|-----|---------|
| `recordId` | integer | Идентификатор записи |
| `type` | string | Тип DNS-записи: `A`, `AAAA`, `CNAME`, `MX`, `TXT`, `SRV`, `NS`, `CAA` |
| `name` | string | Полное доменное имя |
| `ttl` | integer | Время жизни в секундах |
| `address` | string | Адрес для записей A/AAAA |
| `target` | string | Цель для CNAME/SRV |
| `exchange` | string | EXCHANGE для MX |
| `preference` | integer | PREFERENCE для MX |
| `text` | string | Содержимое TXT-записи |
| `priority` | integer | Приоритет для SRV |
| `weight` | integer | Вес для SRV |
| `port` | integer | Порт для SRV |
| `flag` | integer | Флаг для CAA |
| `tag` | string | Тег для CAA |
| `value` | string | CAA-запись в двойных кавычках |

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
