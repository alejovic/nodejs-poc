CREATE DATABASE nodejs;

create table public.users (
  id serial primary key,
  name VARCHAR(30),
  email VARCHAR(30)
);


INSERT INTO public.users (name,email)	
    VALUES ('alejandro','alejovic@gmail.com'),
    VALUES ('diana','diana@gmail.com');
