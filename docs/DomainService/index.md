# Домены

Сервис для работы с доменами. Позволяет просматривать, создавать, изменять и удалять домены, а также получать информацию о статусе подключения и списке настроек.

## Права доступа

- `directory:read_domains` — просмотр доменов
- `directory:write_domains` — просмотр и изменение доменов

## Endpoints

- [Посмотреть список доменов](DomainService_List.md)
- [Добавить домен](DomainService_Create.md)
- [Удалить домен](DomainService_Delete.md)
- [Получить статус DKIM для домена](DomainService_DKIMStatus.md)
- [Выключить DKIM подпись для домена](DomainService_DKIMDisable.md)
- [Включить DKIM подпись для домена](DomainService_DKIMEnable.md)
- [Получить статус подключения домена](DomainService_Status.md)
