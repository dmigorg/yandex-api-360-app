# Получить события диска

Возвращает список событий аудит-лога для Яндекс Диска организации.

## Request

```
GET https://api360.yandex.net/security/v1/org/{orgId}/audit_log/disk
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

## Responses

### 200 OK

Запрос успешно выполнен.

```json
{
  "events": [
    {
      "eventType": "fs-copy",
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
| `fs-copy` | Копирование файла |
| `fs-mkdir` | Создание папки |
| `fs-move` | Перемещение файла |
| `fs-set-public` | Публикация файла |
| `fs-store` | Загрузка файла |
| `fs-trash-append` | Перемещение в корзину |
| `fs-trash-drop` | Удаление из корзины |
| `fs-trash-drop-all` | Очистка корзины |
| `share-activate-invite` | Принятие приглашения к папке |
| `share-change-rights` | Изменение прав доступа к папке |
| `share-change-invite-rights` | Изменение прав в приглашении |
| `share-create-group` | Создание группы доступа |
| `share-invite-user` | Приглашение пользователя к папке |
| `fs-rm` | Удаление файла |

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
