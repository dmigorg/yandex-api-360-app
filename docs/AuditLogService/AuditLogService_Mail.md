# Получить события почты

Возвращает список событий аудит-лога для Яндекс Почты организации.

## Request

```
GET https://api360.yandex.net/security/v1/org/{orgId}/audit_log/mail
```

### Параметры пути

| Параметр | Тип | Описание |
|----------|-----|---------|
| `orgId` | integer | Идентификатор организации |

### Query-параметры

| Параметр | Тип | Описание |
|----------|-----|---------|
| `pageSize` | integer | Количество записей на странице |
| `afterDate` | string (date-time) | Начало периода выборки |
| `beforeDate` | string (date-time) | Конец периода выборки |
| `excludeUids` | array of string | Исключить события указанных пользователей |
| `includeUids` | array of string | Включить только события указанных пользователей |
| `pageToken` | string | Токен для получения следующей страницы |
| `types` | array of string | Фильтрация по типам событий |

## Responses

### 200 OK

Запрос успешно выполнен.

```json
{
  "events": [
    {
      "eventType": "mailbox_send",
      "uid": "example",
      "timestamp": "example"
    }
  ],
  "nextPageToken": "example"
}
```

#### Типы событий (`eventType`)

| Тип | Описание |
|-----|---------|
| `mailbox_send` | Отправка письма |
| `message_receive` | Получение письма |
| `message_seen` | Прочтение письма |
| `message_unseen` | Пометка письма как непрочитанного |
| `message_forward` | Пересылка письма |
| `message_purge` | Полное удаление письма |
| `message_trash` | Перемещение письма в корзину |
| `message_spam` | Пометка письма как спам |
| `message_unspam` | Снятие пометки спама |
| `message_move` | Перемещение письма |
| `message_copy` | Копирование письма |
| `message_answer` | Ответ на письмо |

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
