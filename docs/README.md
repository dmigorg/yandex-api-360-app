# Yandex 360 API — Документация

Полная документация API Yandex 360. Базовый URL: `https://api360.yandex.net`

## Разделы

### Почта

#### [MailAntispamIpAllowlistService](./MailAntispamIpAllowlistService/index.md) — Список разрешённых IP для антиспама

| Метод | Описание | Файл |
|-------|---------|------|
| GET | Посмотреть список разрешённых IP | [MailAntispamIpAllowlistService_Get.md](./MailAntispamIpAllowlistService/MailAntispamIpAllowlistService_Get.md) |
| POST | Создать/заменить список разрешённых IP | [MailAntispamIpAllowlistService_Create.md](./MailAntispamIpAllowlistService/MailAntispamIpAllowlistService_Create.md) |
| DELETE | Удалить список разрешённых IP | [MailAntispamIpAllowlistService_Delete.md](./MailAntispamIpAllowlistService/MailAntispamIpAllowlistService_Delete.md) |

#### [MailboxService](./MailboxService/index.md) — Управление почтовыми ящиками

| Метод | Описание | Файл |
|-------|---------|------|
| GET | Список акторов делегирования | [MailboxService_ListActors.md](./MailboxService/MailboxService_ListActors.md) |
| GET | Список делегированных ящиков | [MailboxService_ListDelegated.md](./MailboxService/MailboxService_ListDelegated.md) |
| POST | Создать делегированный ящик | [MailboxService_CreateDelegated.md](./MailboxService/MailboxService_CreateDelegated.md) |
| DELETE | Удалить делегированный ящик | [MailboxService_DeleteDelegated.md](./MailboxService/MailboxService_DeleteDelegated.md) |
| GET | Список ресурсных ящиков | [MailboxService_ListResources.md](./MailboxService/MailboxService_ListResources.md) |
| PUT | Настроить ресурсный ящик | [MailboxService_Set.md](./MailboxService/MailboxService_Set.md) |
| GET | Список общих ящиков | [MailboxService_ListShared.md](./MailboxService/MailboxService_ListShared.md) |
| POST | Создать общий ящик | [MailboxService_CreateShared.md](./MailboxService/MailboxService_CreateShared.md) |
| GET | Посмотреть общий ящик | [MailboxService_GetShared.md](./MailboxService/MailboxService_GetShared.md) |
| PATCH | Изменить общий ящик | [MailboxService_UpdateShared.md](./MailboxService/MailboxService_UpdateShared.md) |
| DELETE | Удалить общий ящик | [MailboxService_DeleteShared.md](./MailboxService/MailboxService_DeleteShared.md) |
| GET | Статус задачи | [MailboxService_TaskStatus.md](./MailboxService/MailboxService_TaskStatus.md) |

#### [DomainPolicies](./DomainPolicies/index.md) — Политики домена для почты

| Метод | Описание | Файл |
|-------|---------|------|
| GET | Посмотреть политики домена | [DomainPolicies_Get.md](./DomainPolicies/DomainPolicies_Get.md) |
| POST | Изменить политики домена | [DomainPolicies_Set.md](./DomainPolicies/DomainPolicies_Set.md) |

#### [RoutingService](./RoutingService/index.md) — Правила маршрутизации почты

| Метод | Описание | Файл |
|-------|---------|------|
| GET | Посмотреть правила маршрутизации | [RoutingService_GetRules.md](./RoutingService/RoutingService_GetRules.md) |
| PUT | Изменить правила маршрутизации | [RoutingService_SetRules.md](./RoutingService/RoutingService_SetRules.md) |

#### [MailUserSettingsService](./MailUserSettingsService/index.md) — Настройки почты пользователей

| Метод | Описание | Файл |
|-------|---------|------|
| GET | Посмотреть настройки адресной книги | [MailUserSettingsService_GetAddressBook.md](./MailUserSettingsService/MailUserSettingsService_GetAddressBook.md) |
| POST | Изменить настройки адресной книги | [MailUserSettingsService_SetAddressBook.md](./MailUserSettingsService/MailUserSettingsService_SetAddressBook.md) |
| GET | Посмотреть информацию об отправителе | [MailUserSettingsService_GetSenderInfo.md](./MailUserSettingsService/MailUserSettingsService_GetSenderInfo.md) |
| POST | Изменить информацию об отправителе | [MailUserSettingsService_SetSenderInfo.md](./MailUserSettingsService/MailUserSettingsService_SetSenderInfo.md) |
| GET | Список правил фильтрации | [MailUserSettingsService_GetRules.md](./MailUserSettingsService/MailUserSettingsService_GetRules.md) |
| POST | Создать правило фильтрации | [MailUserSettingsService_CreateRule.md](./MailUserSettingsService/MailUserSettingsService_CreateRule.md) |
| DELETE | Удалить правило фильтрации | [MailUserSettingsService_DeleteRule.md](./MailUserSettingsService/MailUserSettingsService_DeleteRule.md) |

---

### Справочник организации

#### [DepartmentService](./DepartmentService/index.md) — Управление подразделениями

| Метод | Описание | Файл |
|-------|---------|------|
| GET | Список подразделений | [DepartmentService_List.md](./DepartmentService/DepartmentService_List.md) |
| POST | Создать подразделение | [DepartmentService_Create.md](./DepartmentService/DepartmentService_Create.md) |
| GET | Посмотреть подразделение | [DepartmentService_Get.md](./DepartmentService/DepartmentService_Get.md) |
| DELETE | Удалить подразделение | [DepartmentService_Delete.md](./DepartmentService/DepartmentService_Delete.md) |
| PATCH | Изменить подразделение | [DepartmentService_Update.md](./DepartmentService/DepartmentService_Update.md) |
| POST | Создать алиас подразделения | [DepartmentService_CreateAlias.md](./DepartmentService/DepartmentService_CreateAlias.md) |
| DELETE | Удалить алиас подразделения | [DepartmentService_DeleteAlias.md](./DepartmentService/DepartmentService_DeleteAlias.md) |

#### [DomainDNSService](./DomainDNSService/index.md) — DNS-записи домена

| Метод | Описание | Файл |
|-------|---------|------|
| GET | Список DNS-записей | [DomainDNSService_List.md](./DomainDNSService/DomainDNSService_List.md) |
| POST | Создать DNS-запись | [DomainDNSService_Create.md](./DomainDNSService/DomainDNSService_Create.md) |
| PUT | Изменить DNS-запись | [DomainDNSService_Edit.md](./DomainDNSService/DomainDNSService_Edit.md) |
| DELETE | Удалить DNS-запись | [DomainDNSService_Delete.md](./DomainDNSService/DomainDNSService_Delete.md) |

#### [DomainService](./DomainService/index.md) — Управление доменами

| Метод | Описание | Файл |
|-------|---------|------|
| GET | Список доменов | [DomainService_List.md](./DomainService/DomainService_List.md) |
| POST | Добавить домен | [DomainService_Create.md](./DomainService/DomainService_Create.md) |
| DELETE | Удалить домен | [DomainService_Delete.md](./DomainService/DomainService_Delete.md) |
| GET | Статус DKIM | [DomainService_DKIMStatus.md](./DomainService/DomainService_DKIMStatus.md) |
| POST | Отключить DKIM | [DomainService_DKIMDisable.md](./DomainService/DomainService_DKIMDisable.md) |
| POST | Включить DKIM | [DomainService_DKIMEnable.md](./DomainService/DomainService_DKIMEnable.md) |
| GET | Статус домена | [DomainService_Status.md](./DomainService/DomainService_Status.md) |

#### [ExternalContactService](./ExternalContactService/index.md) — Внешние контакты

| Метод | Описание | Файл |
|-------|---------|------|
| GET | Список внешних контактов | [ExternalContactService_List.md](./ExternalContactService/ExternalContactService_List.md) |
| POST | Создать внешний контакт | [ExternalContactService_Create.md](./ExternalContactService/ExternalContactService_Create.md) |
| GET | Посмотреть внешний контакт | [ExternalContactService_Get.md](./ExternalContactService/ExternalContactService_Get.md) |
| DELETE | Удалить внешний контакт | [ExternalContactService_Delete.md](./ExternalContactService/ExternalContactService_Delete.md) |
| PATCH | Изменить внешний контакт | [ExternalContactService_Update.md](./ExternalContactService/ExternalContactService_Update.md) |
| PUT | Обновить email контакта | [ExternalContactService_UpdateEmails.md](./ExternalContactService/ExternalContactService_UpdateEmails.md) |
| PUT | Обновить телефоны контакта | [ExternalContactService_UpdatePhones.md](./ExternalContactService/ExternalContactService_UpdatePhones.md) |

#### [GroupService](./GroupService/index.md) — Управление группами (v1)

| Метод | Описание | Файл |
|-------|---------|------|
| GET | Список групп | [GroupService_List.md](./GroupService/GroupService_List.md) |
| POST | Создать группу | [GroupService_Create.md](./GroupService/GroupService_Create.md) |
| GET | Посмотреть группу | [GroupService_Get.md](./GroupService/GroupService_Get.md) |
| DELETE | Удалить группу | [GroupService_Delete.md](./GroupService/GroupService_Delete.md) |
| PATCH | Изменить группу | [GroupService_Update.md](./GroupService/GroupService_Update.md) |
| GET | Список участников группы | [GroupService_ListMembers.md](./GroupService/GroupService_ListMembers.md) |
| PUT | Обновить участников группы | [GroupService_UpdateMembers.md](./GroupService/GroupService_UpdateMembers.md) |
| POST | Добавить участника в группу | [GroupService_AddMember.md](./GroupService/GroupService_AddMember.md) |
| DELETE | Удалить всех участников | [GroupService_DeleteMembers.md](./GroupService/GroupService_DeleteMembers.md) |
| DELETE | Удалить участника из группы | [GroupService_DeleteMember.md](./GroupService/GroupService_DeleteMember.md) |

#### [GroupV2Service](./GroupV2Service/index.md) — Управление участниками групп (v2)

| Метод | Описание | Файл |
|-------|---------|------|
| GET | Список участников группы | [GroupService_ListMembers.md](./GroupV2Service/GroupService_ListMembers.md) |
| POST | Добавить участников в группу | [GroupService_AddMembers.md](./GroupV2Service/GroupService_AddMembers.md) |
| DELETE | Удалить участников из группы | [GroupService_DeleteMembers.md](./GroupV2Service/GroupService_DeleteMembers.md) |

#### [OrganizationsService](./OrganizationsService/index.md) — Организации

| Метод | Описание | Файл |
|-------|---------|------|
| GET | Список организаций | [OrganizationsService_List.md](./OrganizationsService/OrganizationsService_List.md) |

#### [UserService](./UserService/index.md) — Управление сотрудниками

| Метод | Описание | Файл |
|-------|---------|------|
| GET | Список сотрудников | [UserService_List.md](./UserService/UserService_List.md) |
| POST | Создать сотрудника | [UserService_Create.md](./UserService/UserService_Create.md) |
| GET | Посмотреть сотрудника | [UserService_Get.md](./UserService/UserService_Get.md) |
| PATCH | Изменить данные сотрудника | [UserService_Update.md](./UserService/UserService_Update.md) |
| GET | Статус 2FA сотрудника | [UserService_Get2fa.md](./UserService/UserService_Get2fa.md) |
| DELETE | Сбросить 2FA сотрудника | [UserService_Delete2fa.md](./UserService/UserService_Delete2fa.md) |
| POST | Создать алиас сотрудника | [UserService_CreateUserAlias.md](./UserService/UserService_CreateUserAlias.md) |
| DELETE | Удалить алиас сотрудника | [UserService_DeleteUserAlias.md](./UserService/UserService_DeleteUserAlias.md) |
| PUT | Загрузить портрет сотрудника | [UserService_UpdateAvatar.md](./UserService/UserService_UpdateAvatar.md) |
| PUT | Изменить контактную информацию | [UserService_UpdateContacts.md](./UserService/UserService_UpdateContacts.md) |
| DELETE | Удалить контактную информацию | [UserService_DeleteContacts.md](./UserService/UserService_DeleteContacts.md) |
| GET | Статус персональной 2FA | [UserService_GetDomain2fa.md](./UserService/UserService_GetDomain2fa.md) |
| PATCH | Изменить статус персональной 2FA | [UserService_UpdateDomain2fa.md](./UserService/UserService_UpdateDomain2fa.md) |

---

### Безопасность

#### [AuditLogService](./AuditLogService/index.md) — Аудит-лог

| Метод | Описание | Файл |
|-------|---------|------|
| GET | События диска | [AuditLogService_Disk.md](./AuditLogService/AuditLogService_Disk.md) |
| GET | События почты | [AuditLogService_Mail.md](./AuditLogService/AuditLogService_Mail.md) |

#### [Domain2FAService](./Domain2FAService/index.md) — Двухфакторная аутентификация (v1)

| Метод | Описание | Файл |
|-------|---------|------|
| GET | Посмотреть статус 2FA | [Domain2FAService_Get.md](./Domain2FAService/Domain2FAService_Get.md) |
| POST | Включить 2FA | [Domain2FAService_Enable.md](./Domain2FAService/Domain2FAService_Enable.md) |
| DELETE | Отключить 2FA | [Domain2FAService_Disable.md](./Domain2FAService/Domain2FAService_Disable.md) |

#### [Domain2FAV2Service](./Domain2FAV2Service/index.md) — Двухфакторная аутентификация (v2)

| Метод | Описание | Файл |
|-------|---------|------|
| GET | Посмотреть статус 2FA | [Domain2FAService_Get.md](./Domain2FAV2Service/Domain2FAService_Get.md) |
| POST | Включить 2FA | [Domain2FAService_Enable.md](./Domain2FAV2Service/Domain2FAService_Enable.md) |
| DELETE | Отключить 2FA | [Domain2FAService_Disable.md](./Domain2FAV2Service/Domain2FAService_Disable.md) |

#### [DomainPasswordsService](./DomainPasswordsService/index.md) — Политика паролей

| Метод | Описание | Файл |
|-------|---------|------|
| GET | Посмотреть параметры политики паролей | [DomainPasswordsService_Get.md](./DomainPasswordsService/DomainPasswordsService_Get.md) |
| PUT | Изменить параметры политики паролей | [DomainPasswordsService_Update.md](./DomainPasswordsService/DomainPasswordsService_Update.md) |

#### [DomainSessionsService](./DomainSessionsService/index.md) — Управление сессиями

| Метод | Описание | Файл |
|-------|---------|------|
| GET | Посмотреть время жизни сессий | [DomainSessionsService_Get.md](./DomainSessionsService/DomainSessionsService_Get.md) |
| POST | Изменить время жизни сессий | [DomainSessionsService_Update.md](./DomainSessionsService/DomainSessionsService_Update.md) |
| PUT | Завершить сессии сотрудника | [DomainSessionsService_UserLogout.md](./DomainSessionsService/DomainSessionsService_UserLogout.md) |

#### [OauthAccessRestrictionsService](./OauthAccessRestrictionsService/index.md) — Ограничения OAuth-авторизации

| Метод | Описание | Файл |
|-------|---------|------|
| GET | Посмотреть статус ограничения OAuth | [OauthAccessRestrictionsService_Get.md](./OauthAccessRestrictionsService/OauthAccessRestrictionsService_Get.md) |
| POST | Включить ограничение OAuth | [OauthAccessRestrictionsService_Enable.md](./OauthAccessRestrictionsService/OauthAccessRestrictionsService_Enable.md) |
| DELETE | Отключить ограничение OAuth | [OauthAccessRestrictionsService_Disable.md](./OauthAccessRestrictionsService/OauthAccessRestrictionsService_Disable.md) |

#### [ServiceApplicationsService](./ServiceApplicationsService/index.md) — Сервисные приложения

| Метод | Описание | Файл |
|-------|---------|------|
| GET | Список сервисных приложений | [ServiceApplicationsService_Get.md](./ServiceApplicationsService/ServiceApplicationsService_Get.md) |
| POST | Создать список сервисных приложений | [ServiceApplicationsService_Create.md](./ServiceApplicationsService/ServiceApplicationsService_Create.md) |
| DELETE | Очистить список сервисных приложений | [ServiceApplicationsService_Delete.md](./ServiceApplicationsService/ServiceApplicationsService_Delete.md) |
| POST | Активировать функцию | [ServiceApplicationsService_Activate.md](./ServiceApplicationsService/ServiceApplicationsService_Activate.md) |
| POST | Деактивировать функцию | [ServiceApplicationsService_Deactivate.md](./ServiceApplicationsService/ServiceApplicationsService_Deactivate.md) |
