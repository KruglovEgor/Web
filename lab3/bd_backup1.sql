toc.dat                                                                                             0000600 0004000 0002000 00000004337 14516705663 0014463 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        PGDMP       +                	    {            web_lab3    15.3    15.3 	    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false         �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false         �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false         �           1262    24686    web_lab3    DATABASE     �   CREATE DATABASE web_lab3 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE web_lab3;
                postgres    false         �            1259    24687    record    TABLE     C  CREATE TABLE public.record (
    id integer NOT NULL,
    x double precision NOT NULL,
    y double precision NOT NULL,
    r double precision NOT NULL,
    record_time timestamp without time zone DEFAULT now() NOT NULL,
    execution_time double precision NOT NULL,
    hit boolean NOT NULL,
    type smallint NOT NULL
);
    DROP TABLE public.record;
       public         heap    postgres    false         �            1259    24691    record_id_seq    SEQUENCE     �   ALTER TABLE public.record ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.record_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    214         �          0    24687    record 
   TABLE DATA                 public          postgres    false    214       3318.dat �           0    0    record_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.record_id_seq', 10, true);
          public          postgres    false    215         g           2606    24693    record record_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.record
    ADD CONSTRAINT record_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.record DROP CONSTRAINT record_pkey;
       public            postgres    false    214                                                                                                                                                                                                                                                                                                         3318.dat                                                                                            0000600 0004000 0002000 00000000522 14516705663 0014264 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        INSERT INTO public.record (id, x, y, r, record_time, execution_time, hit, type) OVERRIDING SYSTEM VALUE VALUES (9, 0, 0, 0, '2023-10-27 13:03:10.182', 803, true, 1);
INSERT INTO public.record (id, x, y, r, record_time, execution_time, hit, type) OVERRIDING SYSTEM VALUE VALUES (10, -2, 3, 2, '2023-10-27 13:03:27.786', 17.3, false, 1);


                                                                                                                                                                              restore.sql                                                                                         0000600 0004000 0002000 00000004665 14516705663 0015414 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        --
-- NOTE:
--
-- File paths need to be edited. Search for $$PATH$$ and
-- replace it with the path to the directory containing
-- the extracted data files.
--
--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE web_lab3;
--
-- Name: web_lab3; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE web_lab3 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';


ALTER DATABASE web_lab3 OWNER TO postgres;

\connect web_lab3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: record; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.record (
    id integer NOT NULL,
    x double precision NOT NULL,
    y double precision NOT NULL,
    r double precision NOT NULL,
    record_time timestamp without time zone DEFAULT now() NOT NULL,
    execution_time double precision NOT NULL,
    hit boolean NOT NULL,
    type smallint NOT NULL
);


ALTER TABLE public.record OWNER TO postgres;

--
-- Name: record_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.record ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.record_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: record; Type: TABLE DATA; Schema: public; Owner: postgres
--

\i $$PATH$$/3318.dat

--
-- Name: record_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.record_id_seq', 10, true);


--
-- Name: record record_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.record
    ADD CONSTRAINT record_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           