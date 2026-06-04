// Seeded Data

-- ==========================================
-- 1. CLEAN RESTART (Wipe data & reset ID counters)
-- ==========================================
TRUNCATE developers, games, heroes, villains, scores RESTART IDENTITY CASCADE;

-- ==========================================
-- 2. SEED DEVELOPERS
-- ==========================================
INSERT INTO developers (name) VALUES
  ('FromSoftware'),          -- ID 1
  ('Larian Studios'),         -- ID 2
  ('ZA/UM'),                  -- ID 3
  ('Rockstar Games'),         -- ID 4
  ('Santa Monica Studio'),    -- ID 5
  ('CD Projekt Red'),         -- ID 6
  ('BioWare'),                -- ID 7
  ('Bethesda Game Studios'),  -- ID 8
  ('Naughty Dog'),            -- ID 9
  ('Insomniac Games'),        -- ID 10
  ('Ubisoft');                -- ID 11 (No games seeded yet - great for LEFT JOIN testing!)

-- ==========================================
-- 3. SEED GAMES
-- ==========================================
INSERT INTO games (title, developer_id) VALUES
  ('Elden Ring', 1),                    -- ID 1
  ('Dark Souls III', 1),                -- ID 2
  ('Baldur''s Gate 3', 2),               -- ID 3
  ('Divinity: Original Sin II', 2),     -- ID 4
  ('Disco Elysium', 3),                  -- ID 5
  ('Red Dead Redemption 2', 4),          -- ID 6
  ('Grand Theft Auto V', 4),             -- ID 7
  ('Grand Theft Auto VI', 4),            -- ID 8  (Unreleased / TBC testing)
  ('God of War Ragnarök', 5),            -- ID 9
  ('Cyberpunk 2077', 6),                 -- ID 10
  ('The Witcher 3: Wild Hunt', 6),       -- ID 11
  ('Mass Effect Legendary Edition', 7),  -- ID 12
  ('Dragon Age: The Veilguard', 7),      -- ID 13 (Updated Title!)
  ('The Elder Scrolls V: Skyrim', 8),    -- ID 14
  ('The Last of Us Part I', 9),          -- ID 15
  ('Spider-Man 2', 10);                  -- ID 16

-- ==========================================
-- 4. SEED HEROES
-- ==========================================
INSERT INTO heroes (name, game_id) VALUES
  ('The Tarnished', 1),
  ('The Ashen One', 2),
  ('Astarion', 3),
  ('Gale of Waterdeep', 3),
  ('The Red Prince', 4),
  ('Harrier Du Bois', 5),
  ('Arthur Morgan', 6),
  ('John Marston', 6),
  ('Michael De Santa', 7),
  ('Franklin Clinton', 7),
  ('Trevor Philips', 7),
  ('Lucia', 8),                          
  ('Kratos', 9),
  ('Atreus', 9),
  ('V', 10),
  ('Geralt of Rivia', 11),
  ('Ciri', 11),
  ('Commander Shepard', 12),
  ('Rook', 13),                          
  ('The Dragonborn', 14),
  ('Joel Miller', 15),
  ('Ellie Williams', 15),
  ('Peter Parker', 16),
  ('Miles Morales', 16);

-- ==========================================
-- 5. SEED VILLAINS
-- ==========================================
INSERT INTO villains (name, game_id) VALUES
  ('Malenia, Blade of Miquella', 1),
  ('Mohg, Lord of Blood', 1),
  ('Soul of Cinder', 2),
  ('Lord Enver Gortash', 3),
  ('General Ketheric Thorm', 3),
  ('Orin the Red', 3),
  ('Dallas', 4),
  ('Evrart Claire', 5),
  ('Micah Bell', 6),
  ('Devin Weston', 7),
  ('Odin', 9),
  ('Thor', 9),
  ('Adam Smasher', 10),
  ('Gaunter O''Dimm', 11),
  ('Eredin, King of the Wild Hunt', 11),
  ('Saren Arterius', 12),
  ('Alduin', 14),
  ('The David', 15),
  ('Venom', 16),
  ('Kraven the Hunter', 16);

-- ==========================================
-- 6. SEED METACRITIC REVIEWS / SCORES
-- ==========================================
INSERT INTO scores (game_id, review_score) VALUES
  (1, 96),   -- Elden Ring
  (2, 89),   -- Dark Souls III
  (3, 96),   -- Baldur's Gate 3
  (4, 93),   -- Divinity: Original Sin II
  (5, 97),   -- Disco Elysium
  (6, 97),   -- Red Dead Redemption 2
  (7, 97),   -- Grand Theft Auto V
  (8, NULL), -- Grand Theft Auto VI (TBC)
  (9, 94),   -- God of War Ragnarök
  (10, 86),  -- Cyberpunk 2077
  (11, 92),  -- The Witcher 3: Wild Hunt
  (12, 90),  -- Mass Effect Legendary Edition
  (13, 84),  -- Dragon Age: The Veilguard (Updated Score!)
  (14, 94),  -- The Elder Scrolls V: Skyrim
  (15, 88),  -- The Last of Us Part I
  (16, 90);  -- Spider-Man 2