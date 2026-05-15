# Загрузить портрет сотрудника

Управляет портретами пользователей организации. Работает только для пользователей, созданных на домене организации.

## Примечание

Требуется разрешение на изменение данных о сотрудниках.

## Request

```
PUT https://api360.yandex.net/directory/v1/org/{orgId}/users/{userId}/avatar
```

### Параметры пути

| Параметр | Тип | Описание |
|----------|-----|---------|
| `orgId` | integer | Идентификатор организации |
| `userId` | string (uint64) | Идентификатор сотрудника |

### Пример запроса

```bash
curl --request PUT 'https://api360.yandex.net/directory/v1/org/{orgId}/users/{userId}/avatar' \
    --header 'Authorization: OAuth token' \
    --header 'Content-Type: image/png' \
    --data-binary '@path/to/avatar.png'
```

## Responses

### 200 OK

Запрос успешно выполнен.

```json
{
  "url": "example"
}
```

| Параметр | Тип | Описание |
|----------|-----|---------|
| `url` | string | Ссылка на портрет |

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
