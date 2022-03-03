#!/bin/bash
npm run typeorm query "$(cat migrations/sql/populate.sql | tr -d '\n')"
