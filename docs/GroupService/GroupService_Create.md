# Создать группу

Создает новую группу. Пользователь, от имени которого выполняется запрос, не включается в состав группы.

## Примечание

Требуется разрешение на изменение данных о группах.

## Request

```
POST https://api360.yandex.net/directory/v1/org/{orgId}/groups
```

### Параметры пути

| Параметр | Тип | Описание |
|----------|-----|---------|
| `orgId` | integer | Идентификатор организации |

### Body (application/json)

```json
{
  "name": "example",
  "description": "example",
  "label": "example",
  "externalId": "example",
  "members": [
    {
      "type": "user",
      "id": "example"
    }
  ]
}
```

| Параметр | Тип | Описание |
|----------|-----|---------|
| `name` | string | Название группы |
| `description` | string | Описание группы |
| `externalId` | string | Произвольный внешний идентификатор группы |
| `label` | string | Имя почтовой рассылки группы |
| `members` | v1GroupMember[] | Участники группы |

#### v1GroupMember

| Параметр | Тип | Описание |
|----------|-----|---------|
| `id` | string (uint64) | Идентификатор участника |
| `type` | string | Тип участника: `user` — сотрудник; `group` — группа; `department` — подразделение |

## Responses

### 200 OK

Запрос успешно выполнен. Возвращает созданную группу.

```json
{
  "id": 0,
  "name": "example",
  "type": "example",
  ...
}
```

### 400 Bad Request

Некорректный запрос.

### 401 Unauthorized

Пользователь не авторизован.

### 403 Forbidden

Нет прав на доступ к ресурсу.

### 404 Not Found

Запрашиваемый ресурс не найден.

### 500 Internal Server Error

Внутренняя ошибка сервиса.
