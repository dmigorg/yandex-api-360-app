# Просмотреть основной адрес и подписи

Позволяет просмотреть почтовый адрес, с которого отправляются письма по умолчанию, и настройки подписей сотрудника.

## Request

```
GET https://api360.yandex.net/admin/v1/org/{orgId}/mail/users/{userId}/settings/sender_info
```

### Параметры пути

| Параметр | Тип | Описание |
|----------|-----|---------|
| `orgId` | integer | Идентификатор организации |
| `userId` | string (uint64) | Идентификатор пользователя |

## Responses

### 200 OK

Запрос успешно выполнен.

**Response Body:**

```json
{
  "fromName": "example",
  "defaultFrom": "example",
  "signs": [
    {
      "emails": ["example"],
      "isDefault": true,
      "text": "example",
      "lang": "example"
    }
  ],
  "signPosition": "bottom"
}
```

| Параметр | Тип | Описание |
|----------|-----|---------|
| `defaultFrom` | string | Отправлять письма с адреса |
| `fromName` | string | Имя отправителя |
| `signPosition` | v1SignPosition | Расположение подписи. Значения: `bottom` — внизу всего письма; `under` — сразу после ответа |
| `signs` | v1Sign[] | Подписи |

#### v1Sign

| Параметр | Тип | Описание |
|----------|-----|---------|
| `emails` | string[] | Привязать к адресу |
| `isDefault` | boolean | Является ли подписью по умолчанию |
| `lang` | string | Язык подписи |
| `text` | string | Текст подписи (поддерживает HTML и изображения) |

### 400 Bad Request

Некорректный запрос.

### 401 Unauthorized

Пользователь не авторизован.

### 403 Forbidden

У пользователя или приложения нет прав на доступ к ресурсу.

### 404 Not Found

Запрашиваемый ресурс не найден.

### 500 Internal Server Error

Внутренняя ошибка сервиса. Повторите запрос через некоторое время.
