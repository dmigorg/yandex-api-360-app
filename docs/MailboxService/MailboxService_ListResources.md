# Посмотреть список ящиков, доступных сотруднику

Возвращает перечень почтовых ящиков (общих и делегированных), к которым у конкретного сотрудника установлены права доступа.

## Request

```
GET https://api360.yandex.net/admin/v1/org/{orgId}/mailboxes/resources/{actorId}
```

### Параметры пути

| Параметр | Тип | Описание |
|----------|-----|---------|
| `orgId` | integer | Идентификатор организации |
| `actorId` | string (uint64) | Идентификатор сотрудника |

## Responses

### 200 OK

Запрос успешно выполнен.

**Response Body:**

```json
{
  "resources": [
    {
      "resourceId": "string",
      "type": "string",
      "roles": ["string"]
    }
  ]
}
```

| Параметр | Тип | Описание |
|----------|-----|---------|
| `resources[].resourceId` | string | Идентификатор почтового ящика |
| `resources[].type` | string | Тип ящика: `shared` или `delegated` |
| `resources[].roles` | array | Список ролей сотрудника |

**Возможные роли:**

- `shared_mailbox_imap_admin` — управление ящиком в IMAP-клиенте
- `shared_mailbox_sender` — отправка писем
- `shared_mailbox_half_sender` — ограниченная отправка писем
- `shared_mailbox_owner` — полные права на ящик

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
