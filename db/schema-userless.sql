--
-- PostgreSQL database dump
--

\restrict 72No7gvzhRrqJRO1Hv9nuBqBSoTxEvdwPRGtqPiG7Tgze9wdgzEcfCC1obNC1AH

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: citext; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;


--
-- Name: EXTENSION citext; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION citext IS 'data type for case-insensitive character strings';


--
-- Name: role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.role AS ENUM (
    'QS',
    'Procurement',
    'Project',
    'Admin'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.categories (
    id bigint NOT NULL,
    name public.citext NOT NULL
);


--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.categories ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: incoming_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.incoming_items (
    transaction_id bigint CONSTRAINT incoming_items_incoming_id_not_null NOT NULL,
    item_id bigint NOT NULL,
    quantity bigint NOT NULL,
    CONSTRAINT chk_natural CHECK ((quantity > 0))
);


--
-- Name: incoming_transactions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.incoming_transactions (
    id bigint NOT NULL,
    logger_id bigint NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    delivery_date date DEFAULT CURRENT_DATE NOT NULL,
    supplier_id bigint NOT NULL,
    delivery_ref text NOT NULL
);


--
-- Name: incoming_transactions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.incoming_transactions ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.incoming_transactions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.items (
    id bigint NOT NULL,
    name public.citext NOT NULL,
    category_id bigint NOT NULL,
    supplier_id bigint NOT NULL,
    thumbnail text NOT NULL,
    photos jsonb,
    master_number text NOT NULL,
    initial_quantity bigint DEFAULT 0 CONSTRAINT items_quantity_not_null NOT NULL,
    last_stocked timestamp with time zone DEFAULT CURRENT_TIMESTAMP CONSTRAINT items_last_edit_not_null NOT NULL,
    disabled boolean DEFAULT false NOT NULL
);


--
-- Name: items_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.items ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: outgoing_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.outgoing_items (
    transaction_id bigint CONSTRAINT outgoing_items_outgoing_id_not_null NOT NULL,
    item_id bigint NOT NULL,
    quantity bigint NOT NULL,
    CONSTRAINT chk_natural CHECK ((quantity > 0))
);


--
-- Name: net_quantity; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.net_quantity AS
 SELECT COALESCE(i.item_id, o.item_id) AS item_id,
    sum(i.quantity) AS incoming_quantity,
    sum(o.quantity) AS outgoing_quantity,
    (COALESCE(sum(i.quantity), (0)::numeric) - COALESCE(sum(o.quantity), (0)::numeric)) AS net
   FROM (public.incoming_items i
     FULL JOIN public.outgoing_items o USING (item_id))
  GROUP BY COALESCE(i.item_id, o.item_id);


--
-- Name: outgoing_transactions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.outgoing_transactions (
    id bigint NOT NULL,
    logger_id bigint NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    expend_date date DEFAULT CURRENT_DATE NOT NULL,
    expender text NOT NULL,
    remarks text
);


--
-- Name: outgoing_transactions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.outgoing_transactions ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.outgoing_transactions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id text NOT NULL,
    secret_hash bytea NOT NULL,
    created_at integer NOT NULL,
    user_id bigint NOT NULL
);


--
-- Name: suppliers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.suppliers (
    id bigint NOT NULL,
    name public.citext NOT NULL
);


--
-- Name: suppliers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.suppliers ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.suppliers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    email public.citext NOT NULL,
    name public.citext NOT NULL,
    password_hash text NOT NULL,
    role public.role NOT NULL,
    initial_quantity bigint DEFAULT 0 NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: categories categories_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_key UNIQUE (name);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: incoming_items incoming_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.incoming_items
    ADD CONSTRAINT incoming_items_pkey PRIMARY KEY (transaction_id, item_id);


--
-- Name: incoming_transactions incoming_transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.incoming_transactions
    ADD CONSTRAINT incoming_transactions_pkey PRIMARY KEY (id);


--
-- Name: incoming_transactions incoming_transactions_supplier_id_delivery_ref_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.incoming_transactions
    ADD CONSTRAINT incoming_transactions_supplier_id_delivery_ref_key UNIQUE (supplier_id, delivery_ref);


--
-- Name: items items_master_number_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_master_number_key UNIQUE (master_number);


--
-- Name: items items_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_name_key UNIQUE (name);


--
-- Name: items items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);


--
-- Name: outgoing_items outgoing_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.outgoing_items
    ADD CONSTRAINT outgoing_items_pkey PRIMARY KEY (transaction_id, item_id);


--
-- Name: outgoing_transactions outgoing_transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.outgoing_transactions
    ADD CONSTRAINT outgoing_transactions_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: suppliers suppliers_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT suppliers_name_key UNIQUE (name);


--
-- Name: suppliers suppliers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT suppliers_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_name_key UNIQUE (name);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: incoming_items incoming_items_incoming_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.incoming_items
    ADD CONSTRAINT incoming_items_incoming_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.incoming_transactions(id);


--
-- Name: incoming_items incoming_items_item_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.incoming_items
    ADD CONSTRAINT incoming_items_item_id_fkey FOREIGN KEY (item_id) REFERENCES public.items(id);


--
-- Name: incoming_transactions incoming_transactions_logger_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.incoming_transactions
    ADD CONSTRAINT incoming_transactions_logger_id_fkey FOREIGN KEY (logger_id) REFERENCES public.users(id);


--
-- Name: incoming_transactions incoming_transactions_supplier_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.incoming_transactions
    ADD CONSTRAINT incoming_transactions_supplier_id_fkey FOREIGN KEY (supplier_id) REFERENCES public.suppliers(id);


--
-- Name: items items_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- Name: items items_supplier_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_supplier_id_fkey FOREIGN KEY (supplier_id) REFERENCES public.suppliers(id);


--
-- Name: outgoing_items outgoing_items_item_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.outgoing_items
    ADD CONSTRAINT outgoing_items_item_id_fkey FOREIGN KEY (item_id) REFERENCES public.items(id);


--
-- Name: outgoing_items outgoing_items_outgoing_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.outgoing_items
    ADD CONSTRAINT outgoing_items_outgoing_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.outgoing_transactions(id);


--
-- Name: outgoing_transactions outgoing_transactions_logger_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.outgoing_transactions
    ADD CONSTRAINT outgoing_transactions_logger_id_fkey FOREIGN KEY (logger_id) REFERENCES public.users(id);


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

\unrestrict 72No7gvzhRrqJRO1Hv9nuBqBSoTxEvdwPRGtqPiG7Tgze9wdgzEcfCC1obNC1AH

