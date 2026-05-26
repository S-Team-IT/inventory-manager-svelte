--
-- PostgreSQL database dump
--

\restrict 4a4rHgWRIV75hlTeB3wfUrssEMLducyTuWGCDpkKhxTWdtaECHH1cpeSgz7yhl8

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
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: inventory_user
--

COPY public.categories (id, name) FROM stdin;
1	Category 1
2	Category 2
\.


--
-- Data for Name: suppliers; Type: TABLE DATA; Schema: public; Owner: inventory_user
--

COPY public.suppliers (id, name) FROM stdin;
1	Supplier 1
2	Supplier 2
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: inventory_user
--

COPY public.users (id, email, name, password_hash, role, initial_quantity) FROM stdin;
1	faethychan@gmail.com	Charlotte	$2b$10$cnlS0ibEYcEugOsuq1SyYuP8HuCSn.ZfhM5Avv5zPivqlz5JTUXLW	QS	0
\.


--
-- Data for Name: incoming_transactions; Type: TABLE DATA; Schema: public; Owner: inventory_user
--

COPY public.incoming_transactions (id, logger_id, created_at, delivery_date, supplier_id, delivery_ref) FROM stdin;
3	1	2026-05-25 16:39:41.844+08	2026-05-25	1	DO 3
4	1	2026-05-25 16:44:23.052+08	2026-05-25	2	DO 20
5	1	2026-05-25 16:46:10.179+08	2026-05-25	2	DO 23
6	1	2026-05-25 16:47:15.6+08	2026-05-25	2	DO 24
7	1	2026-05-25 16:47:38.726+08	2026-05-25	2	DO 55
8	1	2026-05-25 16:48:30.029+08	2026-05-25	2	DO 56
9	1	2026-05-25 16:48:48.344+08	2026-05-25	2	DO 57
10	1	2026-05-25 16:51:09.384+08	2026-05-25	2	DO 58
11	1	2026-05-25 16:51:20.171+08	2026-05-25	2	DO 59
12	1	2026-05-25 17:02:16.222+08	2026-05-25	1	DO 66
13	1	2026-05-25 17:02:30.745+08	2026-05-25	1	DO 67
14	1	2026-05-25 17:02:42.638+08	2026-05-25	2	DO 999
15	1	2026-05-25 17:03:06.473+08	2026-05-25	1	DO 9999
16	1	2026-05-25 17:03:29.047+08	2026-05-25	1	DO 1
17	1	2026-05-25 17:03:38.505+08	2026-05-25	1	DO 2
19	1	2026-05-25 17:04:19.521+08	2026-05-25	1	DO 4
21	1	2026-05-25 17:05:13.28+08	2026-05-25	1	Do 321
22	1	2026-05-25 17:05:26.568+08	2026-05-25	1	Do 322
23	1	2026-05-25 17:06:01.37+08	2026-05-25	1	DO 55555
24	1	2026-05-25 17:09:40.966+08	2026-05-25	1	DO 9321
25	1	2026-05-25 17:10:24.714+08	2026-05-25	1	DO 3213212
26	1	2026-05-25 17:10:53.561+08	2026-05-25	1	DO 3213212321
27	1	2026-05-25 17:12:13.006+08	2026-05-25	1	DO 321231231231
29	1	2026-05-25 17:16:56.486+08	2026-05-25	2	DO 1
36	1	2026-05-25 17:22:14.35+08	2026-05-25	1	DO 123412341242
41	1	2026-05-25 17:23:19.682+08	2026-05-25	1	DO 5
42	1	2026-05-25 17:30:14.369+08	2026-06-19	1	Do12312312
43	1	2026-05-25 17:30:24.452+08	2026-03-24	1	1231231
44	1	2026-05-25 17:32:10.53+08	2026-05-25	1	DO 1231231231
45	1	2026-05-25 17:32:29.87+08	2026-06-12	1	12132312312312312
46	1	2026-05-25 17:33:18.483+08	2026-05-25	1	201231231
47	1	2026-05-26 10:42:04.923+08	2026-05-26	1	123123123123123123123
\.


--
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: inventory_user
--

COPY public.items (id, name, category_id, supplier_id, thumbnail, photos, master_number, initial_quantity, last_stocked, disabled) FROM stdin;
1	Item 1	1	1	http://dummyimage.com/173x100.png/dddddd/000000	[{"item": "http://dummyimage.com/108x100.png/ff4444/ffffff"}, {"item": "http://dummyimage.com/116x100.png/dddddd/000000"}, {"item": "http://dummyimage.com/182x100.png/cc0000/ffffff"}, {"item": "http://dummyimage.com/239x100.png/ff4444/ffffff"}, {"item": "http://dummyimage.com/194x100.png/cc0000/ffffff"}]	1	0	2026-05-25 15:28:42.21165+08	f
2	Item 2	2	2	http://dummyimage.com/173x100.png/dddddd/000000	[{"item": "http://dummyimage.com/108x100.png/ff4444/ffffff"}, {"item": "http://dummyimage.com/116x100.png/dddddd/000000"}, {"item": "http://dummyimage.com/182x100.png/cc0000/ffffff"}, {"item": "http://dummyimage.com/239x100.png/ff4444/ffffff"}, {"item": "http://dummyimage.com/194x100.png/cc0000/ffffff"}]	2	0	2026-05-25 15:28:59.313401+08	f
4	Item 3	1	1	http://dummyimage.com/173x100.png/dddddd/000000	[{"item": "http://dummyimage.com/108x100.png/ff4444/ffffff"}, {"item": "http://dummyimage.com/116x100.png/dddddd/000000"}, {"item": "http://dummyimage.com/182x100.png/cc0000/ffffff"}, {"item": "http://dummyimage.com/239x100.png/ff4444/ffffff"}, {"item": "http://dummyimage.com/194x100.png/cc0000/ffffff"}]	3	0	2026-05-25 16:05:32.938611+08	f
\.


--
-- Data for Name: incoming_items; Type: TABLE DATA; Schema: public; Owner: inventory_user
--

COPY public.incoming_items (transaction_id, item_id, quantity) FROM stdin;
3	1	2
3	2	1
3	4	1
4	1	3
4	2	4
5	2	7
6	4	1
7	4	1
8	2	1
9	1	1
10	1	5555
11	2	1
12	1	1
12	2	1
12	4	1
13	1	1
13	2	1
13	4	1
14	1	1
15	1	1
16	1	1
17	1	1
19	1	1
21	1	1
22	1	1
23	1	1
24	1	1
25	1	1
26	1	1
27	1	1
29	1	1
36	1	1
41	1	1
42	1	1
43	1	1
44	1	1
45	1	1
46	1	1
47	2	500
\.


--
-- Data for Name: outgoing_transactions; Type: TABLE DATA; Schema: public; Owner: inventory_user
--

COPY public.outgoing_transactions (id, logger_id, created_at, expend_date, expender, remarks) FROM stdin;
1	1	2026-05-26 10:15:13.244+08	2026-05-26	John	
2	1	2026-05-26 10:33:20.33+08	2026-05-26	John	roof
3	1	2026-05-26 10:44:57.394+08	2026-05-26	Mary	12312312
4	1	2026-05-26 10:45:19.207+08	2026-05-26	Mary	12312312
\.


--
-- Data for Name: outgoing_items; Type: TABLE DATA; Schema: public; Owner: inventory_user
--

COPY public.outgoing_items (transaction_id, item_id, quantity) FROM stdin;
2	1	5
4	2	5
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: inventory_user
--

COPY public.sessions (id, secret_hash, created_at, user_id) FROM stdin;
m898b5wqedz4d9bdmgvxrrya	\\x7779bfee508b0f2cb819490f90d621d9f56fcac92f170b3b1fedd7c0c37e50bb	1779694205	1
ebrqsfv325rmirbnytya32nk	\\x18e12b918342b5e47d2fc1ae0647714589f83b3c5cfdbc186f977239daa40a57	1779760734	1
\.


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: inventory_user
--

SELECT pg_catalog.setval('public.categories_id_seq', 5, true);


--
-- Name: incoming_transactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: inventory_user
--

SELECT pg_catalog.setval('public.incoming_transactions_id_seq', 47, true);


--
-- Name: items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: inventory_user
--

SELECT pg_catalog.setval('public.items_id_seq', 4, true);


--
-- Name: outgoing_transactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: inventory_user
--

SELECT pg_catalog.setval('public.outgoing_transactions_id_seq', 4, true);


--
-- Name: suppliers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: inventory_user
--

SELECT pg_catalog.setval('public.suppliers_id_seq', 50, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: inventory_user
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- PostgreSQL database dump complete
--

\unrestrict 4a4rHgWRIV75hlTeB3wfUrssEMLducyTuWGCDpkKhxTWdtaECHH1cpeSgz7yhl8

