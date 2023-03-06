create table if not exists status
(
    id             integer not null
        constraint status_pk
            primary key,
    status_name_en varchar not null
);

alter table status
    owner to helpdesk_admin;

create unique index if not exists status_id_uindex
    on status (id);

create unique index if not exists status_status_name_en_uindex
    on status (status_name_en);

create table if not exists ticket
(
    id           uuid      default uuid_generate_v4() not null
        constraint ticket_pk
            primary key,
    title        varchar                              not null,
    description  varchar,
    contact_info varchar,
    created_at   timestamp default CURRENT_TIMESTAMP  not null,
    updated_at   timestamp default CURRENT_TIMESTAMP  not null,
    status       integer   default 0                  not null
        constraint ticket_status___fk
            references status
);

alter table ticket
    owner to helpdesk_admin;

create unique index if not exists ticket_id_uindex
    on ticket (id);

INSERT INTO public.status (id, status_name_en) VALUES (0, 'pending');
INSERT INTO public.status (id, status_name_en) VALUES (-1, 'rejected');
INSERT INTO public.status (id, status_name_en) VALUES (2, 'resolved');
INSERT INTO public.status (id, status_name_en) VALUES (1, 'accepted');
