--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1
-- Dumped by pg_dump version 13.1

-- Started on 2021-02-12 23:28:01

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
-- TOC entry 200 (class 1259 OID 78237)
-- Name: allergies; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.allergies (
    user_id uuid NOT NULL,
    drug_id uuid NOT NULL
);


--
-- TOC entry 201 (class 1259 OID 78242)
-- Name: authority; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.authority (
    id uuid NOT NULL,
    role character varying(255)
);


--
-- TOC entry 202 (class 1259 OID 78247)
-- Name: cities; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cities (
    city_id uuid NOT NULL,
    name character varying(255) NOT NULL,
    zip_code integer NOT NULL,
    country_id uuid NOT NULL
);


--
-- TOC entry 203 (class 1259 OID 78252)
-- Name: complaint; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.complaint (
    complaint_id uuid NOT NULL,
    content character varying(255) NOT NULL,
    name integer NOT NULL,
    version integer,
    medical_stuff_id uuid,
    patietn_id uuid NOT NULL,
    pharmacy_id uuid
);


--
-- TOC entry 204 (class 1259 OID 78257)
-- Name: contraindications; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.contraindications (
    contraindication_id uuid NOT NULL,
    name character varying(255) NOT NULL
);


--
-- TOC entry 205 (class 1259 OID 78262)
-- Name: countries; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.countries (
    country_id uuid NOT NULL,
    name character varying(255) NOT NULL
);


--
-- TOC entry 206 (class 1259 OID 78267)
-- Name: dermatologists; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.dermatologists (
    user_id uuid NOT NULL
);


--
-- TOC entry 207 (class 1259 OID 78272)
-- Name: dermatologists_in_pharmacies; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.dermatologists_in_pharmacies (
    pharmacy_id uuid NOT NULL,
    user_id uuid NOT NULL
);


--
-- TOC entry 208 (class 1259 OID 78277)
-- Name: drug_marks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.drug_marks (
    drug_marks_id uuid NOT NULL,
    mark double precision NOT NULL,
    drug_id uuid NOT NULL,
    patient_id uuid
);


--
-- TOC entry 209 (class 1259 OID 78282)
-- Name: drug_order_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.drug_order_items (
    item_id uuid NOT NULL,
    quantity integer NOT NULL,
    drugorder_id uuid NOT NULL,
    drug_id uuid NOT NULL
);


--
-- TOC entry 210 (class 1259 OID 78287)
-- Name: drug_orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.drug_orders (
    drugorder_id uuid NOT NULL,
    deadline date,
    drug_order_status integer,
    pharmacy_id uuid NOT NULL,
    user_id uuid NOT NULL
);


--
-- TOC entry 211 (class 1259 OID 78292)
-- Name: drug_prices; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.drug_prices (
    price_id uuid NOT NULL,
    price double precision NOT NULL,
    enddate date NOT NULL,
    startdate date NOT NULL,
    drug_id uuid,
    pharmacy_id uuid
);


--
-- TOC entry 212 (class 1259 OID 78297)
-- Name: drug_reservations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.drug_reservations (
    drug_reservation_id uuid NOT NULL,
    code character varying(255),
    discount double precision,
    price double precision,
    quantity integer,
    reservation_end date,
    reservation_start date,
    reservation_status integer,
    version bigint,
    drug_id uuid NOT NULL,
    user_id uuid NOT NULL,
    pharmacy_id uuid NOT NULL
);


--
-- TOC entry 213 (class 1259 OID 78302)
-- Name: drugs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.drugs (
    drug_id uuid NOT NULL,
    averagemark double precision,
    code character varying(255) NOT NULL,
    formofdrug integer NOT NULL,
    issuanceregime integer NOT NULL,
    name character varying(255) NOT NULL,
    note character varying(255),
    points integer,
    typeofdrug integer NOT NULL,
    manufacturer_id uuid NOT NULL
);


--
-- TOC entry 214 (class 1259 OID 78310)
-- Name: drugs_by_supplier; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.drugs_by_supplier (
    user_id uuid NOT NULL,
    drug_id uuid NOT NULL
);


--
-- TOC entry 215 (class 1259 OID 78315)
-- Name: drugs_contraindications; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.drugs_contraindications (
    drug_id uuid NOT NULL,
    contraindication_id uuid NOT NULL
);


--
-- TOC entry 216 (class 1259 OID 78320)
-- Name: drugs_in_pharmacy; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.drugs_in_pharmacy (
    id uuid NOT NULL,
    quantity integer,
    drug uuid,
    pharmacy uuid
);


--
-- TOC entry 217 (class 1259 OID 78325)
-- Name: erecipe; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.erecipe (
    erecipe_id uuid NOT NULL,
    code character varying(255) NOT NULL,
    dateofissuing date NOT NULL,
    therapy_duration integer NOT NULL,
    e_recipe_status integer NOT NULL,
    user_id uuid NOT NULL,
    pharmacy_id uuid NOT NULL
);


--
-- TOC entry 218 (class 1259 OID 78330)
-- Name: erecipe_item; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.erecipe_item (
    item_id uuid NOT NULL,
    quantity integer NOT NULL,
    drug_id uuid NOT NULL,
    erecipe_id uuid NOT NULL
);


--
-- TOC entry 219 (class 1259 OID 78335)
-- Name: eventdrug; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.eventdrug (
    event_drug_id uuid NOT NULL,
    date_of_event date NOT NULL,
    drug_id uuid NOT NULL,
    drug_name character varying(255) NOT NULL,
    pharmacy_name character varying(255) NOT NULL
);


--
-- TOC entry 220 (class 1259 OID 78343)
-- Name: examination_prices; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.examination_prices (
    examination_price_id uuid NOT NULL,
    enddate date NOT NULL,
    startdate date NOT NULL,
    examination_type integer,
    price double precision,
    pharmacy_id uuid
);


--
-- TOC entry 221 (class 1259 OID 78348)
-- Name: examinations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.examinations (
    examination_id uuid NOT NULL,
    date_of_examination date NOT NULL,
    discount double precision,
    duration bigint,
    examination_status integer,
    examination_type integer,
    note character varying(255),
    time_of_examination time without time zone NOT NULL,
    version bigint,
    employee_id uuid,
    examination_price_id uuid,
    patient_id uuid,
    pharmacy_id uuid
);


--
-- TOC entry 222 (class 1259 OID 78353)
-- Name: ingredients; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ingredients (
    ingredient_id uuid NOT NULL,
    name character varying(255) NOT NULL
);


--
-- TOC entry 223 (class 1259 OID 78358)
-- Name: ingredients_in_drugs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ingredients_in_drugs (
    drug_id uuid NOT NULL,
    ingredient_id uuid NOT NULL
);


--
-- TOC entry 224 (class 1259 OID 78363)
-- Name: locationmaps; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.locationmaps (
    map_id uuid NOT NULL,
    geo_lenght double precision NOT NULL,
    geo_width double precision NOT NULL,
    pharmacy_id uuid NOT NULL
);


--
-- TOC entry 225 (class 1259 OID 78368)
-- Name: locations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.locations (
    location_id uuid NOT NULL,
    number integer NOT NULL,
    street character varying(255) NOT NULL,
    city_id uuid NOT NULL
);


--
-- TOC entry 226 (class 1259 OID 78373)
-- Name: loyalty_program; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.loyalty_program (
    id uuid NOT NULL,
    discount_for_gold integer NOT NULL,
    discount_for_regular integer NOT NULL,
    discount_for_silver integer NOT NULL,
    min_golden integer NOT NULL,
    min_regular integer NOT NULL,
    min_silver integer NOT NULL,
    points_per_counseling integer NOT NULL,
    points_per_examination integer NOT NULL,
    version integer
);


--
-- TOC entry 227 (class 1259 OID 78378)
-- Name: manufacturer; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.manufacturer (
    manufacturer_id uuid NOT NULL,
    name character varying(255) NOT NULL
);


--
-- TOC entry 228 (class 1259 OID 78383)
-- Name: medical_stuff; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.medical_stuff (
    averagemark double precision,
    user_id uuid NOT NULL
);


--
-- TOC entry 229 (class 1259 OID 78388)
-- Name: medicalstuff_marks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.medicalstuff_marks (
    medical_stuff_marks_id uuid NOT NULL,
    mark double precision NOT NULL,
    user_id uuid NOT NULL,
    patient_id uuid
);


--
-- TOC entry 230 (class 1259 OID 78393)
-- Name: offers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.offers (
    offer_id uuid NOT NULL,
    deadline date,
    price double precision,
    status integer,
    drugorder_id uuid NOT NULL,
    user_id uuid NOT NULL
);


--
-- TOC entry 231 (class 1259 OID 78398)
-- Name: patients; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.patients (
    category integer NOT NULL,
    points integer NOT NULL,
    penalties integer,
    user_id uuid NOT NULL
);


--
-- TOC entry 232 (class 1259 OID 78403)
-- Name: pharmacies; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pharmacies (
    pharmacy_id uuid NOT NULL,
    averagemark double precision NOT NULL,
    consultationprice double precision,
    description character varying(255) NOT NULL,
    examinationprice double precision,
    name character varying(255) NOT NULL,
    version bigint,
    location_id uuid NOT NULL
);


--
-- TOC entry 233 (class 1259 OID 78411)
-- Name: pharmacists; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pharmacists (
    user_id uuid NOT NULL,
    pharmacy_id uuid NOT NULL
);


--
-- TOC entry 234 (class 1259 OID 78416)
-- Name: pharmacy_administrators; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pharmacy_administrators (
    user_id uuid NOT NULL,
    pharmacy_id uuid NOT NULL
);


--
-- TOC entry 235 (class 1259 OID 78421)
-- Name: pharmacy_marks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pharmacy_marks (
    pharmacy_marks_id uuid NOT NULL,
    mark double precision NOT NULL,
    patient_id uuid,
    pharmacy_id uuid
);


--
-- TOC entry 236 (class 1259 OID 78426)
-- Name: promotions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.promotions (
    promotion_id uuid NOT NULL,
    enddate date NOT NULL,
    startdate date NOT NULL,
    text character varying(255) NOT NULL,
    pharmacy_id uuid NOT NULL
);


--
-- TOC entry 237 (class 1259 OID 78431)
-- Name: subscribed; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.subscribed (
    user_id uuid NOT NULL,
    pharmacy_id uuid NOT NULL
);


--
-- TOC entry 238 (class 1259 OID 78436)
-- Name: substitute_drugs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.substitute_drugs (
    drug_id uuid NOT NULL,
    substitute_drug_id uuid NOT NULL
);


--
-- TOC entry 239 (class 1259 OID 78441)
-- Name: suppliers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.suppliers (
    user_id uuid NOT NULL
);


--
-- TOC entry 240 (class 1259 OID 78446)
-- Name: system_administrators; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.system_administrators (
    user_id uuid NOT NULL
);


--
-- TOC entry 241 (class 1259 OID 78451)
-- Name: user_authority; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_authority (
    user_id uuid NOT NULL,
    authority_id uuid NOT NULL
);


--
-- TOC entry 242 (class 1259 OID 78454)
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    user_id uuid NOT NULL,
    active boolean NOT NULL,
    firstlogin boolean NOT NULL,
    lastname character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    phonenumber character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    last_password_reset_date timestamp without time zone,
    password character varying(255) NOT NULL,
    version bigint,
    location_id uuid NOT NULL
);


--
-- TOC entry 243 (class 1259 OID 78462)
-- Name: vacation_requests; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.vacation_requests (
    request_id uuid NOT NULL,
    enddate date NOT NULL,
    startdate date NOT NULL,
    note character varying(255),
    status integer NOT NULL,
    user_id uuid NOT NULL,
    pharmacy_id uuid NOT NULL
);


--
-- TOC entry 244 (class 1259 OID 78467)
-- Name: vacations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.vacations (
    vacation_id uuid NOT NULL,
    enddate date NOT NULL,
    startdate date NOT NULL,
    user_id uuid NOT NULL,
    pharmacy_id uuid NOT NULL
);


--
-- TOC entry 245 (class 1259 OID 78472)
-- Name: work_time; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.work_time (
    work_time_id uuid NOT NULL,
    date date NOT NULL,
    endtime time without time zone NOT NULL,
    starttime time without time zone NOT NULL,
    employee_id uuid NOT NULL,
    pharmacy_id uuid NOT NULL
);


--
-- TOC entry 3347 (class 0 OID 78237)
-- Dependencies: 200
-- Data for Name: allergies; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.allergies VALUES ('1af76a7e-544f-4cb1-a478-35eb7e1b80ca', '38991470-6ed7-40ee-adff-f6c2377c729e');


--
-- TOC entry 3348 (class 0 OID 78242)
-- Dependencies: 201
-- Data for Name: authority; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.authority VALUES ('27a25265-97b8-49a6-8f58-4f2889211d2f', 'ROLE_PH_ADMIN');
INSERT INTO public.authority VALUES ('7bcc0867-0737-4e4f-882f-495dfda3f8ef', 'ROLE_PATIENT');
INSERT INTO public.authority VALUES ('5b345544-cce8-4eff-af17-57604225683b', 'ROLE_DERMATOLOGIST');
INSERT INTO public.authority VALUES ('cf07e664-758f-4822-8386-751e3d2e2e35', 'ROLE_SYSTEM_ADMINISTRATOR');
INSERT INTO public.authority VALUES ('4e8643a5-c594-424a-8bb1-00d424fe0782', 'ROLE_SUPPLIER');
INSERT INTO public.authority VALUES ('5e7a160a-6560-42bd-b7b5-c5c397b2d4a2', 'ROLE_PHARMACIST');


--
-- TOC entry 3349 (class 0 OID 78247)
-- Dependencies: 202
-- Data for Name: cities; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.cities VALUES ('48711cf8-e248-4b68-ab78-610307914ce4', 'Novi Sad', 21000, '003ee0c4-d017-48d8-9615-61293d8c0e82');
INSERT INTO public.cities VALUES ('d2aadb93-f3e8-418f-8834-4548ee974cb2', 'Beograd', 11000, '003ee0c4-d017-48d8-9615-61293d8c0e82');
INSERT INTO public.cities VALUES ('ea87892d-e693-4ecb-8ebd-e5f9d4da8329', 'Bukurest', 151561, '003ee0c4-d017-48d8-9615-61293d8c0e82');
INSERT INTO public.cities VALUES ('87efb40e-813a-4a28-901b-75cc25b411f9', 'Valjevo', 87555, '003ee0c4-d017-48d8-9615-61293d8c0e82');
INSERT INTO public.cities VALUES ('cb7f5641-3da1-4c2c-86ba-0f0f7a672fb2', 'Minsk', 1651, '5e843296-c22c-477f-9731-28ac68d1a882');


--
-- TOC entry 3350 (class 0 OID 78252)
-- Dependencies: 203
-- Data for Name: complaint; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.complaint VALUES ('33eaa924-e6a2-493a-87c2-be24f3c7c0af', 'Very bad man!', 1, 0, NULL, '1af76a7e-544f-4cb1-a478-35eb7e1b80ca', '88a7d06c-fb6b-47d2-8948-2de0f613ce8d');


--
-- TOC entry 3351 (class 0 OID 78257)
-- Dependencies: 204
-- Data for Name: contraindications; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.contraindications VALUES ('8c011d3c-4cea-4480-b840-9069da19b4b8', 'Headache');
INSERT INTO public.contraindications VALUES ('b1708462-bfba-4720-8f04-ac650f0fe4c8', 'Nausea');



--
-- TOC entry 3352 (class 0 OID 78262)
-- Dependencies: 205
-- Data for Name: countries; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.countries VALUES ('003ee0c4-d017-48d8-9615-61293d8c0e82', 'Srbija');
INSERT INTO public.countries VALUES ('5e843296-c22c-477f-9731-28ac68d1a882', 'Belorusija');


--
-- TOC entry 3353 (class 0 OID 78267)
-- Dependencies: 206
-- Data for Name: dermatologists; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.dermatologists VALUES ('d6438084-0dde-4cd0-9933-182cd2e06c21');
INSERT INTO public.dermatologists VALUES ('108a12f4-d272-483b-b886-d306662e7940');
INSERT INTO public.dermatologists VALUES ('0f68d54b-3e13-48ae-8e8f-084c2014b729');


--
-- TOC entry 3354 (class 0 OID 78272)
-- Dependencies: 207
-- Data for Name: dermatologists_in_pharmacies; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.dermatologists_in_pharmacies VALUES ('2f8ec936-585b-4035-baad-2795fa091622', '0f68d54b-3e13-48ae-8e8f-084c2014b729');
INSERT INTO public.dermatologists_in_pharmacies VALUES ('88a7d06c-fb6b-47d2-8948-2de0f613ce8d', 'd6438084-0dde-4cd0-9933-182cd2e06c21');
INSERT INTO public.dermatologists_in_pharmacies VALUES ('cfd8c4f2-dfe3-47ca-8503-4d8951b2c150', '108a12f4-d272-483b-b886-d306662e7940');
INSERT INTO public.dermatologists_in_pharmacies VALUES ('b3fce573-5ba9-469b-8e8e-05bc73268eeb', '0f68d54b-3e13-48ae-8e8f-084c2014b729');


--
-- TOC entry 3355 (class 0 OID 78277)
-- Dependencies: 208
-- Data for Name: drug_marks; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.drug_marks VALUES ('b66b293e-05c4-4e83-975a-6cc78e16e6b3', 8.1, '38991470-6ed7-40ee-adff-f6c2377c729e', '1af76a7e-544f-4cb1-a478-35eb7e1b80ca');


--
-- TOC entry 3356 (class 0 OID 78282)
-- Dependencies: 209
-- Data for Name: drug_order_items; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.drug_order_items VALUES ('cbb79f6a-cb05-4890-9fcd-b932253f840f', 5, '38a313c2-148f-447f-9b36-2c3a76874b02', '38991470-6ed7-40ee-adff-f6c2377c729e');
INSERT INTO public.drug_order_items VALUES ('7cc08356-ed01-4fe5-8a85-0b989584a328', 10, '38a313c2-148f-447f-9b36-2c3a76874b02', '38991470-6ed7-40ee-adff-f6c2377c729e');
INSERT INTO public.drug_order_items VALUES ('815a0223-d20d-45c8-ab13-a3a729c055d0', 20, '78135940-8c24-41fc-9aab-b1e30bb38641', '38991470-6ed7-40ee-adff-f6c2377c729e');


--
-- TOC entry 3357 (class 0 OID 78287)
-- Dependencies: 210
-- Data for Name: drug_orders; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.drug_orders VALUES ('38a313c2-148f-447f-9b36-2c3a76874b02', '2021-02-12', 1, '88a7d06c-fb6b-47d2-8948-2de0f613ce8d', '1b1b4d63-5d4e-4c5e-a472-0fd5cc11ddf9');
INSERT INTO public.drug_orders VALUES ('78135940-8c24-41fc-9aab-b1e30bb38641', '2021-02-12', 1, '88a7d06c-fb6b-47d2-8948-2de0f613ce8d', '1b1b4d63-5d4e-4c5e-a472-0fd5cc11ddf9');


--
-- TOC entry 3358 (class 0 OID 78292)
-- Dependencies: 211
-- Data for Name: drug_prices; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.drug_prices VALUES ('8c23d3a3-849b-42d2-b08f-a8935733c08b', 100, '2021-03-01', '2021-02-01', '38991470-6ed7-40ee-adff-f6c2377c729e', 'cad5c54f-b3e0-45fd-8625-9fa87d57ca5f');
INSERT INTO public.drug_prices VALUES ('99d69ba2-26be-47d9-8cad-159e4597ee37', 130, '2021-03-01', '2021-02-01', '38991470-6ed7-40ee-adff-f6c2377c729e', '2f8ec936-585b-4035-baad-2795fa091622');
INSERT INTO public.drug_prices VALUES ('d79f07de-3411-45a5-9870-bbcabd6b96fd', 120, '2021-03-01', '2021-02-01', '38991470-6ed7-40ee-adff-f6c2377c729e', 'b3fce573-5ba9-469b-8e8e-05bc73268eeb');
INSERT INTO public.drug_prices VALUES ('6509a253-3e33-4d90-b9bc-a09a8a2756e7', 200, '2021-03-01', '2021-02-01', '38991470-6ed7-40ee-adff-f6c2377c729e', '88a7d06c-fb6b-47d2-8948-2de0f613ce8d');
INSERT INTO public.drug_prices VALUES ('9abac5e8-0c8f-4273-b7e8-06c45a79bcb1', 123, '2021-03-19', '2021-03-09', '4404ff2c-e8f2-42f6-8c72-7c0e7559c50e', '88a7d06c-fb6b-47d2-8948-2de0f613ce8d');


--
-- TOC entry 3359 (class 0 OID 78297)
-- Dependencies: 212
-- Data for Name: drug_reservations; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.drug_reservations VALUES ('b315532e-64b8-40d4-8c4f-482365536ca6', 'Rezervacija123', 0, 0, 5, '2021-03-01', '2021-02-01', 0, 0, '38991470-6ed7-40ee-adff-f6c2377c729e', '1af76a7e-544f-4cb1-a478-35eb7e1b80ca', '88a7d06c-fb6b-47d2-8948-2de0f613ce8d');


--
-- TOC entry 3360 (class 0 OID 78302)
-- Dependencies: 213
-- Data for Name: drugs; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.drugs VALUES ('38991470-6ed7-40ee-adff-f6c2377c729e', 0, 'ASP123XXX123', 2, 1, 'Aspirin', 'This is note', 6, 0, '5c8e8d7c-6494-4c94-bc8d-8bd930f543be');
INSERT INTO public.drugs VALUES ('0e8c6645-209d-4b37-b3a5-d6bc36f23877', 10, '321DROGA321', 1, 0, 'Brufen', 'This is note 2', 3, 2, '5c8e8d7c-6494-4c94-bc8d-8bd930f543be');
INSERT INTO public.drugs VALUES ('34756297-b5ad-4140-a8cc-dd1031bf10b2', 9, 'PAN123XXX123', 3, 1, 'Pantenol', 'Lekic', 2, 1, '5c8e8d7c-6494-4c94-bc8d-8bd930f543be');
INSERT INTO public.drugs VALUES ('3d1e0bb9-18ea-42f0-96fc-45c8332888e7', 3.1, 'PAND123XXX123', 1, 1, 'Panadol', 'Lekic', 2, 3, '5c8e8d7c-6494-4c94-bc8d-8bd930f543be');
INSERT INTO public.drugs VALUES ('4404ff2c-e8f2-42f6-8c72-7c0e7559c50e', 3.5, 'AND123XXX123', 2, 1, 'Andol', 'Lekic', 1, 2, '5c8e8d7c-6494-4c94-bc8d-8bd930f543be');
INSERT INTO public.drugs VALUES ('8ef2aa22-fa9c-4688-a18d-39a6b3ae56b5', 10, 'PAR123XXX123', 0, 1, 'Paracetamol', 'Lekic', 3, 2, '5c8e8d7c-6494-4c94-bc8d-8bd930f543be');
INSERT INTO public.drugs VALUES ('91ac378f-5441-4c35-9ccf-30efc9f42cb7', 7.9, 'BF123XXX123', 3, 1, 'Biofrezee', 'Lekic', 2, 3, '5c8e8d7c-6494-4c94-bc8d-8bd930f543be');
INSERT INTO public.drugs VALUES ('9a115bb7-c41d-478d-a569-e5b13c9cf20b', 6, 'FEB123XXX123', 0, 1, 'Febricet', 'Lekic', 2, 2, '5c8e8d7c-6494-4c94-bc8d-8bd930f543be');
INSERT INTO public.drugs VALUES ('9a118eae-a1dd-49e1-a80f-9e9fceba1e16', 1, '186351', 2, 1, 'Lek2', 'Lekic', 123, 2, '5c8e8d7c-6494-4c94-bc8d-8bd930f543be');
INSERT INTO public.drugs VALUES ('dd0dee39-55b5-4b0b-ae9a-9962e816137a', 2, '21312312', 1, 0, 'Lek 3', 'Lekic', 2, 1, '5c8e8d7c-6494-4c94-bc8d-8bd930f543be');


--
-- TOC entry 3361 (class 0 OID 78310)
-- Dependencies: 214
-- Data for Name: drugs_by_supplier; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.drugs_by_supplier VALUES ('008194b8-8696-4690-a131-c01ba93d6221', '38991470-6ed7-40ee-adff-f6c2377c729e');


--
-- TOC entry 3362 (class 0 OID 78315)
-- Dependencies: 215
-- Data for Name: drugs_contraindications; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.drugs_contraindications VALUES ('0e8c6645-209d-4b37-b3a5-d6bc36f23877', '8c011d3c-4cea-4480-b840-9069da19b4b8');
INSERT INTO public.drugs_contraindications VALUES ('0e8c6645-209d-4b37-b3a5-d6bc36f23877', 'b1708462-bfba-4720-8f04-ac650f0fe4c8');
INSERT INTO public.drugs_contraindications VALUES ('9a118eae-a1dd-49e1-a80f-9e9fceba1e16', '8c011d3c-4cea-4480-b840-9069da19b4b8');
INSERT INTO public.drugs_contraindications VALUES ('dd0dee39-55b5-4b0b-ae9a-9962e816137a', 'b1708462-bfba-4720-8f04-ac650f0fe4c8');


--
-- TOC entry 3363 (class 0 OID 78320)
-- Dependencies: 216
-- Data for Name: drugs_in_pharmacy; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.drugs_in_pharmacy VALUES ('8d2e6c10-4f5f-4a53-b925-ff74fe3c8089', 78, '4404ff2c-e8f2-42f6-8c72-7c0e7559c50e', '88a7d06c-fb6b-47d2-8948-2de0f613ce8d');
INSERT INTO public.drugs_in_pharmacy VALUES ('cf00c02d-6f3a-4d5e-9e52-c543ab52ae93', 10, '38991470-6ed7-40ee-adff-f6c2377c729e', '88a7d06c-fb6b-47d2-8948-2de0f613ce8d');
INSERT INTO public.drugs_in_pharmacy VALUES ('105f08bb-3dd2-4cf1-baa9-a493380a7234', 12, '0e8c6645-209d-4b37-b3a5-d6bc36f23877', 'cad5c54f-b3e0-45fd-8625-9fa87d57ca5f');
INSERT INTO public.drugs_in_pharmacy VALUES ('012b6954-d15b-4d24-90a3-200f5e0a106f', 10, '38991470-6ed7-40ee-adff-f6c2377c729e', 'b3fce573-5ba9-469b-8e8e-05bc73268eeb');
INSERT INTO public.drugs_in_pharmacy VALUES ('22fdfc9a-492e-4c43-960b-9a8c1015441c', 10, '38991470-6ed7-40ee-adff-f6c2377c729e', 'cad5c54f-b3e0-45fd-8625-9fa87d57ca5f');
INSERT INTO public.drugs_in_pharmacy VALUES ('e5dc6e3d-b6ae-43ed-9c30-490cab4b5467', 10, '38991470-6ed7-40ee-adff-f6c2377c729e', '2f8ec936-585b-4035-baad-2795fa091622');


--
-- TOC entry 3364 (class 0 OID 78325)
-- Dependencies: 217
-- Data for Name: erecipe; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.erecipe VALUES ('54f58056-c9ad-4bc5-8078-775a7eed68d5', '123456675', '2021-02-12', 0, 2, '1af76a7e-544f-4cb1-a478-35eb7e1b80ca', '88a7d06c-fb6b-47d2-8948-2de0f613ce8d');
INSERT INTO public.erecipe VALUES ('d881db61-00c3-43d3-b832-557c325bd2c0', '1234566752', '3921-02-25', 0, 0, '1af76a7e-544f-4cb1-a478-35eb7e1b80ca', 'b3fce573-5ba9-469b-8e8e-05bc73268eeb');
INSERT INTO public.erecipe VALUES ('acff2d68-3fe3-4cb4-b25d-930bf7fd61fe', '123456675452', '3921-02-25', 0, 1, '1af76a7e-544f-4cb1-a478-35eb7e1b80ca', 'c92a2cc2-2712-49a9-9948-e1670c84ba7f');


--
-- TOC entry 3365 (class 0 OID 78330)
-- Dependencies: 218
-- Data for Name: erecipe_item; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.erecipe_item VALUES ('e40e8db2-8ab4-47c0-9188-b53a3106db32', 14, '0e8c6645-209d-4b37-b3a5-d6bc36f23877', '54f58056-c9ad-4bc5-8078-775a7eed68d5');
INSERT INTO public.erecipe_item VALUES ('80073c9d-77dc-41ab-b0ff-d6381a6a4b31', 12, '38991470-6ed7-40ee-adff-f6c2377c729e', '54f58056-c9ad-4bc5-8078-775a7eed68d5');
INSERT INTO public.erecipe_item VALUES ('07bab358-9a42-44bb-b1c0-34bac448845f', 4, '4404ff2c-e8f2-42f6-8c72-7c0e7559c50e', 'd881db61-00c3-43d3-b832-557c325bd2c0');
INSERT INTO public.erecipe_item VALUES ('8c49391d-c1eb-401f-85c9-b7cdd97fe611', 2, '9a115bb7-c41d-478d-a569-e5b13c9cf20b', 'acff2d68-3fe3-4cb4-b25d-930bf7fd61fe');


--
-- TOC entry 3366 (class 0 OID 78335)
-- Dependencies: 219
-- Data for Name: eventdrug; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3367 (class 0 OID 78343)
-- Dependencies: 220
-- Data for Name: examination_prices; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.examination_prices VALUES ('bed9e49a-016b-47ff-80fa-1f4e276b53e8', '2021-03-01', '2021-02-01', 0, 2550, '418dd993-a877-4010-af2e-18574272a367');
INSERT INTO public.examination_prices VALUES ('83b35d75-a169-403d-84a3-d450029139c7', '2021-03-01', '2021-02-01', 0, 2500, '88a7d06c-fb6b-47d2-8948-2de0f613ce8d');
INSERT INTO public.examination_prices VALUES ('86201758-1473-4d77-ad4d-1c9b25b3a84d', '2021-03-26', '2021-03-16', 0, 2350, '88a7d06c-fb6b-47d2-8948-2de0f613ce8d');
INSERT INTO public.examination_prices VALUES ('56f5aa3d-1edd-4e5e-aa9f-08b28538ca9d', '2021-04-23', '2021-04-09', 1, 1000, '88a7d06c-fb6b-47d2-8948-2de0f613ce8d');
INSERT INTO public.examination_prices VALUES ('942e0c5a-cd09-4e25-8e19-dcccd11a08e9', '2021-05-12', '2021-05-04', 0, 123, '88a7d06c-fb6b-47d2-8948-2de0f613ce8d');
INSERT INTO public.examination_prices VALUES ('94d7990a-5cfd-44e1-b2e1-66a3fa9b4dbb', '2021-03-01', '2021-02-01', 1, 3000, '418dd993-a877-4010-af2e-18574272a367');
INSERT INTO public.examination_prices VALUES ('2387e88b-c425-49fa-9325-81f9df70889f', '2021-03-01', '2021-02-01', 1, 3500, 'cfd8c4f2-dfe3-47ca-8503-4d8951b2c150');
INSERT INTO public.examination_prices VALUES ('48f3468f-087c-4a4d-a964-f31cf1b5c1be', '2021-03-01', '2021-02-01', 0, 2700, 'cfd8c4f2-dfe3-47ca-8503-4d8951b2c150');
INSERT INTO public.examination_prices VALUES ('4d6ff417-ba39-41fc-b853-0831e7f3edd2', '2021-03-01', '2021-02-01', 1, 3100, 'cfd8c4f2-dfe3-47ca-8503-4d8951b2c150');
INSERT INTO public.examination_prices VALUES ('709aae74-488e-4371-8aef-6163d0a5e714', '2021-03-01', '2021-01-12', 1, 9999, 'b3fce573-5ba9-469b-8e8e-05bc73268eeb');
INSERT INTO public.examination_prices VALUES ('c9c3348e-4186-48af-9165-52168e855980', '2021-02-10', '2021-01-10', 1, 566, 'cfd8c4f2-dfe3-47ca-8503-4d8951b2c150');
INSERT INTO public.examination_prices VALUES ('fe7502c1-91b7-4292-92b4-c812ba0653f6', '2021-03-01', '2021-01-24', 1, 23, 'cfd8c4f2-dfe3-47ca-8503-4d8951b2c150');


--
-- TOC entry 3368 (class 0 OID 78348)
-- Dependencies: 221
-- Data for Name: examinations; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.examinations VALUES ('82aafe86-5469-4fab-a0ce-7a17a85bc9dc', '2021-02-25', 0, 45, NULL, 0, NULL, '10:30:00', 0, '67057f38-998b-4bd7-9d10-022fe17a1f6a', 'bed9e49a-016b-47ff-80fa-1f4e276b53e8', NULL, '418dd993-a877-4010-af2e-18574272a367');
INSERT INTO public.examinations VALUES ('aafa4baf-915f-4f57-abe0-0b4f2c4b75ac', '2021-02-15', 0, 35, NULL, 0, NULL, '10:30:00', 1, '4d814464-9e5e-4bd4-a9ee-d16f6b13bff3', '48f3468f-087c-4a4d-a964-f31cf1b5c1be', NULL, 'b3fce573-5ba9-469b-8e8e-05bc73268eeb');
INSERT INTO public.examinations VALUES ('ad68f88c-d515-4b6b-b9ea-55569b51d2d5', '2021-02-21', 0, 30, NULL, 1, NULL, '08:00:00', 0, 'd6438084-0dde-4cd0-9933-182cd2e06c21', '83b35d75-a169-403d-84a3-d450029139c7', NULL, '88a7d06c-fb6b-47d2-8948-2de0f613ce8d');
INSERT INTO public.examinations VALUES ('94867480-dd00-4a89-a953-00d4a8fba455', '2021-02-22', 0, 30, NULL, 1, NULL, '08:00:00', 0, 'd6438084-0dde-4cd0-9933-182cd2e06c21', '83b35d75-a169-403d-84a3-d450029139c7', NULL, '88a7d06c-fb6b-47d2-8948-2de0f613ce8d');
INSERT INTO public.examinations VALUES ('ba58c5de-c8ac-444a-a631-25c35c302ccf', '2021-03-05', 0, 30, NULL, 1, NULL, '08:00:00', 0, 'd6438084-0dde-4cd0-9933-182cd2e06c21', '83b35d75-a169-403d-84a3-d450029139c7', NULL, '88a7d06c-fb6b-47d2-8948-2de0f613ce8d');
INSERT INTO public.examinations VALUES ('bfd83758-f540-47be-9bb9-4ef2c2dd48ee', '2021-02-18', 0, 30, NULL, 1, NULL, '08:00:00', 0, 'd6438084-0dde-4cd0-9933-182cd2e06c21', '83b35d75-a169-403d-84a3-d450029139c7', NULL, '88a7d06c-fb6b-47d2-8948-2de0f613ce8d');
INSERT INTO public.examinations VALUES ('bad226b1-255f-4830-a24d-f932531bbb0c', '2021-02-20', 0, 30, NULL, 1, NULL, '08:00:00', 0, 'd6438084-0dde-4cd0-9933-182cd2e06c21', '83b35d75-a169-403d-84a3-d450029139c7', NULL, '88a7d06c-fb6b-47d2-8948-2de0f613ce8d');
INSERT INTO public.examinations VALUES ('f6cb580f-ab90-4d04-8984-d6a1d9578b6d', '2021-02-19', 0, 30, NULL, 1, NULL, '08:00:00', 0, '108a12f4-d272-483b-b886-d306662e7940', '48f3468f-087c-4a4d-a964-f31cf1b5c1be', NULL, 'cfd8c4f2-dfe3-47ca-8503-4d8951b2c150');
INSERT INTO public.examinations VALUES ('2c7152c3-4979-4208-b847-e17b5c957cea', '2021-02-20', 0, 30, NULL, 1, NULL, '08:00:00', 0, '108a12f4-d272-483b-b886-d306662e7940', '48f3468f-087c-4a4d-a964-f31cf1b5c1be', NULL, 'cfd8c4f2-dfe3-47ca-8503-4d8951b2c150');
INSERT INTO public.examinations VALUES ('18af480c-c785-4ed0-93c3-ac7de92f3bd9', '2021-02-18', 0, 30, NULL, 1, NULL, '08:00:00', 0, '108a12f4-d272-483b-b886-d306662e7940', '48f3468f-087c-4a4d-a964-f31cf1b5c1be', NULL, 'cfd8c4f2-dfe3-47ca-8503-4d8951b2c150');
INSERT INTO public.examinations VALUES ('ba122908-0e58-4119-a022-5a06757bc486', '2021-02-19', 0, 30, NULL, 1, NULL, '08:00:00', 0, '0f68d54b-3e13-48ae-8e8f-084c2014b729', '709aae74-488e-4371-8aef-6163d0a5e714', NULL, 'b3fce573-5ba9-469b-8e8e-05bc73268eeb');
INSERT INTO public.examinations VALUES ('6de81ebf-a2f1-40aa-99d9-03c7551cbbdf', '2021-02-15', 0, 30, NULL, 1, NULL, '08:00:00', 0, '0f68d54b-3e13-48ae-8e8f-084c2014b729', '709aae74-488e-4371-8aef-6163d0a5e714', NULL, 'b3fce573-5ba9-469b-8e8e-05bc73268eeb');
INSERT INTO public.examinations VALUES ('ac614c83-6f51-4ec9-a9e2-15311b737d95', '2021-02-18', 0, 30, NULL, 1, NULL, '08:00:00', 0, '0f68d54b-3e13-48ae-8e8f-084c2014b729', '709aae74-488e-4371-8aef-6163d0a5e714', NULL, 'b3fce573-5ba9-469b-8e8e-05bc73268eeb');
INSERT INTO public.examinations VALUES ('a5ac981e-f0d7-4043-a735-0b5151c52fc6', '2021-02-17', 0, 30, NULL, 1, NULL, '08:00:00', 0, '0f68d54b-3e13-48ae-8e8f-084c2014b729', '709aae74-488e-4371-8aef-6163d0a5e714', NULL, 'b3fce573-5ba9-469b-8e8e-05bc73268eeb');
INSERT INTO public.examinations VALUES ('8e7c0876-32db-4567-9c56-27d3a358b1e4', '2021-01-05', 0, 45, 0, 0, NULL, '13:45:00', 1, '67057f38-998b-4bd7-9d10-022fe17a1f6a', '94d7990a-5cfd-44e1-b2e1-66a3fa9b4dbb', NULL, '88a7d06c-fb6b-47d2-8948-2de0f613ce8d');
INSERT INTO public.examinations VALUES ('ff29398d-daab-4c32-95e3-7f3b7c33ab28', '2021-02-23', 0, 30, NULL, 1, NULL, '08:00:00', 0, 'd6438084-0dde-4cd0-9933-182cd2e06c21', '83b35d75-a169-403d-84a3-d450029139c7', NULL, '88a7d06c-fb6b-47d2-8948-2de0f613ce8d');
INSERT INTO public.examinations VALUES ('ec6604e7-2b80-41e3-bc69-95333258d8ce', '2021-01-05', 0, 45, 0, 0, NULL, '13:45:00', 1, '4d814464-9e5e-4bd4-a9ee-d16f6b13bff3', '83b35d75-a169-403d-84a3-d450029139c7', NULL, '88a7d06c-fb6b-47d2-8948-2de0f613ce8d');




INSERT INTO public.examinations VALUES ('ac612c83-6f51-4ec9-a9e2-15311b737d95', '2021-02-13', 0, 30, NULL, 0, NULL, '09:00:00', 0, '67057f38-998b-4bd7-9d10-022fe17a1f6a', '709aae74-488e-4371-8aef-6163d0a5e714', NULL, '88a7d06c-fb6b-47d2-8948-2de0f613ce8d');
INSERT INTO public.examinations VALUES ('a5ac931e-f0d7-4043-a735-0b5151c52fc6', '2021-02-14', 0, 30, NULL, 0, NULL, '10:00:00', 0, '67057f38-998b-4bd7-9d10-022fe17a1f6a', '709aae74-488e-4371-8aef-6163d0a5e714', NULL, '88a7d06c-fb6b-47d2-8948-2de0f613ce8d');
INSERT INTO public.examinations VALUES ('8e7c0846-32db-4567-9c56-27d3a358b1e4', '2021-01-15', 0, 45, 0, 0, NULL, '13:45:00', 1, '67057f38-998b-4bd7-9d10-022fe17a1f6a', '94d7990a-5cfd-44e1-b2e1-66a3fa9b4dbb', NULL, '88a7d06c-fb6b-47d2-8948-2de0f613ce8d');
INSERT INTO public.examinations VALUES ('ec6614e7-2b80-41e3-bc69-95333258d8ce', '2021-01-17', 0, 45, 0, 0, NULL, '12:45:00', 1, '67057f38-998b-4bd7-9d10-022fe17a1f6a', '83b35d75-a169-403d-84a3-d450029139c7', NULL, '88a7d06c-fb6b-47d2-8948-2de0f613ce8d');


--
-- TOC entry 3369 (class 0 OID 78353)
-- Dependencies: 222
-- Data for Name: ingredients; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.ingredients VALUES ('1bfab79a-4f82-4fb9-b83c-ed8f3b681046', 'Silicijum-dioksid');
INSERT INTO public.ingredients VALUES ('f462a710-23bc-4cc0-8913-eccd24db3119', 'Dihidrat');
INSERT INTO public.ingredients VALUES ('80fd21c8-6a28-4858-9bd7-4c26597f3986', 'Kalijum-hidrogen fosfat');
INSERT INTO public.ingredients VALUES ('baa89f4c-e487-4a46-a827-ecd2169e5e7b', 'Sastojak01');


--
-- TOC entry 3370 (class 0 OID 78358)
-- Dependencies: 223
-- Data for Name: ingredients_in_drugs; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.ingredients_in_drugs VALUES ('0e8c6645-209d-4b37-b3a5-d6bc36f23877', 'f462a710-23bc-4cc0-8913-eccd24db3119');
INSERT INTO public.ingredients_in_drugs VALUES ('0e8c6645-209d-4b37-b3a5-d6bc36f23877', '1bfab79a-4f82-4fb9-b83c-ed8f3b681046');
INSERT INTO public.ingredients_in_drugs VALUES ('8ef2aa22-fa9c-4688-a18d-39a6b3ae56b5', '80fd21c8-6a28-4858-9bd7-4c26597f3986');
INSERT INTO public.ingredients_in_drugs VALUES ('9a118eae-a1dd-49e1-a80f-9e9fceba1e16', 'f462a710-23bc-4cc0-8913-eccd24db3119');
INSERT INTO public.ingredients_in_drugs VALUES ('dd0dee39-55b5-4b0b-ae9a-9962e816137a', '1bfab79a-4f82-4fb9-b83c-ed8f3b681046');


--
-- TOC entry 3371 (class 0 OID 78363)
-- Dependencies: 224
-- Data for Name: locationmaps; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.locationmaps VALUES ('b695b830-d385-4f4a-8ebb-93e772e48f72', 5661776.908374695, 2209154.842495098, '88a7d06c-fb6b-47d2-8948-2de0f613ce8d');
INSERT INTO public.locationmaps VALUES ('45da98ae-b977-4fd5-b78d-8cd7ee8e44ef', 5583370.9538154425, 2192481.587275266, 'cfd8c4f2-dfe3-47ca-8503-4d8951b2c150');
INSERT INTO public.locationmaps VALUES ('278bd2cb-630e-4832-b2bc-1431b7d06f45', 5567926.582826679, 2249358.0769701716, 'b3fce573-5ba9-469b-8e8e-05bc73268eeb');

INSERT INTO public.locationmaps VALUES ('b695b830-d381-4f4a-8ebb-93e772e48f70', 5661776.908374895, 2219154.842495098, 'e8cba8c9-1a1a-44fc-989d-83c9e4c68e68');
INSERT INTO public.locationmaps VALUES ('45da98ae-b917-4fd5-b78d-8cd7ee8e43ef', 5583370.9538155425, 2292481.587275266, 'c92a2cc2-2712-49a9-9948-e1670c84ba7f');
INSERT INTO public.locationmaps VALUES ('278bd2cb-634e-4832-b2bc-1431b7d06f15', 5567926.582826479, 2239358.0769701716, '418dd993-a877-4010-af2e-18574272a367');


--
-- TOC entry 3372 (class 0 OID 78368)
-- Dependencies: 225
-- Data for Name: locations; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.locations VALUES ('9b689f9f-9473-4505-981f-217cbf676d10', 10, 'Karadjordjeva', '48711cf8-e248-4b68-ab78-610307914ce4');
INSERT INTO public.locations VALUES ('12e57999-9c2a-456a-8925-c958216ff7ca', 10, 'Masarikova', 'd2aadb93-f3e8-418f-8834-4548ee974cb2');
INSERT INTO public.locations VALUES ('fddde7cd-94d2-41e9-bdf0-02f6f19a9417', 20, 'Kisacka', '48711cf8-e248-4b68-ab78-610307914ce4');
INSERT INTO public.locations VALUES ('2114efd2-ce36-4ee5-8ae4-6621a1e36d34', 7, 'Bulevar Despota Stefana', '48711cf8-e248-4b68-ab78-610307914ce4');
INSERT INTO public.locations VALUES ('9f89203a-15ef-4448-867f-1c095b2870c3', 213, 'Obrenovacka', 'd2aadb93-f3e8-418f-8834-4548ee974cb2');
INSERT INTO public.locations VALUES ('10e98fc6-33b8-41eb-995b-cad22dfcc01f', 12, 'Bukurest', 'ea87892d-e693-4ecb-8ebd-e5f9d4da8329');
INSERT INTO public.locations VALUES ('9840a4f8-78fd-4630-8dec-769807eb10ca', 2, 'Valevska', '87efb40e-813a-4a28-901b-75cc25b411f9');
INSERT INTO public.locations VALUES ('cd3704a3-0d30-4253-bb95-00e7f8ebaa06', 5, 'Misacka', 'cb7f5641-3da1-4c2c-86ba-0f0f7a672fb2');


--
-- TOC entry 3373 (class 0 OID 78373)
-- Dependencies: 226
-- Data for Name: loyalty_program; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.loyalty_program VALUES ('6deb03b1-ece4-4d10-bbb7-a09ef9d92626', 13, 5, 7, 700, 200, 402, 5, 5, 2);


--
-- TOC entry 3374 (class 0 OID 78378)
-- Dependencies: 227
-- Data for Name: manufacturer; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.manufacturer VALUES ('5c8e8d7c-6494-4c94-bc8d-8bd930f543be', 'Bayer');
INSERT INTO public.manufacturer VALUES ('5c8e8d7c-6494-4c94-bc4d-8bd930f543be', 'Hemorfam');
INSERT INTO public.manufacturer VALUES ('5c8e8d7c-6494-4c94-bc3d-8bd930f543be', 'Lili');


--
-- TOC entry 3375 (class 0 OID 78383)
-- Dependencies: 228
-- Data for Name: medical_stuff; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.medical_stuff VALUES (5, '67057f38-998b-4bd7-9d10-022fe17a1f6a');
INSERT INTO public.medical_stuff VALUES (3, 'd6438084-0dde-4cd0-9933-182cd2e06c21');
INSERT INTO public.medical_stuff VALUES (5, '108a12f4-d272-483b-b886-d306662e7940');
INSERT INTO public.medical_stuff VALUES (4, '0f68d54b-3e13-48ae-8e8f-084c2014b729');
INSERT INTO public.medical_stuff VALUES (3, '4d814464-9e5e-4bd4-a9ee-d16f6b13bff3');
INSERT INTO public.medical_stuff VALUES (0, 'e61d5651-8495-47bc-8c2b-4f5c985a5b1d');


--
-- TOC entry 3376 (class 0 OID 78388)
-- Dependencies: 229
-- Data for Name: medicalstuff_marks; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3377 (class 0 OID 78393)
-- Dependencies: 230
-- Data for Name: offers; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.offers VALUES ('1d9f4466-c1f8-48ca-ad04-58d0a18e7c97', '2021-02-12', 10, 0, '38a313c2-148f-447f-9b36-2c3a76874b02', '008194b8-8696-4690-a131-c01ba93d6221');


--
-- TOC entry 3378 (class 0 OID 78398)
-- Dependencies: 231
-- Data for Name: patients; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.patients VALUES (3, 12, 0, '1af76a7e-544f-4cb1-a478-35eb7e1b80ca');


--
-- TOC entry 3379 (class 0 OID 78403)
-- Dependencies: 232
-- Data for Name: pharmacies; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.pharmacies VALUES ('2f8ec936-585b-4035-baad-2795fa091622', 9.6, 0, 'Kul apoteka', 0, 'Apoteka 3', 1, '9b689f9f-9473-4505-981f-217cbf676d10');
INSERT INTO public.pharmacies VALUES ('cad5c54f-b3e0-45fd-8625-9fa87d57ca5f', 8.6, 0, 'Nasa apoteka', 0, 'Apoteka 2', 1, 'fddde7cd-94d2-41e9-bdf0-02f6f19a9417');
INSERT INTO public.pharmacies VALUES ('418dd993-a877-4010-af2e-18574272a367', 8.1, 2550, 'Nova apoteka', 3100, 'Apoteka 5', 1, '9b689f9f-9473-4505-981f-217cbf676d10');
INSERT INTO public.pharmacies VALUES ('c92a2cc2-2712-49a9-9948-e1670c84ba7f', 8.7, 0, 'Ful apoteka', 0, 'Apoteka 6', 1, '9b689f9f-9473-4505-981f-217cbf676d10');
INSERT INTO public.pharmacies VALUES ('e8cba8c9-1a1a-44fc-989d-83c9e4c68e68', 9.2, 0, 'Mnogo dobra apoteka', 0, 'Apoteka 7', 1, 'fddde7cd-94d2-41e9-bdf0-02f6f19a9417');
INSERT INTO public.pharmacies VALUES ('88a7d06c-fb6b-47d2-8948-2de0f613ce8d', 8.9, 2500, 'Dobra apoteka', 3000, 'Apoteka 1', 4, '12e57999-9c2a-456a-8925-c958216ff7ca');
INSERT INTO public.pharmacies VALUES ('cfd8c4f2-dfe3-47ca-8503-4d8951b2c150', 9.8, 0, 'Nasa najbolja apoteka', 0, 'Apoteka 8', 3, '12e57999-9c2a-456a-8925-c958216ff7ca');
INSERT INTO public.pharmacies VALUES ('b3fce573-5ba9-469b-8e8e-05bc73268eeb', 9.1, 2700, 'Naj apoteka', 3500, 'Apoteka 4', 2, '9b689f9f-9473-4505-981f-217cbf676d10');


--
-- TOC entry 3380 (class 0 OID 78411)
-- Dependencies: 233
-- Data for Name: pharmacists; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.pharmacists VALUES ('67057f38-998b-4bd7-9d10-022fe17a1f6a', '88a7d06c-fb6b-47d2-8948-2de0f613ce8d');
INSERT INTO public.pharmacists VALUES ('4d814464-9e5e-4bd4-a9ee-d16f6b13bff3', '88a7d06c-fb6b-47d2-8948-2de0f613ce8d');
INSERT INTO public.pharmacists VALUES ('e61d5651-8495-47bc-8c2b-4f5c985a5b1d', '88a7d06c-fb6b-47d2-8948-2de0f613ce8d');


--
-- TOC entry 3381 (class 0 OID 78416)
-- Dependencies: 234
-- Data for Name: pharmacy_administrators; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.pharmacy_administrators VALUES ('1b1b4d63-5d4e-4c5e-a472-0fd5cc11ddf9', '88a7d06c-fb6b-47d2-8948-2de0f613ce8d');
INSERT INTO public.pharmacy_administrators VALUES ('477c59d5-bfda-49ed-8217-762e2c20b282', 'cfd8c4f2-dfe3-47ca-8503-4d8951b2c150');
INSERT INTO public.pharmacy_administrators VALUES ('a0f30792-970a-4d9c-ad22-d7f959f02d60', 'b3fce573-5ba9-469b-8e8e-05bc73268eeb');


--
-- TOC entry 3382 (class 0 OID 78421)
-- Dependencies: 235
-- Data for Name: pharmacy_marks; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3383 (class 0 OID 78426)
-- Dependencies: 236
-- Data for Name: promotions; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3384 (class 0 OID 78431)
-- Dependencies: 237
-- Data for Name: subscribed; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.subscribed VALUES ('1af76a7e-544f-4cb1-a478-35eb7e1b80ca', '2f8ec936-585b-4035-baad-2795fa091622');
INSERT INTO public.subscribed VALUES ('1af76a7e-544f-4cb1-a478-35eb7e1b80ca', '88a7d06c-fb6b-47d2-8948-2de0f613ce8d');


--
-- TOC entry 3385 (class 0 OID 78436)
-- Dependencies: 238
-- Data for Name: substitute_drugs; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.substitute_drugs VALUES ('34756297-b5ad-4140-a8cc-dd1031bf10b2', '8ef2aa22-fa9c-4688-a18d-39a6b3ae56b5');
INSERT INTO public.substitute_drugs VALUES ('9a118eae-a1dd-49e1-a80f-9e9fceba1e16', '34756297-b5ad-4140-a8cc-dd1031bf10b2');
INSERT INTO public.substitute_drugs VALUES ('dd0dee39-55b5-4b0b-ae9a-9962e816137a', '34756297-b5ad-4140-a8cc-dd1031bf10b2');


--
-- TOC entry 3386 (class 0 OID 78441)
-- Dependencies: 239
-- Data for Name: suppliers; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.suppliers VALUES ('008194b8-8696-4690-a131-c01ba93d6221');
INSERT INTO public.suppliers VALUES ('a1db87c4-ddbc-4d2a-8707-9f4f71119c15');


--
-- TOC entry 3387 (class 0 OID 78446)
-- Dependencies: 240
-- Data for Name: system_administrators; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.system_administrators VALUES ('cce35f91-0330-4d7c-af4e-82980f53a4b4');


--
-- TOC entry 3388 (class 0 OID 78451)
-- Dependencies: 241
-- Data for Name: user_authority; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.user_authority VALUES ('67057f38-998b-4bd7-9d10-022fe17a1f6a', '5e7a160a-6560-42bd-b7b5-c5c397b2d4a2');
INSERT INTO public.user_authority VALUES ('d6438084-0dde-4cd0-9933-182cd2e06c21', '5b345544-cce8-4eff-af17-57604225683b');
INSERT INTO public.user_authority VALUES ('108a12f4-d272-483b-b886-d306662e7940', '5b345544-cce8-4eff-af17-57604225683b');
INSERT INTO public.user_authority VALUES ('cce35f91-0330-4d7c-af4e-82980f53a4b4', 'cf07e664-758f-4822-8386-751e3d2e2e35');
INSERT INTO public.user_authority VALUES ('1af76a7e-544f-4cb1-a478-35eb7e1b80ca', '7bcc0867-0737-4e4f-882f-495dfda3f8ef');
INSERT INTO public.user_authority VALUES ('4d814464-9e5e-4bd4-a9ee-d16f6b13bff3', '5e7a160a-6560-42bd-b7b5-c5c397b2d4a2');
INSERT INTO public.user_authority VALUES ('1b1b4d63-5d4e-4c5e-a472-0fd5cc11ddf9', '27a25265-97b8-49a6-8f58-4f2889211d2f');
INSERT INTO public.user_authority VALUES ('008194b8-8696-4690-a131-c01ba93d6221', '4e8643a5-c594-424a-8bb1-00d424fe0782');
INSERT INTO public.user_authority VALUES ('477c59d5-bfda-49ed-8217-762e2c20b282', '27a25265-97b8-49a6-8f58-4f2889211d2f');
INSERT INTO public.user_authority VALUES ('a0f30792-970a-4d9c-ad22-d7f959f02d60', '27a25265-97b8-49a6-8f58-4f2889211d2f');
INSERT INTO public.user_authority VALUES ('a1db87c4-ddbc-4d2a-8707-9f4f71119c15', '4e8643a5-c594-424a-8bb1-00d424fe0782');
INSERT INTO public.user_authority VALUES ('e61d5651-8495-47bc-8c2b-4f5c985a5b1d', '5e7a160a-6560-42bd-b7b5-c5c397b2d4a2');


--
-- TOC entry 3389 (class 0 OID 78454)
-- Dependencies: 242
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES ('008194b8-8696-4690-a131-c01ba93d6221', true, false, 'Markovic', 'Marko', '+381-64-333-21-11', 'markovic@gmail.com', NULL, '$2y$10$IcNlTwkNI1FWcu4yrI8CP.yCLJ20S2vCCi.UhKBNhIv8j56i2jw36', 0, '12e57999-9c2a-456a-8925-c958216ff7ca');
INSERT INTO public.users VALUES ('0f68d54b-3e13-48ae-8e8f-084c2014b729', true, false, 'Slavic', 'Slavica', '+381-64-333-21-13', 'slavica@gmail.com', NULL, '$2y$10$IcNlTwkNI1FWcu4yrI8CP.yCLJ20S2vCCi.UhKBNhIv8j56i2jw36', 0, '12e57999-9c2a-456a-8925-c958216ff7ca');
INSERT INTO public.users VALUES ('108a12f4-d272-483b-b886-d306662e7940', true, false, 'Jovicic', 'Jovica', '+381-64-333-21-14', 'jovica@gmail.com', NULL, '$2y$10$IcNlTwkNI1FWcu4yrI8CP.yCLJ20S2vCCi.UhKBNhIv8j56i2jw36', 0, 'fddde7cd-94d2-41e9-bdf0-02f6f19a9417');
INSERT INTO public.users VALUES ('1b1b4d63-5d4e-4c5e-a472-0fd5cc11ddf9', true, false, 'Markovic', 'Marko', '+381-64-333-21-16', 'marko@gmail.com', NULL, '$2y$10$IcNlTwkNI1FWcu4yrI8CP.yCLJ20S2vCCi.UhKBNhIv8j56i2jw36', 0, '12e57999-9c2a-456a-8925-c958216ff7ca');
INSERT INTO public.users VALUES ('4d814464-9e5e-4bd4-a9ee-d16f6b13bff3', true, false, 'Kundacina', 'Djordjije', '+381-64-333-21-17', 'djole@gmail.com', NULL, '$2y$10$IcNlTwkNI1FWcu4yrI8CP.yCLJ20S2vCCi.UhKBNhIv8j56i2jw36', 0, '12e57999-9c2a-456a-8925-c958216ff7ca');
INSERT INTO public.users VALUES ('67057f38-998b-4bd7-9d10-022fe17a1f6a', true, false, 'Pajic', 'Paja', '+381-64-333-21-18', 'paja@gmail.com', NULL, '$2y$10$IcNlTwkNI1FWcu4yrI8CP.yCLJ20S2vCCi.UhKBNhIv8j56i2jw36', 0, '9b689f9f-9473-4505-981f-217cbf676d10');
INSERT INTO public.users VALUES ('cce35f91-0330-4d7c-af4e-82980f53a4b4', true, false, 'Petrovic', 'Petar', '+381-64-333-21-23', 'petar.petrovic@gmail.com', NULL, '$2y$10$IcNlTwkNI1FWcu4yrI8CP.yCLJ20S2vCCi.UhKBNhIv8j56i2jw36', 0, '2114efd2-ce36-4ee5-8ae4-6621a1e36d34');
INSERT INTO public.users VALUES ('d6438084-0dde-4cd0-9933-182cd2e06c21', true, true, 'Simic', 'Aca', '+381-64-333-21-98', 'simke@gmail.com', NULL, '$2y$10$IcNlTwkNI1FWcu4yrI8CP.yCLJ20S2vCCi.UhKBNhIv8j56i2jw36', 0, 'fddde7cd-94d2-41e9-bdf0-02f6f19a9417');
INSERT INTO public.users VALUES ('1af76a7e-544f-4cb1-a478-35eb7e1b80ca', true, false, 'Stevanović', 'Aleksandar', '+381-64-333-21-15', 'aleksa@gmail.com', NULL, '$2y$10$IcNlTwkNI1FWcu4yrI8CP.yCLJ20S2vCCi.UhKBNhIv8j56i2jw36', 1, '12e57999-9c2a-456a-8925-c958216ff7ca');
INSERT INTO public.users VALUES ('a1db87c4-ddbc-4d2a-8707-9f4f71119c15', false, true, 'Bojanovic', 'Bojan', '+381-61-123-14-65', 'bojan@gmail.com', '2021-02-12 22:37:38.84', '$2y$10$IcNlTwkNI1FWcu4yrI8CP.yCLJ20S2vCCi.UhKBNhIv8j56i2jw36', 0, '9840a4f8-78fd-4630-8dec-769807eb10ca');
INSERT INTO public.users VALUES ('e61d5651-8495-47bc-8c2b-4f5c985a5b1d', false, true, 'Jovic', 'Jovanka', '+381-652-68-32', 'jovancica@gmail.com', NULL, '$2y$10$IcNlTwkNI1FWcu4yrI8CP.yCLJ20S2vCCi.UhKBNhIv8j56i2jw36', 1, 'cd3704a3-0d30-4253-bb95-00e7f8ebaa06');
INSERT INTO public.users VALUES ('477c59d5-bfda-49ed-8217-762e2c20b282', true, false, 'Nevenovic', 'Neven', '+381-61-123-14-65', 'neven@gmail.com', '2021-02-12 22:33:09.057', '$2y$10$IcNlTwkNI1FWcu4yrI8CP.yCLJ20S2vCCi.UhKBNhIv8j56i2jw36', 0, '9f89203a-15ef-4448-867f-1c095b2870c3');
INSERT INTO public.users VALUES ('a0f30792-970a-4d9c-ad22-d7f959f02d60', true, false, 'Katic', 'Kaca', '+381-61-123-14-11', 'kaja@gmail.com', '2021-02-12 22:34:09.265', '$2y$10$IcNlTwkNI1FWcu4yrI8CP.yCLJ20S2vCCi.UhKBNhIv8j56i2jw36', 0, '10e98fc6-33b8-41eb-995b-cad22dfcc01f');


--
-- TOC entry 3390 (class 0 OID 78462)
-- Dependencies: 243
-- Data for Name: vacation_requests; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3391 (class 0 OID 78467)
-- Dependencies: 244
-- Data for Name: vacations; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.vacations VALUES ('33f085ce-ede3-461e-8f22-28ee25284072', '2021-03-01', '2021-02-01', '4d814464-9e5e-4bd4-a9ee-d16f6b13bff3', '88a7d06c-fb6b-47d2-8948-2de0f613ce8d');


--
-- TOC entry 3392 (class 0 OID 78472)
-- Dependencies: 245
-- Data for Name: work_time; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.work_time VALUES ('0b4481f1-8013-4957-9895-e6973c4ca30e', '2021-03-05', '16:00:00', '08:00:00', 'd6438084-0dde-4cd0-9933-182cd2e06c21', '88a7d06c-fb6b-47d2-8948-2de0f613ce8d');
INSERT INTO public.work_time VALUES ('f46758ee-c482-4b71-9362-f60148c54358', '2021-03-03', '10:00:00', '14:00:00', '4d814464-9e5e-4bd4-a9ee-d16f6b13bff3', '88a7d06c-fb6b-47d2-8948-2de0f613ce8d');
INSERT INTO public.work_time VALUES ('ee192925-d6a4-4f95-bacf-71ba81fc138c', '2021-02-22', '16:00:00', '08:00:00', 'd6438084-0dde-4cd0-9933-182cd2e06c21', '88a7d06c-fb6b-47d2-8948-2de0f613ce8d');
INSERT INTO public.work_time VALUES ('a750a90c-d71a-498d-8a68-918c93529112', '2021-02-21', '16:00:00', '08:00:00', 'd6438084-0dde-4cd0-9933-182cd2e06c21', '88a7d06c-fb6b-47d2-8948-2de0f613ce8d');
INSERT INTO public.work_time VALUES ('50bd0a88-68fe-4c2a-b1da-25b3714491bf', '2021-02-19', '16:00:00', '08:00:00', 'd6438084-0dde-4cd0-9933-182cd2e06c21', '88a7d06c-fb6b-47d2-8948-2de0f613ce8d');
INSERT INTO public.work_time VALUES ('28e365de-43dc-4f4e-a873-6dc0ccb933d7', '2021-02-23', '16:00:00', '08:00:00', 'd6438084-0dde-4cd0-9933-182cd2e06c21', '88a7d06c-fb6b-47d2-8948-2de0f613ce8d');
INSERT INTO public.work_time VALUES ('2a89d449-9086-4208-a297-c4c6d96a52f3', '2021-02-18', '16:00:00', '08:00:00', 'd6438084-0dde-4cd0-9933-182cd2e06c21', '88a7d06c-fb6b-47d2-8948-2de0f613ce8d');
INSERT INTO public.work_time VALUES ('0f608367-e34b-476a-8a08-6c5fe3968aa5', '2021-02-20', '16:00:00', '08:00:00', 'd6438084-0dde-4cd0-9933-182cd2e06c21', '88a7d06c-fb6b-47d2-8948-2de0f613ce8d');
INSERT INTO public.work_time VALUES ('1081a8d4-cd32-4cef-b07f-01d8e7a1aa9f', '2021-02-14', '16:00:00', '08:00:00', 'e61d5651-8495-47bc-8c2b-4f5c985a5b1d', '88a7d06c-fb6b-47d2-8948-2de0f613ce8d');
INSERT INTO public.work_time VALUES ('b58fd7d9-b507-4309-9838-fcbe0b71caff', '2021-02-15', '16:00:00', '08:00:00', 'e61d5651-8495-47bc-8c2b-4f5c985a5b1d', '88a7d06c-fb6b-47d2-8948-2de0f613ce8d');
INSERT INTO public.work_time VALUES ('4fa982e6-a176-438e-8494-6775ac257f9f', '2021-02-13', '16:00:00', '08:00:00', 'e61d5651-8495-47bc-8c2b-4f5c985a5b1d', '88a7d06c-fb6b-47d2-8948-2de0f613ce8d');
INSERT INTO public.work_time VALUES ('936c4bd4-5f8a-47c2-b496-d45c322595a2', '2021-02-20', '16:00:00', '08:00:00', 'e61d5651-8495-47bc-8c2b-4f5c985a5b1d', '88a7d06c-fb6b-47d2-8948-2de0f613ce8d');
INSERT INTO public.work_time VALUES ('ba6a2d8d-4243-4be9-ac2a-4fdfa8261209', '2021-02-20', '16:00:00', '08:00:00', '108a12f4-d272-483b-b886-d306662e7940', 'cfd8c4f2-dfe3-47ca-8503-4d8951b2c150');
INSERT INTO public.work_time VALUES ('6a1e07da-7de5-4e1a-aa6b-c0311534755a', '2021-02-19', '16:00:00', '08:00:00', '108a12f4-d272-483b-b886-d306662e7940', 'cfd8c4f2-dfe3-47ca-8503-4d8951b2c150');
INSERT INTO public.work_time VALUES ('b143bd72-7e77-448d-a2ec-0e2b2d664c2e', '2021-02-18', '16:00:00', '08:00:00', '108a12f4-d272-483b-b886-d306662e7940', 'cfd8c4f2-dfe3-47ca-8503-4d8951b2c150');
INSERT INTO public.work_time VALUES ('71df3414-3e20-4713-a078-254663f726e2', '2021-02-19', '16:00:00', '08:00:00', '0f68d54b-3e13-48ae-8e8f-084c2014b729', 'b3fce573-5ba9-469b-8e8e-05bc73268eeb');
INSERT INTO public.work_time VALUES ('81f23f0e-1470-44a9-8c4d-846313e27dc7', '2021-02-15', '16:00:00', '08:00:00', '0f68d54b-3e13-48ae-8e8f-084c2014b729', 'b3fce573-5ba9-469b-8e8e-05bc73268eeb');
INSERT INTO public.work_time VALUES ('412fa5d0-4e8b-472f-8853-4370a1a122be', '2021-02-18', '16:00:00', '08:00:00', '0f68d54b-3e13-48ae-8e8f-084c2014b729', 'b3fce573-5ba9-469b-8e8e-05bc73268eeb');
INSERT INTO public.work_time VALUES ('7fff063d-34ae-413a-acea-44780a96fc25', '2021-02-17', '16:00:00', '08:00:00', '0f68d54b-3e13-48ae-8e8f-084c2014b729', 'b3fce573-5ba9-469b-8e8e-05bc73268eeb');


--
-- TOC entry 3033 (class 2606 OID 78241)
-- Name: allergies allergies_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.allergies
    ADD CONSTRAINT allergies_pkey PRIMARY KEY (user_id, drug_id);


--
-- TOC entry 3035 (class 2606 OID 78246)
-- Name: authority authority_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.authority
    ADD CONSTRAINT authority_pkey PRIMARY KEY (id);


--
-- TOC entry 3037 (class 2606 OID 78251)
-- Name: cities cities_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities
    ADD CONSTRAINT cities_pkey PRIMARY KEY (city_id);


--
-- TOC entry 3041 (class 2606 OID 78256)
-- Name: complaint complaint_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.complaint
    ADD CONSTRAINT complaint_pkey PRIMARY KEY (complaint_id);


--
-- TOC entry 3043 (class 2606 OID 78261)
-- Name: contraindications contraindications_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.contraindications
    ADD CONSTRAINT contraindications_pkey PRIMARY KEY (contraindication_id);


--
-- TOC entry 3047 (class 2606 OID 78266)
-- Name: countries countries_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_pkey PRIMARY KEY (country_id);


--
-- TOC entry 3053 (class 2606 OID 78276)
-- Name: dermatologists_in_pharmacies dermatologists_in_pharmacies_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dermatologists_in_pharmacies
    ADD CONSTRAINT dermatologists_in_pharmacies_pkey PRIMARY KEY (pharmacy_id, user_id);


--
-- TOC entry 3051 (class 2606 OID 78271)
-- Name: dermatologists dermatologists_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dermatologists
    ADD CONSTRAINT dermatologists_pkey PRIMARY KEY (user_id);


--
-- TOC entry 3055 (class 2606 OID 78281)
-- Name: drug_marks drug_marks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.drug_marks
    ADD CONSTRAINT drug_marks_pkey PRIMARY KEY (drug_marks_id);


--
-- TOC entry 3057 (class 2606 OID 78286)
-- Name: drug_order_items drug_order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.drug_order_items
    ADD CONSTRAINT drug_order_items_pkey PRIMARY KEY (item_id, drugorder_id, drug_id);


--
-- TOC entry 3061 (class 2606 OID 78291)
-- Name: drug_orders drug_orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.drug_orders
    ADD CONSTRAINT drug_orders_pkey PRIMARY KEY (drugorder_id);


--
-- TOC entry 3063 (class 2606 OID 78296)
-- Name: drug_prices drug_prices_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.drug_prices
    ADD CONSTRAINT drug_prices_pkey PRIMARY KEY (price_id);


--
-- TOC entry 3065 (class 2606 OID 78301)
-- Name: drug_reservations drug_reservations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.drug_reservations
    ADD CONSTRAINT drug_reservations_pkey PRIMARY KEY (drug_reservation_id);


--
-- TOC entry 3073 (class 2606 OID 78314)
-- Name: drugs_by_supplier drugs_by_supplier_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.drugs_by_supplier
    ADD CONSTRAINT drugs_by_supplier_pkey PRIMARY KEY (user_id, drug_id);


--
-- TOC entry 3075 (class 2606 OID 78319)
-- Name: drugs_contraindications drugs_contraindications_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.drugs_contraindications
    ADD CONSTRAINT drugs_contraindications_pkey PRIMARY KEY (drug_id, contraindication_id);


--
-- TOC entry 3077 (class 2606 OID 78324)
-- Name: drugs_in_pharmacy drugs_in_pharmacy_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.drugs_in_pharmacy
    ADD CONSTRAINT drugs_in_pharmacy_pkey PRIMARY KEY (id);


--
-- TOC entry 3067 (class 2606 OID 78309)
-- Name: drugs drugs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.drugs
    ADD CONSTRAINT drugs_pkey PRIMARY KEY (drug_id);


--
-- TOC entry 3083 (class 2606 OID 78334)
-- Name: erecipe_item erecipe_item_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.erecipe_item
    ADD CONSTRAINT erecipe_item_pkey PRIMARY KEY (item_id);


--
-- TOC entry 3079 (class 2606 OID 78329)
-- Name: erecipe erecipe_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.erecipe
    ADD CONSTRAINT erecipe_pkey PRIMARY KEY (erecipe_id);


--
-- TOC entry 3085 (class 2606 OID 78342)
-- Name: eventdrug eventdrug_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.eventdrug
    ADD CONSTRAINT eventdrug_pkey PRIMARY KEY (event_drug_id);


--
-- TOC entry 3087 (class 2606 OID 78347)
-- Name: examination_prices examination_prices_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.examination_prices
    ADD CONSTRAINT examination_prices_pkey PRIMARY KEY (examination_price_id);


--
-- TOC entry 3089 (class 2606 OID 78352)
-- Name: examinations examinations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.examinations
    ADD CONSTRAINT examinations_pkey PRIMARY KEY (examination_id);


--
-- TOC entry 3095 (class 2606 OID 78362)
-- Name: ingredients_in_drugs ingredients_in_drugs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ingredients_in_drugs
    ADD CONSTRAINT ingredients_in_drugs_pkey PRIMARY KEY (drug_id, ingredient_id);


--
-- TOC entry 3091 (class 2606 OID 78357)
-- Name: ingredients ingredients_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT ingredients_pkey PRIMARY KEY (ingredient_id);


--
-- TOC entry 3097 (class 2606 OID 78367)
-- Name: locationmaps locationmaps_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.locationmaps
    ADD CONSTRAINT locationmaps_pkey PRIMARY KEY (map_id);


--
-- TOC entry 3103 (class 2606 OID 78372)
-- Name: locations locations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_pkey PRIMARY KEY (location_id);


--
-- TOC entry 3105 (class 2606 OID 78377)
-- Name: loyalty_program loyalty_program_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.loyalty_program
    ADD CONSTRAINT loyalty_program_pkey PRIMARY KEY (id);


--
-- TOC entry 3107 (class 2606 OID 78382)
-- Name: manufacturer manufacturer_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.manufacturer
    ADD CONSTRAINT manufacturer_pkey PRIMARY KEY (manufacturer_id);


--
-- TOC entry 3111 (class 2606 OID 78387)
-- Name: medical_stuff medical_stuff_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.medical_stuff
    ADD CONSTRAINT medical_stuff_pkey PRIMARY KEY (user_id);


--
-- TOC entry 3113 (class 2606 OID 78392)
-- Name: medicalstuff_marks medicalstuff_marks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.medicalstuff_marks
    ADD CONSTRAINT medicalstuff_marks_pkey PRIMARY KEY (medical_stuff_marks_id);


--
-- TOC entry 3115 (class 2606 OID 78397)
-- Name: offers offers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.offers
    ADD CONSTRAINT offers_pkey PRIMARY KEY (offer_id);


--
-- TOC entry 3117 (class 2606 OID 78402)
-- Name: patients patients_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_pkey PRIMARY KEY (user_id);


--
-- TOC entry 3119 (class 2606 OID 78410)
-- Name: pharmacies pharmacies_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pharmacies
    ADD CONSTRAINT pharmacies_pkey PRIMARY KEY (pharmacy_id);


--
-- TOC entry 3123 (class 2606 OID 78415)
-- Name: pharmacists pharmacists_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pharmacists
    ADD CONSTRAINT pharmacists_pkey PRIMARY KEY (user_id);


--
-- TOC entry 3125 (class 2606 OID 78420)
-- Name: pharmacy_administrators pharmacy_administrators_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pharmacy_administrators
    ADD CONSTRAINT pharmacy_administrators_pkey PRIMARY KEY (user_id);


--
-- TOC entry 3127 (class 2606 OID 78425)
-- Name: pharmacy_marks pharmacy_marks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pharmacy_marks
    ADD CONSTRAINT pharmacy_marks_pkey PRIMARY KEY (pharmacy_marks_id);


--
-- TOC entry 3129 (class 2606 OID 78430)
-- Name: promotions promotions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.promotions
    ADD CONSTRAINT promotions_pkey PRIMARY KEY (promotion_id);


--
-- TOC entry 3131 (class 2606 OID 78435)
-- Name: subscribed subscribed_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscribed
    ADD CONSTRAINT subscribed_pkey PRIMARY KEY (user_id, pharmacy_id);


--
-- TOC entry 3133 (class 2606 OID 78440)
-- Name: substitute_drugs substitute_drugs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.substitute_drugs
    ADD CONSTRAINT substitute_drugs_pkey PRIMARY KEY (drug_id, substitute_drug_id);


--
-- TOC entry 3135 (class 2606 OID 78445)
-- Name: suppliers suppliers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT suppliers_pkey PRIMARY KEY (user_id);


--
-- TOC entry 3137 (class 2606 OID 78450)
-- Name: system_administrators system_administrators_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.system_administrators
    ADD CONSTRAINT system_administrators_pkey PRIMARY KEY (user_id);


--
-- TOC entry 3081 (class 2606 OID 78490)
-- Name: erecipe uk_313x2qeg25crv4w9j64e728vp; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.erecipe
    ADD CONSTRAINT uk_313x2qeg25crv4w9j64e728vp UNIQUE (code);


--
-- TOC entry 3069 (class 2606 OID 78488)
-- Name: drugs uk_7pbf00faekwsqmsto1h5p0mww; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.drugs
    ADD CONSTRAINT uk_7pbf00faekwsqmsto1h5p0mww UNIQUE (name);


--
-- TOC entry 3093 (class 2606 OID 78492)
-- Name: ingredients uk_a87h5odj5g2ngpstpaoigwked; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT uk_a87h5odj5g2ngpstpaoigwked UNIQUE (name);


--
-- TOC entry 3139 (class 2606 OID 78502)
-- Name: users uk_avh1b2ec82audum2lyjx2p1ws; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT uk_avh1b2ec82audum2lyjx2p1ws UNIQUE (email);


--
-- TOC entry 3049 (class 2606 OID 78482)
-- Name: countries uk_bnqj16x40slnn8hxdi0uqodvf; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.countries
    ADD CONSTRAINT uk_bnqj16x40slnn8hxdi0uqodvf UNIQUE (name);


--
-- TOC entry 3045 (class 2606 OID 78480)
-- Name: contraindications uk_cdkkirxks4t63mgt27mav5v8r; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.contraindications
    ADD CONSTRAINT uk_cdkkirxks4t63mgt27mav5v8r UNIQUE (name);


--
-- TOC entry 3109 (class 2606 OID 78498)
-- Name: manufacturer uk_cqjrmtcpteup84albt6b9wu3f; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.manufacturer
    ADD CONSTRAINT uk_cqjrmtcpteup84albt6b9wu3f UNIQUE (name);


--
-- TOC entry 3099 (class 2606 OID 78496)
-- Name: locationmaps uk_g8y7eisy0tjy7h06rakb222lo; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.locationmaps
    ADD CONSTRAINT uk_g8y7eisy0tjy7h06rakb222lo UNIQUE (geo_width);


--
-- TOC entry 3071 (class 2606 OID 78486)
-- Name: drugs uk_gtkuu6h23d68nfbx7fvtb4jl9; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.drugs
    ADD CONSTRAINT uk_gtkuu6h23d68nfbx7fvtb4jl9 UNIQUE (code);


--
-- TOC entry 3101 (class 2606 OID 78494)
-- Name: locationmaps uk_hgyr98kikw0w3k0vi22n3ga5b; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.locationmaps
    ADD CONSTRAINT uk_hgyr98kikw0w3k0vi22n3ga5b UNIQUE (geo_lenght);


--
-- TOC entry 3039 (class 2606 OID 78478)
-- Name: cities uk_jbn1f6bff0grcaxgndq15ok8l; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities
    ADD CONSTRAINT uk_jbn1f6bff0grcaxgndq15ok8l UNIQUE (name);


--
-- TOC entry 3121 (class 2606 OID 78500)
-- Name: pharmacies uk_mukxgam067uo46ndweif0uqa8; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pharmacies
    ADD CONSTRAINT uk_mukxgam067uo46ndweif0uqa8 UNIQUE (name);


--
-- TOC entry 3059 (class 2606 OID 78484)
-- Name: drug_order_items uk_t9sv9jeb7h6avtliqus9v5yh5; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.drug_order_items
    ADD CONSTRAINT uk_t9sv9jeb7h6avtliqus9v5yh5 UNIQUE (item_id);


--
-- TOC entry 3141 (class 2606 OID 78461)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 3143 (class 2606 OID 78466)
-- Name: vacation_requests vacation_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vacation_requests
    ADD CONSTRAINT vacation_requests_pkey PRIMARY KEY (request_id);


--
-- TOC entry 3145 (class 2606 OID 78471)
-- Name: vacations vacations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vacations
    ADD CONSTRAINT vacations_pkey PRIMARY KEY (vacation_id);


--
-- TOC entry 3147 (class 2606 OID 78476)
-- Name: work_time work_time_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.work_time
    ADD CONSTRAINT work_time_pkey PRIMARY KEY (work_time_id);


--
-- TOC entry 3214 (class 2606 OID 78833)
-- Name: vacations fk10gfjxke1ada013f4ahkorj66; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vacations
    ADD CONSTRAINT fk10gfjxke1ada013f4ahkorj66 FOREIGN KEY (pharmacy_id) REFERENCES public.pharmacies(pharmacy_id);


--
-- TOC entry 3158 (class 2606 OID 78553)
-- Name: drug_marks fk15set2p904f75qv374whturtw; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.drug_marks
    ADD CONSTRAINT fk15set2p904f75qv374whturtw FOREIGN KEY (patient_id) REFERENCES public.patients(user_id);


--
-- TOC entry 3157 (class 2606 OID 78548)
-- Name: drug_marks fk1j7q2125mnlh76r2j7v5h6ly7; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.drug_marks
    ADD CONSTRAINT fk1j7q2125mnlh76r2j7v5h6ly7 FOREIGN KEY (drug_id) REFERENCES public.drugs(drug_id);


--
-- TOC entry 3156 (class 2606 OID 78543)
-- Name: dermatologists_in_pharmacies fk21brbvkt1j42xdbjrlqjr4vqi; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dermatologists_in_pharmacies
    ADD CONSTRAINT fk21brbvkt1j42xdbjrlqjr4vqi FOREIGN KEY (pharmacy_id) REFERENCES public.pharmacies(pharmacy_id);


--
-- TOC entry 3198 (class 2606 OID 78753)
-- Name: pharmacy_administrators fk2pdelnnh4k8t0c65i7wh8hoi; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pharmacy_administrators
    ADD CONSTRAINT fk2pdelnnh4k8t0c65i7wh8hoi FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- TOC entry 3197 (class 2606 OID 78748)
-- Name: pharmacy_administrators fk34qj7t1sf5cgof03yedi8rw39; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pharmacy_administrators
    ADD CONSTRAINT fk34qj7t1sf5cgof03yedi8rw39 FOREIGN KEY (pharmacy_id) REFERENCES public.pharmacies(pharmacy_id);


--
-- TOC entry 3183 (class 2606 OID 78678)
-- Name: examinations fk37ghstlwk8xvbsiggwka88rd2; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.examinations
    ADD CONSTRAINT fk37ghstlwk8xvbsiggwka88rd2 FOREIGN KEY (pharmacy_id) REFERENCES public.pharmacies(pharmacy_id);


--
-- TOC entry 3170 (class 2606 OID 78613)
-- Name: drugs_by_supplier fk3saofwpppc5kiowmq8sakqem6; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.drugs_by_supplier
    ADD CONSTRAINT fk3saofwpppc5kiowmq8sakqem6 FOREIGN KEY (user_id) REFERENCES public.suppliers(user_id);


--
-- TOC entry 3207 (class 2606 OID 78798)
-- Name: system_administrators fk412e4bpc0pe7xssl9v0vv003u; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.system_administrators
    ADD CONSTRAINT fk412e4bpc0pe7xssl9v0vv003u FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- TOC entry 3160 (class 2606 OID 78563)
-- Name: drug_order_items fk4implpdesrbts65txu8k1r2mb; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.drug_order_items
    ADD CONSTRAINT fk4implpdesrbts65txu8k1r2mb FOREIGN KEY (drug_id) REFERENCES public.drugs(drug_id);


--
-- TOC entry 3211 (class 2606 OID 78818)
-- Name: vacation_requests fk51qpfyq0k6tt6q5qa50mvkh3v; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vacation_requests
    ADD CONSTRAINT fk51qpfyq0k6tt6q5qa50mvkh3v FOREIGN KEY (user_id) REFERENCES public.medical_stuff(user_id);


--
-- TOC entry 3203 (class 2606 OID 78778)
-- Name: subscribed fk5eevuu2djnjf0t08jjxgjpndu; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscribed
    ADD CONSTRAINT fk5eevuu2djnjf0t08jjxgjpndu FOREIGN KEY (user_id) REFERENCES public.patients(user_id);


--
-- TOC entry 3216 (class 2606 OID 78843)
-- Name: work_time fk5i5m0lnygus0n1tje7yem7x64; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.work_time
    ADD CONSTRAINT fk5i5m0lnygus0n1tje7yem7x64 FOREIGN KEY (pharmacy_id) REFERENCES public.pharmacies(pharmacy_id);


--
-- TOC entry 3184 (class 2606 OID 78683)
-- Name: ingredients_in_drugs fk5rlisjnuxm3b8vj8p82cos9rj; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ingredients_in_drugs
    ADD CONSTRAINT fk5rlisjnuxm3b8vj8p82cos9rj FOREIGN KEY (ingredient_id) REFERENCES public.ingredients(ingredient_id);


--
-- TOC entry 3195 (class 2606 OID 78738)
-- Name: pharmacists fk64f6uvvr5uvxf1xaa1pr1otl2; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pharmacists
    ADD CONSTRAINT fk64f6uvvr5uvxf1xaa1pr1otl2 FOREIGN KEY (pharmacy_id) REFERENCES public.pharmacies(pharmacy_id);


--
-- TOC entry 3210 (class 2606 OID 78813)
-- Name: users fk6oemgyjieg5u4dex3dtvu8dx7; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk6oemgyjieg5u4dex3dtvu8dx7 FOREIGN KEY (location_id) REFERENCES public.locations(location_id);


--
-- TOC entry 3201 (class 2606 OID 78768)
-- Name: promotions fk6qdtbc537tkm3se89ymd6rc5t; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.promotions
    ADD CONSTRAINT fk6qdtbc537tkm3se89ymd6rc5t FOREIGN KEY (pharmacy_id) REFERENCES public.pharmacies(pharmacy_id);


--
-- TOC entry 3204 (class 2606 OID 78783)
-- Name: substitute_drugs fk7f66ghswq9uln2ptchsw9v979; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.substitute_drugs
    ADD CONSTRAINT fk7f66ghswq9uln2ptchsw9v979 FOREIGN KEY (substitute_drug_id) REFERENCES public.drugs(drug_id);


--
-- TOC entry 3178 (class 2606 OID 78653)
-- Name: erecipe_item fk7xmrwc7b05x4iqf8guk9460wo; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.erecipe_item
    ADD CONSTRAINT fk7xmrwc7b05x4iqf8guk9460wo FOREIGN KEY (erecipe_id) REFERENCES public.erecipe(erecipe_id);


--
-- TOC entry 3175 (class 2606 OID 78638)
-- Name: erecipe fk81p5n8g9tqhgop2dmtepsqmux; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.erecipe
    ADD CONSTRAINT fk81p5n8g9tqhgop2dmtepsqmux FOREIGN KEY (user_id) REFERENCES public.patients(user_id);


--
-- TOC entry 3148 (class 2606 OID 78503)
-- Name: allergies fk85wdddjju5yi84x19wsxq2vew; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.allergies
    ADD CONSTRAINT fk85wdddjju5yi84x19wsxq2vew FOREIGN KEY (drug_id) REFERENCES public.drugs(drug_id);


--
-- TOC entry 3205 (class 2606 OID 78788)
-- Name: substitute_drugs fk8k1k5tgi70cafci6medf8sb0q; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.substitute_drugs
    ADD CONSTRAINT fk8k1k5tgi70cafci6medf8sb0q FOREIGN KEY (drug_id) REFERENCES public.drugs(drug_id);


--
-- TOC entry 3191 (class 2606 OID 78718)
-- Name: offers fk98i9ry4oyl2e9nhogmny5tt5o; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.offers
    ADD CONSTRAINT fk98i9ry4oyl2e9nhogmny5tt5o FOREIGN KEY (drugorder_id) REFERENCES public.drug_orders(drugorder_id);


--
-- TOC entry 3172 (class 2606 OID 78623)
-- Name: drugs_contraindications fkasyrak47ecqhkyjc22ishvejc; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.drugs_contraindications
    ADD CONSTRAINT fkasyrak47ecqhkyjc22ishvejc FOREIGN KEY (drug_id) REFERENCES public.drugs(drug_id);


--
-- TOC entry 3196 (class 2606 OID 78743)
-- Name: pharmacists fkb4bfacwuuhayg16t4jwbgv0l4; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pharmacists
    ADD CONSTRAINT fkb4bfacwuuhayg16t4jwbgv0l4 FOREIGN KEY (user_id) REFERENCES public.medical_stuff(user_id);


--
-- TOC entry 3193 (class 2606 OID 78728)
-- Name: patients fkb5ssudtmnrxm7h8f2is6fy1ih; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT fkb5ssudtmnrxm7h8f2is6fy1ih FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- TOC entry 3162 (class 2606 OID 78573)
-- Name: drug_orders fkb6a4ldoxuwx3ffmdib74bpsd1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.drug_orders
    ADD CONSTRAINT fkb6a4ldoxuwx3ffmdib74bpsd1 FOREIGN KEY (user_id) REFERENCES public.pharmacy_administrators(user_id);


--
-- TOC entry 3176 (class 2606 OID 78643)
-- Name: erecipe fkbivet89lt6jf0uxbesbbyu4ka; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.erecipe
    ADD CONSTRAINT fkbivet89lt6jf0uxbesbbyu4ka FOREIGN KEY (pharmacy_id) REFERENCES public.pharmacies(pharmacy_id);


--
-- TOC entry 3151 (class 2606 OID 78518)
-- Name: complaint fkbsm4rs4qrcfjdiw8f9irj52gs; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.complaint
    ADD CONSTRAINT fkbsm4rs4qrcfjdiw8f9irj52gs FOREIGN KEY (medical_stuff_id) REFERENCES public.medical_stuff(user_id);


--
-- TOC entry 3190 (class 2606 OID 78713)
-- Name: medicalstuff_marks fkbsq7cevmcoo5j99oceyhi1ca4; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.medicalstuff_marks
    ADD CONSTRAINT fkbsq7cevmcoo5j99oceyhi1ca4 FOREIGN KEY (patient_id) REFERENCES public.patients(user_id);


--
-- TOC entry 3165 (class 2606 OID 78588)
-- Name: drug_reservations fkbxxm6objrjfppqlq0bbp9ff5o; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.drug_reservations
    ADD CONSTRAINT fkbxxm6objrjfppqlq0bbp9ff5o FOREIGN KEY (drug_id) REFERENCES public.drugs(drug_id);


--
-- TOC entry 3168 (class 2606 OID 78603)
-- Name: drugs fkcjugp91lff7dtjvpcaat7kglo; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.drugs
    ADD CONSTRAINT fkcjugp91lff7dtjvpcaat7kglo FOREIGN KEY (manufacturer_id) REFERENCES public.manufacturer(manufacturer_id);


--
-- TOC entry 3200 (class 2606 OID 78763)
-- Name: pharmacy_marks fkcw1yjw90q94373q8uf42sxev6; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pharmacy_marks
    ADD CONSTRAINT fkcw1yjw90q94373q8uf42sxev6 FOREIGN KEY (pharmacy_id) REFERENCES public.pharmacies(pharmacy_id);


--
-- TOC entry 3209 (class 2606 OID 78808)
-- Name: user_authority fkd5d46tqm31dxxj56sctry90nh; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_authority
    ADD CONSTRAINT fkd5d46tqm31dxxj56sctry90nh FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- TOC entry 3212 (class 2606 OID 78823)
-- Name: vacation_requests fkd6hvkk0jru0vuvb7k1ihmgmpd; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vacation_requests
    ADD CONSTRAINT fkd6hvkk0jru0vuvb7k1ihmgmpd FOREIGN KEY (pharmacy_id) REFERENCES public.pharmacies(pharmacy_id);


--
-- TOC entry 3199 (class 2606 OID 78758)
-- Name: pharmacy_marks fkda99ka2g4epngsikfpuug2j4; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pharmacy_marks
    ADD CONSTRAINT fkda99ka2g4epngsikfpuug2j4 FOREIGN KEY (patient_id) REFERENCES public.patients(user_id);


--
-- TOC entry 3167 (class 2606 OID 78598)
-- Name: drug_reservations fkdgu6010wma3x8qxos38x0qadl; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.drug_reservations
    ADD CONSTRAINT fkdgu6010wma3x8qxos38x0qadl FOREIGN KEY (pharmacy_id) REFERENCES public.pharmacies(pharmacy_id);


--
-- TOC entry 3206 (class 2606 OID 78793)
-- Name: suppliers fke0reactij8vduvod0oop0wvqe; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT fke0reactij8vduvod0oop0wvqe FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- TOC entry 3153 (class 2606 OID 78528)
-- Name: complaint fkek8ijjbf9cghenuo4t7c8ys12; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.complaint
    ADD CONSTRAINT fkek8ijjbf9cghenuo4t7c8ys12 FOREIGN KEY (pharmacy_id) REFERENCES public.pharmacies(pharmacy_id);


--
-- TOC entry 3155 (class 2606 OID 78538)
-- Name: dermatologists_in_pharmacies fkem92dxs5a7oysxn0kfr51tt0t; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dermatologists_in_pharmacies
    ADD CONSTRAINT fkem92dxs5a7oysxn0kfr51tt0t FOREIGN KEY (user_id) REFERENCES public.dermatologists(user_id);


--
-- TOC entry 3149 (class 2606 OID 78508)
-- Name: allergies fkemumcbi2ydc3pcg08l42rtyd2; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.allergies
    ADD CONSTRAINT fkemumcbi2ydc3pcg08l42rtyd2 FOREIGN KEY (user_id) REFERENCES public.patients(user_id);


--
-- TOC entry 3182 (class 2606 OID 78673)
-- Name: examinations fkenwhn6xd9pm1ypl7qbwqnuk9e; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.examinations
    ADD CONSTRAINT fkenwhn6xd9pm1ypl7qbwqnuk9e FOREIGN KEY (patient_id) REFERENCES public.patients(user_id);


--
-- TOC entry 3163 (class 2606 OID 78578)
-- Name: drug_prices fkfrsf6ude8mnv0bg872phnihfk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.drug_prices
    ADD CONSTRAINT fkfrsf6ude8mnv0bg872phnihfk FOREIGN KEY (drug_id) REFERENCES public.drugs(drug_id);


--
-- TOC entry 3185 (class 2606 OID 78688)
-- Name: ingredients_in_drugs fkgcv5lfu65w87tclryclfm3dm1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ingredients_in_drugs
    ADD CONSTRAINT fkgcv5lfu65w87tclryclfm3dm1 FOREIGN KEY (drug_id) REFERENCES public.drugs(drug_id);


--
-- TOC entry 3202 (class 2606 OID 78773)
-- Name: subscribed fkgmyby4dic0on2kjaalgx4hlyq; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscribed
    ADD CONSTRAINT fkgmyby4dic0on2kjaalgx4hlyq FOREIGN KEY (pharmacy_id) REFERENCES public.pharmacies(pharmacy_id);


--
-- TOC entry 3174 (class 2606 OID 78633)
-- Name: drugs_in_pharmacy fki7m8kde1wth98iy5kpetxyv18; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.drugs_in_pharmacy
    ADD CONSTRAINT fki7m8kde1wth98iy5kpetxyv18 FOREIGN KEY (pharmacy) REFERENCES public.pharmacies(pharmacy_id);


--
-- TOC entry 3169 (class 2606 OID 78608)
-- Name: drugs_by_supplier fkis74d9a5mo5r4xo1vgwr68j0g; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.drugs_by_supplier
    ADD CONSTRAINT fkis74d9a5mo5r4xo1vgwr68j0g FOREIGN KEY (drug_id) REFERENCES public.drugs(drug_id);


--
-- TOC entry 3150 (class 2606 OID 78513)
-- Name: cities fkjcqerlyva8r98rastm5t5skmn; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cities
    ADD CONSTRAINT fkjcqerlyva8r98rastm5t5skmn FOREIGN KEY (country_id) REFERENCES public.countries(country_id);


--
-- TOC entry 3171 (class 2606 OID 78618)
-- Name: drugs_contraindications fkjn1r4w0vrjkdxlyh3pnyu96ja; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.drugs_contraindications
    ADD CONSTRAINT fkjn1r4w0vrjkdxlyh3pnyu96ja FOREIGN KEY (contraindication_id) REFERENCES public.contraindications(contraindication_id);


--
-- TOC entry 3177 (class 2606 OID 78648)
-- Name: erecipe_item fkk790yf8wk3emh5d2jll05qnk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.erecipe_item
    ADD CONSTRAINT fkk790yf8wk3emh5d2jll05qnk0 FOREIGN KEY (drug_id) REFERENCES public.drugs(drug_id);


--
-- TOC entry 3215 (class 2606 OID 78838)
-- Name: work_time fkkewld4wtyrtgu7rj49pip3u4w; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.work_time
    ADD CONSTRAINT fkkewld4wtyrtgu7rj49pip3u4w FOREIGN KEY (employee_id) REFERENCES public.medical_stuff(user_id);


--
-- TOC entry 3164 (class 2606 OID 78583)
-- Name: drug_prices fkkxtqnisvxtoqive4nq3e4okay; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.drug_prices
    ADD CONSTRAINT fkkxtqnisvxtoqive4nq3e4okay FOREIGN KEY (pharmacy_id) REFERENCES public.pharmacies(pharmacy_id);


--
-- TOC entry 3213 (class 2606 OID 78828)
-- Name: vacations fkme1sbn08e8r6cn9giagt5d4at; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vacations
    ADD CONSTRAINT fkme1sbn08e8r6cn9giagt5d4at FOREIGN KEY (user_id) REFERENCES public.medical_stuff(user_id);


--
-- TOC entry 3208 (class 2606 OID 78803)
-- Name: user_authority fkmm9i4h2sem3e4ren6htvhfjmc; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_authority
    ADD CONSTRAINT fkmm9i4h2sem3e4ren6htvhfjmc FOREIGN KEY (authority_id) REFERENCES public.authority(id);


--
-- TOC entry 3152 (class 2606 OID 78523)
-- Name: complaint fkmo2jr687mul7et3s0y8ixl1tb; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.complaint
    ADD CONSTRAINT fkmo2jr687mul7et3s0y8ixl1tb FOREIGN KEY (patietn_id) REFERENCES public.patients(user_id);


--
-- TOC entry 3189 (class 2606 OID 78708)
-- Name: medicalstuff_marks fkq1j4mbgu4dsjs7shujdk5jw2c; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.medicalstuff_marks
    ADD CONSTRAINT fkq1j4mbgu4dsjs7shujdk5jw2c FOREIGN KEY (user_id) REFERENCES public.medical_stuff(user_id);


--
-- TOC entry 3154 (class 2606 OID 78533)
-- Name: dermatologists fkqfks7skq52yk1actvwa21kerm; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dermatologists
    ADD CONSTRAINT fkqfks7skq52yk1actvwa21kerm FOREIGN KEY (user_id) REFERENCES public.medical_stuff(user_id);


--
-- TOC entry 3173 (class 2606 OID 78628)
-- Name: drugs_in_pharmacy fkqis014mskpidwonpysddyfp8x; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.drugs_in_pharmacy
    ADD CONSTRAINT fkqis014mskpidwonpysddyfp8x FOREIGN KEY (drug) REFERENCES public.drugs(drug_id);


--
-- TOC entry 3194 (class 2606 OID 78733)
-- Name: pharmacies fkqkwoivleobq29qscfrpraa4o9; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pharmacies
    ADD CONSTRAINT fkqkwoivleobq29qscfrpraa4o9 FOREIGN KEY (location_id) REFERENCES public.locations(location_id);


--
-- TOC entry 3181 (class 2606 OID 78668)
-- Name: examinations fkqukeq2hewo38exbq18hl1po4n; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.examinations
    ADD CONSTRAINT fkqukeq2hewo38exbq18hl1po4n FOREIGN KEY (examination_price_id) REFERENCES public.examination_prices(examination_price_id);


--
-- TOC entry 3187 (class 2606 OID 78698)
-- Name: locations fkr3q7v9xdr7hepgyeu5ua93mfr; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT fkr3q7v9xdr7hepgyeu5ua93mfr FOREIGN KEY (city_id) REFERENCES public.cities(city_id);


--
-- TOC entry 3166 (class 2606 OID 78593)
-- Name: drug_reservations fkraiis2cw6xup8htcsbotje6w2; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.drug_reservations
    ADD CONSTRAINT fkraiis2cw6xup8htcsbotje6w2 FOREIGN KEY (user_id) REFERENCES public.patients(user_id);


--
-- TOC entry 3159 (class 2606 OID 78558)
-- Name: drug_order_items fkres16bilce8mcvvc7m2jhbybn; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.drug_order_items
    ADD CONSTRAINT fkres16bilce8mcvvc7m2jhbybn FOREIGN KEY (drugorder_id) REFERENCES public.drug_orders(drugorder_id);


--
-- TOC entry 3188 (class 2606 OID 78703)
-- Name: medical_stuff fkrufp3pr21f6nrra1rkcd82t0r; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.medical_stuff
    ADD CONSTRAINT fkrufp3pr21f6nrra1rkcd82t0r FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- TOC entry 3161 (class 2606 OID 78568)
-- Name: drug_orders fks07udwitgs9ycuqwq0vnha2jn; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.drug_orders
    ADD CONSTRAINT fks07udwitgs9ycuqwq0vnha2jn FOREIGN KEY (pharmacy_id) REFERENCES public.pharmacies(pharmacy_id);


--
-- TOC entry 3186 (class 2606 OID 78693)
-- Name: locationmaps fksm1qlmpbswxpcro2c9bid4fwd; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.locationmaps
    ADD CONSTRAINT fksm1qlmpbswxpcro2c9bid4fwd FOREIGN KEY (pharmacy_id) REFERENCES public.pharmacies(pharmacy_id);


--
-- TOC entry 3192 (class 2606 OID 78723)
-- Name: offers fkt0fxmnfwe6ifrfeardjl5fwak; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.offers
    ADD CONSTRAINT fkt0fxmnfwe6ifrfeardjl5fwak FOREIGN KEY (user_id) REFERENCES public.suppliers(user_id);


--
-- TOC entry 3179 (class 2606 OID 78658)
-- Name: examination_prices fktlgjlkwj0g2t30b99mk1vtwo9; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.examination_prices
    ADD CONSTRAINT fktlgjlkwj0g2t30b99mk1vtwo9 FOREIGN KEY (pharmacy_id) REFERENCES public.pharmacies(pharmacy_id);


--
-- TOC entry 3180 (class 2606 OID 78663)
-- Name: examinations fkuonmwdwk8uh7tg01ycauwauq; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.examinations
    ADD CONSTRAINT fkuonmwdwk8uh7tg01ycauwauq FOREIGN KEY (employee_id) REFERENCES public.medical_stuff(user_id);


-- Completed on 2021-02-12 23:28:02

--
-- PostgreSQL database dump complete
--

