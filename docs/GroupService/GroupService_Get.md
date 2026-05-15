# Просмотреть параметры группы

Возвращает информацию об одной группе.

## Примечание

Требуется разрешение на чтение данных о группах.

## Request

```
GET https://api360.yandex.net/directory/v1/org/{orgId}/groups/{groupId}
```

### Параметры пути

| Параметр | Тип | Описание |
|----------|-----|---------|
| `groupId` | integer | Идентификатор группы |
| `orgId` | integer | Идентификатор организации |

## Responses

### 200 OK

Запрос успешно выполнен.

```json
{
  "id": 0,
  "name": "example",
  "type": "example",
  "description": "example",
  "membersCount": 0,
  "label": "example",
  "email": "example",
  "emailId": "example",
  "aliases": ["example"],
  "externalId": "example",
  "removed": true,
  "members": [{"type": "user", "id": "example"}],
  "memberOf": [0],
  "createdAt": "2025-01-01T00:00:00Z"
}
```

| Параметр | Тип | Описание |
|----------|-----|---------|
| `aliases` | string[] | Алиасы почтовых ящиков группы |
| `createdAt` | string (date-time) | Дата и время создания группы |
| `description` | string | Описание группы |
| `email` | string | Адрес почтовой рассылки группы |
| `emailId` | string (uint64) | Идентификатор почтовой рассылки группы |
| `externalId` | string | Произвольный внешний идентификатор группы |
| `id` | integer | Идентификатор группы |
| `label` | string | Имя почтовой рассылки группы |
| `memberOf` | integer[] | Идентификаторы групп, в которые входит эта группа |
| `members` | v1GroupMember[] | Участники группы |
| `membersCount` | integer | Количество участников группы |
| `name` | string | Название группы |
| `removed` | boolean | Признак удаленной группы |
| `type` | string | Тип группы: `generic`, `organization_admin`, `robots`, `organization_deputy_admin` |

### 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Server Error

Ошибки возвращают поля `code`, `message` и `details`.
