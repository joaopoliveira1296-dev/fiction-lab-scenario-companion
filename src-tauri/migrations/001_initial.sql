-- Fiction Lab Scenario Companion
-- Migration 001: implementation-ready v1 baseline
-- SQLite is the authoritative data source.

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS schema_metadata (
    key TEXT PRIMARY KEY NOT NULL,
    value TEXT NOT NULL
) STRICT;

INSERT OR REPLACE INTO schema_metadata (key, value) VALUES
    ('database_schema_version', '1');

CREATE TABLE scenarios (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL CHECK (length(trim(name)) > 0),
    description TEXT NOT NULL DEFAULT '',
    cover_image_path TEXT,
    managed_folder_name TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'DRAFT'
        CHECK (status IN ('DRAFT','IN_DEVELOPMENT','READY_FOR_REVIEW','COMPLETE','ARCHIVED')),
    backstory TEXT NOT NULL DEFAULT '',
    greeting TEXT NOT NULL DEFAULT '',
    custom_instructions TEXT NOT NULL DEFAULT '',
    notes TEXT NOT NULL DEFAULT '',
    favorite INTEGER NOT NULL DEFAULT 0 CHECK (favorite IN (0,1)),
    is_trashed INTEGER NOT NULL DEFAULT 0 CHECK (is_trashed IN (0,1)),
    trashed_at TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    CHECK ((is_trashed = 0 AND trashed_at IS NULL) OR is_trashed = 1)
) STRICT;

CREATE UNIQUE INDEX ux_scenarios_managed_folder_name_nocase
    ON scenarios(managed_folder_name COLLATE NOCASE);
CREATE INDEX ix_scenarios_updated_at ON scenarios(updated_at DESC);
CREATE INDEX ix_scenarios_status ON scenarios(status);
CREATE INDEX ix_scenarios_trash ON scenarios(is_trashed, trashed_at);

CREATE TABLE scenario_tag_catalog (
    value TEXT PRIMARY KEY NOT NULL
) STRICT;

CREATE TABLE scenario_tags (
    id TEXT PRIMARY KEY NOT NULL,
    scenario_id TEXT NOT NULL,
    value TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0 CHECK (display_order >= 0),
    FOREIGN KEY (scenario_id) REFERENCES scenarios(id) ON DELETE CASCADE,
    FOREIGN KEY (value) REFERENCES scenario_tag_catalog(value) ON UPDATE CASCADE,
    UNIQUE (scenario_id, value),
    UNIQUE (scenario_id, display_order)
) STRICT;

CREATE TRIGGER trg_scenario_tags_max_5_insert
BEFORE INSERT ON scenario_tags
WHEN (SELECT COUNT(*) FROM scenario_tags WHERE scenario_id = NEW.scenario_id) >= 5
BEGIN
    SELECT RAISE(ABORT, 'scenario tag maximum of 5 exceeded');
END;

CREATE TRIGGER trg_scenario_tags_max_5_update
BEFORE UPDATE OF scenario_id ON scenario_tags
WHEN NEW.scenario_id <> OLD.scenario_id
 AND (SELECT COUNT(*) FROM scenario_tags WHERE scenario_id = NEW.scenario_id) >= 5
BEGIN
    SELECT RAISE(ABORT, 'scenario tag maximum of 5 exceeded');
END;

CREATE TABLE internal_category_catalog (
    value TEXT PRIMARY KEY NOT NULL
) STRICT;

INSERT INTO internal_category_catalog(value) VALUES
    ('World Premise'),
    ('Conflict Matrix'),
    ('Routine / Schedule'),
    ('Wardrobe'),
    ('Relationship'),
    ('Arc'),
    ('Visual Notes'),
    ('Professional Procedures'),
    ('Other');

CREATE TABLE trait_catalog (
    value TEXT PRIMARY KEY NOT NULL
) STRICT;

INSERT INTO trait_catalog(value) VALUES
    ('Shy'),('Relaxed'),('Powerful'),('Toxic'),('Intelligent'),('Ambitious'),('Charming'),('Confident'),
    ('Compassionate'),('Daring'),('Dependable'),('Tsundere'),('Yandere'),('Fearless'),('Grumpy'),('Humorous'),
    ('Impulsive'),('Insecure'),('Loyal'),('Naive'),('Optimistic'),('Quirky'),('Supportive'),('Stubborn'),
    ('Bossy'),('Caring'),('Anxious'),('Egoistical'),('Intuitive'),('Outgoing'),('Vindictive'),('Joyful'),
    ('Sincere'),('Tolerant'),('Apathetic'),('Mischievous'),('Curious'),('Bored'),('Unpredictable'),('Mocking'),
    ('Evil'),('Eccentric');

CREATE TABLE lore_cards (
    id TEXT PRIMARY KEY NOT NULL,
    scenario_id TEXT NOT NULL,
    type TEXT NOT NULL
        CHECK (type IN ('CHARACTER','LOCATION','PREMISE','FACTION','ITEM','RACE','RULE')),
    internal_category TEXT NOT NULL,
    title TEXT NOT NULL CHECK (length(trim(title)) > 0),
    description TEXT NOT NULL DEFAULT '',
    content TEXT NOT NULL DEFAULT '',
    weight TEXT NOT NULL DEFAULT 'STANDARD'
        CHECK (weight IN ('MINOR','SUPPLEMENTARY','STANDARD','IMPORTANT','CRITICAL')),
    pinned INTEGER NOT NULL DEFAULT 0 CHECK (pinned IN (0,1)),
    text_canon_status TEXT NOT NULL DEFAULT 'DRAFT'
        CHECK (text_canon_status IN ('OPEN','DRAFT','READY_FOR_PLATFORM_CHECK','CANON_CLOSED')),
    visual_canon_status TEXT NOT NULL DEFAULT 'NOT_STARTED'
        CHECK (visual_canon_status IN ('NOT_STARTED','IN_PROGRESS','VISUAL_CANON')),
    notes TEXT NOT NULL DEFAULT '',
    revision_note TEXT NOT NULL DEFAULT '',
    source_reference_note TEXT NOT NULL DEFAULT '',
    verified_fiction_lab_count INTEGER CHECK (verified_fiction_lab_count IS NULL OR verified_fiction_lab_count >= 0),
    display_order INTEGER NOT NULL DEFAULT 0 CHECK (display_order >= 0),
    is_trashed INTEGER NOT NULL DEFAULT 0 CHECK (is_trashed IN (0,1)),
    trashed_at TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (scenario_id) REFERENCES scenarios(id) ON DELETE CASCADE,
    FOREIGN KEY (internal_category) REFERENCES internal_category_catalog(value) ON UPDATE CASCADE,
    UNIQUE (scenario_id, id),
    UNIQUE (scenario_id, display_order),
    CHECK ((is_trashed = 0 AND trashed_at IS NULL) OR is_trashed = 1)
) STRICT;

CREATE INDEX ix_lore_cards_scenario ON lore_cards(scenario_id, is_trashed, display_order);
CREATE INDEX ix_lore_cards_type ON lore_cards(scenario_id, type);
CREATE INDEX ix_lore_cards_text_canon ON lore_cards(scenario_id, text_canon_status);
CREATE INDEX ix_lore_cards_visual_canon ON lore_cards(scenario_id, visual_canon_status);
CREATE INDEX ix_lore_cards_pinned ON lore_cards(scenario_id, pinned);

CREATE TRIGGER trg_lore_official_edit_reopens_canon
AFTER UPDATE OF type, title, description, content, weight, pinned ON lore_cards
WHEN OLD.text_canon_status = 'CANON_CLOSED'
 AND (
      OLD.type IS NOT NEW.type OR
      OLD.title IS NOT NEW.title OR
      OLD.description IS NOT NEW.description OR
      OLD.content IS NOT NEW.content OR
      OLD.weight IS NOT NEW.weight OR
      OLD.pinned IS NOT NEW.pinned
 )
BEGIN
    UPDATE lore_cards
       SET text_canon_status = 'DRAFT', updated_at = NEW.updated_at
     WHERE id = NEW.id;
END;

CREATE TABLE triggers (
    id TEXT PRIMARY KEY NOT NULL,
    card_id TEXT NOT NULL,
    value TEXT NOT NULL CHECK (length(trim(value)) > 0),
    display_order INTEGER NOT NULL DEFAULT 0 CHECK (display_order >= 0),
    FOREIGN KEY (card_id) REFERENCES lore_cards(id) ON DELETE CASCADE,
    UNIQUE (card_id, value),
    UNIQUE (card_id, display_order)
) STRICT;

CREATE TRIGGER trg_trigger_insert_reopens_canon
AFTER INSERT ON triggers
WHEN (SELECT text_canon_status FROM lore_cards WHERE id = NEW.card_id) = 'CANON_CLOSED'
BEGIN
    UPDATE lore_cards SET text_canon_status = 'DRAFT' WHERE id = NEW.card_id;
END;

CREATE TRIGGER trg_trigger_update_reopens_canon
AFTER UPDATE ON triggers
WHEN (SELECT text_canon_status FROM lore_cards WHERE id = NEW.card_id) = 'CANON_CLOSED'
BEGIN
    UPDATE lore_cards SET text_canon_status = 'DRAFT' WHERE id = NEW.card_id;
END;

CREATE TRIGGER trg_trigger_delete_reopens_canon
AFTER DELETE ON triggers
WHEN (SELECT text_canon_status FROM lore_cards WHERE id = OLD.card_id) = 'CANON_CLOSED'
BEGIN
    UPDATE lore_cards SET text_canon_status = 'DRAFT' WHERE id = OLD.card_id;
END;

CREATE TABLE character_traits (
    id TEXT PRIMARY KEY NOT NULL,
    card_id TEXT NOT NULL,
    value TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0 CHECK (display_order >= 0),
    FOREIGN KEY (card_id) REFERENCES lore_cards(id) ON DELETE CASCADE,
    FOREIGN KEY (value) REFERENCES trait_catalog(value) ON UPDATE CASCADE,
    UNIQUE (card_id, value),
    UNIQUE (card_id, display_order)
) STRICT;

CREATE TRIGGER trg_character_traits_character_only_insert
BEFORE INSERT ON character_traits
WHEN (SELECT type FROM lore_cards WHERE id = NEW.card_id) <> 'CHARACTER'
BEGIN
    SELECT RAISE(ABORT, 'traits are only valid for Character lore cards');
END;

CREATE TRIGGER trg_character_traits_character_only_update
BEFORE UPDATE OF card_id ON character_traits
WHEN (SELECT type FROM lore_cards WHERE id = NEW.card_id) <> 'CHARACTER'
BEGIN
    SELECT RAISE(ABORT, 'traits are only valid for Character lore cards');
END;

CREATE TRIGGER trg_character_traits_max_10_insert
BEFORE INSERT ON character_traits
WHEN (SELECT COUNT(*) FROM character_traits WHERE card_id = NEW.card_id) >= 10
BEGIN
    SELECT RAISE(ABORT, 'character trait maximum of 10 exceeded');
END;

CREATE TRIGGER trg_character_traits_max_10_update
BEFORE UPDATE OF card_id ON character_traits
WHEN NEW.card_id <> OLD.card_id
 AND (SELECT COUNT(*) FROM character_traits WHERE card_id = NEW.card_id) >= 10
BEGIN
    SELECT RAISE(ABORT, 'character trait maximum of 10 exceeded');
END;

CREATE TRIGGER trg_trait_insert_reopens_canon
AFTER INSERT ON character_traits
WHEN (SELECT text_canon_status FROM lore_cards WHERE id = NEW.card_id) = 'CANON_CLOSED'
BEGIN
    UPDATE lore_cards SET text_canon_status = 'DRAFT' WHERE id = NEW.card_id;
END;

CREATE TRIGGER trg_trait_update_reopens_canon
AFTER UPDATE ON character_traits
WHEN (SELECT text_canon_status FROM lore_cards WHERE id = NEW.card_id) = 'CANON_CLOSED'
BEGIN
    UPDATE lore_cards SET text_canon_status = 'DRAFT' WHERE id = NEW.card_id;
END;

CREATE TRIGGER trg_trait_delete_reopens_canon
AFTER DELETE ON character_traits
WHEN (SELECT text_canon_status FROM lore_cards WHERE id = OLD.card_id) = 'CANON_CLOSED'
BEGIN
    UPDATE lore_cards SET text_canon_status = 'DRAFT' WHERE id = OLD.card_id;
END;

CREATE TABLE connections (
    id TEXT PRIMARY KEY NOT NULL,
    scenario_id TEXT NOT NULL,
    origin_card_id TEXT NOT NULL,
    destination_card_id TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'ACTIVE'
        CHECK (status IN ('ACTIVE','DEFERRED','AFFECTED','INACTIVE')),
    reason TEXT NOT NULL DEFAULT '',
    previous_status TEXT
        CHECK (previous_status IS NULL OR previous_status IN ('ACTIVE','DEFERRED','AFFECTED','INACTIVE')),
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    CHECK (origin_card_id <> destination_card_id),
    FOREIGN KEY (scenario_id, origin_card_id) REFERENCES lore_cards(scenario_id, id) ON DELETE CASCADE,
    FOREIGN KEY (scenario_id, destination_card_id) REFERENCES lore_cards(scenario_id, id) ON DELETE CASCADE
) STRICT;

CREATE UNIQUE INDEX ux_connections_unordered_pair
ON connections(
    scenario_id,
    CASE WHEN origin_card_id < destination_card_id THEN origin_card_id ELSE destination_card_id END,
    CASE WHEN origin_card_id < destination_card_id THEN destination_card_id ELSE origin_card_id END
);
CREATE INDEX ix_connections_origin ON connections(scenario_id, origin_card_id, status);
CREATE INDEX ix_connections_destination ON connections(scenario_id, destination_card_id, status);

CREATE TABLE connection_events (
    id TEXT PRIMARY KEY NOT NULL,
    connection_id TEXT NOT NULL,
    event_type TEXT NOT NULL
        CHECK (event_type IN ('CREATED','STATUS_CHANGED','DIRECTION_REVERSED','REACTIVATED','DELETED')),
    previous_value TEXT,
    new_value TEXT,
    created_at TEXT NOT NULL,
    FOREIGN KEY (connection_id) REFERENCES connections(id) ON DELETE CASCADE
) STRICT;

CREATE TABLE visual_prompts (
    id TEXT PRIMARY KEY NOT NULL,
    card_id TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('CREATION','REFINEMENT')),
    sequence INTEGER NOT NULL CHECK (sequence >= 0),
    title TEXT NOT NULL DEFAULT '',
    prompt TEXT NOT NULL CHECK (length(trim(prompt)) > 0),
    notes TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (card_id) REFERENCES lore_cards(id) ON DELETE CASCADE,
    UNIQUE (card_id, sequence),
    CHECK ((type = 'CREATION' AND sequence = 0) OR (type = 'REFINEMENT' AND sequence >= 1))
) STRICT;

CREATE UNIQUE INDEX ux_visual_prompts_creation
    ON visual_prompts(card_id)
    WHERE type = 'CREATION';

CREATE TABLE card_images (
    id TEXT PRIMARY KEY NOT NULL,
    card_id TEXT NOT NULL,
    managed_path TEXT NOT NULL,
    original_filename TEXT NOT NULL,
    state TEXT NOT NULL CHECK (state IN ('ACTIVE','ARCHIVED','MISSING')),
    was_visual_canon INTEGER NOT NULL DEFAULT 0 CHECK (was_visual_canon IN (0,1)),
    archived_at TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (card_id) REFERENCES lore_cards(id) ON DELETE CASCADE,
    UNIQUE (managed_path),
    CHECK ((state = 'ARCHIVED' AND archived_at IS NOT NULL) OR state <> 'ARCHIVED')
) STRICT;

CREATE UNIQUE INDEX ux_card_images_one_active
    ON card_images(card_id)
    WHERE state = 'ACTIVE';

CREATE TABLE platform_verifications (
    id TEXT PRIMARY KEY NOT NULL,
    card_id TEXT NOT NULL,
    verified_count INTEGER NOT NULL CHECK (verified_count >= 0),
    accepted INTEGER NOT NULL CHECK (accepted IN (0,1)),
    notes TEXT NOT NULL DEFAULT '',
    verified_at TEXT NOT NULL,
    FOREIGN KEY (card_id) REFERENCES lore_cards(id) ON DELETE CASCADE
) STRICT;
CREATE INDEX ix_platform_verifications_card ON platform_verifications(card_id, verified_at DESC);

CREATE TABLE platform_profiles (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    version TEXT NOT NULL,
    updated_at TEXT NOT NULL
) STRICT;

CREATE TABLE platform_limits (
    id TEXT PRIMARY KEY NOT NULL,
    profile_id TEXT NOT NULL,
    key TEXT NOT NULL,
    value INTEGER NOT NULL CHECK (value >= 0),
    unit TEXT NOT NULL DEFAULT 'characters',
    source_note TEXT NOT NULL DEFAULT '',
    FOREIGN KEY (profile_id) REFERENCES platform_profiles(id) ON DELETE CASCADE,
    UNIQUE (profile_id, key)
) STRICT;

CREATE TABLE app_settings (
    key TEXT PRIMARY KEY NOT NULL,
    value TEXT NOT NULL,
    updated_at TEXT NOT NULL
) STRICT;

CREATE TABLE operation_journal (
    id TEXT PRIMARY KEY NOT NULL,
    operation_type TEXT NOT NULL,
    scenario_id TEXT,
    state TEXT NOT NULL,
    staging_path TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (scenario_id) REFERENCES scenarios(id) ON DELETE SET NULL
) STRICT;

-- Local full-text search indexes. These store only local Scenario content.
CREATE VIRTUAL TABLE scenario_fts USING fts5(
    scenario_id UNINDEXED,
    name,
    description,
    backstory,
    greeting,
    custom_instructions,
    notes,
    tokenize = 'unicode61'
);

CREATE VIRTUAL TABLE lore_card_fts USING fts5(
    card_id UNINDEXED,
    scenario_id UNINDEXED,
    title,
    description,
    content,
    notes,
    revision_note,
    source_reference_note,
    tokenize = 'unicode61'
);

CREATE VIRTUAL TABLE visual_prompt_fts USING fts5(
    prompt_id UNINDEXED,
    card_id UNINDEXED,
    prompt,
    title,
    notes,
    tokenize = 'unicode61'
);

CREATE VIRTUAL TABLE connection_fts USING fts5(
    connection_id UNINDEXED,
    scenario_id UNINDEXED,
    reason,
    tokenize = 'unicode61'
);

CREATE TRIGGER trg_scenario_fts_insert AFTER INSERT ON scenarios BEGIN
    INSERT INTO scenario_fts(scenario_id,name,description,backstory,greeting,custom_instructions,notes)
    VALUES (NEW.id,NEW.name,NEW.description,NEW.backstory,NEW.greeting,NEW.custom_instructions,NEW.notes);
END;
CREATE TRIGGER trg_scenario_fts_update AFTER UPDATE ON scenarios BEGIN
    DELETE FROM scenario_fts WHERE scenario_id = OLD.id;
    INSERT INTO scenario_fts(scenario_id,name,description,backstory,greeting,custom_instructions,notes)
    VALUES (NEW.id,NEW.name,NEW.description,NEW.backstory,NEW.greeting,NEW.custom_instructions,NEW.notes);
END;
CREATE TRIGGER trg_scenario_fts_delete AFTER DELETE ON scenarios BEGIN
    DELETE FROM scenario_fts WHERE scenario_id = OLD.id;
END;

CREATE TRIGGER trg_lore_fts_insert AFTER INSERT ON lore_cards BEGIN
    INSERT INTO lore_card_fts(card_id,scenario_id,title,description,content,notes,revision_note,source_reference_note)
    VALUES (NEW.id,NEW.scenario_id,NEW.title,NEW.description,NEW.content,NEW.notes,NEW.revision_note,NEW.source_reference_note);
END;
CREATE TRIGGER trg_lore_fts_update AFTER UPDATE ON lore_cards BEGIN
    DELETE FROM lore_card_fts WHERE card_id = OLD.id;
    INSERT INTO lore_card_fts(card_id,scenario_id,title,description,content,notes,revision_note,source_reference_note)
    VALUES (NEW.id,NEW.scenario_id,NEW.title,NEW.description,NEW.content,NEW.notes,NEW.revision_note,NEW.source_reference_note);
END;
CREATE TRIGGER trg_lore_fts_delete AFTER DELETE ON lore_cards BEGIN
    DELETE FROM lore_card_fts WHERE card_id = OLD.id;
END;

CREATE TRIGGER trg_visual_prompt_fts_insert AFTER INSERT ON visual_prompts BEGIN
    INSERT INTO visual_prompt_fts(prompt_id,card_id,prompt,title,notes)
    VALUES (NEW.id,NEW.card_id,NEW.prompt,NEW.title,NEW.notes);
END;
CREATE TRIGGER trg_visual_prompt_fts_update AFTER UPDATE ON visual_prompts BEGIN
    DELETE FROM visual_prompt_fts WHERE prompt_id = OLD.id;
    INSERT INTO visual_prompt_fts(prompt_id,card_id,prompt,title,notes)
    VALUES (NEW.id,NEW.card_id,NEW.prompt,NEW.title,NEW.notes);
END;
CREATE TRIGGER trg_visual_prompt_fts_delete AFTER DELETE ON visual_prompts BEGIN
    DELETE FROM visual_prompt_fts WHERE prompt_id = OLD.id;
END;

CREATE TRIGGER trg_connection_fts_insert AFTER INSERT ON connections BEGIN
    INSERT INTO connection_fts(connection_id,scenario_id,reason)
    VALUES (NEW.id,NEW.scenario_id,NEW.reason);
END;
CREATE TRIGGER trg_connection_fts_update AFTER UPDATE ON connections BEGIN
    DELETE FROM connection_fts WHERE connection_id = OLD.id;
    INSERT INTO connection_fts(connection_id,scenario_id,reason)
    VALUES (NEW.id,NEW.scenario_id,NEW.reason);
END;
CREATE TRIGGER trg_connection_fts_delete AFTER DELETE ON connections BEGIN
    DELETE FROM connection_fts WHERE connection_id = OLD.id;
END;

-- Seed the baseline Fiction Lab platform profile.
INSERT INTO platform_profiles(id, name, version, updated_at)
VALUES ('fictionlab-current', 'Current Fiction Lab', '2026-08-27', '2026-08-27T00:00:00Z');

INSERT INTO platform_limits(id, profile_id, key, value, unit, source_note) VALUES
('limit-scenario-name', 'fictionlab-current', 'scenario.name', 35, 'characters', 'Current captured Fiction Lab limit'),
('limit-scenario-description', 'fictionlab-current', 'scenario.description', 200, 'characters', 'Current captured Fiction Lab limit'),
('limit-scenario-tags', 'fictionlab-current', 'scenario.tags', 5, 'items', 'Current documented/captured Fiction Lab limit'),
('limit-backstory', 'fictionlab-current', 'scenario.backstory', 10000, 'characters', 'Current captured Fiction Lab limit'),
('limit-greeting', 'fictionlab-current', 'scenario.greeting', 4000, 'characters', 'Current captured Fiction Lab limit'),
('limit-custom-instructions', 'fictionlab-current', 'scenario.customInstructions', 6000, 'characters', 'Current captured Fiction Lab limit'),
('limit-lore-title', 'fictionlab-current', 'lore.title', 35, 'characters', 'Current captured Fiction Lab limit'),
('limit-lore-description', 'fictionlab-current', 'lore.description', 200, 'characters', 'Current captured Fiction Lab limit'),
('limit-lore-content', 'fictionlab-current', 'lore.content', 10000, 'characters', 'Current captured Fiction Lab limit'),
('limit-character-traits', 'fictionlab-current', 'character.traits', 10, 'items', 'Current captured Fiction Lab limit'),
('limit-pinned-lore', 'fictionlab-current', 'scenario.pinnedLore', 10, 'items', 'Currently observed interface maximum; >5 is operational warning zone');

-- Default UI settings. JSON values are stored as text to keep the settings table flexible.
INSERT INTO app_settings(key, value, updated_at) VALUES
('library.defaultView', '"grid"', '2026-08-27T00:00:00Z'),
('library.defaultSort', '"recentlyEdited"', '2026-08-27T00:00:00Z'),
('startup.openLastScenario', 'false', '2026-08-27T00:00:00Z'),
('appearance.theme', '"system"', '2026-08-27T00:00:00Z'),
('appearance.density', '"comfortable"', '2026-08-27T00:00:00Z'),
('accessibility.reduceMotion', 'true', '2026-08-27T00:00:00Z'),
('accessibility.enhancedFocus', 'true', '2026-08-27T00:00:00Z'),
('reading.textSize', '"medium"', '2026-08-27T00:00:00Z'),
('reading.lineSpacing', '"comfortable"', '2026-08-27T00:00:00Z'),
('reading.contentWidth', '"medium"', '2026-08-27T00:00:00Z'),
('reading.paragraphSpacing', '"comfortable"', '2026-08-27T00:00:00Z'),
('backups.verifyAfterCreation', 'true', '2026-08-27T00:00:00Z');


-- Official Fiction Lab Scenario Tags & Genres captured during product planning.
INSERT INTO scenario_tag_catalog(value) VALUES
    ('Anime'),
    ('Game'),
    ('Magic'),
    ('Romantic'),
    ('Action'),
    ('Parallel World'),
    ('Slice of Life'),
    ('Urban'),
    ('Historical'),
    ('Male'),
    ('Female'),
    ('RPG'),
    ('Comedy'),
    ('Furry'),
    ('Villain'),
    ('Pirate'),
    ('Novel'),
    ('Gory'),
    ('Violence'),
    ('Celebrities'),
    ('Ancient'),
    ('Sci-Fi'),
    ('Medieval'),
    ('Non-Human'),
    ('LGBTQ'),
    ('Horror'),
    ('Lover'),
    ('Platonic'),
    ('Cartoon'),
    ('Adventure'),
    ('Demon'),
    ('Angel'),
    ('Medical'),
    ('School'),
    ('Cyberpunk'),
    ('Monster'),
    ('Thriller'),
    ('Supernatural'),
    ('Martial Arts'),
    ('Crime'),
    ('Time Travel'),
    ('Holiday'),
    ('Steampunk'),
    ('Survival'),
    ('Alien'),
    ('Jungle'),
    ('Mafia'),
    ('Sports'),
    ('Apocalyptic'),
    ('Mecha'),
    ('Any POV'),
    ('Music'),
    ('Space'),
    ('Female Lead'),
    ('Male Lead'),
    ('Zombie'),
    ('Level System'),
    ('Superheroes'),
    ('Gritty'),
    ('Biopunk'),
    ('Dark Fantasy'),
    ('Male POV'),
    ('Vampire'),
    ('Aquatic'),
    ('Female POV'),
    ('Large Cast'),
    ('Isekai'),
    ('Psychological Horror'),
    ('WLW'),
    ('MLM'),
    ('Reverse Harem'),
    ('Yandere'),
    ('Dinosaurs'),
    ('Western'),
    ('Harem'),
    ('Enemies To Lovers'),
    ('Straight'),
    ('Toxic Relationship'),
    ('Friendship'),
    ('Revenge'),
    ('Betrayal'),
    ('Academia'),
    ('Allegory'),
    ('Dining'),
    ('Labor'),
    ('Beastkin'),
    ('Tsundere'),
    ('Android'),
    ('Kuudere'),
    ('Forced Character'),
    ('Kitsune'),
    ('Witchcraft'),
    ('Dragon'),
    ('Kichidere'),
    ('Nautical'),
    ('Tragedy'),
    ('Transit'),
    ('Prison'),
    ('Age Gap'),
    ('Isolation'),
    ('Noir'),
    ('Grimdark'),
    ('Religious'),
    ('Dandere'),
    ('Family'),
    ('Neko'),
    ('Dystopia'),
    ('Military'),
    ('Utopia'),
    ('Commune'),
    ('Party'),
    ('Otome'),
    ('Japanese'),
    ('Tribal'),
    ('Carnival'),
    ('Dieselpunk'),
    ('Solarpunk'),
    ('Femboy'),
    ('K-Pop'),
    ('Restaurant'),
    ('Elderly'),
    ('Regency'),
    ('Chinese'),
    ('Undead'),
    ('Racing'),
    ('Cult'),
    ('Band'),
    ('War'),
    ('Multi-Starter'),
    ('Café'),
    ('Fast-Paced'),
    ('Slow Burn'),
    ('Cozy'),
    ('Lore-Heavy'),
    ('Alt History'),
    ('Utility'),
    ('Rural / Countryside'),
    ('Whimsical'),
    ('Gothic'),
    ('Battle Royale'),
    ('Post Apocalypse'),
    ('Retro-Future'),
    ('Open World'),
    ('Scripted'),
    ('Fairy Tale'),
    ('Puzzle'),
    ('Simulator'),
    ('Eldritch'),
    ('Slavery'),
    ('Tokusatsu'),
    ('Kaiju'),
    ('Delinquent'),
    ('Demihuman'),
    ('Morbid'),
    ('Virtual World'),
    ('Stats & Progression'),
    ('Christmas'),
    ('Serialized'),
    ('Disability'),
    ('Craft'),
    ('Island'),
    ('Night Life'),
    ('Cards'),
    ('Ocean'),
    ('Law Enforcement'),
    ('Friends to Lovers'),
    ('Dungeon'),
    ('Quest'),
    ('Political'),
    ('MMO'),
    ('Slow-Paced'),
    ('American'),
    ('Objective-Based'),
    ('Mind-Control'),
    ('Time Loop'),
    ('Wrestling'),
    ('Small Town'),
    ('Wholesome'),
    ('Gods'),
    ('Detective'),
    ('Prehistoric'),
    ('Winter'),
    ('Farm/Ranch'),
    ('Secret Identity'),
    ('Underwater'),
    ('Travel'),
    ('Superpowers'),
    ('Rock'),
    ('Mythology'),
    ('Combat'),
    ('Media'),
    ('Afterlife'),
    ('Robots'),
    ('Royalty'),
    ('Scenario Collab'),
    ('Dark World'),
    ('Mixed Cast'),
    ('Love Triangle'),
    ('Elves'),
    ('Dark-Romance'),
    ('Police'),
    ('Secret Agents'),
    ('Astrology'),
    ('Punk'),
    ('Rural'),
    ('Assassin'),
    ('Escape Room'),
    ('Maids'),
    ('Slime'),
    ('Weak to Strong'),
    ('Culinary'),
    ('Transformation'),
    ('Inheritance'),
    ('Ghost'),
    ('Modern Fantasy'),
    ('Half-human'),
    ('Game Show'),
    ('Satire'),
    ('Edgy'),
    ('Hidden World'),
    ('Hidden Society'),
    ('Angst'),
    ('Food'),
    ('Aviation'),
    ('Reincarnation'),
    ('Shonen'),
    ('High Stakes'),
    ('Domestic'),
    ('Tutorial'),
    ('AI Assistant'),
    ('Realistic'),
    ('Cold War');
