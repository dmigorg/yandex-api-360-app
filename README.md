# yandex-api-360

TypeScript-клиент для [Yandex 360 for Business API](https://yandex.ru/dev/api360/doc/).

Поддерживает все сервисы API: пользователи, отделы, группы, домены, DNS, почтовые ящики, аудит, антиспам, двухфакторная аутентификация и другие.

## Установка

```bash
bun add yandex-api-360
```

```bash
npm install yandex-api-360
```

## Быстрый старт

```ts
import { Client } from "yandex-api-360";

const client = new Client({
  organizationId: "123456",
  token: "y0_AgAAAA...",
});
```

Все клиенты доступны как свойства объекта `Client`:

| Свойство | Сервис |
|---|---|
| `client.users` | Пользователи |
| `client.departments` | Отделы |
| `client.groups` | Группы |
| `client.domains` | Домены |
| `client.dns` | DNS-записи |
| `client.mailboxes` | Общие и делегированные ящики |
| `client.postSettings` | Настройки почты пользователей |
| `client.twoFA` | Двухфакторная аутентификация |
| `client.antispam` | Белый список IP |
| `client.audit` | Аудит-лог (Диск и Почта) |
| `client.authSettings` | TTL сессий |
| `client.passwordManagement` | Политика паролей |
| `client.routing` | Правила маршрутизации почты |
| `client.domainPolicies` | Политики доменной почты |
| `client.externalContacts` | Внешние контакты |
| `client.oauthRestrictions` | Ограничения OAuth |
| `client.serviceApplications` | Сервисные приложения |
| `client.organization` | Список организаций |

## Примеры

### Создание пользователя

```ts
import { Client } from "yandex-api-360";

const client = new Client({ organizationId: "123456", token: "y0_AgAAAA..." });

const user = await client.users.add({
  nickname: "ivanov",
  name: { first: "Иван", last: "Иванов", middle: "Петрович" },
  departmentId: 1,
  password: "Str0ng#Pass!",
  position: "Разработчик",
  isAdmin: false,
  passwordChangeRequired: true,
});

console.log(user.id, user.email); // 1234567  ivanov@example.com
```

### Получение всех пользователей

```ts
// Постранично
const page = await client.users.getList(1, 10);
console.log(`Всего: ${page.total}, страниц: ${page.pages}`);

// Все сразу (автоматическая пагинация)
const allUsers = await client.users.getAll();
console.log(`Загружено: ${allUsers.length}`);
```

### Редактирование пользователя

```ts
const updated = await client.users.edit({
  id: 1234567,
  position: "Senior-разработчик",
  isAdmin: true,
});
```

### Добавление email-псевдонима

```ts
await client.users.addAlias(1234567, "i.ivanov");
// адрес i.ivanov@example.com теперь доставляет почту в ящик ivanov
```

### Загрузка аватара

```ts
const imageBuffer = await Bun.file("avatar.png").arrayBuffer();
const avatarUrl = await client.users.setAvatar(1234567, imageBuffer, "image/png");
console.log(avatarUrl); // https://avatars.yandex.net/...
```

---

### Работа с отделами

```ts
// Создать отдел
const dept = await client.departments.add({
  name: "Разработка",
  parentId: 1,
  label: "dev",
});

// Все отделы (автоматическая пагинация)
const all = await client.departments.getAll();
```

---

### Управление группами

```ts
import { MemberTypes } from "yandex-api-360";

// Создать группу
const group = await client.groups.add({
  name: "Backend",
  label: "backend",
  description: "Команда бэкенд-разработки",
});

// Добавить участника (v1)
await client.groups.addMember(group.id, { type: MemberTypes.user, id: 1234567 });

// Добавить нескольких участников (v2)
await client.groups.addMembers(group.id, {
  userIds: ["1234567", "7654321"],
  departmentIds: [42],
});
```

---

### Управление общим почтовым ящиком

```ts
import { RoleType } from "yandex-api-360";

// Создать общий ящик
const resourceId = await client.mailboxes.add(
  "support@example.com",
  "Поддержка",
  "Общий ящик службы поддержки",
);

// Выдать доступ сотруднику
const taskId = await client.mailboxes.setRules(
  resourceId,
  "1234567",
  [RoleType.SharedMailboxEditor],
);

// Дождаться завершения асинхронной операции
const status = await client.mailboxes.getTaskStatus(taskId);
console.log(status); // "complete"
```

---

### Аудит-лог

```ts
// Последние 100 событий на Диске
const diskLog = await client.audit.getDiskLog({ pageSize: 100 });

// Почтовые события за последние 7 дней с обходом всех страниц
const after = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
let page = await client.audit.getMailLog({ pageSize: 200, afterDate: after });
const events = [...page.events];

while (page.nextPageToken) {
  page = await client.audit.getMailLog({
    pageSize: 200,
    afterDate: after,
    pageToken: page.nextPageToken,
  });
  events.push(...page.events);
}
```

---

### Двухфакторная аутентификация

```ts
// Включить обязательную 2FA для домена
await client.twoFA.enable({
  duration: 72,          // 72 часа на настройку
  logoutUsers: false,
  validationMethod: "default",
});

// Проверить и сбросить 2FA конкретного пользователя
const status = await client.users.getStatus2FA(1234567);
if (status.has2fa && status.hasSecurityPhone) {
  await client.users.clear2FA(1234567);
}
```

---

### DNS-записи домена

```ts
import { DNSRecordTypes } from "yandex-api-360";

// Все записи домена
const records = await client.dns.getAll("example.com");

// Добавить TXT-запись
const record = await client.dns.add("example.com", {
  name: "_dmarc",
  type: DNSRecordTypes.TXT,
  ttl: 21600,
  text: "v=DMARC1; p=none; rua=mailto:dmarc@example.com",
});
```

---

## Обработка ошибок

Все методы бросают `APIRequestError` при HTTP-ошибках (400, 401, 403, 404, 500):

```ts
import { APIRequestError, Client } from "yandex-api-360";

try {
  await client.users.add({ /* ... */ });
} catch (error) {
  if (error instanceof APIRequestError) {
    console.error(`HTTP ${error.statusCode}:`, error.errorData?.message);
  }
}
```

## Конфигурация

| Параметр | Тип | По умолчанию | Описание |
|---|---|---|---|
| `organizationId` | `string` | — | ID организации в Яндекс 360 |
| `token` | `string` | — | OAuth-токен |
| `baseUrl` | `string` | `https://api360.yandex.net` | Базовый URL API |
| `maxResponseCount` | `number` | `1000` | Лимит на страницу при `getAll()` |

```ts
import { Api360Options, Client } from "yandex-api-360";

// Прямая передача параметров
const client = new Client({
  organizationId: "123456",
  token: "y0_AgAAAA...",
  maxResponseCount: 500,
});

// Через объект Api360Options (для переиспользования)
const options = new Api360Options({ organizationId: "123456", token: "y0_AgAAAA..." });
const client2 = new Client(options);
```

## Лицензия

MIT
