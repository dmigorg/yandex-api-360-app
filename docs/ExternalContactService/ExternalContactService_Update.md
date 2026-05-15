# Изменить описание контакта

Изменяет описание внешнего контакта: фамилию, имя, отчество, должность, подразделение, компанию и почтовый адрес. Для изменения электронных адресов и телефонов используйте отдельные методы.

Обновляются только те параметры, которые были переданы в запросе.

## Request

```
PATCH https://api360.yandex.net/directory/v1/org/{orgId}/external_contacts/{contactId}
```

### Параметры пути

| Параметр | Тип | Описание |
|----------|-----|---------|
| `orgId` | integer | Идентификатор организации |
| `contactId` | string | Идентификатор внешнего контакта |

### Body (application/json)

```json
{
  "firstName": "example",
  "lastName": "example",
  "middleName": "example",
  "title": "example",
  "company": "example",
  "department": "example",
  "address": "example"
}
```

| Параметр | Тип | Описание |
|----------|-----|---------|
| `firstName` | string | Имя |
| `lastName` | string | Фамилия |
| `middleName` | string | Отчество |
| `title` | string | Должность |
| `company` | string | Компания |
| `department` | string | Подразделение |
| `address` | string | Почтовый адрес |

## Responses

### 200 OK

Запрос успешно выполнен.

```json
{
  "id": "example"
}
```

### 400 Bad Request

Некорректный запрос.

### 401 Unauthorized

Пользователь не авторизован.

### 403 Forbidden

Отсутствуют права доступа.

### 404 Not Found

Ресурс не найден.

### 500 Internal Server Error

Внутренняя ошибка сервиса.
