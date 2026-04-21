INSERT INTO product_categories (name) VALUES
('Tools'),
('Adhesive & Silicon'),
('Paint'),
('Lacquer'),
('Primer, Thinner, and Turpentine'),
('Putty'),
('Others');

insert into suppliers (name) values ('Brainbox');
insert into suppliers (name) values ('Blognation');
insert into suppliers (name) values ('Wordware');
insert into suppliers (name) values ('Oyoba');
insert into suppliers (name) values ('Rooxo');
insert into suppliers (name) values ('Vidoo');
insert into suppliers (name) values ('Yambee');
insert into suppliers (name) values ('Oba');
insert into suppliers (name) values ('Centidel');
insert into suppliers (name) values ('Quinu');

insert into profiles (id, first_name,last_name,role) VALUES('af7c5041-1d50-4b2f-a300-9c5e3ee5e4db','Project', 'Smithy', 'Project');
insert into profiles (id, first_name,last_name,role) VALUES('df92e1bf-738b-4858-800c-d7640c99538b','QS', 'Banana', 'QS');
insert into profiles (id, first_name,last_name,role) VALUES('ec50c701-704f-4b6b-b2fb-4e62471728a2','Procurement', 'Johnny', 'Procurement');

insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (1, 'Slim Fit Chinos', '[{"item":"http://dummyimage.com/153x100.png/dddddd/000000"},{"item":"http://dummyimage.com/227x100.png/cc0000/ffffff"}]', 7, 6, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (2, 'Sweet Potatoes', '[{"item":"http://dummyimage.com/182x100.png/5fa2dd/ffffff"}]', 1, 5, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (3, 'Wireless Car Charger', '[{"item":"http://dummyimage.com/160x100.png/ff4444/ffffff"},{"item":"http://dummyimage.com/135x100.png/ff4444/ffffff"}]', 6, 19, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (4, 'Cinnamon Roll Dough', '[{"item":"http://dummyimage.com/149x100.png/ff4444/ffffff"},{"item":"http://dummyimage.com/227x100.png/cc0000/ffffff"},{"item":"http://dummyimage.com/176x100.png/ff4444/ffffff"}]', 2, 6, false);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (5, 'Sweet Potatoes (organic)', '[{"item":"http://dummyimage.com/190x100.png/cc0000/ffffff"},{"item":"http://dummyimage.com/176x100.png/cc0000/ffffff"},{"item":"http://dummyimage.com/100x100.png/5fa2dd/ffffff"}]', 3, 7, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (6, 'Rustic Wooden Picture Frame', '[{"item":"http://dummyimage.com/128x100.png/cc0000/ffffff"},{"item":"http://dummyimage.com/207x100.png/5fa2dd/ffffff"},{"item":"http://dummyimage.com/111x100.png/cc0000/ffffff"}]', 7, 19, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (7, 'Bamboo Utensil Set', '[{"item":"http://dummyimage.com/148x100.png/dddddd/000000"},{"item":"http://dummyimage.com/215x100.png/dddddd/000000"},{"item":"http://dummyimage.com/111x100.png/5fa2dd/ffffff"}]', 3, 12, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (8, 'Personalized Cutting Board', '[]', 7, 16, false);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (9, 'Foot Massager', '[{"item":"http://dummyimage.com/222x100.png/ff4444/ffffff"}]', 6, 11, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (10, 'Smartphone Tripod with Bluetooth Remote', '[]', 6, 7, false);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (11, 'Laptop Stand', '[{"item":"http://dummyimage.com/216x100.png/cc0000/ffffff"},{"item":"http://dummyimage.com/152x100.png/ff4444/ffffff"},{"item":"http://dummyimage.com/242x100.png/5fa2dd/ffffff"}]', 7, 0, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (12, 'Pet Water Bottle', '[{"item":"http://dummyimage.com/154x100.png/dddddd/000000"},{"item":"http://dummyimage.com/112x100.png/ff4444/ffffff"},{"item":"http://dummyimage.com/183x100.png/cc0000/ffffff"}]', 6, 9, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (13, 'Wall-Mounted Organizer', '[{"item":"http://dummyimage.com/227x100.png/ff4444/ffffff"},{"item":"http://dummyimage.com/109x100.png/ff4444/ffffff"},{"item":"http://dummyimage.com/156x100.png/dddddd/000000"}]', 2, 7, false);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (14, 'Wall-Mounted Wine Rack', '[]', 1, 14, false);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (15, 'Non-Toxic Crayons for Kids', '[{"item":"http://dummyimage.com/100x100.png/5fa2dd/ffffff"}]', 4, 4, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (16, 'Beef Chili', '[]', 1, 14, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (17, 'Vanilla Protein Powder', '[{"item":"http://dummyimage.com/126x100.png/5fa2dd/ffffff"},{"item":"http://dummyimage.com/205x100.png/dddddd/000000"}]', 2, 19, false);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (18, 'Zesty Cilantro Lime Dressing', '[{"item":"http://dummyimage.com/141x100.png/ff4444/ffffff"}]', 3, 2, false);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (19, 'Electric Hot Pot', '[{"item":"http://dummyimage.com/192x100.png/ff4444/ffffff"},{"item":"http://dummyimage.com/108x100.png/ff4444/ffffff"},{"item":"http://dummyimage.com/118x100.png/cc0000/ffffff"}]', 7, 12, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (20, 'Sturdy Bookends', '[{"item":"http://dummyimage.com/194x100.png/ff4444/ffffff"},{"item":"http://dummyimage.com/231x100.png/ff4444/ffffff"},{"item":"http://dummyimage.com/107x100.png/5fa2dd/ffffff"}]', 2, 1, false);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (21, 'Dried Apricots', '[{"item":"http://dummyimage.com/225x100.png/5fa2dd/ffffff"},{"item":"http://dummyimage.com/162x100.png/5fa2dd/ffffff"}]', 5, 16, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (22, 'Chickpea Salad', '[{"item":"http://dummyimage.com/185x100.png/dddddd/000000"}]', 6, 10, false);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (23, 'Mini Pretzels', '[]', 7, 16, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (24, 'Electric Griddle', '[{"item":"http://dummyimage.com/123x100.png/dddddd/000000"}]', 3, 7, false);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (25, 'Instant Mashed Potatoes', '[{"item":"http://dummyimage.com/223x100.png/cc0000/ffffff"}]', 3, 9, false);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (26, 'Travel Shoe Bags Set', '[{"item":"http://dummyimage.com/160x100.png/cc0000/ffffff"}]', 2, 8, false);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (27, 'Coconut Cream Pie Mix', '[{"item":"http://dummyimage.com/226x100.png/dddddd/000000"},{"item":"http://dummyimage.com/130x100.png/5fa2dd/ffffff"},{"item":"http://dummyimage.com/148x100.png/dddddd/000000"}]', 6, 8, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (28, 'Organic Ramen Noodles', '[{"item":"http://dummyimage.com/200x100.png/dddddd/000000"}]', 3, 0, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (29, 'Home Brewing Starter Kit', '[{"item":"http://dummyimage.com/187x100.png/5fa2dd/ffffff"},{"item":"http://dummyimage.com/135x100.png/cc0000/ffffff"}]', 3, 10, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (30, 'Rain Jacket', '[{"item":"http://dummyimage.com/167x100.png/dddddd/000000"},{"item":"http://dummyimage.com/161x100.png/cc0000/ffffff"}]', 7, 20, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (31, 'Teriyaki Chicken Wings', '[{"item":"http://dummyimage.com/230x100.png/dddddd/000000"},{"item":"http://dummyimage.com/170x100.png/ff4444/ffffff"}]', 5, 9, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (32, 'Peach Preserves', '[{"item":"http://dummyimage.com/195x100.png/5fa2dd/ffffff"},{"item":"http://dummyimage.com/220x100.png/ff4444/ffffff"},{"item":"http://dummyimage.com/158x100.png/dddddd/000000"}]', 3, 5, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (33, 'Eco-Friendly Beeswax Wraps', '[{"item":"http://dummyimage.com/161x100.png/cc0000/ffffff"},{"item":"http://dummyimage.com/115x100.png/cc0000/ffffff"},{"item":"http://dummyimage.com/125x100.png/dddddd/000000"}]', 4, 3, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (34, 'Portable Pet Pooper Scooper', '[{"item":"http://dummyimage.com/159x100.png/dddddd/000000"}]', 3, 2, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (35, 'Portable Speaker Stand', '[{"item":"http://dummyimage.com/121x100.png/5fa2dd/ffffff"}]', 7, 13, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (36, 'Whole Wheat Bread', '[{"item":"http://dummyimage.com/153x100.png/dddddd/000000"},{"item":"http://dummyimage.com/165x100.png/dddddd/000000"}]', 1, 2, false);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (37, 'Miso Soup Starter', '[{"item":"http://dummyimage.com/143x100.png/dddddd/000000"}]', 7, 10, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (38, 'Cucumber Relish', '[{"item":"http://dummyimage.com/161x100.png/dddddd/000000"},{"item":"http://dummyimage.com/240x100.png/ff4444/ffffff"}]', 7, 15, false);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (39, 'Balsamic Fig Dressing', '[{"item":"http://dummyimage.com/119x100.png/ff4444/ffffff"}]', 7, 16, false);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (40, 'Organic Whole Wheat Flour', '[{"item":"http://dummyimage.com/119x100.png/5fa2dd/ffffff"},{"item":"http://dummyimage.com/134x100.png/dddddd/000000"}]', 7, 2, false);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (41, 'Mesh Sports Leggings', '[{"item":"http://dummyimage.com/246x100.png/ff4444/ffffff"},{"item":"http://dummyimage.com/119x100.png/cc0000/ffffff"}]', 4, 19, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (42, 'Maple Chipotle Glaze', '[{"item":"http://dummyimage.com/148x100.png/ff4444/ffffff"},{"item":"http://dummyimage.com/217x100.png/cc0000/ffffff"},{"item":"http://dummyimage.com/104x100.png/dddddd/000000"}]', 5, 11, false);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (43, 'Organic Cucumber', '[{"item":"http://dummyimage.com/173x100.png/dddddd/000000"},{"item":"http://dummyimage.com/203x100.png/ff4444/ffffff"},{"item":"http://dummyimage.com/126x100.png/ff4444/ffffff"}]', 6, 2, false);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (44, 'Solar Power Bank', '[]', 7, 1, false);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (45, 'Natural Peanut Butter', '[{"item":"http://dummyimage.com/125x100.png/5fa2dd/ffffff"}]', 5, 5, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (46, 'Multi-Port USB Hub', '[{"item":"http://dummyimage.com/133x100.png/5fa2dd/ffffff"},{"item":"http://dummyimage.com/166x100.png/dddddd/000000"}]', 6, 14, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (47, 'USB-C Hub', '[{"item":"http://dummyimage.com/208x100.png/ff4444/ffffff"}]', 7, 7, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (48, 'Cheesy Cauliflower Bake', '[{"item":"http://dummyimage.com/215x100.png/dddddd/000000"}]', 5, 18, false);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (49, 'Chili Garlic Sauce', '[{"item":"http://dummyimage.com/122x100.png/ff4444/ffffff"},{"item":"http://dummyimage.com/155x100.png/cc0000/ffffff"},{"item":"http://dummyimage.com/166x100.png/cc0000/ffffff"}]', 4, 12, false);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (50, 'Bamboo Toothbrush', '[{"item":"http://dummyimage.com/112x100.png/dddddd/000000"}]', 7, 6, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (51, 'Legging Pants', '[{"item":"http://dummyimage.com/238x100.png/cc0000/ffffff"},{"item":"http://dummyimage.com/147x100.png/dddddd/000000"},{"item":"http://dummyimage.com/112x100.png/dddddd/000000"}]', 3, 18, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (52, 'Natural Peanut Butter', '[{"item":"http://dummyimage.com/158x100.png/dddddd/000000"}]', 6, 7, false);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (53, 'Set of Decorative Storage Bins', '[]', 6, 6, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (54, 'Organic Granola', '[{"item":"http://dummyimage.com/108x100.png/dddddd/000000"}]', 7, 7, false);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (55, '3D Night Light', '[{"item":"http://dummyimage.com/133x100.png/5fa2dd/ffffff"},{"item":"http://dummyimage.com/109x100.png/cc0000/ffffff"},{"item":"http://dummyimage.com/146x100.png/dddddd/000000"}]', 1, 16, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (56, 'Wrist Support Brace', '[{"item":"http://dummyimage.com/116x100.png/5fa2dd/ffffff"},{"item":"http://dummyimage.com/169x100.png/5fa2dd/ffffff"}]', 6, 2, false);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (57, 'A-Line Skirt', '[{"item":"http://dummyimage.com/127x100.png/5fa2dd/ffffff"}]', 3, 6, false);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (58, 'Foldable Yoga Mat', '[]', 5, 7, false);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (59, 'Non-Stick Baking Sheet', '[{"item":"http://dummyimage.com/110x100.png/ff4444/ffffff"}]', 4, 12, false);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (60, 'Chia Seeds', '[{"item":"http://dummyimage.com/175x100.png/ff4444/ffffff"},{"item":"http://dummyimage.com/198x100.png/dddddd/000000"}]', 1, 5, false);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (61, 'Portable Hammock Swing', '[{"item":"http://dummyimage.com/155x100.png/ff4444/ffffff"},{"item":"http://dummyimage.com/241x100.png/ff4444/ffffff"},{"item":"http://dummyimage.com/151x100.png/ff4444/ffffff"}]', 6, 14, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (62, 'Electronic Drum Kit', '[{"item":"http://dummyimage.com/173x100.png/ff4444/ffffff"},{"item":"http://dummyimage.com/161x100.png/ff4444/ffffff"},{"item":"http://dummyimage.com/102x100.png/dddddd/000000"}]', 7, 5, false);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (63, 'Fishing Tackle Box', '[]', 1, 12, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (64, 'Garlic Butter Sauce', '[{"item":"http://dummyimage.com/233x100.png/5fa2dd/ffffff"},{"item":"http://dummyimage.com/205x100.png/cc0000/ffffff"}]', 4, 20, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (65, 'Buffalo Cauliflower Bites', '[]', 1, 1, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (66, 'Mixed Nuts', '[]', 6, 20, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (67, 'Cacao Powder', '[{"item":"http://dummyimage.com/129x100.png/dddddd/000000"}]', 5, 19, false);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (68, 'Wi-Fi Enabled Smart Light Switch', '[{"item":"http://dummyimage.com/244x100.png/cc0000/ffffff"},{"item":"http://dummyimage.com/216x100.png/ff4444/ffffff"}]', 4, 6, false);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (69, 'Digital Food Thermometer', '[{"item":"http://dummyimage.com/169x100.png/ff4444/ffffff"},{"item":"http://dummyimage.com/119x100.png/ff4444/ffffff"},{"item":"http://dummyimage.com/181x100.png/dddddd/000000"}]', 6, 14, false);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (70, 'Pasta Maker Machine', '[{"item":"http://dummyimage.com/155x100.png/ff4444/ffffff"},{"item":"http://dummyimage.com/234x100.png/cc0000/ffffff"},{"item":"http://dummyimage.com/172x100.png/cc0000/ffffff"}]', 3, 8, false);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (71, 'Artisan Flatbreads', '[{"item":"http://dummyimage.com/235x100.png/dddddd/000000"}]', 6, 16, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (72, 'Balsamic Vinegar', '[{"item":"http://dummyimage.com/125x100.png/dddddd/000000"},{"item":"http://dummyimage.com/212x100.png/5fa2dd/ffffff"},{"item":"http://dummyimage.com/131x100.png/5fa2dd/ffffff"}]', 2, 17, false);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (73, 'Vanilla Ice Cream', '[{"item":"http://dummyimage.com/169x100.png/5fa2dd/ffffff"},{"item":"http://dummyimage.com/143x100.png/ff4444/ffffff"}]', 1, 11, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (74, 'Fitness Resistance Bands Kit', '[{"item":"http://dummyimage.com/159x100.png/ff4444/ffffff"},{"item":"http://dummyimage.com/161x100.png/5fa2dd/ffffff"},{"item":"http://dummyimage.com/214x100.png/ff4444/ffffff"}]', 6, 12, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (75, 'Adjustable Laptop Stand', '[{"item":"http://dummyimage.com/203x100.png/cc0000/ffffff"},{"item":"http://dummyimage.com/205x100.png/cc0000/ffffff"},{"item":"http://dummyimage.com/150x100.png/dddddd/000000"}]', 5, 19, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (76, 'Cucumber Lime Sparkling Water', '[{"item":"http://dummyimage.com/216x100.png/cc0000/ffffff"}]', 2, 7, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (77, 'Snap-On Tupperware Set', '[]', 6, 4, false);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (78, 'Garlic Breadsticks', '[]', 7, 3, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (79, 'Pineapple Coconut Bars', '[{"item":"http://dummyimage.com/149x100.png/cc0000/ffffff"},{"item":"http://dummyimage.com/181x100.png/ff4444/ffffff"}]', 7, 16, false);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (80, 'Chiffon Blouse', '[{"item":"http://dummyimage.com/247x100.png/5fa2dd/ffffff"},{"item":"http://dummyimage.com/182x100.png/dddddd/000000"},{"item":"http://dummyimage.com/187x100.png/5fa2dd/ffffff"}]', 7, 8, false);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (81, 'Caraway Rye Bread', '[{"item":"http://dummyimage.com/198x100.png/cc0000/ffffff"}]', 5, 15, false);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (82, 'Siphon Coffee Maker', '[{"item":"http://dummyimage.com/210x100.png/cc0000/ffffff"},{"item":"http://dummyimage.com/240x100.png/dddddd/000000"}]', 6, 15, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (83, 'Chipotle Lime Salsa', '[]', 2, 4, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (84, 'Vegetable Fried Rice', '[{"item":"http://dummyimage.com/220x100.png/dddddd/000000"},{"item":"http://dummyimage.com/195x100.png/dddddd/000000"},{"item":"http://dummyimage.com/224x100.png/ff4444/ffffff"}]', 7, 13, false);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (85, 'Lemon Basil Pasta Sauce', '[]', 2, 19, false);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (86, 'Fitness Jump Rope with LCD Counter', '[]', 6, 14, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (87, 'Kale Salad with Lemon Dressing', '[{"item":"http://dummyimage.com/105x100.png/5fa2dd/ffffff"},{"item":"http://dummyimage.com/178x100.png/ff4444/ffffff"}]', 5, 20, false);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (88, 'Athletic Compression Tights', '[{"item":"http://dummyimage.com/172x100.png/cc0000/ffffff"},{"item":"http://dummyimage.com/152x100.png/cc0000/ffffff"},{"item":"http://dummyimage.com/174x100.png/dddddd/000000"}]', 3, 7, false);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (89, 'Nutritional Yeast', '[]', 2, 9, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (90, 'Paprika', '[{"item":"http://dummyimage.com/122x100.png/ff4444/ffffff"}]', 4, 14, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (91, 'Organic Quinoa', '[{"item":"http://dummyimage.com/193x100.png/ff4444/ffffff"}]', 3, 5, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (92, 'Tandoori Chicken Marinade', '[]', 5, 15, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (93, 'Vegetable Korma', '[{"item":"http://dummyimage.com/239x100.png/ff4444/ffffff"},{"item":"http://dummyimage.com/212x100.png/cc0000/ffffff"}]', 5, 8, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (94, 'Elegant Lace Dress', '[{"item":"http://dummyimage.com/227x100.png/ff4444/ffffff"},{"item":"http://dummyimage.com/147x100.png/cc0000/ffffff"},{"item":"http://dummyimage.com/236x100.png/dddddd/000000"}]', 7, 4, false);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (95, 'Travel Document Organizer', '[{"item":"http://dummyimage.com/150x100.png/5fa2dd/ffffff"},{"item":"http://dummyimage.com/248x100.png/ff4444/ffffff"},{"item":"http://dummyimage.com/114x100.png/dddddd/000000"}]', 4, 15, false);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (96, 'Herbed Chicken Breast', '[{"item":"http://dummyimage.com/230x100.png/dddddd/000000"},{"item":"http://dummyimage.com/181x100.png/dddddd/000000"}]', 7, 10, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (97, 'Wireless Gaming Headset', '[{"item":"http://dummyimage.com/214x100.png/5fa2dd/ffffff"},{"item":"http://dummyimage.com/209x100.png/cc0000/ffffff"},{"item":"http://dummyimage.com/166x100.png/5fa2dd/ffffff"}]', 5, 9, false);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (98, 'Children''s Educational Puzzle', '[{"item":"http://dummyimage.com/202x100.png/cc0000/ffffff"},{"item":"http://dummyimage.com/218x100.png/cc0000/ffffff"}]', 7, 17, false);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (99, 'Savory Quinoa Pudding', '[{"item":"http://dummyimage.com/171x100.png/cc0000/ffffff"},{"item":"http://dummyimage.com/113x100.png/5fa2dd/ffffff"}]', 4, 3, true);
insert into products (master_id, name, photo_paths, category_id, initial_quantity, disabled) values (100, 'Sesame Ginger Dressing', '[{"item":"http://dummyimage.com/250x100.png/cc0000/ffffff"},{"item":"http://dummyimage.com/153x100.png/ff4444/ffffff"}]', 5, 4, true);

insert into delivery_orders (order_id, supplier_id, order_date) values ('SK9879', 4, '2026-03-19');
insert into delivery_orders (order_id, supplier_id, order_date) values ('NH7905', 4, '2024-01-04');
insert into delivery_orders (order_id, supplier_id, order_date) values ('NZ6489', 4, '2024-04-19');
insert into delivery_orders (order_id, supplier_id, order_date) values ('SK9879', 5, '2026-03-19');
insert into delivery_orders (order_id, supplier_id, order_date) values ('NH7905', 6, '2024-01-04');
insert into delivery_orders (order_id, supplier_id, order_date) values ('NZ6489', 7, '2024-04-19');

insert into transactions(logger_id, product_id, quantity_changed, delivery_id) VALUES('af7c5041-1d50-4b2f-a300-9c5e3ee5e4db', 5, 5, 1);
insert into transactions(logger_id, product_id, quantity_changed, delivery_id) VALUES('af7c5041-1d50-4b2f-a300-9c5e3ee5e4db', 4, 5, 1);
insert into transactions(logger_id, product_id, quantity_changed, delivery_id) VALUES('af7c5041-1d50-4b2f-a300-9c5e3ee5e4db', 3, 5, 1);
insert into transactions(logger_id, product_id, quantity_changed) VALUES('ec50c701-704f-4b6b-b2fb-4e62471728a2', 3, -5);
insert into transactions(logger_id, product_id, quantity_changed) VALUES('ec50c701-704f-4b6b-b2fb-4e62471728a2', 3, -5);
insert into transactions(logger_id, product_id, quantity_changed) VALUES('ec50c701-704f-4b6b-b2fb-4e62471728a2', 3, -5);

-- INSERT INTO projects(name, initial_balance, current_balance) VALUES('MBS Grand', 10750, 10844.3);
-- INSERT INTO projects(name, initial_balance) VALUES('Vitz', 0);

-- INSERT INTO balance_transactions(project_id, balance_changed, logger_id) VALUES(1, -105.70, 'df92e1bf-738b-4858-800c-d7640c99538b');
-- INSERT INTO balance_transactions(project_id, balance_changed, logger_id) VALUES(1, 200, 'df92e1bf-738b-4858-800c-d7640c99538b');