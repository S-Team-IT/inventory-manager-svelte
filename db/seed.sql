--
-- PostgreSQL database dump
--

\restrict GraoybBBIBleKIvBemUCLrOilxgjqaMxdzJRMBc15tQna7rZmkEyjmt7bSamXe3

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
6	Category 3
\.


--
-- Data for Name: suppliers; Type: TABLE DATA; Schema: public; Owner: inventory_user
--

COPY public.suppliers (id, name) FROM stdin;
1	Supplier 1
2	Supplier 2
51	Supplier 3
54	Supplier 4
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
48	1	2026-05-26 16:41:27.472+08	2026-05-26	51	DO2345
49	1	2026-05-26 16:54:57.506+08	2026-05-26	51	DO12
50	1	2026-05-28 14:41:19.364+08	2026-05-28	1	DO1
\.


--
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: inventory_user
--

COPY public.items (id, name, category_id, supplier_id, thumbnail, photos, master_number, initial_quantity, last_stocked, disabled) FROM stdin;
1	Item 1	1	1	http://dummyimage.com/173x100.png/dddddd/000000	[{"item": "http://dummyimage.com/108x100.png/ff4444/ffffff"}, {"item": "http://dummyimage.com/116x100.png/dddddd/000000"}, {"item": "http://dummyimage.com/182x100.png/cc0000/ffffff"}, {"item": "http://dummyimage.com/239x100.png/ff4444/ffffff"}, {"item": "http://dummyimage.com/194x100.png/cc0000/ffffff"}]	1	0	2026-05-25 15:28:42.21165+08	f
2	Item 2	2	2	http://dummyimage.com/173x100.png/dddddd/000000	[{"item": "http://dummyimage.com/108x100.png/ff4444/ffffff"}, {"item": "http://dummyimage.com/116x100.png/dddddd/000000"}, {"item": "http://dummyimage.com/182x100.png/cc0000/ffffff"}, {"item": "http://dummyimage.com/239x100.png/ff4444/ffffff"}, {"item": "http://dummyimage.com/194x100.png/cc0000/ffffff"}]	2	0	2026-05-25 15:28:59.313401+08	f
4	Item 3	1	1	http://dummyimage.com/173x100.png/dddddd/000000	[{"item": "http://dummyimage.com/108x100.png/ff4444/ffffff"}, {"item": "http://dummyimage.com/116x100.png/dddddd/000000"}, {"item": "http://dummyimage.com/182x100.png/cc0000/ffffff"}, {"item": "http://dummyimage.com/239x100.png/ff4444/ffffff"}, {"item": "http://dummyimage.com/194x100.png/cc0000/ffffff"}]	3	0	2026-05-25 16:05:32.938611+08	f
5	Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis dolore soluta facilis nemo quam. Earum voluptas officiis a consectetur totam asperiores harum ex. Inventore nobis quae in nemo vel asperiores?	6	54	http://dummyimage.com/173x100.png/dddddd/000000	[{"item": "http://dummyimage.com/108x100.png/ff4444/ffffff"}, {"item": "http://dummyimage.com/116x100.png/dddddd/000000"}, {"item": "http://dummyimage.com/182x100.png/cc0000/ffffff"}, {"item": "http://dummyimage.com/239x100.png/ff4444/ffffff"}, {"item": "http://dummyimage.com/194x100.png/cc0000/ffffff"}]	4	0	2026-05-28 15:08:49.207614+08	f
\.


--
-- Data for Name: incoming_items; Type: TABLE DATA; Schema: public; Owner: inventory_user
--

COPY public.incoming_items (transaction_id, item_id, quantity) FROM stdin;
48	1	5
48	2	3
49	4	2
50	2	10
\.


--
-- Data for Name: outgoing_transactions; Type: TABLE DATA; Schema: public; Owner: inventory_user
--

COPY public.outgoing_transactions (id, logger_id, created_at, expend_date, expender, remarks) FROM stdin;
5	1	2026-05-28 14:01:50.797+08	2026-05-28	Roof	Roof
6	1	2026-05-28 14:44:40.992+08	2026-05-28	John	Roof
\.


--
-- Data for Name: outgoing_items; Type: TABLE DATA; Schema: public; Owner: inventory_user
--

COPY public.outgoing_items (transaction_id, item_id, quantity) FROM stdin;
5	1	3
6	1	2
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: inventory_user
--

COPY public.sessions (id, secret_hash, created_at, user_id) FROM stdin;
m898b5wqedz4d9bdmgvxrrya	\\x7779bfee508b0f2cb819490f90d621d9f56fcac92f170b3b1fedd7c0c37e50bb	1779694205	1
ebrqsfv325rmirbnytya32nk	\\x18e12b918342b5e47d2fc1ae0647714589f83b3c5cfdbc186f977239daa40a57	1779760734	1
d2tcxxqa6dhmpq3s9v3zeb2c	\\xe3be6c8d7b2fac5390d92fd43167ddcd528e12d61a23caad1c5f6e78a0f46a0b	1779947972	1
\.


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: inventory_user
--

SELECT pg_catalog.setval('public.categories_id_seq', 6, true);


--
-- Name: incoming_transactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: inventory_user
--

SELECT pg_catalog.setval('public.incoming_transactions_id_seq', 50, true);


--
-- Name: items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: inventory_user
--

SELECT pg_catalog.setval('public.items_id_seq', 5, true);


--
-- Name: outgoing_transactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: inventory_user
--

SELECT pg_catalog.setval('public.outgoing_transactions_id_seq', 6, true);


--
-- Name: suppliers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: inventory_user
--

SELECT pg_catalog.setval('public.suppliers_id_seq', 54, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: inventory_user
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- PostgreSQL database dump complete
--

\unrestrict GraoybBBIBleKIvBemUCLrOilxgjqaMxdzJRMBc15tQna7rZmkEyjmt7bSamXe3

