
insert into contactme.user (uuid, auth0_id, created_at, updated_at) 
values ('123456789','1234_auth0_1234', now(), now());

select * from contactme.user;

select * from contactme.user;
select * from contactme.message;
drop table contactme.user;