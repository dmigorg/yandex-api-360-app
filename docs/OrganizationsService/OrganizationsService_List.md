# Посмотреть список организаций

Возвращает перечень организаций пользователя.

## Примечание

Требуется разрешение на чтение данных об организациях.

## Request

```
GET https://api360.yandex.net/directory/v1/org
```

### Query-параметры

| Параметр | Тип | Описание | По умолчанию |
|----------|-----|---------|--------------|
| `pageSize` | integer | Количество записей на странице. Максимум — 100 | `10` |
| `pageToken` | string | Токен для постраничной навигации | — |

## Responses

### 200 OK

Запрос успешно выполнен.

```json
{
  "organizations": [
    {
      "id": 0,
      "name": "example",
      "email": "example",
      "phone": "example",
      "fax": "example",
      "language": "example",
      "subscriptionPlan": "example"
    }
  ],
  "nextPageToken": "example"
}
```

| Параметр | Тип | Описание |
|----------|-----|---------|
| `organizations[].id` | integer | Идентификатор организации |
| `organizations[].name` | string | Название организации |
| `organizations[].email` | string | Адрес почтовой рассылки |
| `organizations[].phone` | string | Номер телефона |
| `organizations[].fax` | string | Номер факса |
| `organizations[].language` | string | Язык организации |
| `organizations[].subscriptionPlan` | string | Тарифный план |
| `nextPageToken` | string | Токен для следующей страницы |

### 400 Bad Request

Некорректный запрос.

### 401 Unauthorized

Пользователь не авторизован.

### 403 Forbidden

Недостаточно прав доступа.

### 404 Not Found

Ресурс не найден.

### 500 Internal Server Error

Ошибка сервиса.
