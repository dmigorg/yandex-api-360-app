# Посмотреть список сотрудников, имеющих доступ к ящику

Возвращает список сотрудников с правами доступа к указанному ящику.

## Request

```
GET https://api360.yandex.net/admin/v1/org/{orgId}/mailboxes/actors/{resourceId}
```

### Параметры пути

| Параметр | Тип | Описание |
|----------|-----|---------|
| `orgId` | integer | Идентификатор организации |
| `resourceId` | string (uint64) | Идентификатор почтового ящика |

## Responses

### 200 OK

Запрос успешно выполнен.

**Response Body:**

```json
{
  "actors": [
    {
      "actorId": "example",
      "roles": ["example"]
    }
  ]
}
```

| Параметр | Тип | Описание |
|----------|-----|---------|
| `actors` | array | Список сотрудников с правами доступа к ящику |
| `actors[].actorId` | string | Идентификатор сотрудника |
| `actors[].roles` | array | Список ролей сотрудника |

**Доступные роли:**

- Веб-интерфейс: `shared_mailbox_reader`, `shared_mailbox_editor`, `shared_mailbox_admin`
- IMAP-доступ: `shared_mailbox_imap_admin`
- Права на отправку: `shared_mailbox_sender`, `shared_mailbox_half_sender`
- Полный доступ: `shared_mailbox_owner`

### 400 Bad Request

Некорректный запрос.

### 401 Unauthorized

Пользователь не авторизован.

### 403 Forbidden

Отсутствуют права доступа к ресурсу.

### 404 Not Found

Запрашиваемый ресурс не найден.

### 500 Internal Server Error

Внутренняя ошибка сервиса.
