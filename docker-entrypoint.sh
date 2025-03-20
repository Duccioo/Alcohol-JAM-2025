#!/bin/sh

# Create secrets.json with environment variables
echo "{
  \"TELEGRAM_BOT_TOKEN\": \"$TELEGRAM_BOT_TOKEN\",
  \"TELEGRAM_CHAT_ID\": \"$TELEGRAM_CHAT_ID\"
}" > ./src/data/secrets.json

# Make sure the file has proper permissions
chmod 600 ./src/js/secrets.json

# Execute the command passed to docker-entrypoint.sh
exec "$@"