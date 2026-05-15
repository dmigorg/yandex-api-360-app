# Изменить контактную информацию

Изменяет контактную информацию сотрудника. Автоматически созданную контактную информацию (с флагом `synthetic`) нельзя изменить или удалить.

## Примечание

Требуется разрешение на изменение данных о сотрудниках.

## Request

```
PUT https://api360.yandex.net/directory/v1/org/{orgId}/users/{userId}/contacts
```

### Параметры пути

| Параметр | Тип | Описание |
|----------|-----|---------|
| `orgId` | integer | Идентификатор организации |
| `userId` | string (uint64) | Идентификатор сотрудника |

### Body (application/json)

```json
{
  "contacts": [
    {
      "type": "example",
      "value": "example",
      "label": "example"
    }
  ]
}
```

#### v1UserContactParams

| Параметр | Тип | Описание |
|----------|-----|---------|
| `type` | string | Тип контакта: `email`, `phone_extension`, `phone`, `site`, `icq`, `twitter`, `skype` |
| `value` | string | Значение контакта |
| `label` | string | Произвольная метка контакта |

## Responses

### 200 OK

Запрос успешно выполнен. Возвращает обновленный объект сотрудника.

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
