# Удалить участников из группы (v2)

Удаляет из группы участников по их идентификаторам: сотрудников организации, подразделения, внешние контакты или вложенные группы.

## Примечание

Требуется разрешение на изменение данных о группах.

## Request

```
PATCH https://api360.yandex.net/directory/v2/org/{orgId}/groups/{groupId}/members/delete
```

### Параметры пути

| Параметр | Тип | Описание |
|----------|-----|---------|
| `groupId` | integer | Идентификатор группы |
| `orgId` | integer | Идентификатор организации |

### Body (application/json)

```json
{
  "userIds": ["example"],
  "departmentIds": [0],
  "groupIds": [0],
  "externalContactIds": ["example"],
  "sharedMailboxIds": ["example"]
}
```

| Параметр | Тип | Описание |
|----------|-----|---------|
| `departmentIds` | integer[] | Идентификаторы подразделений |
| `externalContactIds` | string[] | Идентификаторы внешних контактов |
| `groupIds` | integer[] | Идентификаторы групп |
| `sharedMailboxIds` | string[] | Идентификаторы общих ящиков |
| `userIds` | string[] | Идентификаторы сотрудников |

## Responses

### 200 OK

Запрос успешно выполнен.

**Body:** `{}`

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
