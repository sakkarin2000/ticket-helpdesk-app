CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
create table if not exists ticket
(
    id           uuid      default uuid_generate_v4()           not null
        constraint ticket_pk
            primary key,
    title        varchar                                        not null,
    description  varchar,
    contact_info varchar,
    created_at   timestamp default CURRENT_TIMESTAMP            not null,
    updated_at   timestamp default CURRENT_TIMESTAMP            not null,
    status       varchar   default 'Pending'::character varying not null
);

alter table ticket
    owner to helpdesk_admin;

create unique index if not exists ticket_id_uindex
    on ticket (id);

