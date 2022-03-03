#!/bin/bash
npm run typeorm query "$(cat migrations/sql/reset.sql | tr -d '\n')"