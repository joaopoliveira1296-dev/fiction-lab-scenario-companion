-- Fiction Lab Scenario Companion
-- Migration 002: add per-Scenario Fiction Lab Target Plan.

ALTER TABLE scenarios
ADD COLUMN fiction_lab_plan TEXT NOT NULL DEFAULT 'FREE'
CHECK (fiction_lab_plan IN ('FREE', 'PLUS', 'ULTRA'));

ALTER TABLE platform_profiles
ADD COLUMN plan TEXT NOT NULL DEFAULT 'FREE'
CHECK (plan IN ('FREE', 'PLUS', 'ULTRA'));

CREATE UNIQUE INDEX ux_platform_profiles_plan
ON platform_profiles(plan);