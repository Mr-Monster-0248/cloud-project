$query = (Get-Content "./migrations/sql/populate.sql") -join ' '
$query = $query.replace('"', '\"')
npm run typeorm query $query
