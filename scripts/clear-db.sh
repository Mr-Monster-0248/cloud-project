#!/bin/bash
npm run typeorm query "$(cat migrations/sql/clear-data.sql | tr -d '\n')"
