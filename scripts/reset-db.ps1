$query = (Get-Content "./migrations/sql/reset.sql") -join ' '
$query = $query.replace('"', '\"')
npm run typeorm query $query
