--
-- PostgreSQL database dump
--

\restrict O1zpVouAr2bPQcKRYbix3ESwXgUQLYkrw1e4YOG4qSa30fP1ohx2JW3Z6reg6r3

-- Dumped from database version 17.6
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
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


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
    transaction_id bigint NOT NULL,
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
    delivery_ref public.citext,
    purchase_ref public.citext,
    invoice_ref public.citext
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
    category_id bigint DEFAULT 107 NOT NULL,
    thumbnail text DEFAULT 'https://dummyimage.com/600x400/000/fff'::text NOT NULL,
    gallery jsonb,
    master_number text NOT NULL,
    initial_quantity bigint DEFAULT 0 NOT NULL,
    last_stocked timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    disabled boolean DEFAULT false NOT NULL,
    minimum_quantity bigint DEFAULT 0 NOT NULL
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
    transaction_id bigint NOT NULL,
    item_id bigint NOT NULL,
    quantity bigint NOT NULL,
    CONSTRAINT chk_natural CHECK ((quantity > 0))
);


--
-- Name: net_quantity; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.net_quantity AS
 SELECT i.item_id,
    COALESCE(inc.total_incoming, (0)::numeric) AS incoming_quantity,
    COALESCE("out".total_outgoing, (0)::numeric) AS outgoing_quantity,
    (COALESCE(inc.total_incoming, (0)::numeric) - COALESCE("out".total_outgoing, (0)::numeric)) AS net
   FROM ((( SELECT incoming_items.item_id
           FROM public.incoming_items
        UNION
         SELECT outgoing_items.item_id
           FROM public.outgoing_items) i
     LEFT JOIN ( SELECT incoming_items.item_id,
            sum(incoming_items.quantity) AS total_incoming
           FROM public.incoming_items
          GROUP BY incoming_items.item_id) inc ON ((i.item_id = inc.item_id)))
     LEFT JOIN ( SELECT outgoing_items.item_id,
            sum(outgoing_items.quantity) AS total_outgoing
           FROM public.outgoing_items
          GROUP BY outgoing_items.item_id) "out" ON ((i.item_id = "out".item_id)));


--
-- Name: outgoing_transactions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.outgoing_transactions (
    id bigint NOT NULL,
    logger_id bigint NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    expend_date date DEFAULT CURRENT_DATE NOT NULL,
    expender text,
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
-- Name: quantity_trend; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.quantity_trend AS
 WITH combined_items AS (
         SELECT i_1.item_id,
            i_1.quantity,
            (date_trunc('week'::text, (t.delivery_date)::timestamp with time zone))::date AS week_starting
           FROM (public.incoming_items i_1
             JOIN public.incoming_transactions t ON ((i_1.transaction_id = t.id)))
        UNION ALL
         SELECT out_i.item_id,
            (out_i.quantity * '-1'::integer) AS quantity,
            (date_trunc('week'::text, (out_t.expend_date)::timestamp with time zone))::date AS week_starting
           FROM (public.outgoing_items out_i
             JOIN public.outgoing_transactions out_t ON ((out_i.transaction_id = out_t.id)))
        )
 SELECT i.id,
    (COALESCE((ci.week_starting)::timestamp with time zone, date_trunc('week'::text, i.last_stocked)))::date AS week_starting,
    ((i.initial_quantity)::numeric + sum(COALESCE(sum(ci.quantity), (0)::numeric)) OVER (PARTITION BY i.id ORDER BY ci.week_starting ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)) AS cumulative_net_quantity
   FROM (combined_items ci
     RIGHT JOIN public.items i ON ((ci.item_id = i.id)))
  GROUP BY ci.week_starting, i.initial_quantity, i.id, i.last_stocked
  ORDER BY i.id, ci.week_starting;


--
-- Name: quantity_trend_timeline; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.quantity_trend_timeline AS
 WITH RECURSIVE time_spine AS (
         SELECT (date_bin('7 days'::interval, (min(t.min_date))::timestamp without time zone, '2026-06-26 00:00:00'::timestamp without time zone))::date AS week_starting,
            (date_bin('7 days'::interval, (CURRENT_DATE)::timestamp without time zone, '2026-06-26 00:00:00'::timestamp without time zone))::date AS max_date
           FROM ( SELECT min(incoming_transactions.delivery_date) AS min_date
                   FROM public.incoming_transactions
                UNION ALL
                 SELECT min(outgoing_transactions.expend_date) AS min
                   FROM public.outgoing_transactions) t
        UNION ALL
         SELECT ((time_spine.week_starting + '7 days'::interval))::date AS date,
            time_spine.max_date
           FROM time_spine
          WHERE (time_spine.week_starting < time_spine.max_date)
        ), item_weeks AS (
         SELECT i.id AS item_id,
            i.master_number,
            i.name,
            i.initial_quantity,
            ts.week_starting
           FROM (public.items i
             CROSS JOIN time_spine ts)
        ), weekly_activity AS (
         SELECT sub.item_id,
            sub.week_starting,
            sum(sub.quantity) AS weekly_net
           FROM ( SELECT i.item_id,
                    i.quantity,
                    (date_bin('7 days'::interval, (t.delivery_date)::timestamp without time zone, '2026-06-26 00:00:00'::timestamp without time zone))::date AS week_starting
                   FROM (public.incoming_items i
                     JOIN public.incoming_transactions t ON ((i.transaction_id = t.id)))
                UNION ALL
                 SELECT out_i.item_id,
                    (out_i.quantity * '-1'::integer) AS quantity,
                    (date_bin('7 days'::interval, (out_t.expend_date)::timestamp without time zone, '2026-06-26 00:00:00'::timestamp without time zone))::date AS week_starting
                   FROM (public.outgoing_items out_i
                     JOIN public.outgoing_transactions out_t ON ((out_i.transaction_id = out_t.id)))) sub
          GROUP BY sub.item_id, sub.week_starting
        )
 SELECT iw.item_id AS id,
    iw.master_number,
    iw.name,
    iw.week_starting,
    ((iw.initial_quantity)::numeric + COALESCE(sum(wa.weekly_net) OVER (PARTITION BY iw.item_id ORDER BY iw.week_starting ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW), (0)::numeric)) AS cumulative_net_quantity
   FROM (item_weeks iw
     LEFT JOIN weekly_activity wa ON (((iw.item_id = wa.item_id) AND (iw.week_starting = wa.week_starting))))
  ORDER BY iw.item_id, iw.week_starting;


--
-- Name: quantity_trend_timeline_2; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.quantity_trend_timeline_2 AS
 WITH RECURSIVE time_spine AS (
         SELECT (date_bin('7 days'::interval, (min(t.min_date))::timestamp without time zone, '2026-06-26 00:00:00'::timestamp without time zone))::date AS week_starting,
            (date_bin('7 days'::interval, (CURRENT_DATE)::timestamp without time zone, '2026-06-26 00:00:00'::timestamp without time zone))::date AS max_date
           FROM ( SELECT min(incoming_transactions.delivery_date) AS min_date
                   FROM public.incoming_transactions
                UNION ALL
                 SELECT min(outgoing_transactions.expend_date) AS min
                   FROM public.outgoing_transactions) t
        UNION ALL
         SELECT ((time_spine.week_starting + '7 days'::interval))::date AS date,
            time_spine.max_date
           FROM time_spine
          WHERE (time_spine.week_starting < time_spine.max_date)
        ), item_weeks AS (
         SELECT i.id AS item_id,
            i.master_number,
            i.name,
            i.initial_quantity,
            ts.week_starting
           FROM (public.items i
             CROSS JOIN time_spine ts)
        ), weekly_activity AS (
         SELECT sub.item_id,
            sub.week_starting,
            sum(sub.quantity) AS weekly_net
           FROM ( SELECT i.item_id,
                    i.quantity,
                    (date_bin('7 days'::interval, (t.delivery_date)::timestamp without time zone, '2026-06-26 00:00:00'::timestamp without time zone))::date AS week_starting
                   FROM (public.incoming_items i
                     JOIN public.incoming_transactions t ON ((i.transaction_id = t.id)))
                UNION ALL
                 SELECT out_i.item_id,
                    (out_i.quantity * '-1'::integer) AS quantity,
                    (date_bin('7 days'::interval, (out_t.expend_date)::timestamp without time zone, '2026-06-26 00:00:00'::timestamp without time zone))::date AS week_starting
                   FROM (public.outgoing_items out_i
                     JOIN public.outgoing_transactions out_t ON ((out_i.transaction_id = out_t.id)))) sub
          GROUP BY sub.item_id, sub.week_starting
        )
 SELECT iw.item_id AS id,
    iw.master_number,
    iw.name,
    iw.week_starting,
    ((iw.initial_quantity)::numeric + COALESCE(sum(wa.weekly_net) OVER (PARTITION BY iw.item_id ORDER BY iw.week_starting ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW), (0)::numeric)) AS cumulative_net_quantity
   FROM (item_weeks iw
     LEFT JOIN weekly_activity wa ON (((iw.item_id = wa.item_id) AND (iw.week_starting = wa.week_starting))))
  ORDER BY iw.item_id, iw.week_starting;


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
    role public.role NOT NULL
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
    ADD CONSTRAINT incoming_items_incoming_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.incoming_transactions(id) ON DELETE CASCADE;


--
-- Name: incoming_items incoming_items_item_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.incoming_items
    ADD CONSTRAINT incoming_items_item_id_fkey FOREIGN KEY (item_id) REFERENCES public.items(id) ON DELETE CASCADE;


--
-- Name: outgoing_items incoming_items_item_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.outgoing_items
    ADD CONSTRAINT incoming_items_item_id_fkey FOREIGN KEY (item_id) REFERENCES public.items(id) ON DELETE CASCADE;


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
-- Name: outgoing_items outgoing_items_outgoing_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.outgoing_items
    ADD CONSTRAINT outgoing_items_outgoing_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.outgoing_transactions(id) ON DELETE CASCADE;


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

\unrestrict O1zpVouAr2bPQcKRYbix3ESwXgUQLYkrw1e4YOG4qSa30fP1ohx2JW3Z6reg6r3

