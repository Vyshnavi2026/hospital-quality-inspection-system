-- ===========================================================
-- Hospital Quality Inspection & Root-Cause Intelligence System
-- Database Migration : 0001_init.sql
-- ===========================================================

create extension if not exists "pgcrypto";

-- ===========================================================
-- USERS TABLE
-- ===========================================================

create table if not exists users (
    id uuid primary key default gen_random_uuid(),

    full_name text not null,

    email text unique not null,

    role text not null
        check (role in ('Inspector', 'Quality Manager', 'Admin')),

    created_at timestamptz default now(),

    updated_at timestamptz default now()
);