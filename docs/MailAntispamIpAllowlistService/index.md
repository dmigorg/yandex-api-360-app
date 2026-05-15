# Список антиспама

## Обзор

Сервис для управления настройками антиспама: определяет IP-адреса и CIDR-подсети, которые исключаются из спам-фильтрации почты Яндекса.

## Разрешения на использование сервиса

- `ya360_admin:mail_read_antispam_settings` — чтение настроек антиспама
- `ya360_admin:mail_write_antispam_settings` — полное управление настройками антиспама (чтение и запись)

## Endpoints

1. [Просмотреть список](MailAntispamIpAllowlistService_Get.md) — получить текущие настройки allowlist антиспама
2. [Создать список](MailAntispamIpAllowlistService_Create.md) — создать новую конфигурацию allowlist антиспама
3. [Удалить список](MailAntispamIpAllowlistService_Delete.md) — удалить существующий allowlist антиспама
