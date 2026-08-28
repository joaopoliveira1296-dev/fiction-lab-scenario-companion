-- Fiction Lab Scenario Companion
-- Migration 003: seed verified Fiction Lab plan limits.

-- Reuse the existing baseline profile as the Free profile.
UPDATE platform_profiles
SET
    plan = 'FREE',
    name = 'Fiction Lab Free',
    version = '2026-08',
    updated_at = datetime('now')
WHERE id = 'fictionlab-current';

-- Correct the existing Story limits for the Free tier.
UPDATE platform_limits
SET
    value = 3000,
    source_note = 'Verified from FictionLab Tiers documentation.'
WHERE profile_id = 'fictionlab-current'
  AND key = 'scenario.backstory';

UPDATE platform_limits
SET
    value = 2000,
    source_note = 'Verified from FictionLab Tiers documentation.'
WHERE profile_id = 'fictionlab-current'
  AND key = 'scenario.greeting';

UPDATE platform_limits
SET
    value = 3000,
    source_note = 'Verified from FictionLab Tiers documentation.'
WHERE profile_id = 'fictionlab-current'
  AND key = 'scenario.customInstructions';

-- Create the paid plan profiles.
INSERT INTO platform_profiles (
    id,
    plan,
    name,
    version,
    updated_at
)
VALUES
    (
        'fictionlab-plus',
        'PLUS',
        'Fiction Lab Plus',
        '2026-08',
        datetime('now')
    ),
    (
        'fictionlab-ultra',
        'ULTRA',
        'Fiction Lab Ultra',
        '2026-08',
        datetime('now')
    );

-- Plus Story limits.
INSERT INTO platform_limits (
    id,
    profile_id,
    key,
    value,
    unit,
    source_note
)
VALUES
    (
        'plus-backstory',
        'fictionlab-plus',
        'scenario.backstory',
        10000,
        'characters',
        'Verified from FictionLab Tiers documentation.'
    ),
    (
        'plus-greeting',
        'fictionlab-plus',
        'scenario.greeting',
        4000,
        'characters',
        'Verified from FictionLab Tiers documentation.'
    ),
    (
        'plus-custom-instructions',
        'fictionlab-plus',
        'scenario.customInstructions',
        6000,
        'characters',
        'Verified from FictionLab Tiers documentation.'
    );

-- Ultra Story limits.
INSERT INTO platform_limits (
    id,
    profile_id,
    key,
    value,
    unit,
    source_note
)
VALUES
    (
        'ultra-backstory',
        'fictionlab-ultra',
        'scenario.backstory',
        10000,
        'characters',
        'Verified from FictionLab Tiers documentation.'
    ),
    (
        'ultra-greeting',
        'fictionlab-ultra',
        'scenario.greeting',
        4000,
        'characters',
        'Verified from FictionLab Tiers documentation.'
    ),
    (
        'ultra-custom-instructions',
        'fictionlab-ultra',
        'scenario.customInstructions',
        6000,
        'characters',
        'Verified from FictionLab Tiers documentation.'
    );