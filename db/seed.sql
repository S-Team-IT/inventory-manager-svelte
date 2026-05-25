--
-- PostgreSQL database dump
--

\restrict Dws9Z45KCyarV7CAhygTZFzLRBZaXXzYeWeid2yiq5gZsBeR1DhiSdEHezhLFBQ

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
2	Home
3	Condiments
4	Electronics
5	Travel
6	Fitness
7	Health/Protein
8	Tool
1	Accessories
38	Tools
42	brotherrrrrrrr
\.


--
-- Data for Name: suppliers; Type: TABLE DATA; Schema: public; Owner: inventory_user
--

COPY public.suppliers (id, name) FROM stdin;
3	Tromp-Swift
4	Volkman-Davis
5	Von LLC
6	Hegmann, O'Kon and Jast
7	Conroy-Homenick
8	Cruickshank LLC
9	Hoppe Group
10	Morissette, Gislason and Nitzsche
1	Hyatt LLC
2	Russel-Maggio
62	Asdf
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: inventory_user
--

COPY public.users (id, email, name, password_hash, role, initial_quantity) FROM stdin;
13	faethychan@gmail.com	12345678	$2b$10$xSw5GiLiQRgAMpSE.AzLRuFKFF76PzkJJWOSS5SgtKTM1TrlCNKwW	QS	0
14	faethy@gmail.com	1234567	$2b$10$8KaP76TJ/oDSLZd9emt95OfK.w2KGGujaZwirRZtIBvidepq5KeZ2	QS	0
17	faethychanasdf@gmail.com	Jerry	$2b$10$aP0xZEMfiI.cns.t.EZmcuCQOFOsG4ajcRFjEOy8C90ErWu0wuOWC	Procurement	0
18	sadfasdf@gmail.com	123123123131231	$2b$10$RXSNYCjUvMqBU8/2nH.QROPhjp7t8k9wYwV7IK9r7Khz2gzmr1Qv6	Project	0
19	asdfsfa@121321.com	Adsfsa	$2b$10$cSxVSCwyo9VClN/9HEi6wOL5kI4XVVlt1lo1lLUmYLr3ySuJdEXmi	Procurement	0
20	asdfsdfa@gmail.com	2131231231	$2b$10$ckK0k0oyshrY0aso1lNMhOSQlaROZ0FQ.F7kjCkaW2BQ3XA01H7cO	QS	0
21	asdfasd@adfasdfas.com	12312312	$2b$10$Q/yNnxaGrxszFPmCZ2MjPumCu/nm9NErFhgojt9s2LGqu2rdUkUBK	Project	0
23	faethychang@gmail.com	John	$2b$10$bzvQ6DHircI7aYuVKdsaa.hLDv6IAMYxKCUmoIF93tIuAWQlVEcE.	Procurement	0
24	faethu@gmail.com	12323412342	$2b$10$bDPdh9/J82wyLhhAYsY4hu3nG/jvB1bY0bZ.Q8Zsg3PmQyQMqevHC	Procurement	0
25	dfasdfa@gmail.com	231231231	$2b$10$fuTf/f9g4MWfQCx1mLkfQ.fKlNHwq4JhiF/jJ8BiOqHg/b1jUcOKO	Procurement	0
26	asdfasf@gmail.com	Sdfas	$2b$10$NuyhEhL.J65/xO4QKnZK3uoBnuIG2X5ltiE/yyGCEmEIJpXR2dwXm	Procurement	0
27	sdfasd@gmail.comasdfsad	Asdfsdfasd	$2b$10$1mjDWOtoK0d/D3k3U9q9NOMe6FxldFC76ZZ1WUK7ESusEhgj8wiPm	Procurement	0
\.


--
-- Data for Name: incoming_transactions; Type: TABLE DATA; Schema: public; Owner: inventory_user
--

COPY public.incoming_transactions (id, logger_id, created_at, delivery_date, supplier_id, delivery_ref) FROM stdin;
\.


--
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: inventory_user
--

COPY public.items (id, name, category_id, supplier_id, thumbnail, photos, master_number, initial_quantity, last_stocked, disabled) FROM stdin;
\.


--
-- Data for Name: incoming_items; Type: TABLE DATA; Schema: public; Owner: inventory_user
--

COPY public.incoming_items (incoming_id, item_id, quantity) FROM stdin;
\.


--
-- Data for Name: outgoing_transactions; Type: TABLE DATA; Schema: public; Owner: inventory_user
--

COPY public.outgoing_transactions (id, logger_id, created_at, expend_date, expender, remarks) FROM stdin;
\.


--
-- Data for Name: outgoing_items; Type: TABLE DATA; Schema: public; Owner: inventory_user
--

COPY public.outgoing_items (outgoing_id, item_id, quantity) FROM stdin;
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: inventory_user
--

COPY public.sessions (id, secret_hash, created_at, user_id) FROM stdin;
s8uwf7r5wwesv7q4685y5x2r	\\xeb7c2e3d04e7d11b4e262639b0abfb9ec6dfbb832a841a4f25710147da736d4b	1779184098	13
8qbas5akjvv33fkwqg6kidsk	\\xefc752d867d8843852f894e79902d700597476d8e09ae00c9001356d637ee53f	1779241864	13
qrvgwk8zpjnnm794fnyxwf2w	\\x95142b7efb8cef3b481efee351d38775bb42506a737c585e04ea117a64540346	1779337620	13
k4ybjc3nks8v4vnpva5xeuju	\\x76803466aad3dfd6f68172acde573b97fef92e59832bac74c4004038406eb710	1779680074	13
\.


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: inventory_user
--

SELECT pg_catalog.setval('public.categories_id_seq', 88, true);


--
-- Name: incoming_transactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: inventory_user
--

SELECT pg_catalog.setval('public.incoming_transactions_id_seq', 1, false);


--
-- Name: items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: inventory_user
--

SELECT pg_catalog.setval('public.items_id_seq', 170, true);


--
-- Name: outgoing_transactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: inventory_user
--

SELECT pg_catalog.setval('public.outgoing_transactions_id_seq', 1, false);


--
-- Name: suppliers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: inventory_user
--

SELECT pg_catalog.setval('public.suppliers_id_seq', 86, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: inventory_user
--

SELECT pg_catalog.setval('public.users_id_seq', 27, true);


--
-- PostgreSQL database dump complete
--

\unrestrict Dws9Z45KCyarV7CAhygTZFzLRBZaXXzYeWeid2yiq5gZsBeR1DhiSdEHezhLFBQ

