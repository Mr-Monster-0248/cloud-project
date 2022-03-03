$query = (Get-Content "./migrations/sql/clear-data.sql") -join ' '
$query = $query.replace('"', '\"')
npm run typeorm query $query
