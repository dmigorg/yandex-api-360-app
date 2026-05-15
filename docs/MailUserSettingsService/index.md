# Настройки почты сотрудников

Сервис для управления настройками почтовых ящиков сотрудников. Работает для пользователей, аккаунты которых созданы на домене организации.

## Разрешения на использование сервиса

- `ya360_admin:mail_read_user_settings` — чтение настроек почты пользователя
- `ya360_admin:mail_write_user_settings` — управление настройками почты пользователя

## Endpoints

- [Просмотреть статус автоматического сбора контактов](MailUserSettingsService_GetAddressBook.md)
- [Изменить статус автоматического сбора контактов](MailUserSettingsService_SetAddressBook.md)
- [Просмотреть основной адрес и подписи](MailUserSettingsService_GetSenderInfo.md)
- [Изменить основной адрес и подписи](MailUserSettingsService_SetSenderInfo.md)
- [Просмотреть правила автоответа и пересылки](MailUserSettingsService_GetRules.md)
- [Создать правило автоответа или пересылки](MailUserSettingsService_CreateRule.md)
- [Удалить правило автоответа или пересылки](MailUserSettingsService_DeleteRule.md)
