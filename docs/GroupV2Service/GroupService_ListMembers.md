# Просмотреть список участников группы (v2)

Возвращает список всех участников группы: сотрудников, подразделений, внешних контактов, общих ящиков или других групп.

## Примечание

Требуется разрешение на чтение данных о группах.

## Request

```
GET https://api360.yandex.net/directory/v2/org/{orgId}/groups/{groupId}/members
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
  "departments": [...],
  "groups": [...],
  "users": [...],
  "externalContacts": [...],
  "sharedMailboxes": [...]
}
```

| Параметр | Тип | Описание |
|----------|-----|---------|
| `departments` | v1ShortDepartment[] | Подразделения |
| `groups` | v1ShortGroup[] | Группы |
| `users` | v1ShortUser[] | Сотрудники |
| `externalContacts` | v1ShortExternalContact[] | Внешние контакты |
| `sharedMailboxes` | v2ShortSharedMailbox[] | Общие ящики |

#### v1ShortExternalContact

| Параметр | Тип | Описание |
|----------|-----|---------|
| `id` | string | Идентификатор контакта |
| `firstName` | string | Имя |
| `lastName` | string | Фамилия |
| `middleName` | string | Отчество |

#### v2ShortSharedMailbox

| Параметр | Тип | Описание |
|----------|-----|---------|
| `id` | string (uint64) | Идентификатор общего ящика |
| `name` | string | Имя общего ящика |

### 400 Bad Request

Некорректный запрос.

### 401 Unauthorized

Пользователь не авторизован.

### 403 Forbidden

У пользователя или приложения нет прав на доступ к ресурсу.

### 404 Not Found

Запрашиваемый ресурс не найден.

### 500 Internal Server Error

Внутренняя ошибка сервиса.
